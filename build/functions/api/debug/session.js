/**
 * GET /api/debug/session
 * Debug endpoint to test session token creation
 */

import { createSessionToken, createSessionCookie } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { env } = context;

    try {
        // Create test user
        const testUser = {
            id: 'test-123',
            email: 'test@example.com',
            name: 'Test User',
        };

        // Try to create session token
        const token = await createSessionToken(testUser, env.SESSION_SECRET);
        const cookie = createSessionCookie(token);

        return new Response(JSON.stringify({
            success: true,
            tokenLength: token?.length || 0,
            tokenPreview: token?.substring(0, 50) + '...',
            cookieValue: cookie,
        }, null, 2), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
            stack: error.stack,
        }, null, 2), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
