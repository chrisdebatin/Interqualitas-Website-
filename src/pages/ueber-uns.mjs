import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, contactButton, sectionHead, testimonialGrid, azavNote, ctaBand } from '../components.mjs';
import { team } from '../data/content.mjs';
import { site } from '../site.mjs';

const pillars = [
  {
    iconName: 'users',
    title: 'Gemeinsam.',
    text: 'Ob remote oder vor Ort: Wir sorgen dafür, dass Ihnen das Lernen Spaß macht und Sie sich schnell mit den neu erworbenen Kenntnissen auskennen. Gemeinsam lernt es sich besser!',
  },
  {
    iconName: 'bookOpen',
    title: 'Wissen.',
    text: 'Wie muss die Pflege heute gestaltet werden, um Menschen auch morgen zu unterstützen? Unsere Seminare erstreben eine qualitativ hochwertige Pflege. Wissen ist der Schlüssel dazu.',
  },
  {
    iconName: 'refresh',
    title: 'Vermittelt.',
    text: 'Mit gut ausgebildeten Trainer:innen aus der Praxis bereiten wir Sie auf Ihren nächsten Karriereschritt in der Pflege vor. Wir vermitteln unser Wissen und Sie treiben uns an.',
  },
];

export default {
  path: '/ueber-uns/',
  title: 'Über uns',
  description:
    'Die interQualitas GmbH ist ein nach AZAV zugelassener Bildungsträger für Pflegeberufe in Düsseldorf. Lernen Sie unsere Vision, unser Versprechen und unser Team kennen.',
  render() {
    const a = site.address;
    return html`
${hero({
  title: 'Wer wir sind',
  highlight: 'wir',
  crumbs: [{ label: 'Über uns' }],
  lead: html`<p>Die interQualitas GmbH ist ein nach AZAV zugelassener Bildungsträger für Pflegeberufe mit Sitz in Düsseldorf. Unser Team besteht aus Pflegefachkräften mit langjähriger Praxis- und Lehrerfahrung. Wir verfolgen die Vision, die Pflege zu verbessern: durch Wissen, Teamwork und digitale Chancen.</p>`,
  actions: html`${button({ label: 'Unser Team', url: '#team', variant: 'primary', iconName: 'arrowRight', iconAfter: true })}${contactButton('Kontakt', 'secondary')}`,
  illu: 'praxisanleiter',
  seal: true,
})}

<section class="section" id="vision">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Vision',
      title: 'Unsere Vision',
      lead: html`<p>Wir glauben an die Kraft der Bildung, der Zusammenarbeit, aber auch die Kraft jedes und jeder Einzelnen. Wir wollen <strong>Hand in Hand</strong> arbeiten und lernen, anders zu sehen und zu denken.</p>`,
    })}
    <div class="pillars">
      ${pillars.map((p) => html`<article class="pillar" data-reveal>
        <span class="pillar__icon">${icon(p.iconName, { size: 28 })}</span>
        <h3 class="pillar__title">${p.title.slice(0, -1)}<span class="pillar__dot">.</span></h3>
        <p>${p.text}</p>
      </article>`)}
    </div>
  </div>
</section>

<section class="section section--navy panel" id="versprechen">
  <div class="container promise">
    <div class="promise__head">
      <p class="eyebrow">Versprechen</p>
      <h2 class="section-title">Unser Versprechen an Sie</h2>
    </div>
    <div class="promise__body">
      <p class="promise__lead">Wir wissen, dass Ihre Zeit kostbar ist – gerade in der Pflege. Deshalb geben wir Ihnen unser Wort: Jede Weiterbildung bei Interqualitas ist praxisnah, fachlich fundiert und auf Ihren beruflichen Alltag abgestimmt.</p>
      <p>Unsere Trainer:innen kommen selbst aus der Pflege und wissen, worauf es ankommt. Sie lernen nicht für die Theorie, sondern für die Praxis – mit Inhalten, die Sie am nächsten Tag direkt anwenden können.</p>
      <p>Wir versprechen Ihnen flexible Kurszeiten, die sich an Ihren Schichtdienst anpassen, persönliche Betreuung in kleinen Lerngruppen und transparente, feste Kursgebühren – bei AZAV-zugelassenen Weiterbildungen mit Fördermöglichkeit über Bildungsgutschein. Denn gute Bildung sollte für alle zugänglich sein, die die Pflege besser machen wollen.</p>
    </div>
  </div>
</section>

<section class="section section--beige panel" id="bewertungen">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Bewertungen',
      title: 'Was unsere Teilnehmer:innen sagen',
      lead: 'Die beste Empfehlung kommt von denen, die es selbst erlebt haben. Das Feedback unserer Teilnehmer:innen ist unser Antrieb, jeden Tag ein Stück besser zu werden.',
    })}
    ${testimonialGrid()}
  </div>
</section>

<section class="section" id="team">
  <div class="container">
    ${sectionHead({ eyebrow: 'Team', title: 'Lernen Sie unser Team kennen' })}
    <div class="team-grid">
      ${team.map((m) => html`<article class="team-card" data-reveal>
        <div class="team-card__photo"><img src="${m.image}" width="${m.width}" height="${m.height}" alt="${m.alt}" loading="lazy" decoding="async"></div>
        <div class="team-card__body">
          <h3 class="team-card__name">${m.name}</h3>
          <p class="team-card__role">${m.role}</p>
          <ul class="chips">${m.qualifications.map((q) => html`<li>${q}</li>`)}</ul>
        </div>
      </article>`)}
    </div>
  </div>
</section>

<section class="section section--tint panel" id="standorte">
  <div class="container">
    <div class="location">
      <div class="location__photo">
        <img src="/assets/img/standort-duesseldorf.webp" width="555" height="502" alt="Heller, moderner Büroraum mit Pflanzen, Holzboden und Menschen in Gesprächen an einem Besprechungstisch." loading="lazy" decoding="async">
      </div>
      <div class="location__body">
        <p class="eyebrow">Standorte</p>
        <h2 class="section-title">Unser Standort:</h2>
        <ul class="contact-list">
          <li>${icon('mapPin', { size: 20 })}<span>${a.street}<br>${a.zip} ${a.city}</span></li>
          <li>${icon('phone', { size: 20 })}<a href="${site.phone.href}">${site.phone.display}</a></li>
          <li>${icon('mail', { size: 20 })}<a href="mailto:${site.email}">${site.email}</a></li>
        </ul>
        <div class="actions">
          ${contactButton()}
          ${button({ label: 'Route planen', url: site.mapsUrl, variant: 'secondary', iconName: 'navigation', attrs: 'target="_blank" rel="noopener"' })}
        </div>
      </div>
    </div>
    ${azavNote()}
  </div>
</section>

${ctaBand({ text: 'Lernen Sie unser Team kennen – wir freuen uns auf Sie!' })}
`;
  },
};
