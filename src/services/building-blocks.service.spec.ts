import { ValidationError } from '../errors/validation';
import { service as buildingBlocks } from './building-blocks.service'


describe('BuildingBlocksService', () => {
    let values: number[];
    describe('getCollectedWaterOptimized', () => {
        test('simple case 1', () => {
            values = [0, 1, 0, 2];
            const expectedValue = 1;
            expect(buildingBlocks.getCollectedWaterOptimized(values)).toBe(expectedValue);
        });
        test('simple case 2', () => {
            values = [0, 0, 0, 0];
            const expectedValue = 0;
            expect(buildingBlocks.getCollectedWaterOptimized(values)).toBe(expectedValue);
        });
        test('simple case 3', () => {
            values = [0, 1, 2, 0];
            const expectedValue = 0;
            expect(buildingBlocks.getCollectedWaterOptimized(values)).toBe(expectedValue);
        });
        test('complex case 1', () => {
            values = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expectedValue = 6;
            expect(buildingBlocks.getCollectedWaterOptimized(values)).toBe(expectedValue);
        });
        test('complex case 2', () => {
            values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
            const expectedValue = 0;
            expect(buildingBlocks.getCollectedWaterOptimized(values)).toBe(expectedValue);
        });
    });
});