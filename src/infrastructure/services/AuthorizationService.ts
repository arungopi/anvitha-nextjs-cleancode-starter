/**
 * @file AuthorizationService
 * @description  Authorization Service Implementation
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Role } from "@/core/entities/models/Role";
import { UserRole } from "@/core/entities/models/UserRole";
import { IRoleRepository } from "@/core/ports/IRoleRepository";
import { IUserRoleRepository } from "@/core/ports/IUserRoleRepository";
import { IAuthorizationService } from "@/core/services/IAuthorizationService";

export class AuthorizationService implements IAuthorizationService {

    constructor(private roleRepository: IRoleRepository, private userRoleRepository: IUserRoleRepository) { }

    async createRole(data: Omit<Role, "id" | "createdAt" | "updatedAt">): Promise<Role> {
        try {
            return this.roleRepository.createRole(data);
        } catch (error) {
            throw error;
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return this.roleRepository.getAllRoles();
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return this.roleRepository.getRoleById(roleId);
        } catch (error) {
            throw error;
        }
    }

    async createUserRole(userRoleData: { userId: string; roleId: number; }): Promise<UserRole> {
        try {
            return this.userRoleRepository.createUserRole(userRoleData);
        } catch (error) {
            throw error;
        }
    }

    async getRolesByUserId(userId: string): Promise<Role[]> {
        try {
            return this.userRoleRepository.getRolesByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async userRoleExists(userId: string, roleId: number): Promise<boolean> {
        try {
            return this.userRoleRepository.userRoleExists(userId, roleId);
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(userId: string): Promise<boolean> {
        try {
            return this.userRoleRepository.isAdmin(userId);
        } catch (error) {
            throw error;
        }
    }
}