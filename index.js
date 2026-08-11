export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Routing
    // Forward any requests starting with /api/ to the actual backend server
    if (url.pathname.startsWith('/api/')) {
      const apiUrl = new URL(request.url);
      apiUrl.hostname = 'api.scoreverse.in';
      
      // Forward the request exactly as is, but to the new host
      const apiRequest = new Request(apiUrl.toString(), request);
      return fetch(apiRequest);
    }

    // 2. Static Assets & SPA Routing
    try {
      if (!env.ASSETS) {
        return new Response("env.ASSETS is not bound. Ensure [assets] is configured in wrangler.toml.", { status: 500 });
      }

      // Try fetching the requested path from assets
      let response = await env.ASSETS.fetch(request);

      // 3. SPA Fallback (Manual handling)
      // When a Worker intercepts the request, `not_found_handling` in wrangler.toml is ignored.
      // We must manually serve /index.html for unrecognized routes (like / or /profile).
      if (response.status === 404 || response.status === 403) {
        const indexUrl = new URL(request.url);
        indexUrl.pathname = '/index.html';
        response = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      }

      return response;
    } catch (err) {
      return new Response(`Error serving asset: ${err.message}`, { status: 500 });
    }
  }
};
