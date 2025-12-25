/**
 * @file AppError.ts
 * @description  Generic Error class
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module Error
 *
 * @remarks
 * @see 
 *
 */

export class AppError extends Error{
    public code: string;
    public statusCode: number;
    public timestamp: Date;
    public requestId?: string;
    public debugInfo?: string;
    public context?: unknown;

    constructor(
        message: string,
        code: string,
        statusCode: number,
        requestId?: string,
        debugInfo?: string,
        context?: unknown
    ) {
        super(message);
        this.name = this.constructor.name; // Dynamic name based on the class
        this.code = code;
        this.statusCode = statusCode;
        this.timestamp = new Date();
        this.requestId = requestId;
        this.debugInfo = debugInfo;
        this.context = context;
        Error.captureStackTrace(this, this.constructor);
    }
}