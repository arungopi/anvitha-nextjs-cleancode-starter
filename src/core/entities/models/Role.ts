/**
 * File: Role.ts
 * Description: Use roles
 * Author: Arun Gopi
 * Date: 2025-12-20
 */

import { RolePermission } from "./RolePermission";
import { UserRole } from "./UserRole";

export interface Role{
    id:number,
    name:string,
    description:string|null,
    createdAt?: Date;
    updatedAt?: Date;
    permissions?: RolePermission[]; // Optional array of RolePermission instances
    users?: UserRole[];         // Optional array of UserRole instances
}