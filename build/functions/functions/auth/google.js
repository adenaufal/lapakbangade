/**
 * GET /auth/google
 * Initiates Google OAuth flow
 */

export async function onRequestGet(context) {
    const { env, request } = context;

    const clientId = env.GOOGLE_CLIENT_ID;
    if (!clientId) {
        return new Response('OAuth not configured', { status: 500 });
    }

    // Build the callback URL
    const url = new URL(request.url);
    const callbackUrl = `${url.origin}/auth/google/callback`;

    // Generate state for CSRF protection
    const state = crypto.randomUUID();

    // Store state in cookie for verification
    const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`;

    // Build Google OAuth URL
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', clientId);
    googleAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('state', state);
    googleAuthUrl.searchParams.set('prompt', 'select_account');

    return new Response(null, {
        status: 302,
        headers: {
            'Location': googleAuthUrl.toString(),
            'Set-Cookie': stateCookie,
        },
    });
}
