/**
 * @file RolePermissionRepository
 * @description  Repository implementation for RolePermissionRepository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Permission } from "@/core/entities/models/Permission";
import { Role } from "@/core/entities/models/Role";
import { RolePermission } from "@/core/entities/models/RolePermission";
import { IRolePermissionRepository } from "@/core/ports/IRolePermissionRepository";

export class RolePermissionRepository implements IRolePermissionRepository{
    createRolePermission(rolePermissionData: { roleId: number; permissionId: number; }): Promise<RolePermission> {
        throw new Error("Method not implemented.");
    }
    getPermissionsByRoleId(roleId: number): Promise<Permission[]> {
        throw new Error("Method not implemented.");
    }
    getRolesByPermissionId(permissionId: number): Promise<Role[]> {
        throw new Error("Method not implemented.");
    }
    deleteRolePermission(roleId: number, permissionId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    rolePermissionExists(roleId: number, permissionId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllRolePermissions(roleId: number): Promise<RolePermission[]> {
        throw new Error("Method not implemented.");
    }
    removeAllPermissionsFromRole(roleId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

