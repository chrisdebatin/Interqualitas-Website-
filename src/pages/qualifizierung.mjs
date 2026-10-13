import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, callButton, courseCard, sectionHead, ctaBand } from '../components.mjs';
import { courses, BUNDESLAENDER, FACHRICHTUNGEN, ARTEN, TYPEN } from '../data/courses.mjs';
import { site } from '../site.mjs';

function select(name, label, options) {
  return html`<div class="field field--select">
    <label for="filter-${name}">${label}</label>
    <select id="filter-${name}" name="${name}" data-filter="${name}">
      <option value="">Alle</option>
      ${options.map((o) => html`<option value="${o}">${o}</option>`)}
    </select>
    ${icon('chevronDown', { size: 16, className: 'field__chevron' })}
  </div>`;
}

export function courseCatalog({ headingId = 'kurse', title = 'Unser Kursangebot', lead } = {}) {
  return html`<section class="section" aria-labelledby="${headingId}">
  <div class="container">
    ${sectionHead({ title, id: headingId, lead })}
    <form class="filters" data-course-filter role="search" aria-label="Kurse filtern">
      <div class="field field--search">
        <label for="filter-q">Suche</label>
        ${icon('search', { size: 18, className: 'field__icon' })}
        <input id="filter-q" type="search" name="q" placeholder="z. B. Wunde, Hygiene, PDL" autocomplete="off" data-filter="q">
      </div>
      ${select('bundesland', 'Bundesland', BUNDESLAENDER)}
      ${select('fachrichtung', 'Fachrichtung', FACHRICHTUNGEN)}
      ${select('art', 'Art', ARTEN)}
      ${select('typ', 'Typ', TYPEN)}
      <label class="switch">
        <input type="checkbox" name="azav" value="1" data-filter="azav">
        <span class="switch__track" aria-hidden="true"></span>
        <span>Nur geförderte Weiterbildungen (AZAV)</span>
      </label>
      <button class="btn btn--ghost btn--sm" type="reset" data-filter-reset>Filter zurücksetzen</button>
    </form>
    <p class="filters__count" aria-live="polite" data-filter-count>${courses.length} Kurse</p>
    <div class="course-grid" data-course-list>
      ${courses.map((c) => courseCard(c))}
    </div>
    <div class="empty-state" data-filter-empty hidden>
      <p><strong>Keine passenden Kurse gefunden.</strong></p>
      <p>Passen Sie die Filter an oder sprechen Sie uns an – wir finden gemeinsam die passende Lösung.</p>
      ${button({ label: 'Kontaktieren Sie uns', url: '/kontakt/', variant: 'secondary' })}
    </div>
  </div>
</section>`;
}

export default {
  path: '/qualifizierung/',
  title: 'Qualifizierungen',
  description:
    'Weiter- und Fortbildungen in der Pflege: PDL, Praxisanleitung, Wundtherapie, Palliative Care, Hygiene u. v. m. – sechs davon AZAV-zugelassen und förderfähig.',
  render() {
    return html`
${hero({
  title: 'Qualifizierung',
  crumbs: [{ label: 'Leistungen', href: '/leistungen/' }, { label: 'Qualifizierung' }],
  lead: html`<p>Unser <strong>innovatives und zugängliches Kursangebot</strong> ermöglicht Ihnen Ihren <strong>nächsten Karriereschritt</strong>. Dabei sind uns zielführende Seminare und gemeinsames Lernen, das Spaß macht, besonders wichtig. Denn so geht es am besten.</p>`,
  actions: html`${button({ label: 'Zum Kursangebot', url: '#kurse', iconName: 'arrowRight', iconAfter: true })}${callButton('secondary')}`,
  illu: 'mann-refresher-praxisanleitung',
  chips: ['azav', 'funding'],
})}

<section class="section section--tint panel">
  <div class="container">
    <div class="split">
      <div class="info-panel info-panel--azav">
        <img src="/assets/img/brand/certqua-azav-massnahme.png" width="320" height="319" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassene Maßnahme nach AZAV" loading="lazy">
        <div>
          <h2 class="info-panel__title">Geförderte Weiterbildungen nach AZAV</h2>
          <p>Pflegedienstleitung — Weiterbildung für leitende Funktionen gem. § 71 SGB XI, Praxisanleitung in der Pflege, Behandlungspflege (LG1/LG2 nach § 132a SGB V), Wundtherapeut:in, Palliative Care — Basiscurriculum und Verantwortliche Fachkraft für außerklinische Intensivpflege sind durch CERTQUA mit individuellem Eintritt zugelassen und über Bildungsgutschein (§ 81 SGB III) oder für Beschäftigte über § 82 SGB III förderfähig.</p>
          <p>Sie erkennen diese Weiterbildungen am Hinweis <span class="tag tag--azav">${icon('shieldCheck', { size: 14 })}AZAV · förderfähig</span> und am CERTQUA-Siegel auf der Kursseite.</p>
        </div>
      </div>
      <div class="info-panel">
        <span class="feature-card__icon">${icon('euro', { size: 24 })}</span>
        <div>
          <h2 class="info-panel__title">Unsere Preise</h2>
          <p>Für unsere AZAV-zugelassenen Weiterbildungen gelten feste Kursgebühren – Sie finden sie auf der jeweiligen Kursseite. Für alle weiteren Qualifizierungen erstellen wir Ihnen gerne ein persönliches Angebot.</p>
          <p>Kontaktieren Sie uns telefonisch unter <a href="${site.phone.href}">${site.phone.display}</a> oder über unser <a href="/kontakt/">Kontaktformular</a>. Wir beraten Sie unverbindlich und finden gemeinsam die passende Lösung.</p>
        </div>
      </div>
    </div>
  </div>
</section>

${courseCatalog()}

${ctaBand({ text: 'Sprechen Sie uns an – wir beraten Sie zu Kursstart, Förderung und Anmeldung.' })}
`;
  },
};
