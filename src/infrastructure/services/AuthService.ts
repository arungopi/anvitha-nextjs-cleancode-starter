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

export class AuthService implements IAuthService{

    constructor(private userRepository: IUserRepository){}

    async validateUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findUserByEmail(email);
    }
    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        const authStatus = await verifyPassword(password, hashedPassword)
        return authStatus;
    }
}