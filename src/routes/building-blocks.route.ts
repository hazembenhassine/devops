import { Router } from "express"
import { BuildingBlocksController } from "../controllers/building-blocks.controller";
import { validate } from "../middleware/validation";

export const routeBuildingBlocks = (): Router => {
    const router: Router = Router();

    const controller: BuildingBlocksController = new BuildingBlocksController();

    router.route('/collected-water').post(validate, controller.getCollectedWater);
    router.route('/collected-water-optimized').post(validate, controller.getCollectedWaterOptimized);

    return router;
}
