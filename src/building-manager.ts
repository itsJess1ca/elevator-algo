import { Building } from "./building";
import { config } from "./config";
import { ElevatorState } from "./elevator";

export class BuildingManager {
  buildings: Building[] = [];
  constructor() {
    setInterval(() => {
      for (const building of this.buildings) {
        building.__tick();
      }
    }, config.tickRateMs);
  }

  addBuilding(floors: number, elevatorCount: number): Building {
    const building = new Building(floors, elevatorCount);
    this.buildings.push(building);
    return building;
  }

  renderState(building: Building) {
    console.clear();
    let buildingStr = '';
    for (let floor = building.floors; floor >= 0; floor--) {
      let floorString = `${`${floor}`.padStart(2, ' ')} | `;
      for (let i = 0; i < building.elevatorCount; i++) {
        if (building.elevators[i].currentFloor === floor) {
          floorString += ` [${building.elevators[i].state === ElevatorState.MOVING ? 'M' : 'S'}] `;
        } else {
          floorString += '  |  ';
        }
      }
      floorString += ' |';
      buildingStr += floorString + '\n';
    }
    console.log(buildingStr);
    console.log(`Planned Calls: ${building.plannedCalls.map(c => `${c.floor} - ${c.direction}`).join(',')}`);
    console.log(`Pending Calls: ${building.pendingCalls.map(c => `${c.floor} - ${c.direction}`).join(',')}`);
  }
}