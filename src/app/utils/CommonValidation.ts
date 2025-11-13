/**
 * @file CommonValidation.ts
 * @description  Common validation using Zod
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-07-10
 * @module public
 * @example 
 */
import { z, ZodError } from 'zod';

type TValidationResult = {
    success : boolean,
    data? : string,
    error? : ZodError,
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const uuidSchema = z.string().regex(uuidRegex, {
  message: 'Invalid UUID for given Item',
});

export function validateUuid(uuid : string) : TValidationResult{
    return uuidSchema.safeParse(uuid);
}