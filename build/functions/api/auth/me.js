/**
 * GET /api/auth/me
 * Returns current authenticated user info
 */

import { createSessionToken } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { data, request, env } = context;

    // Get user from middleware if it worked
    const user = data?.user;

    // Debugging logic
    const cookieHeader = request.headers.get('Cookie') || '';
    const cookies = parseCookies(cookieHeader);
    const sessionToken = cookies['lba_session'];

    let verificationDebug = {
        status: 'skipped',
        reason: 'User already authenticated'
    };

    // If not authenticated but token exists, try to debug why verifySession failed
    if (!user && sessionToken) {
        verificationDebug = await debugSessionVerification(sessionToken, env.SESSION_SECRET);
    } else if (!sessionToken) {
        verificationDebug = { status: 'failed', reason: 'No session token found in cookies' };
    }

    return new Response(JSON.stringify({
        authenticated: !!user,
        user: user || null,
        debug: {
            middlewareUserFound: !!user,
            hasSessionSecret: !!env.SESSION_SECRET,
            tokenPreview: sessionToken ? sessionToken.substring(0, 20) + '...' : 'none',
            verification: verificationDebug
        }
    }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
    });
}

function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        if (name) cookies[name.trim()] = rest.join('=').trim();
    });
    return cookies;
}

async function debugSessionVerification(token, secret) {
    try {
        if (!token.includes('.')) {
            return { status: 'error', message: 'Token has no dot separator' };
        }

        const [payloadB64, signatureB64] = token.split('.');

        // Check payload decoding
        let data; // Define data variable
        try {
            data = JSON.parse(atob(payloadB64)); // keys for user data
        } catch (e) {
            return { status: 'error', message: 'Payload decode failed', error: e.message };
        }

        // Check expiration
        const now = Date.now() / 1000;
        if (data.exp && data.exp < now) {
            return { status: 'failed', message: 'Token expired', exp: data.exp, now };
        }

        // Check signature
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw', encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false, ['verify']
        );

        const expectedSig = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
        const expectedSigB64 = btoa(String.fromCharCode(...new Uint8Array(expectedSig)));

        if (signatureB64 !== expectedSigB64) {
            return {
                status: 'failed',
                message: 'Signature mismatch',
                received: signatureB64,
                calculated: expectedSigB64,
                secretLength: secret.length
            };
        }

        return { status: 'success', message: 'Manual verification succeeded (Middleware might have failed silently)', user: data.user };

    } catch (e) {
        return { status: 'error', message: 'Verification exception', error: e.message, stack: e.stack };
    }
}
