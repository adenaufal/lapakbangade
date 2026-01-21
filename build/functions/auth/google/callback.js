import { createSessionToken, createSessionCookie } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error || !code) {
        return Response.redirect(`${url.origin}/?error=auth_failed`, 302);
    }

    const cookies = parseCookies(request.headers.get('Cookie') || '');
    if (!cookies['oauth_state'] || cookies['oauth_state'] !== state) {
        return Response.redirect(`${url.origin}/?error=invalid_state`, 302);
    }

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: env.GOOGLE_CLIENT_ID,
                client_secret: env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${url.origin}/auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            return Response.redirect(`${url.origin}/?error=token_failed`, 302);
        }

        const tokens = await tokenResponse.json();
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { 'Authorization': `Bearer ${tokens.access_token}` },
        });

        if (!userInfoResponse.ok) {
            return Response.redirect(`${url.origin}/?error=userinfo_failed`, 302);
        }

        const userInfo = await userInfoResponse.json();
        const user = {
            id: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
        };

        const sessionToken = await createSessionToken(user, env.SESSION_SECRET);
        const sessionCookie = createSessionCookie(sessionToken);
        const clearStateCookie = 'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';

        // Use Headers object to properly set multiple Set-Cookie headers
        const headers = new Headers();
        headers.set('Location', `${url.origin}/dashboard`);
        headers.append('Set-Cookie', sessionCookie);
        headers.append('Set-Cookie', clearStateCookie);

        return new Response(null, {
            status: 302,
            headers,
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
