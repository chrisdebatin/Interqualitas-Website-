// Themenseiten mit gleichem Aufbau: Hero, Karten mit den Angeboten, CTA.
import { html } from '../lib/html.mjs';
import { hero, featureCard, sectionHead, ctaBand, contactButton, button, callButton } from '../components.mjs';

function topicPage({ path, title, crumbs, description, heroTitle, heroLead, illu, sectionTitle, sectionLead, items, cta, columns = 2 }) {
  return {
    path,
    title,
    description,
    render() {
      return html`
${hero({
  title: heroTitle,
  crumbs,
  lead: heroLead,
  actions: html`${contactButton('Beratung anfragen')}${callButton('secondary')}`,
  illu,
})}
<section class="section">
  <div class="container">
    ${sectionTitle ? sectionHead({ title: sectionTitle, lead: sectionLead }) : ''}
    <div class="card-grid card-grid--${columns}">
      ${items.map((item, i) => featureCard({ ...item, index: i + 1 }))}
    </div>
  </div>
</section>
${ctaBand({ text: cta })}
`;
    },
  };
}

const LEISTUNGEN = { label: 'Leistungen', href: '/leistungen/' };

export const praxisanleitung = topicPage({
  path: '/praxisanleitung-in-der-pflege/',
  title: 'Praxisanleitung in der Pflege',
  crumbs: [LEISTUNGEN, { label: 'Praxisanleitung in der Pflege' }],
  description:
    'Als Praxisanleiter:in übernehmen Sie eine Schlüsselrolle in der Pflegeausbildung. Wir bereiten Sie vor – von der Begleitung Auszubildender über die 10-%-Vorgabe bis zur Prüfungsvorbereitung.',
  heroTitle: 'Praxisanleitung in der Pflege',
  heroLead: html`<p>Als Praxisanleiter:in übernehmen Sie eine Schlüsselrolle in der Ausbildung zukünftiger Pflegefachkräfte. Unsere Angebote bereiten Sie auf diese verantwortungsvolle Aufgabe vor.</p>`,
  illu: 'praxisanleiter',
  sectionTitle: 'Ihre Aufgaben als Praxisanleiter:in',
  items: [
    {
      iconName: 'users',
      title: 'Betreuung und Begleitung der Auszubildenden',
      lead: 'Auszubildende kompetent durch den Praxisalltag führen',
      text: 'Als Praxisanleiter:in sind Sie die zentrale Bezugsperson für Auszubildende im Pflegealltag. Sie begleiten den Lernprozess individuell, fördern fachliche und persönliche Kompetenzen und schaffen eine Lernumgebung, in der Theorie und Praxis zusammenwachsen. Unsere Weiterbildung bereitet Sie darauf vor, Auszubildende strukturiert anzuleiten, konstruktiv Feedback zu geben und sie auf ihrem Weg zur examinierten Pflegefachkraft verlässlich zu begleiten.',
    },
    {
      iconName: 'clipboardCheck',
      title: 'Durchführung und Sicherung der Praxisanleitung (10 % der Ausbildungszeit)',
      lead: 'Die gesetzliche 10%-Vorgabe strukturiert und wirksam umsetzen',
      text: 'Das Pflegeberufegesetz schreibt vor, dass mindestens 10 Prozent der praktischen Ausbildungszeit als geplante und strukturierte Praxisanleitung durchgeführt werden muss. Wir zeigen Ihnen, wie Sie diese Vorgabe in Ihrem Arbeitsalltag zuverlässig umsetzen – von der Erstellung individueller Anleitungspläne über die Dokumentation bis hin zur Abstimmung mit der Pflegeschule. So stellen Sie sicher, dass die Praxisanleitung nicht nur gesetzeskonform, sondern auch pädagogisch wirksam gestaltet wird.',
    },
    {
      iconName: 'graduationCap',
      title: 'Vorbereitung und Durchführung der Zwischen- / Abschlussprüfung',
      lead: 'Auszubildende gezielt auf den Prüfungstag vorbereiten.',
      text: 'Die praktische Prüfung ist für Auszubildende ein entscheidender Meilenstein. Als Praxisanleiter:in unterstützen Sie bei der gezielten Vorbereitung, gestalten prüfungsnahe Übungssituationen und begleiten die Auszubildenden am Prüfungstag. Wir vermitteln Ihnen Methoden, um Prüfungsangst zu reduzieren, Kompetenzen sichtbar zu machen und den gesamten Prüfungsprozess professionell mitzugestalten.',
    },
    {
      iconName: 'target',
      title: 'Übernahme und Sicherung der Fachkraftquote (praxisanleitend)',
      lead: 'Nachwuchs sichern und die Fachkraftquote langfristig stärken',
    },
  ],
  cta: 'Sie möchten Praxisanleiter:in werden oder Ihre Pflichtfortbildung absolvieren? Wir beraten Sie gerne.',
});

