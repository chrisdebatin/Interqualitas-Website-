// Zentrale Stammdaten der Website. Änderungen hier wirken auf allen Seiten.

export const site = {
  name: 'interQualitas',
  legalName: 'interQualitas GmbH',
  url: 'https://www.interqualitas.de',
  tagline: 'Gemeinsam. Wissen. Vermittelt.',
  defaultDescription:
    'interQualitas ist ein nach AZAV zugelassener Bildungsträger für Pflegeberufe in Düsseldorf: praxisnahe Weiter- und Fortbildungen in Präsenz, online oder hybrid – mit Förderung über Bildungsgutschein.',
  phone: { display: '0211 54262301', href: 'tel:+4921154262301' },
  email: 'info@interqualitas.de',
  address: {
    street: 'Kruppstraße 108',
    zip: '40227',
    city: 'Düsseldorf',
    country: 'DE',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kruppstra%C3%9Fe%20108%2C%2040227%20D%C3%BCsseldorf',

  // Ziel für das Kontaktformular (z. B. Formspree, Netlify Forms oder ein
  // eigenes Backend). Leer lassen: Das Formular öffnet dann das E-Mail-Programm
  // der Besucher:innen mit einer vorausgefüllten Nachricht an `email`.
  contactFormEndpoint: '',
};

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Leistungen',
    href: '/leistungen/',
    children: [
      { label: 'Ausbildungen', href: '/ausbildungen/' },
      { label: 'Qualifizierung', href: '/qualifizierung/' },
      { label: 'Praxisanleitung in der Pflege', href: '/praxisanleitung-in-der-pflege/' },
      { label: 'Pflegekurse für Angehörige', href: '/pflegekurse-fuer-angehoerige/' },
      { label: 'KI Tutor', href: '/ki-tutor/' },
      { label: 'Mediathek', href: '/mediathek/' },
      { label: 'Preise', href: '/leistungen/#preise' },
    ],
  },
  {
    label: 'Über uns',
    href: '/ueber-uns/',
    children: [
      { label: 'Vision', href: '/ueber-uns/#vision' },
      { label: 'Versprechen', href: '/ueber-uns/#versprechen' },
      { label: 'Bewertungen', href: '/ueber-uns/#bewertungen' },
      { label: 'Team', href: '/ueber-uns/#team' },
      { label: 'Standorte', href: '/ueber-uns/#standorte' },
    ],
  },
  { label: 'Karriere', href: '/karriere/' },
  {
    label: 'Aktuelles',
    href: '/aktuelles/',
    children: [
      { label: 'Neuigkeiten', href: '/aktuelles/#neuigkeiten' },
      { label: 'Download', href: '/aktuelles/#download' },
      { label: 'FAQ', href: '/aktuelles/#faq' },
    ],
  },
  { label: 'Kontakt', href: '/kontakt/' },
];
