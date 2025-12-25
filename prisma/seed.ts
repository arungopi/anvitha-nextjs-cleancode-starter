/**
 * @file seed.ts
 * @description  Seed script for database initialization
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-24
 * @module Database
 * @remarks
 * @see
 * 
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Check if roles already exist to avoid duplicates
    const existingRoles = await prisma.role.findMany();
    if (existingRoles.length === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: 'Admin',
                    description: 'Administrator with full access',
                },
                {
                    name: 'User',
                    description: 'Regular user',
                },
                
            ],
        });
        console.log('Initial data has been added.');
    } else {
        console.log('Roles already exist, skipping seed.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
