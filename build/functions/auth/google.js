export async function onRequestGet(context) {
    const { env, request } = context;

    if (!env.GOOGLE_CLIENT_ID) {
        return new Response('OAuth not configured', { status: 500 });
    }

    const url = new URL(request.url);
    const callbackUrl = `${url.origin}/auth/google/callback`;
    const state = crypto.randomUUID();
    const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`;

    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
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
