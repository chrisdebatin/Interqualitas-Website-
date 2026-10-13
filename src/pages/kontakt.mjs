import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { hero, button, callButton } from '../components.mjs';
import { courses } from '../data/courses.mjs';
import { site } from '../site.mjs';

export default {
  path: '/kontakt/',
  title: 'Kontakt',
  description:
    'Kontaktieren Sie interQualitas in Düsseldorf: Fragen zu Kursen, Förderung über Bildungsgutschein und Buchungsanfragen – telefonisch unter 0211 54262301 oder über unser Kontaktformular.',
  render() {
    const a = site.address;
    const endpoint = site.contactFormEndpoint;
    const formAttrs = endpoint
      ? html`action="${endpoint}" method="post"`
      : html`action="mailto:${site.email}" method="post" enctype="text/plain"`;

    return html`
${hero({
  title: 'Kontaktieren Sie uns!',
  crumbs: [{ label: 'Kontakt' }],
  lead: html`<p>Über das Kontaktformular können wir <strong>schnell Ihre Fragen klären</strong> und Ihre <strong>Buchungsanfragen bearbeiten</strong>.</p>`,
  actions: html`${button({ label: 'Zum Kontaktformular', url: '#kontakt', iconName: 'arrowRight', iconAfter: true })}${callButton('secondary')}`,
  illu: 'mann-kontakt',
})}

<section class="section" id="kontakt">
  <div class="container contact-layout">
    <div class="form-card">
      <h2 class="section-title">Ihre Nachricht an uns</h2>
      <p class="form-note">Pflichtfelder sind mit <span aria-hidden="true">*</span><span class="sr-only">Sternchen</span> markiert.</p>
      <form class="contact-form" ${formAttrs} data-contact-form data-mode="${endpoint ? 'endpoint' : 'mailto'}" data-email="${site.email}" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="cf-name">Name <span aria-hidden="true">*</span></label>
            <input id="cf-name" name="name" type="text" autocomplete="name" required>
            <p class="field__error" id="cf-name-error" hidden>Bitte geben Sie Ihren Namen an.</p>
          </div>
          <div class="field">
            <label for="cf-email">E-Mail <span aria-hidden="true">*</span></label>
            <input id="cf-email" name="email" type="email" autocomplete="email" required>
            <p class="field__error" id="cf-email-error" hidden>Bitte geben Sie eine gültige E-Mail-Adresse an.</p>
          </div>
          <div class="field">
            <label for="cf-phone">Telefon</label>
            <input id="cf-phone" name="telefon" type="tel" autocomplete="tel">
          </div>
          <div class="field field--select">
            <label for="cf-topic">Ihr Anliegen</label>
            <select id="cf-topic" name="anliegen" data-topic>
              <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
              <option value="Beratung zu Förderung / Bildungsgutschein">Beratung zu Förderung / Bildungsgutschein</option>
              <optgroup label="Fortbildungs-Abo">
                <option>Fortbildungs-Abo Starter</option>
                <option>Fortbildungs-Abo Standard</option>
                <option>Fortbildungs-Abo Enterprise</option>
              </optgroup>
              <optgroup label="Kurse">
                ${courses.map((c) => html`<option>${c.cardTitle}</option>`)}
              </optgroup>
              <option>Pflegekurse für Angehörige</option>
              <option>KI Tutor</option>
              <option>Bewerbung / Karriere</option>
            </select>
            ${icon('chevronDown', { size: 16, className: 'field__chevron' })}
          </div>
          <div class="field field--full">
            <label for="cf-message">Nachricht <span aria-hidden="true">*</span></label>
            <textarea id="cf-message" name="nachricht" rows="6" required></textarea>
            <p class="field__error" id="cf-message-error" hidden>Bitte schreiben Sie uns eine kurze Nachricht.</p>
          </div>
          <div class="field field--hp" aria-hidden="true">
            <label for="cf-website">Website</label>
            <input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
        </div>
        <p class="form-privacy">Ihre Angaben verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage. Weitere Informationen finden Sie in unserer <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
        <button class="btn btn--primary" type="submit">${icon('send', { size: 18 })}<span>Nachricht senden</span></button>
        <div class="form-status" role="status" aria-live="polite" data-form-status hidden></div>
      </form>
    </div>

    <aside class="contact-aside" aria-label="Kontaktdaten">
      <div class="facts-card">
        <h2 class="facts-card__title">So erreichen Sie uns</h2>
        <ul class="contact-list">
          <li>${icon('phone', { size: 20 })}<span><span class="contact-list__label">Telefon</span><a href="${site.phone.href}">${site.phone.display}</a></span></li>
          <li>${icon('mail', { size: 20 })}<span><span class="contact-list__label">E-Mail</span><a href="mailto:${site.email}">${site.email}</a></span></li>
          <li>${icon('mapPin', { size: 20 })}<span><span class="contact-list__label">Unser Standort in Düsseldorf</span>${site.legalName}<br>${a.street}<br>${a.zip} ${a.city}</span></li>
        </ul>
        ${button({ label: 'Route planen', url: site.mapsUrl, variant: 'secondary', iconName: 'navigation', attrs: 'target="_blank" rel="noopener"' })}
      </div>
      <div class="facts-card facts-card--beige">
        <img src="/assets/img/brand/certqua-azav-traeger.png" width="600" height="303" alt="CERTQUA-Siegel: Qualitätsmanagement – zugelassener Träger nach AZAV" loading="lazy">
        <p>Wir beraten Sie zu Kursstart, Förderung über Bildungsgutschein und Anmeldung.</p>
      </div>
    </aside>
  </div>
</section>
`;
  },
};
