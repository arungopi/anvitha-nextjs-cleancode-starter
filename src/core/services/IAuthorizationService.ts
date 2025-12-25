/**
 * @file IAuthorizationService
 * @description  Interface for Authorization Service
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-23
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Role } from "../entities/models/Role";
import { UserRole } from "../entities/models/UserRole";

export interface IAuthorizationService {
    createRole(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    getRoleById(roleId: number): Promise<Role | null>;
    createUserRole(userRoleData: { userId: string; roleId: number; }): Promise<UserRole>;
    getRolesByUserId(userId: string): Promise<Role[]>;
    userRoleExists(userId: string, roleId: number): Promise<boolean>;
    isAdmin(userId: string): Promise<boolean>;
}