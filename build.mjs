// Erzeugt die statische Website in ./dist.
//   node build.mjs
import { rmSync, mkdirSync, writeFileSync, cpSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { layout } from './src/layout.mjs';
import { href } from './src/lib/html.mjs';
import { site } from './src/site.mjs';
import { courses } from './src/data/courses.mjs';
import { coursePage } from './src/pages/course.mjs';
import home from './src/pages/home.mjs';
import leistungen from './src/pages/leistungen.mjs';
import qualifizierung from './src/pages/qualifizierung.mjs';
import ueberUns from './src/pages/ueber-uns.mjs';
import karriere from './src/pages/karriere.mjs';
import kontakt from './src/pages/kontakt.mjs';
import { ausbildungen, praxisanleitung, pflegekurse, kiTutor, mediathek, aktuelles } from './src/pages/topics.mjs';
import { kurse, impressum, datenschutz, notFound } from './src/pages/misc.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

export function build() {
  const started = Date.now();
  const pages = [
    home,
    leistungen,
    ausbildungen,
    qualifizierung,
    ...courses.map(coursePage),
    praxisanleitung,
    pflegekurse,
    kiTutor,
    mediathek,
    ueberUns,
    karriere,
    aktuelles,
    kontakt,
    kurse,
    impressum,
    datenschutz,
    notFound,
  ];

  // In einen temporären Ordner bauen und erst am Ende austauschen: So sieht der
  // Vorschau-Server nie einen halb fertigen Stand, und parallele Builds stören sich nicht.
  const out = join(root, `.dist-tmp-${process.pid}-${Date.now()}`);
  mkdirSync(out, { recursive: true });
  cpSync(join(root, 'public'), out, { recursive: true });

  for (const page of pages) {
    const document = layout({
      path: page.path,
      title: page.title,
      description: page.description,
      structuredData: page.structuredData,
      noindex: page.noindex,
      body: page.render(),
    });
    const file = page.path.endsWith('.html') ? join(out, page.path) : join(out, page.path, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, document);
  }

  const indexable = pages.filter((p) => !p.noindex);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.url}${href(p.path)}</loc></url>`).join('\n')}
</urlset>
`;
  writeFileSync(join(out, 'sitemap.xml'), sitemap);
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

  rmSync(dist, { recursive: true, force: true });
  try {
    renameSync(out, dist);
  } catch {
    rmSync(dist, { recursive: true, force: true });
    renameSync(out, dist);
  }

  console.log(`✓ ${pages.length} Seiten in ${Date.now() - started} ms nach dist/ gebaut`);
  return pages;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();
