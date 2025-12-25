/**
 * @file PermissionRepository
 * @description  Repository implementation for Permission
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Permission } from "@/core/entities/models/Permission";
import { RolePermission } from "@/core/entities/models/RolePermission";
import { IPermissionRepository } from "@/core/ports/IPermissionRepository";

export class PermissionRepository implements IPermissionRepository{
    createPermission(permissionData: Omit<Permission, "id" | "createdAt" | "updatedAt" | "roles">): Promise<Permission> {
        throw new Error("Method not implemented.");
    }
    getPermissionById(permissionId: number): Promise<Permission | null> {
        throw new Error("Method not implemented.");
    }
    getAllPermissions(): Promise<Permission[]> {
        throw new Error("Method not implemented.");
    }
    updatePermission(permissionId: number, updatedData: Partial<Omit<Permission, "id" | "createdAt" | "updatedAt" | "roles">>): Promise<Permission | null> {
        throw new Error("Method not implemented.");
    }
    deletePermission(permissionId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    permissionExists(permissionId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getRolesByPermissionId(permissionId: number): Promise<RolePermission[]> {
        throw new Error("Method not implemented.");
    }
    removeAllRolesFromPermission(permissionId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}