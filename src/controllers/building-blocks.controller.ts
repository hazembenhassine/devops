import { Request, Response } from 'express';
import { service as buildingBlocks } from "../services/building-blocks.service";
import { BuildingHightsDTO } from "../models/building-hights.dto";

export class BuildingBlocksController {
    
    getCollectedWaterOptimized(req: Request, res: Response): void {
        const body: BuildingHightsDTO = req.body;
        res.status(200).json({
            collectedWater: buildingBlocks.getCollectedWaterOptimized(body.buildingsHeightList)
        });
    }

    getCollectedWater(req: Request, res: Response): void {
        const body: BuildingHightsDTO = req.body;
        res.status(200).json({
            collectedWater: buildingBlocks.getCollectedWater(body.buildingsHeightList)
        });
    }

}
