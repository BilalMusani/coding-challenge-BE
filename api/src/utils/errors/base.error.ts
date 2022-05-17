export class BaseError extends Error {
    constructor(
        public name: string,
        public statusCode: any,
        public isOperational: any,
        public description: string)
    {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}