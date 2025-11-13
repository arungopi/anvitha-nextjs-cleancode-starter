/**
 * @file IUserRepository
 * @description  Interface for Auth Service
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-27
 * @module 
 * @remarks 
 * @see
 * 
 */

import { User } from "../entities/models/User"

export interface IAuthService{
    /**
     * @param password - plain password to be verified
     * @param hashedPassword - digest to be checked
     */
    validatePassword(password:string, hashedPassword:string) : Promise<boolean>

    /**
     * @param email 
     */
    validateUserByEmail(email:string): Promise<User | null>
}