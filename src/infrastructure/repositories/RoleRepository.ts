/**
 * @file RoleRepository
 * @description  Repository implementation for Role
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { Role } from "@/core/entities/models/Role";
import { UserRole } from "@/core/entities/models/UserRole";
import { IRoleRepository } from "@/core/ports/IRoleRepository";
import { prisma } from "@/infrastructure/prisma/client";
import getRepositoryError from "../errors/RepositoryError";

export class RoleRepository implements IRoleRepository {

    async createRole(data: Omit<Role, "id" | "createdAt" | "updatedAt">): Promise<Role> {
        try {
            const role = await prisma.role.create({
                data: {
                    name: data.name,
                    description: data.description,
                }
            });
            return role;
        } catch (error) {
            throw getRepositoryError(error, "Role creation failed");
        }
    }

    async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return await prisma.role.findUniqueOrThrow({
                where: {
                    id: roleId
                }
            })
        } catch (error) {
            throw getRepositoryError(error, "Failed to get role");
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return await prisma.role.findMany()
        } catch (error) {
            throw getRepositoryError(error, "Failed to get all role");
        }
    }

    updateRole(id: number, data: Partial<Omit<Role, "id" | "createdAt" | "updatedAt">>): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }

    deleteRole(roleId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async roleExists(roleId: number): Promise<boolean> {
        try {
            const role = await prisma.role.findUnique({
                where: {
                    id: roleId
                }
            });
            return role ? true : false;
        } catch (error) {
            throw getRepositoryError(error, "Failed to get all role");
        }
    }

    async isRoleAdmin(roleId: number): Promise<boolean> {
        try {
            const role = await prisma.role.findUniqueOrThrow({
                where: {
                    id: roleId,
                },
            });
            return role?.name === 'Admin' ? true : false;
        } catch (error) {
            throw getRepositoryError(error, "Checking role is admin failed");
        }
    }

    getUsersByRole(roleId: number): Promise<UserRole[]> {
        throw new Error("Method not implemented.");
    }
    addPermissions(roleId: number, permissions: number[]): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    removePermissions(roleId: number, permissions: number[]): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
}