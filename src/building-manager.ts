import { Building } from "./building";
import { config } from "./config";

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
}