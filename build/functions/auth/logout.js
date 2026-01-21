import { clearSessionCookie } from '../_middleware.js';

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    return new Response(null, {
        status: 302,
        headers: {
            'Location': url.origin,
            'Set-Cookie': clearSessionCookie(),
        },
    });
}
