// Kursdaten. Die Reihenfolge bestimmt die Reihenfolge in der Kursübersicht.
// `slug` entspricht der bisherigen URL unter /qualifizierung/<slug>/.
//
// AZAV-zugelassene Maßnahmen haben `azav: true` und ein `costs`-Objekt; die
// Aufteilung der Unterrichtseinheiten (UE) wird als Balken dargestellt.

const AZAV_DEFAULTS = {
  included: 'Unterricht, Zugang zur Lernplattform inkl. E-Learning, Skripte und Handouts, Prüfung, Zertifikat',
  extra: 'keine',
  start: 'ab November 2026 – feste Kurstermine, Einstieg auf Anfrage',
  kursnet: 'Eintrag in der Weiterbildungsdatenbank der Bundesagentur für Arbeit folgt in Kürze',
};

const BOTH = ['NRW', 'Niedersachsen'];

export const FACHRICHTUNGEN = ['Pflege', 'Intensiv & Palliativ', 'Management', 'Hygiene', 'Arbeits-/Brand-/Datenschutz & Co.'];
export const ARTEN = ['Online', 'Präsenz', 'Online & Präsenz'];
export const TYPEN = ['Weiterbildung', 'Fortbildung', 'Refresher', 'Einzelmodul'];
export const BUNDESLAENDER = ['NRW', 'Niedersachsen'];

