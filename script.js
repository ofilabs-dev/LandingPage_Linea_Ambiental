// Canal principal de cotización: WhatsApp.
// Cambia solo este número (formato internacional, sin + ni espacios) y todos los enlaces se actualizan.
const WHATSAPP_NUMBER = '573207592276';
const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, quiero solicitar una cotización de los servicios de la Línea Ambiental.';

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = buildWhatsAppUrl(link.dataset.whatsapp || WHATSAPP_DEFAULT_MESSAGE);
  link.target = '_blank';
  link.rel = 'noopener';
});

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cierra el menú desplegable al hacer scroll, para que no tape el contenido.
  const closeNavOnScroll = () => {
    if (mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };
  window.addEventListener('scroll', closeNavOnScroll, { passive: true });
}

const tabs = document.querySelectorAll('.service-tab');
const panels = document.querySelectorAll('.service-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });

    panels.forEach((panel) => {
      const active = panel.id === `panel-${target}`;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  });
});

// Formulario de cotización: valida los datos y abre WhatsApp con el mensaje ya estructurado.
const quoteForm = document.querySelector('#quote-form');

if (quoteForm) {
  const fields = {
    nombre: quoteForm.querySelector('#qf-nombre'),
    telefono: quoteForm.querySelector('#qf-telefono'),
    servicio: quoteForm.querySelector('#qf-servicio'),
    municipio: quoteForm.querySelector('#qf-municipio'),
    detalle: quoteForm.querySelector('#qf-detalle'),
  };
  const leyCheckbox = quoteForm.querySelector('#qf-ley1581');
  const leyError = quoteForm.querySelector('#qf-error-ley1581');
  const successNote = quoteForm.querySelector('#qf-success');
  const fallbackLink = quoteForm.querySelector('#qf-fallback');

  // Un número colombiano válido tiene 10 dígitos (o 12 con el indicativo 57 incluido).
  const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 12 && digits.startsWith('57'));
  };

  const validators = {
    nombre: (value) => value.trim().length >= 3,
    telefono: isValidPhone,
    servicio: (value) => value !== '',
    municipio: (value) => value.trim().length >= 3,
    detalle: (value) => value.trim().length >= 5,
  };

  const showFieldError = (input, hasError) => {
    const wrapper = input.closest('.form-field');
    const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
    input.setAttribute('aria-invalid', String(hasError));
    if (errorEl) errorEl.hidden = !hasError;
  };

  const validateField = (name) => {
    const ok = validators[name](fields[name].value);
    showFieldError(fields[name], !ok);
    return ok;
  };

  Object.keys(fields).forEach((name) => {
    fields[name].addEventListener('blur', () => {
      if (fields[name].value !== '') validateField(name);
    });
  });

  leyCheckbox.addEventListener('change', () => {
    if (leyCheckbox.checked) {
      leyError.hidden = true;
      leyCheckbox.setAttribute('aria-invalid', 'false');
    }
  });

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    Object.keys(fields).forEach((name) => {
      if (!validateField(name) && !firstInvalid) firstInvalid = fields[name];
    });

    const leyAccepted = leyCheckbox.checked;
    leyError.hidden = leyAccepted;
    leyCheckbox.setAttribute('aria-invalid', String(!leyAccepted));

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    if (!leyAccepted) {
      leyCheckbox.focus();
      return;
    }

    const message = [
      'Hola OFILABS, quiero solicitar una cotización.',
      '',
      `• Nombre: ${fields.nombre.value.trim()}`,
      `• Teléfono: ${fields.telefono.value.trim()}`,
      `• Servicio: ${fields.servicio.value}`,
      `• Municipio: ${fields.municipio.value.trim()}`,
      `• Detalle: ${fields.detalle.value.trim().slice(0, 500)}`,
      '',
      'Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012.',
    ].join('\n');

    const url = buildWhatsAppUrl(message);
    if (fallbackLink) fallbackLink.href = url;
    window.open(url, '_blank', 'noopener');

    if (successNote) {
      successNote.hidden = false;
      successNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
