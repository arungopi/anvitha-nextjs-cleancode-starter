/**
 * @file route.ts
 * @description  Backend for Frontend or API route that is forwarded to external service
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-18
 * @module Route
 * @remarks
 * @see https://nextjs.org/blog/building-apis-with-nextjs
 * @see https://nextjs.org/docs/app/building-your-application/deploying
 * 
 */

import { NextRequest } from 'next/server';

/**
 * Sample Code
 * @param request 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    // Fetching the result from external API and returning to the caller through Next.js
    const response = await fetch('https:example.com/api/data', {
        headers: { Authorization: `Bearer ${process.env.EXTERNAL_API_TOKEN}` }
    });

    const data = await response.json();
    const transformed = { ...data, source: 'proxied through external API', timestamp: new Date().toISOString() }
    return Response.json(transformed, { 
        status: 200, 
        headers: { 
            'Cache-Control': 'no-store' // Example custom header
        } 
    });
}
