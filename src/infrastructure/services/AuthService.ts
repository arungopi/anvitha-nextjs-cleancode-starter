/**
 * @file AuthService
 * @description  Auth Service Implementation
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-27
 * @module 
 * @remarks 
 * @see
 * 
 */

import { User } from "@/core/entities/models/User";
import { IAuthService } from "@/core/services/IAuthService";
import { IUserRepository } from "@/core/ports/IUserRepository";
const { verifyPassword } = await import('@/infrastructure/utils/password');

export class AuthService implements IAuthService {
    
    constructor(private userRepository: IUserRepository) { }
    
    async validateUserByEmail(email: string): Promise<User|null> {
        const user: User | null = await this.userRepository.findUserByEmail(email)
        //return user !== null ? true : false; TODO: change to this implementation
        return user;
    }
    
    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        const authStatus = await verifyPassword(password, hashedPassword)
        return authStatus;
    }
    
    async signUp(email: string, password: string): Promise<User | null> {
        try {
            return this.userRepository.createUser(email, password);
        } catch (error) {
            throw error;
        }
    }

    signIn(email: string, password: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    updateUser(id: string, data: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
}