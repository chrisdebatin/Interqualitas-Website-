// Prüft alle internen Links und Anker in ./dist auf Erreichbarkeit.
//   node scripts/check-links.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

function pageUrl(file) {
  const rel = '/' + relative(dist, file).split('\\').join('/');
  return rel.endsWith('index.html') ? rel.slice(0, -'index.html'.length) : rel;
}

const ids = new Map();
const pages = [...htmlFiles(dist)];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  ids.set(pageUrl(file), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const problems = [];
for (const file of pages) {
  const from = pageUrl(file);
  const html = readFileSync(file, 'utf8');
  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [rawPath, hash] = value.split('#');
    const path = decodeURIComponent((rawPath || from).split('?')[0]);
    const target = join(dist, path);
    const exists = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!exists) {
      problems.push(`${from}: ${attr}="${value}" → Ziel fehlt`);
      continue;
    }
    if (hash && ids.has(path) && !ids.get(path).has(hash)) {
      problems.push(`${from}: ${attr}="${value}" → Anker #${hash} fehlt`);
    }
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} Problem(e):\n` + [...new Set(problems)].join('\n'));
  process.exit(1);
}
console.log(`✓ ${pages.length} Seiten geprüft – alle internen Links und Anker sind gültig`);
