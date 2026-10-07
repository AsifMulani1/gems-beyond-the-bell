/**
 * Beyond the Bell.
 *
 * Static assets with one piece of behaviour: send /beyond-the-bell to
 * /beyond-the-bell/ before serving. Without the trailing slash the browser
 * resolves "img/pool.jpg" against the zone root, so every image and the data
 * file would 404 into the main site.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/beyond-the-bell") {
      url.pathname = "/beyond-the-bell/";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
