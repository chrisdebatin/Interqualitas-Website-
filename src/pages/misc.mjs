import { readFileSync } from 'node:fs';
import { html, raw } from '../lib/html.mjs';
import { hero, button, callButton, breadcrumbs } from '../components.mjs';
import { courseCatalog } from './qualifizierung.mjs';
import { site } from '../site.mjs';

export const kurse = {
  path: '/kurse/',
  title: 'Kurse',
  description:
    'Wissen für eine bessere Pflege: das komplette Kursangebot von interQualitas mit Weiterbildungen, Fortbildungen, Refreshern und Einzelmodulen – filterbar nach Bundesland, Fachrichtung und Format.',
  render() {
    return html`
${hero({
  title: 'Wissen für eine bessere Pflege.',
  highlight: 'bessere Pflege',
  crumbs: [{ label: 'Kurse' }],
  lead: html`<p>Unser <strong>innovatives und zugängliches Kursangebot</strong> ermöglicht Ihnen Ihren <strong>nächsten Karriereschritt</strong>. Dabei sind uns zielführende Seminare und gemeinsames Lernen, das Spaß macht, besonders wichtig. Denn so geht es am besten.</p>`,
  actions: html`${button({ label: 'Jetzt anrufen', url: site.phone.href, iconName: 'phone' })}${button({ label: 'Zu unserem Kursangebot', url: '#kurse', variant: 'secondary', iconName: 'arrowRight', iconAfter: true })}`,
  illu: 'schuelerin',
})}
${courseCatalog({
  title: 'Unsere Kurse:',
  lead: html`<p>Erwerben Sie <strong>zusätzliche Qualifikationen</strong> mit unseren umfangreichen Kursen.</p>`,
})}
`;
  },
};

function legalPage({ path, title, heading = title, description, content }) {
  return {
    path,
    title,
    description,
    render() {
      return html`
<section class="hero hero--compact panel">
  <div class="container container--narrow">
    ${breadcrumbs([{ label: title }])}
    <h1 class="hero__title">${heading}</h1>
  </div>
</section>
<section class="section section--tight">
  <div class="container container--narrow prose">${content}</div>
</section>`;
    },
  };
}

export const impressum = legalPage({
  path: '/impressum/',
  title: 'Impressum',
  description: 'Impressum der interQualitas GmbH, Kruppstraße 108, 40227 Düsseldorf.',
  content: html`<dl class="legal-list">
    <div><dt>Name</dt><dd>interQualitas GmbH</dd></div>
    <div><dt>Adresse</dt><dd>Kruppstraße 108, 40227 Düsseldorf</dd></div>
    <div><dt>E-Mail-Adresse</dt><dd><a href="mailto:info@interqualitas.de">info@interqualitas.de</a></dd></div>
    <div><dt>Telefon</dt><dd><a href="tel:+4921154262301">0211 54262301</a></dd></div>
    <div><dt>Verantwortlich für den Inhalt</dt><dd>Alexander Höfken</dd></div>
    <div><dt>Vertretungsberechtigter</dt><dd>Philipp Langefeld</dd></div>
  </dl>`,
});

export const datenschutz = legalPage({
  path: '/datenschutz/',
  title: 'Datenschutzerklärung',
  heading: 'Datenschutz\u00aderklärung',
  description: 'Datenschutzerklärung der interQualitas GmbH: Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.',
  // Wortgleich von der bisherigen Website übernommen (src/content/datenschutz.html).
  content: raw(readFileSync(new URL('../content/datenschutz.html', import.meta.url), 'utf8')),
});

export const notFound = {
  path: '/404.html',
  title: 'Seite nicht gefunden',
  noindex: true,
  render() {
    return html`
${hero({
  title: 'Diese Seite gibt es leider nicht (mehr).',
  lead: html`<p>Vielleicht finden Sie, was Sie suchen, in unserem Kursangebot – oder Sie sprechen uns direkt an.</p>`,
  actions: html`${button({ label: 'Zum Kursangebot', url: '/qualifizierung/', iconName: 'arrowRight', iconAfter: true })}${button({ label: 'Zur Startseite', url: '/', variant: 'secondary' })}${callButton('ghost')}`,
  illu: 'mann-kontakt',
})}`;
  },
};
