/**
 * @file IAuthRepository
 * @description  Interface for Auth
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { User } from "@/core/entities/models/User";
import { IUserRepository } from "@/core/ports/IUserRepository";
import prisma from "@/infrastructure/prisma/client";

export class UserRepository implements IUserRepository{
    findUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where:{
              email: email
            }
          });
    }
}