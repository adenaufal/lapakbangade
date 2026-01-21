export async function onRequestGet(context) {
    const { env } = context;
    const sessionUser = context.data?.user;

    if (!sessionUser) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Prepare body
    const bodyObj = {
        id: sessionUser.id,
        email: sessionUser.email
    };
    const body = JSON.stringify(bodyObj);

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const secret = env.SESSION_SECRET;
    const apiUrl = env.API_URL || 'https://admin.lapakbangade.com';

    try {
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            enc.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );
        const signature = await crypto.subtle.sign(
            "HMAC",
            key,
            enc.encode(timestamp + "." + body)
        );
        const signatureHex = [...new Uint8Array(signature)]
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        // Proxy to backend
        const resp = await fetch(`${apiUrl}/api/v1/sync/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': signatureHex,
                'X-Timestamp': timestamp
            },
            body: body
        });

        const data = await resp.json();

        return new Response(JSON.stringify(data), {
            status: resp.status,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
