export async function onRequestGet(context) {
    const user = context.data?.user;
    return new Response(JSON.stringify({
        authenticated: !!user,
        user: user || null,
    }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
