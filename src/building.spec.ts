import { Building } from "./building";
import { Elevator, ElevatorDirection, ElevatorState } from "./elevator";

describe('Building', () => {
  it('should be created with the correct amount of elevators', () => {
    const building = new Building(5, 4);
    expect(building['elevators'].length).toEqual(4);
  });

  it('should find the best elevator', () => {
    const building = new Building(5, 3);
    building['elevators'] = [
      new Elevator(6, ElevatorDirection.DOWN, ElevatorState.MOVING),
      new Elevator(6, ElevatorDirection.UP, ElevatorState.STOPPED),
      new Elevator(3, ElevatorDirection.UP, ElevatorState.MOVING, new Set([4])),
      new Elevator(3, ElevatorDirection.DOWN, ElevatorState.STOPPED)
    ];

    let bestElevator = building['findBestElevator'](5, ElevatorDirection.UP);
    expect(bestElevator).toEqual(building['elevators'][0]);

    bestElevator = building['findBestElevator'](3, ElevatorDirection.DOWN);
    expect(bestElevator).toEqual(building['elevators'][3]);

  })
})