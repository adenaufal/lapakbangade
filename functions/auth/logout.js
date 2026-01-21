/**
 * GET /auth/logout
 * Logs out the user by clearing the session cookie
 */

import { clearSessionCookie } from '../_middleware.js';

export async function onRequestGet(context) {
    const { request } = context;
    const url = new URL(request.url);

    return new Response(null, {
        status: 302,
        headers: {
            'Location': url.origin,
            'Set-Cookie': clearSessionCookie(),
        },
    });
}
