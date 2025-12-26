/**
 * @file AuthenticationUsecases
 * @description  Authentication usecases
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-27
 * @module 
 * @remarks Unlike the convention of SRP forcing single function in usecase
 *          class of Cleancode architecture, its overridden here in this
 *          class to accomodate multiple usecase.
 * @see
 * 
 */

import { User } from "@/core/entities/models/User";
import { IAuthService } from "@/core/services/IAuthService";

export class AuthenticationUsecases {

    constructor(private authService: IAuthService) { }

    /**
        * @param password - plain password to be verified
        * @param hashedPassword - digest to be checked
        */
    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordValid: boolean = await this.authService.validatePassword(password, hashedPassword);
        return isPasswordValid;
    }

    /**
     * @param email 
     */
    async validateUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    /**
     * @param email 
     * @param password 
     */
    async signUp(email: string, password: string): Promise<User | null> {
        const user = await this.authService.validateUserByEmail(email);
        if (user == null) {
            try {
                const user = await this.authService.signUp(email, password);
                return user;
            } catch (error) {
                throw error;
            }
        } else {
            return null;
        }
    }

    /**
     * @param email 
     * @param password 
     */
    signIn(email: string, password: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    /**
     * Updates user data
     * @param id 
     * @param data 
     */
    updateUser(id: string, data: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
}