/**
 * GET /api/debug/setcookie
 * Test endpoint that directly sets a cookie
 */

export async function onRequestGet(context) {
    const { env } = context;

    // Simple test cookie
    const testCookie = 'test_session=hello_world_12345; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800';

    const headers = new Headers();
    headers.set('Content-Type', 'text/html');
    headers.append('Set-Cookie', testCookie);

    return new Response(`
<!DOCTYPE html>
<html>
<body>
<h1>Cookie Set Test</h1>
<p>A cookie named "test_session" should have been set.</p>
<p>Check DevTools > Application > Cookies to verify.</p>
<p><a href="/api/debug/checkcookie">Check if cookie was set</a></p>
</body>
</html>
  `, { headers });
}
