/**
 * @file ErrorBuilder.ts
 * @description  Error Builder to build errors
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module Error
 *
 * @remarks
 * @see 
 *
 */
import { AppError } from "./AppError";

export class ErrorBuilder<T extends AppError> {

    private message = 'An error occurred';
    private code = 'GENERAL_ERROR';
    private statusCode = 500; // Default status code
    private requestId?: string;
    private debugInfo?: string;
    private context?: unknown;

    constructor(private errorClass: new (message: string, code?: string, statusCode?: number, requestId?: string, debugInfo?: string, context?: unknown) => T) {}

    setMessage(message: string): this {
        this.message = message;
        return this;
    }

    setCode(code: string): this {
        this.code = code;
        return this;
    }

    setStatusCode(statusCode: number): this {
        this.statusCode = statusCode;
        return this;
    }

    setRequestId(requestId: string): this {
        this.requestId = requestId;
        return this;
    }

    setDebugInfo(debugInfo: string): this {
        this.debugInfo = debugInfo;
        return this;
    }

    setContext(context: unknown): this {
        this.context = context;
        return this;
    }

    build(): T {
        return new this.errorClass(this.message, this.code, this.statusCode, this.requestId, this.debugInfo, this.context);
    }
}