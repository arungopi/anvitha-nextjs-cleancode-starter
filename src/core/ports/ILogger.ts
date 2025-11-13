/**
 * File: ILogger.ts
 * Description: Interface for Logger implementation for dependency inversion
 * Author: Arun Gopi
 * Date: 2025-10-26
 */

export interface ILogger {
    trace(message: string, ...others: unknown[]): void;
    debug(message: string, ...others: unknown[]): void;
    info(message: string, ...others: unknown[]): void;
    warn(message: string, ...others: unknown[]): void;
    error(message: string, ...others: unknown[]): void;
    fatal(message: string, ...others: unknown[]): void;
}