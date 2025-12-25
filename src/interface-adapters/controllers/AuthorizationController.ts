/**
 * @file AuthoriztionCntroller.ts
 * @description  Authentication controller
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-24
 * @module Authorization
 *
 * @remarks
 * @see /info.ts
 * 
 */

import { AuthorizationUsecases } from "@/core/use-cases/AuthorizationUsecases";
import { AuthorizationService } from "@/infrastructure/services/AuthorizationService";
import { RoleRepository } from "@/infrastructure/repositories/RoleRepository";
import { UserRoleRepository } from "@/infrastructure/repositories/UserRoleRepository";
import { Role } from "@/core/entities/models/Role";
import { UserRole } from "@/core/entities/models/UserRole";

export class AuthorizationController {
    private authorizationUsecase: AuthorizationUsecases;

    constructor() {
        this.authorizationUsecase = new AuthorizationUsecases(new AuthorizationService(new RoleRepository(), new UserRoleRepository()));
    }

    async createRole(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
        try {
            return this.authorizationUsecase.createRole(data);
        } catch (error) {
            throw error;
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return this.authorizationUsecase.getAllRoles();
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return this.authorizationUsecase.getRoleById(roleId);
        } catch (error) {
            throw error;
        }
    }

    async createUserRole(userRoleData: { userId: string; roleId: number; }): Promise<UserRole> {
        try {
            return this.authorizationUsecase.createUserRole(userRoleData);
        } catch (error) {
            throw error;
        }
    }

    async getRolesByUserId(userId: string): Promise<Role[]> {
        try {
            return this.authorizationUsecase.getRolesByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async userRoleExists(userId: string, roleId: number): Promise<boolean> {
        try {
            return this.authorizationUsecase.userRoleExists(userId, roleId);
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(userId: string): Promise<boolean> {
        try {
            return this.authorizationUsecase.isAdmin(userId);
        } catch (error) {
            throw error;
        }
    }
}