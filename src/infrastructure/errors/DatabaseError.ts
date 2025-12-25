/**
 * @file DatabaseError.ts
 * @description  Error related to database
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module DatabaseError
 *
 * @remarks
 * @see https://www.prisma.io/docs/orm/reference/error-reference
 *
 */

import { AppError } from "@/core/errors/AppError";

export class DatabaseError extends AppError {

    constructor(
        message: string,
        code: string = 'DB_ERROR',
        statusCode: number = 500,
        requestId?: string,
        debugInfo?: string,
        context?: unknown
    ) {
        super(message, code, statusCode, requestId, debugInfo, context);
        Error.captureStackTrace(this, this.constructor);
    }
}