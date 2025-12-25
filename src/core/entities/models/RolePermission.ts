/**
 * File: Permission.ts
 * Description: RolePermissions
 * Author: Arun Gopi
 * Date: 2025-12-21
 */

import { Permission } from "./Permission";
import { Role } from "./Role";

export interface RolePermission {
    roleId: number;               // Identifier for the role
    permissionId: number;         // Identifier for the permission
    role?: Role;                  // Optional link to the Role interface
    permission?: Permission;       // Optional link to the Permission interface
}