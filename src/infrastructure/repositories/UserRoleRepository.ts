/**
 * @file UserRoleRepository
 * @description  Repository implementation for UserRoleRepository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Role } from "@/core/entities/models/Role";
import { User } from "@/core/entities/models/User";
import { UserRole } from "@/core/entities/models/UserRole";
import { IUserRoleRepository } from "@/core/ports/IUserRoleRepository";
import getRepositoryError from "@/infrastructure/errors/RepositoryError";
import { prisma } from "@/infrastructure/prisma/client";

export class UserRoleRepository implements IUserRoleRepository {

    async createUserRole(userRoleData: { userId: string; roleId: number; }): Promise<UserRole> {
        try {
            const userRole = await prisma.userRole.create({
                data: {
                    user: { connect: { id: userRoleData.userId } },
                    role: { connect: { id: userRoleData.roleId } },
                },
            });
            return userRole;
        } catch (error) {
            throw getRepositoryError(error, "Adding role to user failed");
        }
    }

    async getRolesByUserId(userId: string): Promise<Role[]> {
        try {
            const userRoles = await prisma.userRole.findMany({
                where: { userId },
                include: { role: true }
            });

            return userRoles.map(userRole => userRole.role);
        } catch (error) {
            throw getRepositoryError(error, "Failed to get roles of user");
        }
    }

    async getUsersByRoleId(roleId: number): Promise<User[]> {
        try {
            const userRoles = await prisma.userRole.findMany({
                where: { roleId },
                include: { user: true },
            });
            return userRoles.map(userRole => userRole.user);
        } catch (error) {
            throw getRepositoryError(error, "Failed to get users for the given role");
        }
    }

    deleteUserRole(userId: string, roleId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async userRoleExists(userId: string, roleId: number): Promise<boolean> {
        try {
            const userRole = await prisma.userRole.findUnique({
                where: {
                    userId_roleId: {
                        userId: userId,
                        roleId: roleId,
                    }
                },
                include: { user: true },
            });

            return userRole != null ? true : false;

        } catch (error) {
            throw getRepositoryError(error, "Failed to check role exists for user");
        }
    }

    getAllUserRoles(userId: string): Promise<UserRole[]> {
        throw new Error("Method not implemented.");
    }

    getAllUserRolesByRoleId(roleId: number): Promise<UserRole[]> {
        throw new Error("Method not implemented.");
    }

    removeAllRolesFromUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    updateUserRole(userId: string, oldRoleId: number, newRoleId: number): Promise<UserRole | null> {
        throw new Error("Method not implemented.");
    }

    async isAdmin(userId: string): Promise<boolean> {
        try {
            const userRoles = await prisma.userRole.findMany({
                where: { userId: userId },
                include: { role: true },
            });

            return userRoles.some(userRole => userRole.role.name === 'Admin');

        } catch (error) {
            throw getRepositoryError(error, "Failed to get users for the given role");
        }
    }
}