export const pflegekurse = topicPage({
  path: '/pflegekurse-fuer-angehoerige/',
  title: 'Pflegekurse für Angehörige',
  crumbs: [LEISTUNGEN, { label: 'Pflegekurse für Angehörige' }],
  description:
    'Pflegekurse für pflegende Angehörige: praktische Handgriffe für die häusliche Pflege, häufige Krankheitsbilder verständlich erklärt und Austausch mit anderen Angehörigen.',
  heroTitle: 'Unsere Pflegekurse für Angehörige',
  heroLead: html`<p>Die Pflege eines Angehörigen stellt Familien vor große Herausforderungen. Unsere Pflegekurse vermitteln Ihnen praktisches Wissen für den Pflegealltag, geben Einblicke in wichtige Krankheitsbilder und bieten Raum für den Austausch mit anderen pflegenden Angehörigen.</p><p class="hint">Diese Seite befindet sich im Ausbau.</p>`,
  illu: 'frau-behandlungspflege',
  columns: 3,
  items: [
    {
      iconName: 'heart',
      title: 'Training Pflege im Alltag',
      lead: 'Praktische Handgriffe für die häusliche Pflege erlernen.',
      text: 'In diesem Kurs lernen Sie die wichtigsten Handgriffe für die häusliche Pflege – praxisnah und verständlich erklärt. Von der Körperpflege über die Mobilisation bis hin zur richtigen Lagerung vermitteln wir Ihnen Techniken, die den Pflegealltag für Sie und Ihren Angehörigen sicherer und leichter machen. Vorkenntnisse sind nicht erforderlich.',
    },
    {
      iconName: 'stethoscope',
      title: 'Krankheitslehre',
      lead: 'Häufige Krankheitsbilder verstehen und richtig einordnen',
      text: 'Demenz, Diabetes, Schlaganfall – wer einen Angehörigen pflegt, wird mit Krankheitsbildern konfrontiert, die viele Fragen aufwerfen. In diesem Kurs erklären wir Ihnen die häufigsten Erkrankungen im Pflegekontext verständlich und ohne Fachjargon. Sie erfahren, worauf Sie im Alltag achten sollten, wie Sie Symptome richtig einordnen und wann professionelle Hilfe gefragt ist.',
    },
    {
      iconName: 'message',
      title: 'Austausch',
      lead: 'Erfahrungen teilen und voneinander lernen',
      text: 'Pflege kann belastend sein – umso wichtiger ist es, sich nicht allein zu fühlen. Unser Austauschformat bietet Ihnen einen geschützten Rahmen, um Erfahrungen mit anderen pflegenden Angehörigen zu teilen, voneinander zu lernen und neue Kraft zu schöpfen. Begleitet von erfahrenen Fachkräften, finden Sie hier Raum für Ihre Fragen, Sorgen und auch für das, was gut gelingt.',
    },
  ],
  cta: 'Sie pflegen einen Angehörigen und haben Fragen? Sprechen Sie uns an.',
});

