import { BuildingBlocksService } from './building-blocks.service'


describe('BuildingBlocks', () => {
    let buildingBlocks: BuildingBlocksService;
    let values: number[];
    describe('getCollectedWater', () => {
        it('simple test 1: should return the value of collected water inside the buildings', () => {
            values = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expectedValue = 6;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWater()).toBe(expectedValue);
        });
        it('simple test 2: should return 0 when building heights are even', () => {
            values = [5, 5, 5, 5, 5, 5];
            const expectedValue = 0;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWater()).toBe(expectedValue);
        });
        it('limit test 1: should return correct value if first building is highest building', () => {
            values = [9, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expectedValue = 14;
            buildingBlocks = new BuildingBlocksService(values);
            expect(buildingBlocks.getCollectedWater()).toBe(expectedValue);
        });
    });
});

describe('is working', () => {
    it('should work', () => {
        expect(true).toBeTruthy();
    })
});