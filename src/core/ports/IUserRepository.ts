/**
 * @file IUserRepository
 * @description  Interface for User Repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { User } from "../entities/models/User";

export interface IUserRepository {
    findUserByEmail(email:string) : Promise<User | null>;
    findUserById(id:string) : Promise<User | null>;
}