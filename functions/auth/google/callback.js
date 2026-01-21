/**
 * GET /auth/google/callback
 * Handles Google OAuth callback
 */

import { createSessionToken, createSessionCookie } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);

    // Get code and state from query params
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Handle OAuth errors
    if (error) {
        console.error('OAuth error:', error);
        return Response.redirect(`${url.origin}/?error=auth_failed`, 302);
    }

    if (!code) {
        return Response.redirect(`${url.origin}/?error=no_code`, 302);
    }

    // Verify state (CSRF protection)
    const cookies = parseCookies(request.headers.get('Cookie') || '');
    const savedState = cookies['oauth_state'];

    if (!savedState || savedState !== state) {
        console.error('State mismatch:', { savedState, state });
        return Response.redirect(`${url.origin}/?error=invalid_state`, 302);
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: env.GOOGLE_CLIENT_ID,
                client_secret: env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${url.origin}/auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('Token exchange failed:', errorText);
            return Response.redirect(`${url.origin}/?error=token_failed`, 302);
        }

        const tokens = await tokenResponse.json();

        // Get user info
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
            },
        });

        if (!userInfoResponse.ok) {
            console.error('Failed to get user info');
            return Response.redirect(`${url.origin}/?error=userinfo_failed`, 302);
        }

        const userInfo = await userInfoResponse.json();

        // Create user object
        const user = {
            id: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
        };

        // Create session token
        const sessionToken = await createSessionToken(user, env.SESSION_SECRET);
        const sessionCookie = createSessionCookie(sessionToken);

        // Clear oauth state cookie and set session cookie
        const clearStateCookie = 'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';

        // Redirect to dashboard or home
        return new Response(null, {
            status: 302,
            headers: {
                'Location': `${url.origin}/dashboard`,
                'Set-Cookie': [sessionCookie, clearStateCookie],
            },
        });

    } catch (error) {
        console.error('OAuth callback error:', error);
        return Response.redirect(`${url.origin}/?error=callback_failed`, 302);
    }
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
