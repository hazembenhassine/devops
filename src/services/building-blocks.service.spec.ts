import { ValidationError } from '../errors/validation';
import { BuildingBlocksService } from './building-blocks.service'


describe('BuildingBlocksService', () => {
    let values: number[];
    describe('constructor', () => {
        test('edge case', () => {
            values = [0, -5, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            expect(() => {
                new BuildingBlocksService(values)
            }).toThrow(ValidationError);
        });
    });
    describe('getCollectedWaterOptimized', () => {
    let buildingBlocks: BuildingBlocksService;
        test('simple case 1', () => {
            values = [0, 1, 0, 2];
            const expectedValue = 1;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWaterOptimized()).toBe(expectedValue);
        });
        test('simple case 2', () => {
            values = [0, 0, 0, 0];
            const expectedValue = 0;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWaterOptimized()).toBe(expectedValue);
        });
        test('simple case 3', () => {
            values = [0, 1, 2, 0];
            const expectedValue = 0;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWaterOptimized()).toBe(expectedValue);
        });
        test('complex case 1', () => {
            values = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expectedValue = 6;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWaterOptimized()).toBe(expectedValue);
        });
        test('complex case 2', () => {
            values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
            const expectedValue = 0;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWaterOptimized()).toBe(expectedValue);
        });
    });
});