import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, sectionHead, checklistBlock, ctaBand, bento } from '../components.mjs';
import { services } from '../data/content.mjs';

const tiers = [
  { name: 'Starter', size: '1 – 25 Mitarbeitende', year: '3.600 €', month: '≈ 300 € pro Monat' },
  { name: 'Standard', size: '26 – 75 Mitarbeitende', year: '7.500 €', month: '≈ 625 € pro Monat' },
  { name: 'Enterprise', size: 'ab 76 Mitarbeitende', year: '14.000 €', month: '≈ 1.167 € pro Monat' },
];

const aboItems = [
  'Brandschutz, Datenschutz und MDK-relevante Unterweisungen',
  'Jährliche Refresher in Praxisanleitung, Wundversorgung, Hygiene und Leitung',
  '§ 45-Kurse',
  'Qualitätsmanagementbeauftragte/r (QMB)',
  'Hygienebeauftragte/r',
  'Betreuungskraft nach § 53c SGB XI',
  'Onboarding neuer Mitarbeitender',
];

export default {
  path: '/leistungen/',
  title: 'Leistungen',
  description:
    'Ausbildung, Qualifizierung, Praxisanleitung, Pflegekurse für Angehörige, KI-Tutor und Mediathek – alle Bildungsangebote von interQualitas im Überblick, inklusive Fortbildungs-Abo für Ihr Team.',
  render() {
    return html`
${hero({
  title: 'Unsere Leistungen',
  crumbs: [{ label: 'Leistungen' }],
  lead: html`<p>Ob Ausbildung, Qualifizierung oder Pflegekurs – bei Interqualitas finden Sie ein breites Spektrum an Bildungsangeboten für die Pflege. Unser Ziel ist es, Ihnen praxisnahe und flexible Lernformate zu bieten, die sich an Ihrem Berufsalltag orientieren. Alle unsere Angebote werden von erfahrenen Trainer:innen aus der Pflegepraxis durchgeführt.</p>
  <p>Je nach Angebot finden unsere Kurse in Präsenz in Düsseldorf, online oder als Kombination aus beidem statt. Sechs unserer Weiterbildungen sind nach AZAV zugelassen und können mit einem Bildungsgutschein der Agentur für Arbeit oder des Jobcenters bis zu 100 % gefördert werden. Entdecken Sie unser Angebot und finden Sie die passende Weiterbildung für Ihren nächsten Karriereschritt.</p>`,
  actions: html`${button({ label: 'Zu den Preisen', url: '#preise', iconName: 'arrowRight', iconAfter: true })}${button({ label: 'Alle Kurse', url: '/qualifizierung/', variant: 'secondary' })}`,
  illu: 'praxisanleiter',
})}

<section class="section">
  <div class="container">
    ${sectionHead({ title: 'Unsere Leistungen im Überblick' })}
    ${bento(services, { long: true })}
  </div>
</section>

<section class="section section--beige panel" id="preise">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Preise',
      title: 'Pflichtfortbildungen im Abo – ein Preis, alles drin',
      id: 'abo',
      lead: html`<p>Mit unserem <strong>Fortbildungs-Abo</strong> sind die Pflichtfortbildungen Ihres gesamten Teams zu einem festen Jahrespreis abgedeckt – mit <strong>planbaren Kosten</strong> und lückenlosen Fortbildungsnachweisen für jede Prüfung.</p>`,
    })}
    <div class="abo">
      <div class="abo__includes">
        <h3>Eine Jahres-Flatrate für Ihr gesamtes Team.</h3>
        <p>Das Abo umfasst diese Leistungen:</p>
        ${checklistBlock(aboItems)}
      </div>
      <div class="price-grid">
        ${tiers.map((t) => html`<article class="price-card">
          <h3 class="price-card__name">${t.name}</h3>
          <p class="price-card__size">${icon('users', { size: 16 })}${t.size}</p>
          <p class="price-card__price"><strong>${t.year}</strong> <span>pro Jahr</span></p>
          <p class="price-card__month">${t.month}</p>
          ${button({ label: 'Abo anfragen', url: `/kontakt/?anliegen=${encodeURIComponent(`Fortbildungs-Abo ${t.name}`)}`, variant: 'primary', attrs: `aria-label="Anfragen zum Abo ${t.name}"` })}
        </article>`)}
      </div>
    </div>
    <p class="fine-print">Preise netto, Stand 07/2026. Laufzeit 12 Monate. Die nach AZAV zugelassenen Weiterbildungen sind nicht Teil des Abos und über Bildungsgutschein (§ 81 SGB III) oder für Beschäftigte über § 82 SGB III förderfähig – mehr dazu unter <a href="/qualifizierung/">Qualifizierung</a>.</p>
  </div>
</section>

${ctaBand({ text: 'Welche Stufe passt zu Ihrem Team? Wir beraten Sie kostenfrei.' })}
`;
  },
};
