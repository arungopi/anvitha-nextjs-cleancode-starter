
/**
 * @file Repository Error
 * @description  Repository error
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-25
 * @module 
 * @remarks 
 * @see
 * 
 */

import { ErrorBuilder } from "@/core/errors/ErrorBuilder";
import { DatabaseError } from "./DatabaseError";
import { QueryError } from "./PrismaError";
import { GenericError } from "@/core/errors/GenericError";
import { Prisma } from "@/infrastructure/prisma/client";

const getRepositoryError = (error: Prisma.PrismaClientValidationError |
    Prisma.PrismaClientKnownRequestError |
    Prisma.PrismaClientUnknownRequestError | unknown, message: string): DatabaseError | GenericError => {
    if (error instanceof Prisma.PrismaClientValidationError) {
        return new ErrorBuilder(DatabaseError).setStatusCode(500)
            .setMessage('Validation Error:' + error.message)
            .build();
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (QueryError.get(error.code) != null) {
            return new ErrorBuilder(DatabaseError).setStatusCode(QueryError.get(error.code)!.httpStatus)
                .setMessage(QueryError.get(error.code)!.message).setContext(error.meta)
                .build();
        } else {
            return new ErrorBuilder(DatabaseError).setStatusCode(500)
                .setMessage('An unknown error occured when interacting with database')
                .build();
        }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return new ErrorBuilder(DatabaseError).setStatusCode(500)
            .setMessage('An unknown error occured when interacting with database')
            .build();
    } else {
        return new ErrorBuilder(GenericError).setStatusCode(500).setMessage(message).build();
    }
}

export default getRepositoryError;