export const kiTutor = topicPage({
  path: '/ki-tutor/',
  title: 'KI Tutor',
  crumbs: [LEISTUNGEN, { label: 'KI Tutor' }],
  description:
    'Der KI-Tutor von interQualitas: Sprachunterricht Deutsch für den Pflegeberuf, Prüfungsvorbereitung, Kommunikationstraining und Fachgespräche in Medizin und Pflege – rund um die Uhr.',
  heroTitle: 'Unser KI Tutor',
  heroLead: html`<p>Unser KI-Tutor unterstützt Sie digital beim Lernen – rund um die Uhr und in Ihrem eigenen Tempo. Ob Sprachtraining, Prüfungsvorbereitung oder Fachgespräche in Medizin und Pflege: Der KI-Tutor ergänzt unsere Präsenz- und Online-Seminare um ein innovatives, individuelles Lernangebot.</p>`,
  illu: 'schuelerin',
  items: [
    {
      iconName: 'languages',
      title: 'Sprachunterricht',
      lead: 'Deutsch für den Pflegeberuf – flexibel und individuell.',
      text: 'Unser KI-gestützter Sprachunterricht hilft Ihnen, Ihre Deutschkenntnisse gezielt für den Pflegeberuf zu verbessern. Der Tutor passt sich Ihrem Sprachniveau an, übt alltagsnahe Dialoge mit Ihnen und gibt Ihnen direktes Feedback zu Aussprache, Grammatik und Fachvokabular – flexibel, geduldig und jederzeit verfügbar.',
    },
    {
      iconName: 'graduationCap',
      title: 'Prüfungsvorbereitung (Pflege)',
      lead: 'Mit Übungsfragen und Fallbeispielen sicher in die Prüfung',
      text: 'Ob Zwischen- oder Abschlussprüfung: Der KI Tutor unterstützt Sie bei der Vorbereitung mit individuell zusammengestellten Übungsfragen, Fallbeispielen und Wissenstests. Sie können in Ihrem eigenen Tempo lernen, Schwachstellen gezielt nacharbeiten und Ihren Lernfortschritt jederzeit nachvollziehen.',
    },
    {
      iconName: 'message',
      title: 'Kommunikationsunterricht',
      lead: 'Professionelle Gesprächsführung im Pflegealltag trainieren',
      text: 'Professionelle Kommunikation ist in der Pflege unverzichtbar – im Umgang mit Patient:innen, Angehörigen und im Team. Der KI Tutor trainiert mit Ihnen typische Gesprächssituationen aus dem Pflegealltag: von der einfühlsamen Beratung über die strukturierte Übergabe bis hin zum Umgang mit schwierigen Gesprächen.',
    },
    {
      iconName: 'stethoscope',
      title: 'Fachgespräche (Medizin und Pflege)',
      lead: 'Medizinische Fachsprache sicher anwenden',
      text: 'In Visiten, Fallbesprechungen und interdisziplinären Meetings kommt es auf präzise Fachsprache an. Der KI Tutor simuliert realistische Fachgespräche aus Medizin und Pflege, damit Sie sicher und kompetent auftreten. Sie üben medizinische Terminologie im Kontext und lernen, Ihre fachliche Einschätzung klar und überzeugend zu formulieren.',
    },
  ],
  cta: 'Sie möchten den KI Tutor kennenlernen? Wir zeigen Ihnen, wie er Ihr Lernen unterstützt.',
});

export const mediathek = topicPage({
  path: '/mediathek/',
  title: 'Mediathek',
  crumbs: [LEISTUNGEN, { label: 'Mediathek' }],
  description:
    'Die Mediathek von interQualitas: Wissensdatenbank zu Fachthemen der Pflege, Skripte und Handouts zu unseren Kursen sowie praxisnahe Übungsaufgaben zur Prüfungsvorbereitung.',
  heroTitle: 'Unsere Mediathek',
  heroLead: html`<p>In unserer Mediathek finden Sie ergänzende Lernmaterialien, eine umfangreiche Wissensdatenbank und praxisnahe Übungsaufgaben. Nutzen Sie diese Ressourcen, um Kursinhalte zu vertiefen, sich auf Prüfungen vorzubereiten oder Ihr Fachwissen eigenständig zu erweitern.</p>`,
  illu: 'frau-kurs-wundexpertin',
  columns: 3,
  items: [
    {
      iconName: 'database',
      title: 'Wissensdatenbank',
      lead: 'Fachthemen der Pflege kompakt nachschlagen',
      text: 'Unsere Wissensdatenbank bietet Ihnen ein umfangreiches Nachschlagewerk zu den wichtigsten Themen der Pflege. Ob Pflegestandards, Krankheitsbilder oder rechtliche Grundlagen – hier finden Sie fundierte Fachinformationen, die von unseren Dozent:innen zusammengestellt und regelmäßig aktualisiert werden.',
    },
    {
      iconName: 'fileText',
      title: 'Lernmaterial',
      lead: 'Skripte und Handouts zu unseren Kursen',
      text: 'Ergänzend zu unseren Kursen stellen wir Ihnen Skripte, Handouts und weiterführende Literaturempfehlungen zur Verfügung. Die Materialien sind auf die Kursinhalte abgestimmt und helfen Ihnen, das Gelernte zu vertiefen und im Berufsalltag nachzuschlagen.',
    },
    {
      iconName: 'listChecks',
      title: 'Übungsaufgaben',
      lead: 'Praxisnahe Aufgaben zur Wissensüberprüfung',
      text: 'Testen Sie Ihr Wissen mit unseren praxisnahen Übungsaufgaben. Ob Fallbeispiele, Multiple-Choice-Fragen oder Situationsaufgaben – unsere Übungen orientieren sich an realen Pflegesituationen und eignen sich ideal zur Prüfungsvorbereitung oder zur Auffrischung Ihres Fachwissens.',
    },
  ],
  cta: 'Fragen zu unseren Lernmaterialien? Melden Sie sich jederzeit bei uns.',
});

