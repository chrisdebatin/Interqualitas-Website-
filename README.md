# interQualitas – Website

Neuaufbau von [www.interqualitas.de](https://www.interqualitas.de/): gleiche Inhalte und gleiches Corporate Design (Logo, Petrolblau `#204051`, Koralle `#F05454`, Beige `#E8DED6`, Helvetica, Illustrationen), technisch und gestalterisch modernisiert.

Die Seite ist **statisch**: Ein kleines Node-Skript ohne Abhängigkeiten erzeugt reines HTML/CSS/JS in `dist/`, das auf jedem Webspace oder Static-Hoster läuft. Es gibt kein CMS, keine Datenbank, keine Cookies und keine Drittanbieter-Skripte.

## Schnellstart

Voraussetzung: Node.js ≥ 18.

```bash
npm run dev       # baut die Seite, startet http://localhost:4321 und baut bei Änderungen neu
npm run build     # erzeugt die fertige Website in dist/
npm run check     # baut und prüft alle internen Links und Anker
```

## Struktur

```
build.mjs                 Seitengenerator → dist/
src/site.mjs              Stammdaten: Telefon, E-Mail, Adresse, Navigation, Formular-Ziel
src/data/courses.mjs      Alle 22 Kurse (Texte, UE, Filterwerte, AZAV-Preise)
src/data/content.mjs      Leistungsbereiche, Stimmen der Teilnehmer:innen, Team
src/content/datenschutz.html   Datenschutzerklärung (wortgleich übernommen)
src/pages/*.mjs           Seiten (Startseite, Leistungen, Qualifizierung, …)
src/components.mjs        Header, Footer, Hero, Karten, CTA-Band
public/assets/            CSS, JavaScript, Logo, Illustrationen, Fotos, Siegel
scripts/                  Vorschau-Server und Linkprüfung
```

## Inhalte pflegen

- **Kurs ändern oder hinzufügen:** Eintrag in `src/data/courses.mjs` bearbeiten. Kursseite, Kursübersicht, Filter, Kontaktformular-Auswahl und Sitemap werden automatisch erzeugt. AZAV-Kurse bekommen `azav: true` und ein `costs`-Objekt.
- **Telefon, E-Mail, Adresse:** nur in `src/site.mjs` ändern; das wirkt auf alle Seiten.
- **Menü:** `nav` in `src/site.mjs`.

## Alle bisherigen URLs bleiben erhalten

Alle 37 Seiten der alten Sitemap existieren unter derselben Adresse (z. B. `/qualifizierung/wundtherapeut/`, `/qualifizierung/beratung-nach-§45-sgb-xi/`). Rankings und externe Links bleiben dadurch gültig. Zusätzlich werden `sitemap.xml`, `robots.txt` und eine `404.html` erzeugt.

## Was gegenüber der alten Seite besser ist

- **Design:** eingerückte, abgerundete Flächen; Illustrationen auf einer Bogen-Bühne mit Punktmuster; handgezeichnete Koralle-Unterstreichung in Überschriften; Zahlenleiste, Bento-Raster für die Leistungsbereiche, Kurskarten mit Fachrichtungs-Icons und der Claim „Gemeinsam. Wissen. Vermittelt.“ im Footer – alles in den bestehenden CI-Farben.
- **Kursübersicht** mit Sofortfilter (Suche, Bundesland, Fachrichtung, Art, Typ, „nur AZAV-gefördert“). Filter sind per Link teilbar, z. B. `/qualifizierung/?azav=1`.
- **Kursseiten** mit Kurzübersicht, Preis-Tabelle, grafischer Aufteilung der Unterrichtseinheiten, verwandten Kursen und einem Button „Beratung & Anmeldung“, der den Kurs im Kontaktformular vorausfüllt.
- **Barrierefreiheit (WCAG 2.1 AA, relevant für das BFSG):** ausreichende Kontraste, Tastaturbedienung, Skip-Link, sichtbarer Fokus und reduzierte Bewegung, wenn im System eingestellt. Für Buttons mit weißer Schrift wird ein etwas kräftigeres Korallrot (`#D63C3C`) verwendet, weil Weiß auf `#F05454` den Kontrast nicht erfüllt. Logo und Akzente bleiben im Original-Farbton.
- **SEO:** individuelle Titel und Meta-Beschreibungen (die alte Seite hatte keine), Open-Graph-Vorschaubild, strukturierte Daten (`EducationalOrganization`, `Course` mit Preis, Brotkrumen).
- **Mobil:** Menü mit aufklappbaren Bereichen und eine feste Schnellkontakt-Leiste (Anrufen · E-Mail · Kurse).
- **Datenschutz und Tempo:** keine Tracker, keine eingebettete Google-Karte (stattdessen ein Link „Route planen“), keine Webfonts von Drittservern und eine sehr kleine Seitengröße.

## Offene Punkte (bitte vor dem Livegang klären)

1. **Postleitzahl:** Die alte Seite nennt im Footer **40477**, im Impressum und unter „Über uns“ **40227**. Übernommen wurde **40227** (Impressum). Bitte bestätigen.
2. **Datenschutzerklärung:** an die neue Seite angepasst (Stand Oktober 2026): GitHub Pages als Hoster inkl. US-Datentransfer, keine Cookies und kein Tracking, Kontaktformular per E-Mail-Programm, Betroffenenrechte und zuständige Aufsichtsbehörde (LDI NRW). Noch rechtlich prüfen lassen, insbesondere: (a) ob mit GitHub ein Auftragsverarbeitungsvertrag nötig bzw. möglich ist, (b) verantwortliche Stelle ist jetzt die interQualitas GmbH mit der Hauptnummer – vorher stand dort Alexander Höfken mit +49 211 6002119.
3. **Kontaktformular:** Ohne Backend öffnet es das E-Mail-Programm der Besucher:innen mit vorausgefüllter Nachricht (so steht es auch in der Datenschutzerklärung). Für echten Versand einen Formular-Dienst oder ein eigenes Backend in `contactFormEndpoint` (`src/site.mjs`) eintragen und die Datenschutzerklärung ergänzen.
4. **Praxisanleitung in der Pflege:** Auf der alten Seite waren die Texte zu „10 % der Ausbildungszeit“ und „Zwischen-/Abschlussprüfung“ vertauscht. Das ist korrigiert. Für „Übernahme und Sicherung der Fachkraftquote“ gab es nur einen doppelten (falschen) Text. Dort steht jetzt nur die Unterzeile; bitte einen eigenen Text liefern.
5. **Menüpunkt „Netzwerkpartner“** wurde entfernt, weil es auf der alten Seite keinen Inhalt dazu gab.
6. **Aktuelles (Neuigkeiten, Download, FAQ)** und **Pflegekurse für Angehörige** enthalten wie bisher nur Einleitungstexte bzw. den Hinweis „im Ausbau“.
7. **`/kurse/`** existierte auf der alten Seite als zweite Kursübersicht und ist erhalten. Optional kann sie per Weiterleitung auf `/qualifizierung/` zeigen.
8. **Neu hinzugefügte Verbindungstexte** zur Freigabe: Abschnittsüberschriften (z. B. „Ausgewählte Weiterbildungen“, „Unser Bildungsangebot für die Pflege“), die vier Punkte der Vertrauensleiste auf der Startseite, die Sätze in den Kontakt-Bändern der Unterseiten und die Meta-Beschreibungen.

## Deployment

Die Seite läuft auf **GitHub Pages**. Jeder Push auf `main` startet `.github/workflows/deploy.yml`: Die Seite wird gebaut, alle Links werden geprüft, und erst danach wird veröffentlicht. Schlägt die Prüfung fehl, bleibt die alte Version online.

Domain: `www.interqualitas.de` (in den Repo-Einstellungen unter *Pages → Custom domain*). Die DNS-Einträge liegen bei Strato:

| Name | Typ | Wert |
|---|---|---|
| `interqualitas.de` | A | `185.199.108.153` (optional zusätzlich `.109.153`, `.110.153`, `.111.153`) |
| `interqualitas.de` | AAAA | `2606:50c0:8000::153` (optional zusätzlich `8001`, `8002`, `8003`) |
| `www` | CNAME | `chrisdebatin.github.io.` |

E-Mail-Einträge (MX `mx.alphadesk.de`, SPF, DMARC, `autodiscover`) bleiben unverändert.
