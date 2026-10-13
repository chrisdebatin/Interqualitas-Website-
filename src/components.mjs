import { html, href } from './lib/html.mjs';
import { icon } from './lib/icons.mjs';
import { site, nav } from './site.mjs';
import { coursePath } from './data/courses.mjs';
import { testimonials } from './data/content.mjs';

// Seitenverhältnisse der Illustrationen (aus deren viewBox), damit der Browser
// den Platz vor dem Laden reservieren kann.
const ILLUSTRATIONS = {
  'frau-behandlungspflege': [605, 1282],
  'frau-kurs-wundexpertin': [324, 794],
  'frau-menu': [687, 1503],
  'mann-kontakt': [637, 1482],
  'mann-refresher-praxisanleitung': [373, 916],
  praxisanleiter: [580, 1091],
  rakete: [637, 628],
  schuelerin: [505, 620],
};

export function illustration(name, { className = '', eager = false } = {}) {
  const [w, h] = ILLUSTRATIONS[name];
  return html`<img class="${className}" src="/assets/img/illustrations/${name}.svg" width="${w}" height="${h}" alt="" ${eager ? '' : 'loading="lazy"'} decoding="async">`;
}

export function button({ label, url, variant = 'primary', iconName, iconAfter = false, size, attrs = '' }) {
  const cls = ['btn', `btn--${variant}`, size ? `btn--${size}` : ''].filter(Boolean).join(' ');
  const ic = iconName ? icon(iconName, { size: 18 }) : '';
  return html`<a class="${cls}" href="${href(url)}" ${attrs}>${iconAfter ? '' : ic}<span>${label}</span>${iconAfter ? ic : ''}</a>`;
}

export const contactButton = (label = 'Kontaktieren Sie uns', variant = 'primary') =>
  button({ label, url: '/kontakt/', variant, iconName: 'arrowRight', iconAfter: true });

export const callButton = (variant = 'secondary', label = site.phone.display) =>
  button({ label, url: site.phone.href, variant, iconName: 'phone' });

// ---------------------------------------------------------------- Header

function isActive(item, currentPath) {
  if (item.href === '/') return currentPath === '/';
  if (currentPath.startsWith(item.href)) return true;
  if (item.href === '/leistungen/') {
    return (item.children || []).some((c) => !c.href.includes('#') && currentPath.startsWith(c.href));
  }
  return false;
}

export function header(currentPath) {
  const desktopItems = nav.map((item, i) => {
    const active = isActive(item, currentPath);
    const current = item.href === currentPath ? 'aria-current="page"' : '';
    if (!item.children) {
      return html`<li class="nav__item${active ? ' is-active' : ''}"><a class="nav__link" href="${item.href}" ${current}>${item.label}</a></li>`;
    }
    const id = `subnav-${i}`;
    return html`<li class="nav__item has-children${active ? ' is-active' : ''}">
      <a class="nav__link" href="${item.href}" ${current}>${item.label}</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="sr-only">Untermenü ${item.label} öffnen</span>${icon('chevronDown', { size: 16 })}
      </button>
      <ul class="nav__sub" id="${id}">
        ${item.children.map((c) => html`<li><a href="${c.href}">${c.label}</a></li>`)}
      </ul>
    </li>`;
  });

  const mobileItems = nav.map((item) => {
    const active = isActive(item, currentPath);
    if (!item.children) {
      return html`<li><a class="mobile-nav__link${active ? ' is-active' : ''}" href="${item.href}">${item.label}</a></li>`;
    }
    return html`<li>
      <details class="mobile-nav__group" ${active ? 'open' : ''}>
        <summary class="mobile-nav__link${active ? ' is-active' : ''}">${item.label}${icon('chevronDown', { size: 20 })}</summary>
        <ul>
          <li><a href="${item.href}">${item.label} – Übersicht</a></li>
          ${item.children.map((c) => html`<li><a href="${c.href}">${c.label}</a></li>`)}
        </ul>
      </details>
    </li>`;
  });

  return html`<a class="skip-link" href="#main">Zum Inhalt springen</a>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/">
      <img src="/assets/img/brand/logo.svg" width="482" height="87" alt="interQualitas – Gemeinsam. Wissen. Vermittelt. Zur Startseite">
    </a>
    <nav class="nav" aria-label="Hauptnavigation">
      <ul class="nav__list">${desktopItems}</ul>
    </nav>
    <a class="btn btn--primary btn--sm header-cta" href="${site.phone.href}">${icon('phone', { size: 18 })}<span>Jetzt anrufen</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
      <span class="menu-toggle__open">${icon('menu', { size: 26 })}</span>
      <span class="menu-toggle__close">${icon('close', { size: 26 })}</span>
      <span class="sr-only">Menü</span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
    <nav class="container" aria-label="Mobile Navigation">
      <ul class="mobile-nav">${mobileItems}</ul>
      <div class="mobile-menu__contact">
        ${callButton('primary', 'Jetzt anrufen')}
        ${button({ label: 'E-Mail schreiben', url: `mailto:${site.email}`, variant: 'secondary', iconName: 'mail' })}
      </div>
    </nav>
</div>`;
}

