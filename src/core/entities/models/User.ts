/**
 * File: User.ts
 * Description: Entiry
 * Author: Arun Gopi
 * Date: 2025-10-26
 */

export interface User{
    name: string | null;
    id: string;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

