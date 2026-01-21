/**
 * GET /api/debug/env
 * Debug endpoint to check what env vars are available (TEMPORARY)
 */

export async function onRequestGet(context) {
    const { env } = context;

    return new Response(JSON.stringify({
        hasGoogleClientId: !!env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!env.GOOGLE_CLIENT_SECRET,
        hasSessionSecret: !!env.SESSION_SECRET,
        // Don't expose actual values, just check existence
    }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
    });
}
