import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/validation';
import { BuildingHightsDTO } from '../models/building-hights.dto';

/**
 * Middleware de validation des données d'entrée de la requête POST
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const body: BuildingHightsDTO = req.body;
    if (!Array.isArray(body.buildingsHeightList)) {
        throw new ValidationError(`Expected array, found ${typeof body.buildingsHeightList}.`);
    }
    body.buildingsHeightList.forEach((elm) => {
        if (isNaN(elm)) {
            throw new ValidationError(`Expected array of numbers, found ${typeof elm}.`);
        }
        if (elm < 0) {
            throw new ValidationError('Numbers must be greater than or equal to 0.');
        }
        if (elm === Number.POSITIVE_INFINITY) {
            throw new ValidationError('Numbers must be finite.');
        }
    });
    next();
}