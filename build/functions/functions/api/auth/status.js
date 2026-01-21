/**
 * GET /api/auth/status
 * Simple endpoint to check if user is authenticated
 */

export async function onRequestGet(context) {
    const { data } = context;
    const user = data?.user;

    return new Response(JSON.stringify({
        authenticated: !!user,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
