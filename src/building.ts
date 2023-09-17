import { Elevator, ElevatorDirection, ElevatorState } from "./elevator";
import { difference } from "./utils";

export type ElevatorCall = {
  floor: number;
  direction: ElevatorDirection;
}

export class Building {
  private elevators: Elevator[] = [];
  private pendingCalls: ElevatorCall[] = [];
  private plannedCalls: ElevatorCall[] = [];
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

  __tick() {
    for (const elevator of this.elevators) {
      elevator.__tick();
    }

    let pendingCall: ElevatorCall | undefined = this.pendingCalls.shift();
    while(pendingCall) {
      this.callElevator(pendingCall.floor, pendingCall.direction);
      pendingCall = this.pendingCalls.shift();
    }
  }
}