import { Request, Response } from 'express';
import { BuildingBlocksService } from "../services/building-blocks.service";
import { BuildingHightsDTO } from "../models/building-hights.dto";

export class BuildingBlocksController {
    
    getCollectedWaterOptimized(req: Request, res: Response): void {
        const body: BuildingHightsDTO = req.body;
        const buildingBlocks = new BuildingBlocksService(body.buildingsHeightList);
        res.status(200).json({
            collectedWater: buildingBlocks.getCollectedWaterOptimized()
        });
    }

    getCollectedWater(req: Request, res: Response): void {
        const body: BuildingHightsDTO = req.body;
        const buildingBlocks = new BuildingBlocksService(body.buildingsHeightList);
        res.status(200).json({
            collectedWater: buildingBlocks.getCollectedWater()
        });
    }

}
