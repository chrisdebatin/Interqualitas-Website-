import { html, raw, href } from './lib/html.mjs';
import { site } from './site.mjs';
import { header, footer } from './components.mjs';

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/brand/logo.svg`,
    email: site.email,
    telephone: site.phone.href.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
  };
}

function jsonLd(data) {
  // `<` escapen, damit Inhalte das <script>-Tag nicht beenden können.
  return raw(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
}

export function layout({ path, title, description, body, structuredData = [], noindex = false, bodyClass = '' }) {
  const fullTitle = path === '/' ? `${site.name} – Weiterbildung in der Pflege | Düsseldorf` : `${title} – ${site.name}`;
  const desc = description || site.defaultDescription;
  const canonical = `${site.url}${href(path)}`;
  const ld = [organizationLd(), ...structuredData];

  return `<!doctype html>
${html`<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
${noindex ? raw('<meta name="robots" content="noindex">') : html`<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#204051">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/main.css">
<script src="/assets/js/main.js" defer></script>
${ld.map(jsonLd)}
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>`}
`;
}
