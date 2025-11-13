/**
 * File: prisma.ts
 * Description: To improve performance using Prisma ORM, we can set up the Prisma instance to ensure only one instance
 *              is created throughout the project and then import it from any file as needed. This approach avoids recreating
 *              instances of PrismaClient every time it is used. Finally, we can import the Prisma instance from the auth.ts
 *              file configuration.
 * Author: Arun Gopi
 * Date: 2025-04-17
 */

import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma