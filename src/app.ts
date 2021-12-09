import express, { Application, Router } from 'express';
import "express-async-errors";
import { handleNotFoundRequest } from "./middleware/not-found";
import { handleErrors } from "./middleware/error-handler";
import { routeBuildingBlocks as BuildingBlocksRouter } from './routes/building-blocks.route';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app: Application = express();
const router: Router = Router();

// Ajoute le JSON middleware pour faire le parse du body de la requête
app.use(express.json());

// Middleware de sécurité 
app.use(cors());
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));

// Middleware de log
app.use(morgan('tiny'));

// Configuration de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.yaml')));

// Préfixe tous les routes par /api
app.use('/api', router);

router.use('/building-blocks', BuildingBlocksRouter());

app.use(handleErrors);
app.use(handleNotFoundRequest);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
});
