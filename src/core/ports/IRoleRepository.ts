/**
 * @file IRoleRepository
 * @description  Interface for Role Repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-21
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Role } from "../entities/models/Role";
import { UserRole } from "../entities/models/UserRole";

export interface IRoleRepository{
    createRole(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role>;
    //createRole(roleData: { name: string; description?: string; permissions: number[] }): Promise<Role>;
    getRoleById(roleId: number): Promise<Role | null>;
    // Retrieve all roles
    getAllRoles(): Promise<Role[]>;
    updateRole(id: number, data: Partial<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Role | null>; 
    //updateRole(roleId: number, updatedData: { name?: string; description?: string; permissions?: number[] }): Promise<Role | null>;
    deleteRole(roleId: number): Promise<boolean>;
    roleExists(roleId: number): Promise<boolean>;
    isRoleAdmin(roleId: number): Promise<boolean>;
    // Focus less on usage of below functions as it can break Single Responsibility Principle
    // Optionally manage User roll indirectly through UserRole 
    getUsersByRole(roleId: number): Promise<UserRole[]>;
    // Optionally manage permissions indirectly through RolePermission
    addPermissions(roleId: number, permissions: number[]): Promise<Role | null>;
    removePermissions(roleId: number, permissions: number[]): Promise<Role | null>;
}