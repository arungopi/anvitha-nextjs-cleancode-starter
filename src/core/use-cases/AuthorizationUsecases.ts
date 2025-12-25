/**
 * @file Authorization Usecases
 * @description  Authorization usecases
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module 
 * @remarks Unlike the convention of SRP forcing single function in usecase
 *          class of Cleancode architecture, its overridden here in this
 *          class to accomodate multiple usecase.
 * @see
 * 
 */

import { Role } from "@/core/entities/models/Role";
import { UserRole } from "@/core/entities/models/UserRole";
import { IAuthorizationService } from "@/core/services/IAuthorizationService";
import { use } from "react";

export class AuthorizationUsecases {
    constructor(private authorizationService: IAuthorizationService) { }

    async createRole(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
        try {
            return this.authorizationService.createRole(data);
        } catch (error) {
            throw error;
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return this.authorizationService.getAllRoles();
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return this.authorizationService.getRoleById(roleId);
        } catch (error) {
            throw error;
        }
    }

    async createUserRole(userRoleData: { userId: string; roleId: number; }): Promise<UserRole> {
        try {
            return this.authorizationService.createUserRole(userRoleData);
        } catch (error) {
            throw error;
        }
    }

    async getRolesByUserId(userId: string): Promise<Role[]> {
        try {
            return this.authorizationService.getRolesByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async userRoleExists(userId: string, roleId: number): Promise<boolean> {
        try {
            return this.authorizationService.userRoleExists(userId, roleId);
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(userId: string): Promise<boolean> {
        try {
            return this.authorizationService.isAdmin(userId);
        } catch (error) {
            throw error;
        }
    }
}