export const courses = [
  {
    slug: 'pflegedienstleitung',
    title: 'Pflegedienstleitung — Weiterbildung für leitende Funktionen gem. § 71 SGB XI (460 UE) mit individuellem Eintritt',
    cardTitle: 'Pflegedienstleitung – Weiterbildung für leitende Funktionen gem. § 71 SGB XI',
    ue: 460,
    description:
      'Die Weiterbildung zur Pflegedienstleitung bereitet Sie auf die Übernahme von Leitungsverantwortung in ambulanten und stationären Pflegeeinrichtungen vor. Sie erwerben Kompetenzen in den Bereichen Personalführung, Qualitätsmanagement, Betriebswirtschaft und Organisationsentwicklung. Der Kurs erfüllt die Anforderungen nach § 71 SGB XI und qualifiziert Sie für eine verantwortungsvolle Führungsposition in der Pflege. Die Weiterbildung umfasst 460 UE im Blended-Learning-Format: 208 UE Online-Live-Unterricht, 40 UE E-Learning, 204 UE Präsenz in Düsseldorf und 8 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Management',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '3.981,60 €', split: { online: 208, praesenz: 204, pruefung: 8, elearning: 40 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'praxisanleitung',
    title: 'Praxisanleitung in der Pflege (berufspädagogische Zusatzqualifikation, § 4 PflAPrV) mit individuellem Eintritt',
    cardTitle: 'Praxisanleitung in der Pflege (berufspädagogische Zusatzqualifikation, § 4 PflAPrV)',
    ue: 300,
    description:
      'Die Weiterbildung zur Praxisanleitung qualifiziert Sie dafür, Auszubildende in der Pflege kompetent durch die praktische Ausbildung zu begleiten. Sie erlernen pädagogische Methoden, Anleitungstechniken und Bewertungsverfahren, um den Lernprozess strukturiert zu gestalten und die gesetzlich vorgeschriebenen 10 Prozent angeleitete Praxiszeit sicherzustellen. Die Weiterbildung umfasst 300 UE im Blended-Learning-Format: 250 UE Online-Live-Unterricht, 12 UE E-Learning, 30 UE Präsenz in Düsseldorf und 8 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Management',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '2.730,24 €', split: { online: 250, praesenz: 30, pruefung: 8, elearning: 12 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'behandlungspflege-lg1lg2',
    title: 'Behandlungspflege (LG1/LG2 nach § 132a SGB V) mit individuellem Eintritt',
    cardTitle: 'Behandlungspflege (LG1/LG2 nach § 132a SGB V)',
    ue: 180,
    description:
      'Die Weiterbildung Behandlungspflege (LG1/LG2) richtet sich an Quereinsteiger:innen und Menschen ohne pflegerische Berufserfahrung und qualifiziert für die Durchführung ärztlich verordneter Maßnahmen wie Injektionen, Wundversorgung, Medikamentengabe, Blutdruck- und Blutzuckermessung sowie das Anlegen von Kompressionsverbänden. Die Qualifizierung ermöglicht es Ihnen, behandlungspflegerische Leistungen der Leistungsgruppen 1 und 2 im Rahmen der Delegation sicher auszuführen. Die Weiterbildung umfasst 180 UE im Blended-Learning-Format: 120 UE Online-Live-Unterricht, 20 UE E-Learning, 36 UE Präsenz im Skill-Lab Düsseldorf und 4 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Pflege',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '1.462,40 €', split: { online: 120, praesenz: 36, pruefung: 4, elearning: 20 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'wundtherapeut',
    title: 'Wundtherapeut:in mit individuellem Eintritt',
    cardTitle: 'Wundtherapeut:in',
    ue: 226,
    description:
      'Die Weiterbildung Wundtherapeut:in richtet sich an examinierte Pflegefachkräfte und vermittelt vertiefte Kenntnisse zur komplexen Wundbehandlung. Themen sind die systematische Ursachenanalyse, individuelle Therapieplanung, interdisziplinäre Zusammenarbeit, spezielle Verbandmittel und strukturiertes Fallmanagement. Sie qualifizieren sich damit für die eigenverantwortliche Steuerung anspruchsvoller Wundbehandlungen. Die Weiterbildung umfasst 226 UE im Blended-Learning-Format: 143 UE Online-Live-Unterricht, 54 UE E-Learning, 23 UE Präsenz in Düsseldorf und 6 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Pflege',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '1.525,64 €', split: { online: 143, praesenz: 23, pruefung: 6, elearning: 54 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'palliative-care-160-ue',
    title: 'Palliative Care — Basiscurriculum mit individuellem Eintritt',
    cardTitle: 'Palliative Care – Basiscurriculum',
    ue: 160,
    description:
      'Die Weiterbildung Palliative Care qualifiziert Sie für die ganzheitliche Begleitung schwerkranker und sterbender Menschen. In 160 Unterrichtseinheiten erwerben Sie fundierte Kenntnisse in Schmerztherapie, Symptomkontrolle, psychosozialer Betreuung und ethischen Fragestellungen am Lebensende. Die Weiterbildung schließt mit einem Kolloquium ab und orientiert sich am Basiscurriculum Palliative Care nach Kern, Müller und Aurnhammer. Die Weiterbildung umfasst 160 UE im Blended-Learning-Format: 104 UE Online-Live-Unterricht, 36 UE E-Learning, 16 UE Präsenz in Düsseldorf und 4 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Intensiv & Palliativ',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '1.052,76 €', split: { online: 104, praesenz: 16, pruefung: 4, elearning: 36 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'aki-expertenkurs-pflegeexperte-fuer-ausserklinische-intensivpflege-fachbereichsleitung-186-ue',
    title: 'Verantwortliche Fachkraft für außerklinische Intensivpflege mit individuellem Eintritt',
    cardTitle: 'Verantwortliche Fachkraft für außerklinische Intensivpflege',
    ue: 186,
    description:
      'Die Weiterbildung „Verantwortliche Fachkraft für außerklinische Intensivpflege“ richtet sich an examinierte Pflegefachkräfte und vertieft Ihre Kenntnisse in Beatmungsmedizin, spezieller Krankheitslehre, Weaning-Strategien, Pharmakotherapie und interdisziplinärer Zusammenarbeit. Ergänzend erwerben Sie Führungskompetenzen in Personalentwicklung, Kommunikation und Organisation. Die Weiterbildung umfasst 186 UE im Blended-Learning-Format: 127 UE Online-Live-Unterricht, 34 UE E-Learning, 19 UE Präsenz in Düsseldorf und 6 UE Prüfung.',
    bundesland: ['NRW'],
    fachrichtung: 'Intensiv & Palliativ',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
    azav: true,
    costs: { fee: '1.355,84 €', split: { online: 127, praesenz: 19, pruefung: 6, elearning: 34 }, ...AZAV_DEFAULTS },
  },
  {
    slug: 'pflichtfortbildung-betreuungskraft-jaehrlich',
    title: 'Pflichtfortbildung Betreuungskraft (jährlich)',
    cardTitle: 'Pflichtfortbildung Betreuungskraft (jährlich)',
    ue: 16,
    description:
      'Betreuungskräfte nach §53c SGB XI sind verpflichtet, jährlich an einer mindestens zweitägigen Fortbildung im Umfang von 16 Unterrichtseinheiten teilzunehmen. Die Fortbildung dient der Aktualisierung des Fachwissens und der Reflexion der beruflichen Praxis. Themen sind unter anderem neue Betreuungsansätze, Kommunikation mit demenziell veränderten Menschen, rechtliche Neuerungen und kollegiale Fallbesprechungen.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online & Präsenz',
    typ: 'Fortbildung',
  },
  {
    slug: 'betreuungskraft-nach-§53c-sgb-xi',
    title: 'Betreuungskraft nach §53c SGB XI (160 UE)',
    cardTitle: 'Betreuungskraft nach §53c SGB XI',
    ue: 160,
    description:
      'Die Qualifizierung zur Betreuungskraft nach §53c SGB XI befähigt Sie, pflegebedürftige Menschen – insbesondere mit demenziellen Veränderungen, psychischen Erkrankungen oder geistigen Behinderungen – im Alltag zu begleiten und zu aktivieren. Sie erlernen Methoden der Tagesgestaltung, Kommunikation mit betreuungsbedürftigen Menschen, Grundlagen der Krankheitslehre sowie rechtliche Rahmenbedingungen. Ein 80-stündiges Betreuungspraktikum in einer zugelassenen Pflegeeinrichtung verknüpft Theorie und Praxis. Die Qualifizierung richtet sich an alle Interessierten – eine pflegerische Vorausbildung ist nicht erforderlich.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online & Präsenz',
    typ: 'Weiterbildung',
  },
  {
    slug: 'ausserklinische-intensivpflege-basis-kurs-106-ue',
    title: 'Außerklinische Intensivpflege Basis Kurs (106 UE)',
    cardTitle: 'Außerklinische Intensivpflege Basis Kurs',
    ue: 106,
    description:
      'Der Basiskurs qualifiziert Pflegefachkräfte für die eigenverantwortliche Versorgung von beatmeten und tracheotomierten Menschen im außerklinischen Umfeld. Sie erwerben Kenntnisse in Beatmungstechnik, Trachealkanülenmanagement, Sekretmanagement, Monitoring und Notfallmanagement. Ein Praktikum in einer klinischen oder außerklinischen Intensivpflegeeinrichtung verknüpft Theorie und Praxis. Der Kurs erfüllt die Anforderungen der Bundesrahmenempfehlung nach § 132l SGB V und ist von den Krankenkassen bundesweit anerkannt.',
    bundesland: BOTH,
    fachrichtung: 'Intensiv & Palliativ',
    art: 'Online',
    typ: 'Weiterbildung',
  },
  {
    slug: 'fortbildung-hygiene',
    title: 'Fortbildung Hygiene (4 UE)',
    cardTitle: 'Fortbildung Hygiene',
    ue: 4,
    description:
      'Die jährliche Hygienefortbildung ist Pflicht für alle Mitarbeitenden in Pflegeeinrichtungen. Wir frischen Ihr Wissen zu Infektionsprävention, Händehygiene, Desinfektionsverfahren und dem Umgang mit multiresistenten Erregern auf. Die Schulung erfüllt die Anforderungen des Infektionsschutzgesetzes und der KRINKO-Empfehlungen.',
    bundesland: BOTH,
    fachrichtung: 'Hygiene',
    art: 'Online',
    typ: 'Fortbildung',
  },
  {
    slug: 'pflichtfortbildung-praxisanleitung',
    title: 'Pflichtfortbildung Praxisanleitung (32 UE)',
    cardTitle: 'Pflichtfortbildung Praxisanleitung',
    ue: 32,
    description:
      'Gemäß § 4 Abs. 3 PflAPrV sind Praxisanleitende verpflichtet, jährlich mindestens 24 Stunden berufspädagogische Fortbildung nachzuweisen. Unsere Pflichtfortbildung verbindet aktuelle pädagogische Themen mit praxisnahen Methoden – von der kompetenzorientierten Anleitung über Prüfungsvorbereitung bis hin zu Kommunikation und Diversität in der Pflegeausbildung.',
    bundesland: BOTH,
    fachrichtung: 'Management',
    art: 'Online',
    typ: 'Refresher',
  },
  {
    slug: 'rezertifizierung-wundexperte',
    title: 'Rezertifizierung Wundexperte (13 UE)',
    cardTitle: 'Rezertifizierung Wundexperte',
    ue: 13,
    description:
      'Als zertifizierte:r Wundexpert:in sind Sie verpflichtet, Ihre Fachkompetenz durch regelmäßige Fortbildung nachzuweisen. Unsere Rezertifizierungskurse greifen aktuelle Entwicklungen in der Wundversorgung auf und vertiefen Ihr Praxiswissen.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online',
    typ: 'Refresher',
  },
  {
    slug: 'brandschutz',
    title: 'Brandschutz (4 UE)',
    cardTitle: 'Brandschutz',
    ue: 4,
    description:
      'Das Brandschutzmodul schult Sie im vorbeugenden und abwehrenden Brandschutz in Pflegeeinrichtungen. Sie lernen, Brandgefahren zu erkennen, Evakuierungspläne zu erstellen, Feuerlöscher korrekt einzusetzen und Mitarbeitende regelmäßig zu unterweisen. Das Modul erfüllt die Anforderungen an die jährliche Brandschutzunterweisung gemäß ASR A2.2.',
    bundesland: BOTH,
    fachrichtung: 'Arbeits-/Brand-/Datenschutz & Co.',
    art: 'Online',
    typ: 'Einzelmodul',
  },
  {
    slug: 'arbeitsschutz',
    title: 'Arbeitsschutz (4 UE)',
    cardTitle: 'Arbeitsschutz',
    ue: 4,
    description:
      'Dieses Modul vermittelt die wesentlichen Grundlagen des Arbeitsschutzes in der Pflege. Themen sind Gefährdungsbeurteilungen, ergonomisches Arbeiten, der Umgang mit Gefahrstoffen, Unfallprävention und die Rechte und Pflichten von Arbeitgebern und Beschäftigten. Sie erfahren, wie Sie Arbeitsschutzmaßnahmen in Ihrer Einrichtung wirksam umsetzen und dokumentieren.',
    bundesland: BOTH,
    fachrichtung: 'Arbeits-/Brand-/Datenschutz & Co.',
    art: 'Online',
    typ: 'Einzelmodul',
  },
  {
    slug: 'datenschutz',
    title: 'Datenschutzbeauftragte/r (40 UE)',
    cardTitle: 'Datenschutzbeauftragte/r',
    ue: 40,
    description:
      'In diesem Modul erhalten Sie einen praxisnahen Überblick über die datenschutzrechtlichen Anforderungen in Pflegeeinrichtungen. Sie lernen die Grundlagen der DSGVO, den Umgang mit Patienten- und Mitarbeiterdaten, Dokumentationspflichten und die Umsetzung technischer und organisatorischer Schutzmaßnahmen. Das Modul eignet sich sowohl als Erstschulung als auch zur jährlichen Auffrischung.',
    bundesland: BOTH,
    fachrichtung: 'Arbeits-/Brand-/Datenschutz & Co.',
    art: 'Online',
    typ: 'Weiterbildung',
  },
  {
    slug: 'erste-hilfe-und-sofortmassnahmen',
    title: 'Erste Hilfe und Sofortmaßnahmen (9 UE)',
    cardTitle: 'Erste Hilfe und Sofortmaßnahmen',
    ue: 9,
    description:
      'Dieses Modul frischt Ihre Kenntnisse in Erster Hilfe und Sofortmaßnahmen auf – zugeschnitten auf den Pflegealltag. Sie trainieren lebensrettende Maßnahmen, den Umgang mit Notfallsituationen und die strukturierte Erstversorgung bis zum Eintreffen des Rettungsdienstes. Der Kurs ist sowohl online als auch als praktisches Präsenztraining an unseren Standorten verfügbar.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online',
    typ: 'Einzelmodul',
  },
  {
    slug: 'expertenstandards-in-der-pflege',
    title: 'Expertenstandards in der Pflege (16 UE)',
    cardTitle: 'Expertenstandards in der Pflege',
    ue: 16,
    description:
      'In diesem Einzelmodul machen Sie sich mit den aktuellen Expertenstandards des DNQP vertraut – von der Dekubitusprophylaxe über das Schmerzmanagement bis hin zur Sturzprophylaxe und Ernährungsmanagement. Sie lernen, die Standards praxisnah in den Pflegealltag zu integrieren, korrekt zu dokumentieren und als Grundlage für eine evidenzbasierte Pflege zu nutzen.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online',
    typ: 'Einzelmodul',
  },
  {
    slug: 'hygienefachkraft-2',
    title: 'Hygienefachkraft (40 UE)',
    cardTitle: 'Hygienefachkraft',
    ue: 40,
    description:
      'Die Weiterbildung zur Hygienefachkraft qualifiziert Sie für die Umsetzung und Überwachung von Hygienemaßnahmen in Pflegeeinrichtungen. Sie erwerben fundierte Kenntnisse in Infektionsprävention, Hygieneplanerstellung, Desinfektionsverfahren und der Schulung von Mitarbeitenden. Als Hygienebeauftragte:r sorgen Sie dafür, dass gesetzliche Vorgaben eingehalten und Bewohner:innen sowie Personal gleichermaßen geschützt werden.',
    bundesland: BOTH,
    fachrichtung: 'Hygiene',
    art: 'Online',
    typ: 'Weiterbildung',
  },
  {
    slug: 'qualitaetsmanagementbeauftragte-r',
    title: 'Qualitätsmanagementbeauftragte/r (80 UE)',
    cardTitle: 'Qualitätsmanagementbeauftragte/r',
    ue: 80,
    description:
      'Als Qualitätsmanagementbeauftragte:r übernehmen Sie eine zentrale Rolle bei der Sicherung und Weiterentwicklung der Pflegequalität in Ihrer Einrichtung. Die Weiterbildung vermittelt Ihnen Methoden zur Prozessanalyse, Kennzahlensteuerung und Auditplanung sowie den Umgang mit MDK-Prüfungen und internen Qualitätsinstrumenten (DIN ISO 9001). Sie lernen, ein QM-System aufzubauen, zu pflegen und Ihr Team für Qualitätsziele zu gewinnen.',
    bundesland: BOTH,
    fachrichtung: 'Management',
    art: 'Online',
    typ: 'Weiterbildung',
  },
  {
    slug: 'beratung-nach-§7a-sgb-xi',
    title: 'Beratung nach §7a SGB XI (400 UE)',
    cardTitle: 'Beratung nach §7a SGB XI',
    ue: 400,
    description:
      'Die Weiterbildung zum Pflegeberater nach § 7a SGB XI befähigt Sie, Pflegebedürftige und ihre Angehörigen umfassend und unabhängig zu beraten. Sie erlernen die Erstellung individueller Versorgungspläne, die Koordination von Hilfsangeboten und die Begleitung durch den gesamten Pflegeprozess. Als Pflegeberater:in sind Sie zentrale Ansprechperson für alle Fragen rund um Leistungsansprüche, Entlastungsangebote und Versorgungsstrukturen.',
    bundesland: ['Niedersachsen'],
    fachrichtung: 'Management',
    art: 'Präsenz',
    typ: 'Weiterbildung',
  },
  {
    slug: 'beratung-nach-§45-sgb-xi',
    title: 'Beratung nach §45 SGB XI (32 UE)',
    cardTitle: 'Beratung nach §45 SGB XI',
    ue: 32,
    description:
      'Diese Weiterbildung qualifiziert Sie zur Durchführung von Pflegekursen und individuellen Schulungen für pflegende Angehörige gemäß § 45 SGB XI. Sie lernen, Pflegesituationen im häuslichen Umfeld einzuschätzen, praxisnahe Anleitungen zu geben und Angehörige in ihrer Pflegekompetenz nachhaltig zu stärken. Die Schulungen können in der Häuslichkeit, in Gruppen oder digital durchgeführt werden.',
    bundesland: BOTH,
    fachrichtung: 'Management',
    art: 'Online',
    typ: 'Weiterbildung',
  },
  {
    slug: 'wundexperte',
    title: 'Wundexperte (86 UE)',
    cardTitle: 'Wundexperte',
    ue: 86,
    description:
      'Die Weiterbildung zum Wundexperten vermittelt Ihnen fundiertes Wissen zur Versorgung akuter und chronischer Wunden. Sie lernen, Wunden fachgerecht zu beurteilen, geeignete Versorgungskonzepte auszuwählen und die Wunddokumentation leitliniengerecht durchzuführen. Der Kurs richtet sich an Pflegefachkräfte, die ihre Kompetenz in der modernen Wundversorgung gezielt ausbauen möchten.',
    bundesland: BOTH,
    fachrichtung: 'Pflege',
    art: 'Online',
    typ: 'Weiterbildung',
  },
];

export const coursePath = (course) => `/qualifizierung/${course.slug}/`;
export const courseBySlug = (slug) => courses.find((c) => c.slug === slug);
