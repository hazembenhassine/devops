import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Gère les erreurs.
 */
export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Something went wrong.'
    });
}