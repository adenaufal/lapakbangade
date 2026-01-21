/**
 * GET /api/debug/checkcookie
 * Test endpoint to check if cookies are being sent
 */

export async function onRequestGet(context) {
    const { request } = context;

    const cookieHeader = request.headers.get('Cookie') || 'No cookies';

    return new Response(JSON.stringify({
        receivedCookies: cookieHeader,
        hasTestSession: cookieHeader.includes('test_session'),
        hasLbaSession: cookieHeader.includes('lba_session'),
    }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
    });
}
