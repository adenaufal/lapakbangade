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

        // Sync user to backend
        try {
            const apiUrl = env.API_URL || 'https://admin.lapakbangade.com';
            const timestamp = Math.floor(Date.now() / 1000).toString();
            const userData = JSON.stringify(user);

            const encoder = new TextEncoder();
            const key = await crypto.subtle.importKey(
                'raw', encoder.encode(env.SESSION_SECRET),
                { name: 'HMAC', hash: 'SHA-256' },
                false, ['sign']
            );

            const signatureBuffer = await crypto.subtle.sign(
                'HMAC',
                key,
                encoder.encode(timestamp + "." + userData)
            );

            // Convert buffer to hex string
            const signatureArray = Array.from(new Uint8Array(signatureBuffer));
            const signature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // Call backend sync endpoint (fire and forget-ish, but await to ensure it starts)
            await fetch(`${apiUrl}/api/v1/sync/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Timestamp': timestamp,
                    'X-Signature': signature
                },
                body: userData
            });
            console.log("User synced to backend");
        } catch (syncError) {
            console.error("Failed to sync user to backend:", syncError);
            // Non-blocking error, user can still log in
        }

        // Use HTML page with meta refresh to ensure cookies are set properly
        const redirectUrl = `${url.origin}/dashboard`;
        const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <script>window.location.href="${redirectUrl}";</script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

        // Set cookies using Headers.append
        const headers = new Headers();
        headers.set('Content-Type', 'text/html');
        headers.append('Set-Cookie', sessionCookie);
        headers.append('Set-Cookie', clearStateCookie);

        return new Response(html, {
            status: 200,
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
