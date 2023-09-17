import { BuildingManager } from "../src/building-manager";
import { ElevatorDirection } from "../src/elevator";
import { config } from '../src/config';
import { randomBetween } from "../src/utils";
import { faker } from "@faker-js/faker";

let timeStart = Date.now();
async function start() {
  const mgr = new BuildingManager();
  mgr.addBuilding(10, 3);
  mgr.renderState(mgr.buildings[0]);

  const building = mgr.buildings[0];

  setInterval(() => {
    mgr.renderState(building);
    console.log(`Time since start: ${(Date.now() - timeStart) / 1000}s`);

    if (Math.random() < 0.20) {
      const floor = randomBetween(0, building.floors);
      let availableDirections: ElevatorDirection[] = [];
      if (floor > 0) {
        availableDirections.push(ElevatorDirection.DOWN);
      }
      if (floor < building.floors) {
        availableDirections.push(ElevatorDirection.UP);
      }
      const direction = faker.helpers.arrayElement(availableDirections);
      console.log(`Calling: ${floor}, ${direction === 0 ? 'UP' : 'DOWN'}`);
      building.callElevator(floor, direction);
    }
  }, config.tickRateMs);

}


start()
