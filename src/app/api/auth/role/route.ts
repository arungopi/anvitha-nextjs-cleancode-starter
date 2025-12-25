/**
 * @file route.ts
 * @description  API route api/auth/role
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-24
 * @module Route
 * @remarks
 * @see
 * 
 */

import { NextRequest, NextResponse } from "next/server";
import { AuthorizationController } from "@/interface-adapters/controllers/AuthorizationController";

export async function GET(request: NextRequest) {

    try {

        const authorizationController = new AuthorizationController();
        const roles = await authorizationController.getAllRoles();

        return NextResponse.json(
            {
                "status": "success",
                "data": roles,
                "message": "Dataset retrieved successfully",
                "errors": null
            }
            , { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            "status": "error",
            "data": null,
            "message": "Roles fetch failed",
            "errors":
            {
                "code": error.code,
                "message": error.message,
            }

        }, { status: 500 });

    }

}