export async function requestServer(endpoint, reqBody, method='POST') {
    const result = await fetch(endpoint, {
        method,
        body: JSON.stringify(reqBody),
        headers: { 'Content-Type': 'application/json' }
    });
    const body = await result.json()
    return body.data;
}