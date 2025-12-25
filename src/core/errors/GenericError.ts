/**
 * @file GenericError.ts
 * @description  Generic Error
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

export class GenericError extends AppError {
    constructor(message: string) {
        super(message, 'GENERIC_ERROR', 500);
    }
}