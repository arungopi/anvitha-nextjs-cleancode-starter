/**
 * @file IPermissionRepository
 * @description  Interface for Permission Repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-21
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Permission } from "../entities/models/Permission";
import { RolePermission } from "../entities/models/RolePermission";

export interface IPermissionRepository {
    createPermission(permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'roles'>): Promise<Permission>;
    getPermissionById(permissionId: number): Promise<Permission | null>;
    getAllPermissions(): Promise<Permission[]>;
    updatePermission(permissionId: number, updatedData: Partial<Omit<Permission, 'id' | 'createdAt' | 'updatedAt' | 'roles'>>): Promise<Permission | null>;
    deletePermission(permissionId: number): Promise<boolean>;
    permissionExists(permissionId: number): Promise<boolean>;
    getRolesByPermissionId(permissionId: number): Promise<RolePermission[]>;
    removeAllRolesFromPermission(permissionId: number): Promise<boolean>;
}