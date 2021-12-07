import { BuildingBlocks } from "./models/building-blocks";
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import "express-async-errors";
import { handleNotFoundRequest } from "./middleware/not-found";
import { BuildingHightsDTO } from "./models/building-hights.dto";
import { validate } from "./middleware/validation";
import { handleErrors } from "./middleware/error-handler";

const app: Application = express();
const router: Router = Router();

// Ajoute le JSON middleware pour faire le parse du body de la requête
app.use(express.json());

// Prefix tous les routes avec /api
app.use('/api', router);

router.route('/collected-water').post(validate, (req: Request, res: Response) => {
    const body: BuildingHightsDTO = req.body;
    const buildingBlocks = new BuildingBlocks(body.buildingsHeightList);
    res.status(200).json({
        collectedWater: buildingBlocks.getCollectedWaterOptimized()
    });
});

app.use(handleErrors);
app.use(handleNotFoundRequest);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
});

// const buildingBlocks = new BuildingBlocks([9, 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

// const buildingBlocks2 = new BuildingBlocks([0, 3, 0, 2, 0, 4, 0]);

// console.log("Collected Water:", buildingBlocks.getCollectedWater());
// console.log("Collected Water:", buildingBlocks.getCollectedWaterOptimized());
// console.log("Collected Water:", buildingBlocks2.getCollectedWater());
// console.log("Collected Water:", buildingBlocks2.getCollectedWaterOptimized());