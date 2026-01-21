/**
 * GET /api/auth/me
 * Returns current authenticated user info
 */

export async function onRequestGet(context) {
    const { data } = context;
    const user = data?.user;

    if (user) {
        return new Response(JSON.stringify({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({
        authenticated: false,
        user: null,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
