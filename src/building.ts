import { Elevator, ElevatorDirection, ElevatorState } from "./elevator";
import { EventEmitter } from 'node:events';

export type ElevatorCall = {
  floor: number;
  direction: ElevatorDirection;
}

export enum ElevatorEvents {
  ELEVATOR_STATE = 'elevator_state'
}
export interface ElevatorEventPayloads {
  elevator_state: {
    id: number;
    floor: number;
    state: ElevatorState;
    direction: ElevatorDirection;
  }
}

export class Building {
  public elevators: Elevator[] = [];
  public pendingCalls: ElevatorCall[] = [];
  public plannedCalls: ElevatorCall[] = [];
  private event$ = new EventEmitter();
  constructor(public floors: number, public elevatorCount: number) {
    for (let i = 0; i < elevatorCount; i++) {
      this.elevators.push(new Elevator());
    }
  }

  public callElevator(floor: number, targetDirection: ElevatorDirection) {
    if (floor > this.floors) {
      throw new Error(`Floor ${floor} out of bounds`);
    }
    if (this.plannedCalls.find(c => c.floor === floor && c.direction === targetDirection)) {
      return;
    }
    const bestElevator = this.findBestElevator(floor, targetDirection);

    if (!bestElevator) {
      this.pendingCalls.push({direction: targetDirection, floor});
      return;
    }

    bestElevator.addStop(floor);
    this.plannedCalls.push({direction: targetDirection, floor});
  }

  private findBestElevator(floor: number, targetDirection: ElevatorDirection) {
    let bestElevator: Elevator | null = null;
    let lowestTicks = Infinity;
    for (const elevator of this.elevators) {
      const ticksAway = elevator.ticksAway(floor);
      if (ticksAway < lowestTicks) {
        lowestTicks = ticksAway;
        bestElevator = elevator;
      }
    }
    return bestElevator;
  }

  listen<T extends ElevatorEvents>(eventName: T, callback: (payload: ElevatorEventPayloads[T]) => void) {
    console.log(`Adding listener for ${eventName}`);
    return this.event$.on(eventName, callback);
  }

  __tick() {
    for (const elevator of this.elevators) {
      elevator.__tick();
      this.event$.emit(ElevatorEvents.ELEVATOR_STATE, {
        id: this.elevators.indexOf(elevator),
        floor: elevator.currentFloor,
        state: elevator.state,
        direction: elevator.direction
      })
    }

    let pendingCall: ElevatorCall | undefined = this.pendingCalls.shift();
    while(pendingCall) {
      this.callElevator(pendingCall.floor, pendingCall.direction);
      pendingCall = this.pendingCalls.shift();
    }

    this.plannedCalls = this.plannedCalls.filter((c) =>
      !this.elevators.find(e => e.currentFloor === c.floor && e.state === ElevatorState.STOPPED))
  }
}