/**
 * @file IUserRoleRepository
 * @description  Interface for User Role Repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-21
 * @module 
 * @remarks 
 * @see
 * 
 */

import { UserRole } from "../entities/models/UserRole";
import { Role } from "../entities/models/Role";
import { User } from "../entities/models/User";

export interface IUserRoleRepository{
    createUserRole(userRoleData: { userId: string; roleId: number }): Promise<UserRole>;
    getRolesByUserId(userId: string): Promise<Role[]>;
    getUsersByRoleId(roleId: number): Promise<User[]>;
    deleteUserRole(userId: string, roleId: number): Promise<boolean>;
    userRoleExists(userId: string, roleId: number): Promise<boolean>;
    getAllUserRoles(userId: string): Promise<UserRole[]>;
    getAllUserRolesByRoleId(roleId: number): Promise<UserRole[]>;
    removeAllRolesFromUser(userId: string): Promise<boolean>;
    updateUserRole(userId: string, oldRoleId: number, newRoleId: number): Promise<UserRole | null>;
    isAdmin(userId: string):Promise<boolean>;
}