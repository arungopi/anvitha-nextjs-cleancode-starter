/**
 * @file ResponseBuilder.ts
 * @description  Response builder for formating and building suitable response
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-06-30
 * @module public
 * @example 
 * const response = new ResponseBuilder(200, 'OK')
 *                      .withData({ foo: 'bar' })
 *                      .withErrors([{ error: 'Something went wrong' }])
 *                      .build();
 * 
 * const response = ResponseBuilder.ok("Success").withData(data).build();
 * const response = ResponseBuilder.internalServerError(`Failed to get tags: ${error.message || 'An unexpected error occurred.'}`).withErrors({ general: 'Encountered error during retrieval' });
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorType  = any;

export interface ActionResponse<T> {
    status: number;
    message: string;
    data?: T;
    errors?: ErrorType;
}

/**
 * HTTP status codes
 */
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export default class ResponseBuilder<T>  implements ActionResponse<T>{
    status: number;
    message: string;
    data?: T;
    errors?: ErrorType;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }

    withData(data: T): ResponseBuilder<T> {
        this.data = data;
        return this;
    }

    withErrors(errors: ErrorType): ResponseBuilder<T> {
        this.errors = errors;
        return this;
    }

    build(): ActionResponse<T> {
        if (this.status < 100 || this.status > 599) {
            throw new Error(`Invalid HTTP status code: ${this.status}`);
        }

        return {
            status: this.status,
            message: this.message,
            data: this.data,
            errors: this.errors,
        };
    }

    /**
     * Convenience methods for common HTTP status codes
     */
    static ok<T>(message: string = "Ok") {
        return new ResponseBuilder<T>(HttpStatus.OK, message);
    }

    static created<T>(message: string = "Created") {
        return new ResponseBuilder<T>(HttpStatus.CREATED, message);
    }

    static badRequest<T>(message: string){
        return new ResponseBuilder<T>(HttpStatus.BAD_REQUEST, message);
    }

    static unauthorized<T>(message: string = "Not authorized"){
        return new ResponseBuilder<T>(HttpStatus.UNAUTHORIZED, message);
    }

    static notFound<T>(message: string) {
        return new ResponseBuilder<T>(HttpStatus.NOT_FOUND, message);
    }

    static validationFailure<T>(message: string = "Validation failed") {
        return new ResponseBuilder<T>(HttpStatus.UNPROCESSABLE_ENTITY, message);
    }

    static internalServerError<T>(message: string) {
        return new ResponseBuilder<T>(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}