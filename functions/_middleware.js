/**
 * Middleware for handling sessions and CORS.
 * Runs before all function requests.
 */

// Simple cookie-based session using encrypted JWT
const SESSION_COOKIE = 'lba_session';
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export async function onRequest(context) {
    const { request, env, next } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    // Parse session from cookie
    const cookies = parseCookies(request.headers.get('Cookie') || '');
    const sessionToken = cookies[SESSION_COOKIE];

    let user = null;
    if (sessionToken) {
        try {
            user = await verifySession(sessionToken, env.SESSION_SECRET);
        } catch (e) {
            console.error('Session verification failed:', e);
        }
    }

    // Add user to context data
    context.data = context.data || {};
    context.data.user = user;

    // Continue to the actual function
    const response = await next();

    return response;
}

function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        cookies[name.trim()] = rest.join('=').trim();
    });

    return cookies;
}

async function verifySession(token, secret) {
    // Simple base64 decode + verify (in production, use proper JWT)
    try {
        const [payload, signature] = token.split('.');
        const data = JSON.parse(atob(payload));

        // Verify signature
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign', 'verify']
        );

        const expectedSig = await crypto.subtle.sign(
            'HMAC',
            key,
            encoder.encode(payload)
        );

        const expectedSigB64 = btoa(String.fromCharCode(...new Uint8Array(expectedSig)));

        if (signature !== expectedSigB64) {
            return null;
        }

        // Check expiry
        if (data.exp && data.exp < Date.now() / 1000) {
            return null;
        }

        return data.user;
    } catch (e) {
        return null;
    }
}

// Export helper for creating sessions
export async function createSessionToken(user, secret) {
    const payload = {
        user,
        exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    };

    const payloadB64 = btoa(JSON.stringify(payload));

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(payloadB64)
    );

    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));

    return `${payloadB64}.${signatureB64}`;
}

export function createSessionCookie(token) {
    return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

export function clearSessionCookie() {
    return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
