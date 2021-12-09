import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Middleware de gestion des erreurs.
 */
export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction): Response => {
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Something went wrong.'
    });
}