// ---------------------------------------------------------------- Footer

export function footer() {
  const a = site.address;
  const year = new Date().getFullYear();
  const leistungen = nav.find((n) => n.label === 'Leistungen').children.filter((c) => !c.href.includes('#'));
  return html`<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <p class="footer-tagline" aria-label="${site.tagline}">Gemeinsam<span>.</span> Wissen<span>.</span> Vermittelt<span>.</span></p>
      <div class="actions">${contactButton('Kontakt aufnehmen', 'primary')}${callButton('outline-light')}</div>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="footer-brand__logo"><img src="/assets/img/brand/logo-white.svg" width="482" height="87" alt="interQualitas – zur Startseite" loading="lazy"></a>
        <p>Nach AZAV zugelassener Bildungsträger für Pflegeberufe mit Sitz in Düsseldorf.</p>
        <img class="footer-brand__seal" src="/assets/img/brand/certqua-azav-traeger.png" width="600" height="303" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassener Träger nach AZAV" loading="lazy">
      </div>
      <div>
        <h2 class="footer-title">Unser Standort in Düsseldorf</h2>
        <address>${site.legalName}<br>${a.street}<br>${a.zip} ${a.city}</address>
        <a class="footer-link-icon" href="${site.mapsUrl}" rel="noopener" target="_blank">${icon('navigation', { size: 16 })}Route planen<span class="sr-only"> (öffnet Google Maps in neuem Tab)</span></a>
      </div>
      <div>
        <h2 class="footer-title">Kontakt</h2>
        <ul class="footer-list">
          <li><a class="footer-link-icon" href="${site.phone.href}">${icon('phone', { size: 16 })}${site.phone.display}</a></li>
          <li><a class="footer-link-icon" href="mailto:${site.email}">${icon('mail', { size: 16 })}${site.email}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">Leistungen</h2>
        <ul class="footer-list">${leistungen.map((c) => html`<li><a href="${c.href}">${c.label}</a></li>`)}</ul>
      </div>
      <div>
        <h2 class="footer-title">interQualitas</h2>
        <ul class="footer-list">
          <li><a href="/ueber-uns/">Über uns</a></li>
          <li><a href="/leistungen/#preise">Preise</a></li>
          <li><a href="/karriere/">Karriere</a></li>
          <li><a href="/aktuelles/">Aktuelles</a></li>
          <li><a href="/kontakt/">Kontakt</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${year} ${site.legalName}</p>
      <ul class="footer-legal">
        <li><a href="/impressum/">Impressum</a></li>
        <li><a href="/datenschutz/">Datenschutzerklärung</a></li>
      </ul>
    </div>
  </div>
</footer>
<div class="contact-bar" aria-label="Schnellkontakt">
  <a href="${site.phone.href}">${icon('phone', { size: 20 })}<span>Anrufen</span></a>
  <a href="mailto:${site.email}">${icon('mail', { size: 20 })}<span>E-Mail</span></a>
  <a href="/qualifizierung/">${icon('award', { size: 20 })}<span>Kurse</span></a>
</div>`;
}

// ---------------------------------------------------------------- Bausteine

export function breadcrumbs(items) {
  return html`<nav class="breadcrumbs" aria-label="Brotkrumen">
    <ol>
      <li><a href="/">Home</a></li>
      ${items.map((item, i) =>
        i === items.length - 1
          ? html`<li><span aria-current="page">${item.label}</span></li>`
          : html`<li><a href="${href(item.href)}">${item.label}</a></li>`,
      )}
    </ol>
  </nav>`;
}

// Hebt ein Wort/eine Wortgruppe im Titel mit einer handgezeichneten Linie hervor.
export function highlightText(text, phrase) {
  if (!phrase || !text.includes(phrase)) return text;
  const [before, after] = text.split(phrase);
  return html`${before}<span class="hl">${phrase}<svg class="hl__line" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" d="M3 10.5C46 4.5 112 2.5 197 6.5"/></svg></span>${after}`;
}

const HERO_CHIPS = {
  azav: html`<div class="float-chip float-chip--a">
    <span class="float-chip__icon">${icon('shieldCheck', { size: 20 })}</span>
    <span><strong>AZAV-zugelassen</strong><span>zertifiziert durch CERTQUA</span></span>
  </div>`,
  formats: html`<div class="float-chip float-chip--a">
    <span class="float-chip__icon">${icon('laptop', { size: 20 })}</span>
    <span><strong>Präsenz, online oder hybrid</strong><span>in Düsseldorf & digital</span></span>
  </div>`,
  funding: html`<div class="float-chip float-chip--b">
    <span class="float-chip__icon float-chip__icon--coral">${icon('euro', { size: 20 })}</span>
    <span><strong>Bis zu 100 % gefördert</strong><span>mit Bildungsgutschein</span></span>
  </div>`,
};