export const aktuelles = topicPage({
  path: '/aktuelles/',
  title: 'Aktuelles',
  crumbs: [{ label: 'Aktuelles' }],
  description:
    'Neuigkeiten aus dem Institut, Dokumente zum Herunterladen und Antworten auf häufige Fragen rund um Kurse, Anmeldung und Förderung bei interQualitas.',
  heroTitle: 'Aktuelles',
  heroLead: html`<p>Neues aus unserem Institut und der Pflegebildung, Dokumente zum Herunterladen und Antworten auf Ihre häufigsten Fragen.</p>`,
  illu: 'mann-refresher-praxisanleitung',
  columns: 3,
  items: [
    {
      id: 'neuigkeiten',
      iconName: 'bell',
      title: 'Neuigkeiten',
      lead: 'Neues aus unserem Institut und der Pflegebildung.',
      text: 'Hier halten wir Sie über aktuelle Entwicklungen bei Interqualitas auf dem Laufenden. Erfahren Sie mehr über neue Kursangebote, Termine, Veranstaltungen und Neuigkeiten aus unserem Institut. Schauen Sie regelmäßig vorbei – es gibt immer etwas Neues zu entdecken.',
    },
    {
      id: 'download',
      iconName: 'download',
      title: 'Download',
      lead: 'Dokumente und Unterlagen zum Herunterladen.',
      text: 'In unserem Downloadbereich finden Sie wichtige Dokumente und Unterlagen zum Herunterladen – von Kursübersichten und Anmeldeformularen bis hin zu Informationsblättern rund um unser Bildungsangebot. So haben Sie alle relevanten Unterlagen jederzeit griffbereit.',
    },
    {
      id: 'faq',
      iconName: 'help',
      title: 'FAQ',
      lead: 'Antworten auf Ihre häufigsten Fragen',
      text: 'Sie haben Fragen zu unseren Kursen, Anmeldeverfahren oder Fördermöglichkeiten? In unseren häufig gestellten Fragen finden Sie Antworten auf die wichtigsten Themen rund um Ihr Bildungsangebot bei Interqualitas. Sollte Ihre Frage nicht dabei sein, kontaktieren Sie uns gerne persönlich.',
    },
  ],
  cta: 'Ihre Frage war nicht dabei? Kontaktieren Sie uns gerne persönlich.',
});

export const ausbildungen = {
  path: '/ausbildungen/',
  title: 'Ausbildungen',
  description:
    'Ausbildungen bei interQualitas: Wir arbeiten an der Zulassung eines Pflegefachseminars. In Planung sind die Ausbildung zur Pflegefachkraft und zur Pflegeassistenz.',
  render() {
    return html`
${hero({
  title: 'Unsere Ausbildungen',
  crumbs: [LEISTUNGEN, { label: 'Ausbildungen' }],
  lead: html`<p><strong>Derzeit bieten wir noch keine Ausbildung nach dem Pflegeberufegesetz an.</strong> Wir arbeiten an der Zulassung eines Pflegefachseminars – sobald Ausbildungen bei uns möglich sind, informieren wir Sie hier.</p>`,
  actions: html`${button({ label: 'Zu unseren Weiterbildungen', url: '/qualifizierung/', iconName: 'arrowRight', iconAfter: true })}${contactButton('Kontakt aufnehmen', 'secondary')}`,
  illu: 'schuelerin',
})}
<section class="section">
  <div class="container">
    <div class="card-grid card-grid--2">
      ${featureCard({
        iconName: 'graduationCap',
        title: 'Ausbildung zur Pflegefachkraft',
        lead: 'In Planung',
        text: 'Die dreijährige generalistische Ausbildung zur Pflegefachfrau bzw. zum Pflegefachmann nach dem Pflegeberufegesetz qualifiziert für die Versorgung von Menschen aller Altersgruppen in der Akut-, Langzeit- und ambulanten Pflege.',
      })}
      ${featureCard({
        iconName: 'heart',
        title: 'Ausbildung zur Pflegeassistenz',
        lead: 'In Planung',
        text: 'Die Ausbildung zur Pflegeassistenz bietet einen Einstieg in die professionelle Pflege und eignet sich besonders für Quereinsteiger:innen und Berufsrückkehrer:innen.',
      })}
    </div>
  </div>
</section>
${ctaBand({ text: 'Sie möchten informiert werden, sobald Ausbildungen bei uns möglich sind? Sprechen Sie uns an.' })}
`;
  },
};
