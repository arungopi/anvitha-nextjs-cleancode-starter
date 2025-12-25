/**
 * @file UserRepository
 * @description  User repository
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-010-26
 * @module 
 * @remarks 
 * @see
 * 
 */

import { sha256 } from "js-sha256";
import { User } from "@/core/entities/models/User";
import { IUserRepository } from "@/core/ports/IUserRepository";
import { prisma, Prisma } from "@/infrastructure/prisma/client";
import { hashPassword } from "@/infrastructure/utils/password";
import { DatabaseError } from "../errors/DatabaseError";
import { ErrorBuilder } from "@/core/errors/ErrorBuilder";
import { GenericError } from "@/core/errors/GenericError";

export class UserRepository implements IUserRepository {

  async createUser(email: string, password: string): Promise<User | null> {
    const pwHash = await hashPassword(sha256(password));
    try {
      const user = await prisma.user.create({
        data: {
          email: email,
          password: pwHash
        }
      });

      return user;
    } catch (error) {

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorBuilder(DatabaseError).setStatusCode(500)
          .setMessage('Validation Error:' + error.message)
          .build();
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ErrorBuilder(DatabaseError).setStatusCode(500)
            .setMessage('There is a unique constraint violation, a new User cannot be created with this email')
            .build();
        } else {
          throw new ErrorBuilder(DatabaseError).setStatusCode(500)
            .setMessage('An unknown error occured when interacting with database')
            .build();
        }
      } else {
        throw new ErrorBuilder(GenericError).setStatusCode(500).setMessage("User Creation failed").build();
      }
    }
    return null;
  }

  findUserById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }
}