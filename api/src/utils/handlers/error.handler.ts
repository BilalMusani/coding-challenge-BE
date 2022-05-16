import { ErrorMessages } from "../errors/error.messages";
import express from 'express';
import { BaseError } from "../errors/base.error";

export function logError(err: any) {
    // TODO: Add logger here
    console.error("LOGGER", err)
}

export function logErrorMiddleware(err: any, _req: any, _res: any, next: (arg0: any) => void) {
    logError(err)
    next(err)
}

export function returnError(err: any, _req: any, res: express.Response, _next: any) {
    if (err instanceof BaseError) {
        if(isOperationalError(err)) {
            res.status(err.statusCode || 500).send(err.name);
        }
    } else {
        res.status(err.statusCode || 500).send(ErrorMessages.DEFAULT);
    }
}

export function isOperationalError(error: any) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError
}