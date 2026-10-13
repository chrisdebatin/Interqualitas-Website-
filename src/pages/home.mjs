import { html, href } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, callButton, contactButton, sectionHead, illustration, testimonialGrid, ctaBand, bento, statsBand } from '../components.mjs';
import { courses, courseBySlug, coursePath } from '../data/courses.mjs';
import { services } from '../data/content.mjs';
import { site } from '../site.mjs';

const featured = [
  { slug: 'pflichtfortbildung-praxisanleitung', title: 'Refresher Praxis­anleitung', illu: 'mann-refresher-praxisanleitung', art: 'Online' },
  { slug: 'wundtherapeut', title: 'Wund­thera­peut:in', illu: 'frau-kurs-wundexpertin' },
  { slug: 'behandlungspflege-lg1lg2', title: 'Behandlungs­pflege (LG1/LG2 nach § 132a SGB V)', illu: 'frau-behandlungspflege' },
];

const azavCount = courses.filter((c) => c.azav).length;

export default {
  path: '/',
  title: 'Home',
  description:
    'Wir bereiten Sie auf Ihren nächsten Karriereschritt in der Pflege vor: praxisorientierte Weiterbildungen in Düsseldorf, online oder hybrid – AZAV-zugelassen und bis zu 100 % förderfähig.',
  render() {
    return html`
${hero({
  title: 'Wir bereiten Sie auf Ihren nächsten Karriereschritt in der Pflege vor.',
  highlight: 'Karriereschritt',
  checklist: ['Bessere Pflege durch digitale Chancen', 'Bessere Pflege durch Spaß am Job', 'Ein innovatives & zugängliches Kursangebot'],
  actions: html`${button({ label: 'Zu unserem Kursangebot', url: '/qualifizierung/', iconName: 'arrowRight', iconAfter: true })}${callButton('secondary')}`,
  illu: 'frau-menu',
  seal: true,
  chips: ['formats', 'funding'],
})}

${statsBand([
  { value: courses.length, label: 'Kurse und Module im Programm' },
  { value: azavCount, label: 'Weiterbildungen nach AZAV zugelassen' },
  { prefix: 'bis zu', value: '100', unit: '%', label: 'Förderung über Bildungsgutschein' },
  { value: 3, label: 'Lernformate: Präsenz, online & hybrid' },
])}

<section class="section">
  <div class="container welcome">
    <div class="welcome__media" data-reveal>
      <div class="welcome__photo">
        <img src="/assets/img/standort-duesseldorf.webp" width="555" height="502" alt="Heller, moderner Büroraum mit Pflanzen, Holzboden und Menschen in Gesprächen an einem Besprechungstisch." loading="lazy" decoding="async">
      </div>
      <div class="welcome__badge">
        <img src="/assets/img/brand/certqua-azav-traeger.png" width="600" height="303" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassener Träger nach AZAV" loading="lazy">
        <p>${site.legalName} ist nach AZAV zugelassener Träger – zertifiziert durch die fachkundige Stelle CERTQUA.</p>
      </div>
    </div>
    <div class="welcome__body">
      <p class="eyebrow">Willkommen</p>
      <h2 class="section-title">Willkommen bei Interqualitas.</h2>
      <p class="welcome__lead">Hier bieten wir Ihnen <strong>praxisorientierte Weiterbildungsmöglichkeiten</strong>, die Ihre Karriere im Pflegebereich gezielt voranbringen.</p>
      <p>Mit Seminaren rund um eine qualitativ hochwertige Pflege und gut ausgebildeten Trainer:innen aus der Praxis finden Sie bei uns die passende Lösung für Ihren Qualifizierungsbedarf – ob als Präsenzveranstaltung in Düsseldorf, als Online-Seminar oder in hybrider Form.</p>
      <p>Sechs unserer Weiterbildungen sind nach AZAV zugelassen und können mit einem Bildungsgutschein der Agentur für Arbeit oder des Jobcenters bis zu 100 % gefördert werden.</p>
      <div class="callout">
        <span class="callout__icon">${icon('message', { size: 22 })}</span>
        <p class="callout__text">Sprechen Sie uns an – wir beraten Sie zu Kursstart, Förderung und Anmeldung.</p>
        ${contactButton()}
      </div>
    </div>
  </div>
</section>

<section class="section section--navy panel">
  <div class="container">
    <header class="section-head section-head--split">
      <div>
        <p class="eyebrow">Kursangebot</p>
        <h2 class="section-title">Ausgewählte Weiterbildungen</h2>
      </div>
      ${button({ label: 'Unsere weiteren Kurse entdecken', url: '/qualifizierung/', variant: 'light', iconName: 'arrowRight', iconAfter: true })}
    </header>
    <div class="featured-grid">
      ${featured.map((f, i) => {
        const c = courseBySlug(f.slug);
        return html`<article class="featured-card" data-reveal>
          <div class="featured-card__stage featured-card__stage--${i + 1}" aria-hidden="true">
            <span class="featured-card__sun"></span>
            ${illustration(f.illu)}
          </div>
          <div class="featured-card__body">
            ${c.azav ? html`<span class="tag tag--azav">${icon('shieldCheck', { size: 14 })}AZAV · förderfähig</span>` : html`<span class="tag">${c.typ}</span>`}
            <h3 class="featured-card__title"><a href="${href(coursePath(c))}">${f.title}</a></h3>
            <ul class="featured-card__meta">
              <li>${icon('laptop', { size: 16 })}${f.art || c.art}</li>
              <li>${icon('clock', { size: 16 })}${c.ue} Unterrichtseinheiten</li>
            </ul>
            <span class="featured-card__more" aria-hidden="true">Kursdetails erfahren${icon('arrowRight', { size: 16 })}</span>
          </div>
        </article>`;
      })}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Leistungen', title: 'Unser Bildungsangebot für die Pflege', lead: 'Ob Ausbildung, Qualifizierung oder Pflegekurs – bei Interqualitas finden Sie ein breites Spektrum an Bildungsangeboten für die Pflege.' })}
    ${bento(services, { meta: { '/qualifizierung/': `${courses.length} Kurse · ${azavCount} AZAV-gefördert` } })}
  </div>
</section>

<section class="section section--beige panel">
  <div class="container">
    ${sectionHead({ eyebrow: 'Stimmen', title: 'Unsere Alumni sprechen für sich:', lead: 'Vielen Dank an alle unsere tollen Teilnehmer:innen. Sie treiben uns an.' })}
    ${testimonialGrid()}
  </div>
</section>

${ctaBand({ text: 'Haben Sie Fragen zu unserem Angebot? Dann melden Sie sich jederzeit bei uns:' })}
`;
  },
};
