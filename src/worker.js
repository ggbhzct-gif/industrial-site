const OLD_PATH_REDIRECTS = new Map([
  ["/fei-jiu-dian-lan-hui-shou", "/cable-recycling/"],
  ["/fei-jiu-dian-lan-hui-shou/", "/cable-recycling/"],
  ["/er-shou-bian-ya-qi-hui-shou", "/transformer-recycling/"],
  ["/er-shou-bian-ya-qi-hui-shou/", "/transformer-recycling/"],
  ["/gong-chang-she-bei-chu-li", "/factory-demolition/"],
  ["/gong-chang-she-bei-chu-li/", "/factory-demolition/"],
]);

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function withSiteHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  const type = headers.get("Content-Type") || "";
  if (type.includes("text/html")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  } else if (/\.(?:js|css)$/i.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (/\.(?:png|jpe?g|webp|svg|ico)$/i.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=2592000, stale-while-revalidate=86400");
  } else if (/\/(?:robots\.txt|sitemap\.xml)$/i.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=3600");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const redirectTo = OLD_PATH_REDIRECTS.get(url.pathname);

    if (redirectTo) {
      return Response.redirect(new URL(redirectTo, url.origin).toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    return withSiteHeaders(response, url.pathname);
  },
};
