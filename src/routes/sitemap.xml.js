export async function get(req, res) {
    res.set('Content-Type', 'application/xml');

    res.send(`<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://bdadam.com/</loc></url>
    </urlset>`);
}
