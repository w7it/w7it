function handler(): Response {
    return new Response("Hello, World!");
}

Deno.serve({ port: 3000 }, handler);
