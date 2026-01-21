/**
 * GET /api/auth/me
 * Returns current authenticated user info
 */

export async function onRequestGet(context) {
    const { data } = context;
    const user = data?.user;

    return new Response(JSON.stringify({
        authenticated: !!user,
        user: user || null,
    }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
