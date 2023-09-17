import { difference } from "./utils";

export enum ElevatorState {
  STOPPED,
  MOVING
}

export enum ElevatorDirection {
  UP,
  DOWN
}

export class Elevator {
  constructor(
    public currentFloor = 0,
    public direction: ElevatorDirection = ElevatorDirection.UP,
    public state: ElevatorState = ElevatorState.STOPPED,
    public stops: Set<number> = new Set()
  ) {}

  addStop(floor: number) {
    this.stops.add(floor);
  }

  get plannedStops() {
    return [...this.stops.values()];
  }
  private get nextStop() {
    return this.plannedStops[0];
  }

  ticksAway(floor: number): number {
    if (this.currentFloor === floor && this.state === ElevatorState.STOPPED) {
      return 0;
    }
    if (this.state === ElevatorState.STOPPED) {
      return difference(this.currentFloor, floor) + 1; // Add a tick for doors closing
    }

    // State: Moving
    let ticks = 0;
    let lastStop = this.currentFloor;
    for (const nextStop of this.plannedStops) {
      if (nextStop > floor && lastStop < floor) break;

      lastStop = nextStop;
      ticks += difference(lastStop, nextStop) + 1; // Add 1 for doors closing
    }
    if (lastStop !== floor) {
      ticks += difference(lastStop, floor);
    }
    return ticks;
  }

  __tick() {
    if (this.state === ElevatorState.MOVING) {
      this.currentFloor = this.direction === ElevatorDirection.UP ? this.currentFloor + 1 : this.currentFloor - 1;
    }
    if (this.plannedStops.length > 0 && !this.plannedStops.includes(this.currentFloor)) {
      // Don't start moving straight away, wait for doors to close.
      this.state = ElevatorState.MOVING;
      this.direction = this.nextStop > this.currentFloor ? ElevatorDirection.UP : ElevatorDirection.DOWN;
    } else if (this.nextStop === this.currentFloor) {
      this.state = ElevatorState.STOPPED;
      this.stops.delete(this.currentFloor);
    }
  }

}