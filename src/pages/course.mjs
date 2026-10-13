import { html, href } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { breadcrumbs, button, callButton, courseCard, ctaBand } from '../components.mjs';
import { courses, coursePath } from '../data/courses.mjs';
import { site } from '../site.mjs';

const SPLIT_LABELS = {
  online: 'Online-Live',
  praesenz: 'Präsenz',
  pruefung: 'Prüfung',
  elearning: 'E-Learning',
};

function splitBar(split, total) {
  const parts = Object.entries(SPLIT_LABELS).map(([key, label]) => ({ key, label, value: split[key] }));
  return html`<figure class="ue-split">
    <figcaption>Aufteilung der ${total} Unterrichtseinheiten</figcaption>
    <div class="ue-split__bar" aria-hidden="true">
      ${parts.map((p) => html`<span class="ue-split__seg ue-split__seg--${p.key}" style="flex-grow:${p.value}"></span>`)}
    </div>
    <ul class="ue-split__legend">
      ${parts.map((p) => html`<li><span class="ue-split__dot ue-split__seg--${p.key}"></span>${p.value} UE ${p.label}</li>`)}
    </ul>
  </figure>`;
}

function umfangText(course) {
  const s = course.costs.split;
  return `${course.ue} UE: ${s.online} UE Online-Live · ${s.praesenz} UE Präsenz · ${s.pruefung} UE Prüfung · ${s.elearning} UE E-Learning`;
}

function courseMode(art) {
  if (art === 'Online') return 'online';
  if (art === 'Präsenz') return 'onsite';
  return 'blended';
}

// Suchmaschinen zeigen ca. 155–160 Zeichen; längere Texte am Wortende kürzen.
function metaDescription(text, max = 158) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:–-]$/, '') + ' …';
}

function related(course) {
  return courses
    .filter((c) => c !== course && c.fachrichtung === course.fachrichtung)
    .slice(0, 3);
}

