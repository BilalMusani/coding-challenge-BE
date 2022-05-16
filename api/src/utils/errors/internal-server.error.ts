import {
    ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

export class InternalServerError extends BaseError {
    constructor(
        name: string,
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        description = ReasonPhrases.INTERNAL_SERVER_ERROR,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = InternalServerError;