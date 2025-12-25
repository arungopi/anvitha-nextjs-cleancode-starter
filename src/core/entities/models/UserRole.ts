/**
 * File: UserRole.ts
 * Description: Use roles
 * Author: Arun Gopi
 * Date: 2025-12-21
 */

import { Role } from "./Role";
import {User} from "./User";

export interface UserRole{
    userId: string,
    roleId: number,
    user?: User, 
    role?: Role,
}