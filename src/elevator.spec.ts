import { Elevator, ElevatorDirection, ElevatorState } from "./elevator";

describe('Elevator', () => {
  let elevator: Elevator;
  beforeEach(() => {
    elevator = new Elevator();
  })

  it('should be created with the correct defaults', () => {
    expect(elevator.currentFloor).toEqual(0);
    expect(elevator.plannedStops).toEqual([]);
    expect(elevator.state).toEqual(ElevatorState.STOPPED);
    expect(elevator.direction).toEqual(ElevatorDirection.UP);
  });

  it('should add a stop to the list when addStop is called', () => {
    elevator.addStop(3);
    expect(elevator.plannedStops).toEqual([3]);

    elevator.addStop(2);
    expect(elevator.plannedStops).toEqual([3,2]);
  });

  it('should change state from stopped to moving if a stop is added', () => {
    elevator.addStop(1);
    elevator.__tick();
    expect(elevator.state).toEqual(ElevatorState.MOVING);
    expect(elevator.currentFloor).toEqual(0);
    expect(elevator.plannedStops).toEqual([1]);

    elevator.__tick();
    expect(elevator.currentFloor).toEqual(1);
    expect(elevator.state).toEqual(ElevatorState.STOPPED);
    expect(elevator.plannedStops).toEqual([]);
  })
})