export function coursePage(course) {
  const path = coursePath(course);
  const inquiry = `/kontakt/?kurs=${encodeURIComponent(course.cardTitle)}`;
  const more = related(course);
  const firstSentence = course.description.split(/(?<=\.)\s/)[0];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      description: course.description,
      url: `${site.url}${href(path)}`,
      inLanguage: 'de',
      provider: { '@id': `${site.url}/#organization` },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: courseMode(course.art),
        location: course.art === 'Online' ? undefined : { '@type': 'Place', name: site.address.city },
      },
      ...(course.azav
        ? {
            offers: {
              '@type': 'Offer',
              category: 'Paid',
              priceCurrency: 'EUR',
              price: course.costs.fee.replace(/[^\d,]/g, '').replace(',', '.'),
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Qualifizierung', item: `${site.url}/qualifizierung/` },
        { '@type': 'ListItem', position: 3, name: course.cardTitle, item: `${site.url}${href(path)}` },
      ],
    },
  ];

  const facts = [
    ['Bundesland', course.bundesland.join(', '), 'mapPin'],
    ['Fachrichtung', course.fachrichtung, 'layers'],
    ['Art', course.art, course.art === 'Präsenz' ? 'building' : 'laptop'],
    ['Typ', course.typ, 'award'],
    ['Umfang', `${course.ue} Unterrichtseinheiten`, 'clock'],
  ];

  const body = html`
<section class="hero hero--compact panel">
  <div class="container">
    ${breadcrumbs([{ label: 'Qualifizierung', href: '/qualifizierung/' }, { label: course.cardTitle }])}
    <div class="course-hero">
      <div>
        <div class="course-hero__tags">
          <span class="tag">${course.typ}</span>
          <span class="tag">${course.fachrichtung}</span>
          ${course.azav ? html`<span class="tag tag--azav">${icon('shieldCheck', { size: 14 })}AZAV · förderfähig</span>` : ''}
        </div>
        <h1 class="hero__title hero__title--course">${course.title}</h1>
        <ul class="course-hero__facts">
          <li>${icon('clock', { size: 18 })}${course.ue} UE</li>
          <li>${icon(course.art === 'Präsenz' ? 'building' : 'laptop', { size: 18 })}${course.art}</li>
          <li>${icon('mapPin', { size: 18 })}${course.bundesland.join(' · ')}</li>
          ${course.azav ? html`<li>${icon('calendar', { size: 18 })}${course.costs.start.split(' – ')[0]}</li>` : ''}
        </ul>
      </div>
      ${course.azav ? html`<img class="course-hero__seal" src="/assets/img/brand/certqua-azav-massnahme.png" width="320" height="319" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassene Maßnahme nach AZAV">` : ''}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container course-layout">
    <div class="course-main">
      <h2>Über die Weiterbildung</h2>
      <p class="course-main__lead">${course.description}</p>

      ${course.azav ? html`
      <h2>Kosten &amp; Leistungen</h2>
      <div class="table-wrap">
        <table class="facts-table">
          <tbody>
            <tr><th scope="row">Kursgebühr</th><td><strong>${course.costs.fee}</strong> je Teilnehmer:in</td></tr>
            <tr><th scope="row">Umfang</th><td>${umfangText(course)}</td></tr>
            <tr><th scope="row">Im Preis enthalten</th><td>${course.costs.included}</td></tr>
            <tr><th scope="row">Zusätzliche Kosten</th><td>${course.costs.extra}</td></tr>
            <tr><th scope="row">Kursstart</th><td>${course.costs.start}</td></tr>
            <tr><th scope="row">KURSNET</th><td>${course.costs.kursnet}</td></tr>
          </tbody>
        </table>
      </div>
      ${splitBar(course.costs.split, course.ue)}
      <div class="azav-note azav-note--inline">
        <img src="/assets/img/brand/certqua-azav-massnahme.png" width="320" height="319" alt="" loading="lazy">
        <p>Zugelassene Maßnahme nach AZAV – zertifiziert durch die fachkundige Stelle CERTQUA. Förderfähig über Bildungsgutschein (§ 81 SGB III) oder für Beschäftigte über § 82 SGB III.</p>
      </div>` : html`
      <div class="note">
        ${icon('euro', { size: 22 })}
        <p>Für diese Qualifizierung erstellen wir Ihnen gerne ein persönliches Angebot. Kontaktieren Sie uns telefonisch unter <a href="${site.phone.href}">${site.phone.display}</a> oder über unser <a href="${href(inquiry)}">Kontaktformular</a>.</p>
      </div>`}
    </div>

    <aside class="course-aside" aria-label="Kursdaten">
      <div class="facts-card">
        <h2 class="facts-card__title">Auf einen Blick</h2>
        <dl class="facts-list">
          ${facts.map(([k, v, ic]) => html`<div><dt>${icon(ic, { size: 16 })}${k}</dt><dd>${v}</dd></div>`)}
          ${course.azav ? html`<div><dt>${icon('euro', { size: 16 })}Kursgebühr</dt><dd>${course.costs.fee}</dd></div>` : ''}
        </dl>
        ${button({ label: 'Beratung & Anmeldung', url: inquiry, iconName: 'send' })}
        ${callButton('secondary')}
      </div>
    </aside>
  </div>
</section>

${more.length ? html`<section class="section section--tint panel">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 class="section-title">Weitere Kurse: ${course.fachrichtung}</h2>
      ${button({ label: 'Alle Kurse', url: '/qualifizierung/', variant: 'ghost', iconName: 'arrowRight', iconAfter: true })}
    </header>
    <div class="course-grid course-grid--compact">${more.map((c) => courseCard(c))}</div>
  </div>
</section>` : ''}

${ctaBand({ text: 'Fragen zu Kursstart, Förderung oder Anmeldung? Wir beraten Sie gerne.' })}
`;

  return {
    path,
    title: course.cardTitle,
    description: metaDescription(firstSentence.length > 40 ? firstSentence : course.description),
    structuredData,
    render: () => body,
  };
}
