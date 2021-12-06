import { BuildingBlocks } from "./models/building-blocks";

const buildingBlocks = new BuildingBlocks([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

const buildingBlocks2 = new BuildingBlocks([0, 3, 0, 2, 0, 4, 0]);

console.log("Collected Water:", buildingBlocks.getCollectedWater());
console.log("Collected Water:", buildingBlocks.getCollectedWaterOptimized());
console.log("Collected Water:", buildingBlocks2.getCollectedWater());
console.log("Collected Water:", buildingBlocks2.getCollectedWaterOptimized());