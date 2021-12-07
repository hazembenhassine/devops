import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom";

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}