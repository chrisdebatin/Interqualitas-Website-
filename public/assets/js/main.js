// interQualitas – progressive Verbesserungen. Ohne JavaScript bleibt jede
// Seite vollständig nutzbar (alle Inhalte sichtbar, Links funktionieren).
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ------------------------------------------------------------ Header
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Desktop-Untermenüs: per Button (Tastatur/Touch) auf- und zuklappen.
  const toggles = $$('.nav__toggle');
  const closeAll = (except) => {
    toggles.forEach((t) => {
      if (t !== except) t.setAttribute('aria-expanded', 'false');
    });
  };
  toggles.forEach((toggle) => {
    const item = toggle.closest('.nav__item');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      closeAll(toggle);
      toggle.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-closed', open);
    });
    item.addEventListener('mouseleave', () => {
      toggle.setAttribute('aria-expanded', 'false');
      item.classList.remove('is-closed');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav__item')) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = toggles.find((t) => t.getAttribute('aria-expanded') === 'true');
    if (open) {
      closeAll();
      open.focus();
    }
  });
  // Fokus verlässt ein geöffnetes Untermenü → schließen
  toggles.forEach((toggle) => {
    const item = toggle.closest('.nav__item');
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) toggle.setAttribute('aria-expanded', 'false');
    });
    item.addEventListener('mouseenter', () => item.classList.remove('is-closed'));
  });

  // Mobiles Menü
  const menuToggle = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    const setMenu = (open) => {
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileMenu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
    };
    menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });
    window.matchMedia('(min-width: 1140px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // ------------------------------------------------------- Kursfilter
  const filterForm = $('[data-course-filter]');
  if (filterForm) {
    const cards = $$('[data-course]');
    const count = $('[data-filter-count]');
    const empty = $('[data-filter-empty]');
    const controls = $$('[data-filter]', filterForm);
    const params = new URLSearchParams(window.location.search);

    // Zustand aus der URL übernehmen (teilbare Filter-Links)
    controls.forEach((el) => {
      const value = params.get(el.name);
      if (value == null) return;
      if (el.type === 'checkbox') el.checked = value === '1';
      else el.value = value;
    });

    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    const apply = () => {
      const state = {};
      controls.forEach((el) => {
        state[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim();
      });
      const terms = normalize(state.q || '').split(/\s+/).filter(Boolean);

      let visible = 0;
      cards.forEach((card) => {
        const d = card.dataset;
        const match =
          (!state.bundesland || d.bundesland.split('|').includes(state.bundesland)) &&
          (!state.fachrichtung || d.fachrichtung === state.fachrichtung) &&
          (!state.art || d.art === state.art) &&
          (!state.typ || d.typ === state.typ) &&
          (!state.azav || d.azav === '1') &&
          terms.every((t) => normalize(d.search).includes(t));
        card.hidden = !match;
        if (match) visible += 1;
      });

      count.textContent = visible === cards.length
        ? `${cards.length} Kurse`
        : `${visible} von ${cards.length} Kursen`;
      empty.hidden = visible > 0;

      const next = new URLSearchParams();
      Object.entries(state).forEach(([k, v]) => {
        if (v === true) next.set(k, '1');
        else if (v) next.set(k, v);
      });
      const query = next.toString();
      history.replaceState(null, '', query ? `?${query}${location.hash}` : location.pathname + location.hash);
    };

    filterForm.addEventListener('input', apply);
    filterForm.addEventListener('change', apply);
    filterForm.addEventListener('submit', (e) => e.preventDefault());
    filterForm.addEventListener('reset', () => setTimeout(apply));
    apply();
  }

  // ------------------------------------------------------ Kontaktformular
  const form = $('[data-contact-form]');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const topic = $('[data-topic]', form);
    const preset = params.get('kurs') || params.get('anliegen');
    if (preset && topic) {
      const option = [...topic.options].find((o) => o.value === preset || o.text === preset);
      if (option) topic.value = option.value;
      else topic.add(new Option(preset, preset, true, true), 0);
    }

    const status = $('[data-form-status]', form);
    const showStatus = (msg, kind) => {
      status.hidden = false;
      status.textContent = msg;
      status.className = `form-status is-${kind}`;
    };

    const validate = () => {
      let firstInvalid = null;
      $$('[required]', form).forEach((field) => {
        const error = $(`#${field.id}-error`, form);
        const valid = field.checkValidity() && field.value.trim() !== '';
        field.setAttribute('aria-invalid', String(!valid));
        if (error) {
          error.hidden = valid;
          if (!valid) field.setAttribute('aria-describedby', error.id);
        }
        if (!valid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.website && form.website.value) return; // Spam-Schutz (Honeypot)
      if (!validate()) return;

      const data = new FormData(form);
      if (form.dataset.mode === 'endpoint') {
        const button = $('button[type="submit"]', form);
        button.disabled = true;
        try {
          const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(String(res.status));
          form.reset();
          showStatus('Vielen Dank! Ihre Nachricht ist bei uns eingegangen. Wir melden uns so schnell wie möglich.', 'success');
        } catch {
          showStatus(`Das hat leider nicht geklappt. Bitte rufen Sie uns an oder schreiben Sie an ${form.dataset.email}.`, 'error');
        } finally {
          button.disabled = false;
        }
        return;
      }

      // Ohne Formular-Backend: E-Mail-Programm mit vorausgefüllter Nachricht öffnen.
      const subject = `Anfrage über die Website: ${data.get('anliegen')}`;
      const body = [
        `Name: ${data.get('name')}`,
        `E-Mail: ${data.get('email')}`,
        data.get('telefon') ? `Telefon: ${data.get('telefon')}` : null,
        `Anliegen: ${data.get('anliegen')}`,
        '',
        data.get('nachricht'),
      ].filter((l) => l !== null).join('\n');
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showStatus(`Ihr E-Mail-Programm wurde mit Ihrer Nachricht geöffnet. Falls nicht, schreiben Sie uns bitte direkt an ${form.dataset.email}.`, 'success');
    });

    form.addEventListener('input', (e) => {
      const field = e.target;
      if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity() && field.value.trim()) {
        field.setAttribute('aria-invalid', 'false');
        const error = $(`#${field.id}-error`, form);
        if (error) error.hidden = true;
      }
    });
  }

  // ---------------------------------------------------- Einblendeffekte
  // Elemente werden erst versteckt, wenn der Observer meldet, dass sie
  // außerhalb des Sichtbereichs liegen – so bleibt nie Inhalt unsichtbar.
  const revealables = $$('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealables.length && 'IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.remove('reveal-pending');
            io.unobserve(el);
          } else if (!el.dataset.revealSeen) {
            el.classList.add('reveal-pending');
          }
          el.dataset.revealSeen = '1';
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    revealables.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });
  }
})();
