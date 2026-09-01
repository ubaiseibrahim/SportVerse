import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.scoreverse.in';

// The exact hyper-local cities and regions we want Google to index
const cities = ['chennai', 'vellore', 'ambur', 'pernambut', 'nagercoil', 'mumbai', 'bengaluru', 'hyderabad'];
const sports = ['cricket', 'football', 'badminton'];
const modifiers = ['indoor', 'outdoor', ''];

let urls = [
  `${DOMAIN}/`,
  `${DOMAIN}/search`,
  `${DOMAIN}/blog`
];

// Generate hundreds of specific SEO routes instantly
cities.forEach(city => {
  sports.forEach(sport => {
    modifiers.forEach(mod => {
      let slug = mod ? `${mod}-${sport}-turfs-in-${city}` : `${sport}-turfs-in-${city}`;
      urls.push(`${DOMAIN}/${slug}`);
    });
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === DOMAIN + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap successfully generated at ${outputPath} with ${urls.length} URLs!`);
