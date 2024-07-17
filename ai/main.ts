function handler(): Response {
    return new Response("Hello, Beautiful World!");
}

Deno.serve({ port: 3000 }, handler);