export function hero({ title, highlight, eyebrow, lead, checklist, actions, illu, seal = false, crumbs, extra, chips = [] }) {
  const wide = illu === 'rakete' || illu === 'schuelerin';
  return html`<section class="hero panel">
  <div class="container hero__grid${illu ? '' : ' hero__grid--single'}">
    <div class="hero__content">
      ${crumbs ? breadcrumbs(crumbs) : ''}
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1 class="hero__title">${highlightText(title, highlight)}</h1>
      ${lead ? html`<div class="hero__lead">${lead}</div>` : ''}
      ${checklist ? checklistBlock(checklist) : ''}
      ${extra || ''}
      ${actions ? html`<div class="actions">${actions}</div>` : ''}
      ${seal ? html`<img class="hero__seal" src="/assets/img/brand/certqua-azav-traeger.png" width="600" height="303" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassener Träger nach AZAV">` : ''}
    </div>
    ${illu ? html`<div class="hero__media${wide ? ' hero__media--wide' : ''}" aria-hidden="true">
      <div class="hero__stage"></div>
      <span class="hero__ring"></span>
      <span class="hero__sun"></span>
      ${illustration(illu, { className: 'hero__illu', eager: true })}
      ${chips.map((c) => HERO_CHIPS[c])}
    </div>` : ''}
  </div>
</section>`;
}

export function checklistBlock(items, className = '') {
  return html`<ul class="checklist ${className}">${items.map((t) => html`<li>${icon('check', { size: 16 })}<span>${t}</span></li>`)}</ul>`;
}

export function sectionHead({ eyebrow, title, lead, id, align = 'center', level = 2 }) {
  const tag = `h${level}`;
  return html`<header class="section-head section-head--${align}">
    ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
    ${html([`<${tag} class="section-title"${id ? ` id="${id}"` : ''}>`, `</${tag}>`], title)}
    ${lead ? html`<div class="section-lead">${lead}</div>` : ''}
  </header>`;
}

export function featureCard({ iconName, title, lead, text, url, linkLabel = 'Mehr erfahren', id, index }) {
  return html`<article class="feature-card${url ? ' is-linked' : ''}"${id ? html` id="${id}"` : ''} data-reveal>
    <div class="feature-card__head">
      <span class="feature-card__icon">${icon(iconName, { size: 24 })}</span>
      ${index ? html`<span class="feature-card__index" aria-hidden="true">${String(index).padStart(2, '0')}</span>` : ''}
    </div>
    <h3 class="feature-card__title">${url ? html`<a href="${url}">${title}</a>` : title}</h3>
    ${lead ? html`<p class="feature-card__lead">${lead}</p>` : ''}
    ${text ? html`<p class="feature-card__text">${text}</p>` : ''}
    ${url ? html`<span class="feature-card__more" aria-hidden="true">${linkLabel}${icon('arrowRight', { size: 16 })}</span>` : ''}
  </article>`;
}

// Jede Fachrichtung bekommt ein Icon und einen Farbton aus der CI.
export const FIELDS = {
  Pflege: { icon: 'heart', tone: 'coral' },
  'Intensiv & Palliativ': { icon: 'activity', tone: 'navy' },
  Management: { icon: 'briefcase', tone: 'sand' },
  Hygiene: { icon: 'droplet', tone: 'navy' },
  'Arbeits-/Brand-/Datenschutz & Co.': { icon: 'lock', tone: 'sand' },
};

export function courseCard(course, { headingLevel = 3 } = {}) {
  const tag = `h${headingLevel}`;
  const field = FIELDS[course.fachrichtung];
  const title = html([`<${tag} class="course-card__title">`, `</${tag}>`], html`<a href="${href(coursePath(course))}">${course.cardTitle}</a>`);
  const search = `${course.title} ${course.description} ${course.fachrichtung} ${course.typ}`.toLowerCase();
  return html`<article class="course-card course-card--${field.tone}" data-course
    data-bundesland="${course.bundesland.join('|')}" data-fachrichtung="${course.fachrichtung}"
    data-art="${course.art}" data-typ="${course.typ}" data-azav="${course.azav ? '1' : '0'}" data-search="${search}">
    <div class="course-card__top">
      <span class="course-card__field"><span class="course-card__field-icon">${icon(field.icon, { size: 18 })}</span>${course.fachrichtung}</span>
      ${course.azav ? html`<span class="tag tag--azav" title="AZAV-zugelassen, förderfähig">${icon('shieldCheck', { size: 14 })}AZAV</span>` : ''}
    </div>
    ${title}
    <p class="course-card__text">${course.description}</p>
    <ul class="course-card__meta">
      <li><span class="tag">${course.typ}</span></li>
      <li>${icon('clock', { size: 16 })}${course.ue} UE</li>
      <li>${icon(course.art === 'Präsenz' ? 'building' : 'laptop', { size: 16 })}${course.art}</li>
      <li>${icon('mapPin', { size: 16 })}${course.bundesland.join(' · ')}</li>
    </ul>
    <div class="course-card__foot">
      ${course.azav
        ? html`<span class="course-card__price"><span>Kursgebühr</span>${course.costs.fee}</span>`
        : html`<span class="course-card__price course-card__price--muted"><span>Kursgebühr</span>auf Anfrage</span>`}
      <span class="course-card__more" aria-hidden="true">${icon('arrowRight', { size: 18 })}</span>
    </div>
  </article>`;
}

export function testimonialGrid() {
  return html`<div class="quote-grid">
    ${testimonials.map(
      (t, i) => html`<figure class="quote-card" data-reveal>
        ${icon('quote', { size: 32, className: 'quote-card__mark' })}
        <blockquote><p>${t.text}</p></blockquote>
        <figcaption><span class="avatar avatar--${(i % 3) + 1}" aria-hidden="true">${t.name[0]}</span>${t.name}</figcaption>
      </figure>`,
    )}
  </div>`;
}

export function azavNote() {
  return html`<div class="azav-note">
    <img src="/assets/img/brand/certqua-azav-traeger.png" width="600" height="303" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassener Träger nach AZAV" loading="lazy">
    <p>${site.legalName} ist nach AZAV zugelassener Träger – zertifiziert durch die fachkundige Stelle CERTQUA.</p>
  </div>`;
}

export function ctaBand({ text, actions, illu = 'mann-kontakt' }) {
  return html`<section class="cta">
    <div class="container">
      <div class="cta__card">
        <div class="cta__body">
          <p class="eyebrow">Kontakt</p>
          <p class="cta__text">${text}</p>
          <div class="actions">${actions || html`${contactButton('Kontaktieren Sie uns', 'primary')}${callButton('outline-light')}`}</div>
        </div>
        <div class="cta__illu" aria-hidden="true">
          <span class="cta__sun"></span>
          ${illustration(illu)}
        </div>
      </div>
    </div>
  </section>`;
}

// Leistungsbereiche als Bento-Raster. `long` zeigt den vollständigen Text.
const BENTO = {
  '/qualifizierung/': { area: 'q', tone: 'navy', illu: 'frau-kurs-wundexpertin', label: 'Zum Kursangebot' },
  '/praxisanleitung-in-der-pflege/': { area: 'p', tone: 'beige', illu: 'praxisanleiter' },
  '/ki-tutor/': { area: 'k', tone: 'white' },
  '/mediathek/': { area: 'm', tone: 'white' },
  '/ausbildungen/': { area: 'a', tone: 'tint', tag: 'In Planung' },
  '/pflegekurse-fuer-angehoerige/': { area: 'f', tone: 'coral' },
};

export function bento(services, { long = false, meta = {} } = {}) {
  return html`<div class="bento${long ? ' bento--long' : ''}">
    ${services.map((s) => {
      const b = BENTO[s.href];
      return html`<article class="bento__item bento__item--${b.area} bento__item--${b.tone}" data-reveal>
        <div class="bento__body">
          <span class="bento__icon">${icon(s.icon, { size: 24 })}</span>
          ${b.tag ? html`<span class="tag">${b.tag}</span>` : ''}
          ${meta[s.href] ? html`<span class="tag tag--light">${meta[s.href]}</span>` : ''}
          <h3 class="bento__title"><a href="${s.href}">${s.title}</a></h3>
          <p class="bento__text">${long ? s.text : s.short}</p>
          <span class="bento__more" aria-hidden="true">${b.label || 'Mehr erfahren'}${icon('arrowRight', { size: 16 })}</span>
        </div>
        ${b.illu && !long ? html`<div class="bento__illu" aria-hidden="true">${illustration(b.illu)}</div>` : ''}
      </article>`;
    })}
  </div>`;
}

export function statsBand(stats) {
  return html`<section class="stats" aria-label="interQualitas in Zahlen">
    <div class="container">
      <dl class="stats__list">
        ${stats.map((s) => html`<div class="stat">
          <dt>${s.label}</dt>
          <dd>${s.prefix ? html`<small>${s.prefix}</small>` : ''}${s.value}${s.unit ? html`<span>${s.unit}</span>` : ''}</dd>
        </div>`)}
      </dl>
    </div>
  </section>`;
}
