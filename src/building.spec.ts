import { Building, ElevatorCall } from "./building";
import { Elevator, ElevatorDirection, ElevatorState } from "./elevator";

describe('Building', () => {
  it('should be created with the correct amount of elevators', () => {
    const building = new Building(5, 4);
    expect(building['elevators'].length).toEqual(4);
  });

  const elevatorScenarios: { call: ElevatorCall, elevators: Elevator[], best: Elevator}[] = [
    // Get elevator already stopped on our floor
    {
      elevators: [
        new Elevator(6, ElevatorDirection.DOWN, ElevatorState.MOVING),
        new Elevator(6, ElevatorDirection.UP, ElevatorState.STOPPED),
        new Elevator(3, ElevatorDirection.UP, ElevatorState.MOVING, new Set([4])),
        new Elevator(3, ElevatorDirection.DOWN, ElevatorState.STOPPED)
      ],
      call: {floor: 3, direction: ElevatorDirection.DOWN},
      best: new Elevator(3, ElevatorDirection.DOWN, ElevatorState.STOPPED)
    },
    // Get elevator that is moving down towards us
    {
      elevators: [
        new Elevator(6, ElevatorDirection.DOWN, ElevatorState.MOVING),
        new Elevator(6, ElevatorDirection.UP, ElevatorState.STOPPED),
        new Elevator(3, ElevatorDirection.UP, ElevatorState.MOVING, new Set([4])),
        new Elevator(3, ElevatorDirection.DOWN, ElevatorState.STOPPED)
      ],
      call: {floor: 5, direction: ElevatorDirection.UP},
      best: new Elevator(6, ElevatorDirection.DOWN, ElevatorState.MOVING)
    },
    // Make sure target direction is taken into account
    {
      elevators: [
        new Elevator(2, ElevatorDirection.DOWN, ElevatorState.MOVING, new Set([0])),
        new Elevator(0, ElevatorDirection.UP, ElevatorState.MOVING, new Set([2]))
      ],
      call: {floor: 1, direction: ElevatorDirection.UP},
      best: new Elevator(0, ElevatorDirection.UP, ElevatorState.MOVING, new Set([2]))
    }
  ]
  it.each(elevatorScenarios)('should find the best elevator', ({call, elevators, best}) => {
    const building = new Building(5, 3);
    building['elevators'] = elevators;

    let bestElevator = building['findBestElevator'](call.floor, call.direction);
    expect(bestElevator).toMatchObject(best);
  })

  it('should emit elevator_state event ')
})