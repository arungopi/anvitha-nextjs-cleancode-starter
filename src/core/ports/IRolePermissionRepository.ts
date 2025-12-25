/**
 * @file IRolePermissionRepository
 * @description  Interface for RolePermission Repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-21
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Permission } from "../entities/models/Permission";
import { Role } from "../entities/models/Role";
import { RolePermission } from "../entities/models/RolePermission";

export interface IRolePermissionRepository{
    createRolePermission(rolePermissionData: { roleId: number; permissionId: number }): Promise<RolePermission>;
    getPermissionsByRoleId(roleId: number): Promise<Permission[]>;
    getRolesByPermissionId(permissionId: number): Promise<Role[]>;
    deleteRolePermission(roleId: number, permissionId: number): Promise<boolean>;
    rolePermissionExists(roleId: number, permissionId: number): Promise<boolean>;
    getAllRolePermissions(roleId: number): Promise<RolePermission[]>;
    removeAllPermissionsFromRole(roleId: number): Promise<boolean>;
}