import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, sectionHead, checklistBlock, ctaBand, contactButton } from '../components.mjs';
import { site } from '../site.mjs';

const jobs = [
  {
    title: 'Praxisanleiter:in',
    terms: 'Voll- oder Teilzeit',
    body: html`<p>Übernehmen Sie Verantwortung als Praxisanleiter:in in unserem Kompetenzzentrum für Gesundheit und Pflege – <strong>fördern Sie die Fachkräfte von morgen</strong> mit Ihrer Expertise und Leidenschaft!</p>`,
  },
  {
    title: 'Honorardozent:in',
    terms: 'auf Honorarbasis',
    body: html`<p>Übernehmen Sie Verantwortung als Honorardozent:in in unserem Kompetenzzentrum für Gesundheit und Pflege in Düsseldorf – fördern Sie die Fachkräfte von morgen mit Ihrer Expertise und Leidenschaft!</p>
      <p>Wir bieten <strong>Fort- und Weiterbildungen</strong> in folgenden Themenschwerpunkten an:</p>
      ${checklistBlock(['Pflegedienstleitung', 'Praxisanleitung', 'Palliative Care', 'Wundtherapeut:in und -expert:in', 'Hygiene', 'Beratung', 'Qualitätsmanagement'], 'checklist--columns')}
      <p>Zusätzlich bieten wir <strong>Schulungen</strong> im Bereich der Ausbildung und der Pflegekurse an. Wenn Sie sich in einem oder mehreren dieser Themenfelder wiederfinden, freuen wir uns über Ihre Bewerbung!</p>`,
  },
];

export default {
  path: '/karriere/',
  title: 'Karriere',
  description:
    'Karriere bei interQualitas in Düsseldorf: Wir suchen Praxisanleiter:innen und Honorardozent:innen. Herzliche Arbeitsatmosphäre, überdurchschnittliches Gehalt, sicherer Arbeitsplatz.',
  render() {
    const apply = (job) =>
      `mailto:${site.email}?subject=${encodeURIComponent(`Bewerbung: ${job}`)}`;
    return html`
${hero({
  title: 'Lassen Sie uns gemeinsam die Pflege verbessern.',
  highlight: 'gemeinsam',
  crumbs: [{ label: 'Karriere' }],
  checklist: ['Mit einer herzlichen Arbeitsatmosphäre', 'Mit überdurchschnittlichem Gehalt', 'Mit einem sicheren Arbeitsplatz'],
  extra: html`<p class="hero__note">Finden Sie Ihre Karrierechance – Wir freuen uns auf Ihre Bewerbung!</p>`,
  actions: html`${button({ label: 'Jetzt bewerben', url: apply('Initiativbewerbung'), iconName: 'send' })}${button({ label: 'Offene Stellen', url: '#stellen', variant: 'secondary' })}`,
  illu: 'rakete',
})}

<section class="section" id="stellen">
  <div class="container container--narrow">
    ${sectionHead({
      title: 'Werden Sie Teil unseres Teams',
      lead: html`<p>Transformieren Sie mit uns die Pflege und die Art und Weise, wie wir lernen. Als Team-Mitglied bei Interqualitas arbeiten Sie mit <strong>herzlichen und verantwortungsbewussten Kolleg:innen</strong> zusammen. Da wir <strong>ständig wachsen</strong>, suchen wir nach Verstärkung. Informieren Sie sich über unsere Stellenangebote oder schicken Sie uns eine Initiativbewerbung. Sie sind herzlich willkommen!</p>`,
    })}
    <div class="jobs">
      ${jobs.map((job, i) => html`<details class="job" ${i === 0 ? 'open' : ''}>
        <summary>
          <span class="job__icon">${icon('briefcase', { size: 22 })}</span>
          <span class="job__head"><span class="job__title">${job.title}</span><span class="job__terms">${job.terms}</span></span>
          ${icon('chevronDown', { size: 22, className: 'job__chevron' })}
        </summary>
        <div class="job__body">
          ${job.body}
          ${button({ label: 'Jetzt bewerben', url: apply(job.title), iconName: 'send' })}
        </div>
      </details>`)}
    </div>
  </div>
</section>

${ctaBand({
  text: 'Starten Sie Ihre Karriere bei uns und erfahren Sie mehr über die offenen Stellen:',
  actions: html`${contactButton('Kontaktieren Sie uns', 'light')}${button({ label: 'Jetzt bewerben', url: apply('Initiativbewerbung'), variant: 'outline-light', iconName: 'send' })}`,
})}
`;
  },
};
