/**
 * File: Permission.ts
 * Description: Permissions
 * Author: Arun Gopi
 * Date: 2025-12-21
 */

import { RolePermission } from "./RolePermission";

export interface Permission {
    id: number;                   // Unique identifier for the permission
    action: string;               // Action string, e.g., "create:post"
    module: string;               // Module name, e.g., "Blog"
    description?: string;         // Optional description of the permission
    roles?: RolePermission[];     // Optional array of RolePermission instances
    createdAt: Date;
    updatedAt: Date;
}