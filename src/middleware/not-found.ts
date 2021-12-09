import { Request, Response } from 'express';

/**
 * Gère les requêtes avec une route introuvable
 */
export const handleNotFoundRequest = (req: Request, res: Response) => res.status(404).json({
    message: "Route does not exist"
});