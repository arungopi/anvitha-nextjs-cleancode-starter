
/**
 * File: password.ts
 * Description: Password utils
 * Author: Arun Gopi
 * Date: 2025-04-17
 */
// lib/auth.ts
import argon2 from 'argon2';
//import argon2 from '@node-rs/argon2';
//const argon2 = await import('@node-rs/argon2')

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

// Function to verify a password
/**
 * 
 * @param password plain password to be verified
 * @param hashedPassword digest to be checked
 * @returns 
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
};
