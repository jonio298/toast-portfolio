import { useState } from 'react';
import {
  ClipboardCheck,
  CookingPot,
  MonitorCog,
  Network,
  RadioTower,
  Store,
} from 'lucide-react';

const emptyConsultation = {
  name: '',
  restaurant: '',
  location: '',
  phone: '',
  preferredTime: '',
  details: '',
};

function ConsultationPage() {
  const [formData, setFormData] = useState(emptyConsultation);
  const [status, setStatus] = useState('idle');

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sent');
  }

  return (
    <div className="site-shell consultation-shell">
      <header className="consultation-header">
        <a className="brand" href="/" aria-label="Go to homepage">
          <img className="brand-mark" src="/jonathan-shelley-logo.svg" alt="" />
          <span>
            <strong>Jonathan Shelley</strong>
            <small>Traveling Field Tech</small>
          </span>
        </a>
      </header>

      <main className="consultation-page">
        <section className="consultation-card" aria-labelledby="consultation-title">
         
          <h2 id="consultation-title">Tell me what needs to be fixed, installed, or cleaned up.</h2>
          <br>
          </br>
          <p>
            Fill in the details below. The form layout is ready, and the send action will
            be connected once the site has hosted request storage.
          </p>

          <form className="consultation-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label htmlFor="consultation-name">Name</label>
              <input
                id="consultation-name"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="consultation-restaurant">Name of restaurant</label>
              <input
                id="consultation-restaurant"
                value={formData.restaurant}
                onChange={(event) => updateField('restaurant', event.target.value)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="consultation-location">Location</label>
              <input
                id="consultation-location"
                value={formData.location}
                onChange={(event) => updateField('location', event.target.value)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="consultation-phone">Phone number</label>
              <input
                id="consultation-phone"
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="consultation-time">Preferred time to talk</label>
              <input
                id="consultation-time"
                value={formData.preferredTime}
                onChange={(event) => updateField('preferredTime', event.target.value)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="consultation-details">What do you need help with?</label>
              <textarea
                id="consultation-details"
                value={formData.details}
                onChange={(event) => updateField('details', event.target.value)}
                rows="8"
              />
            </div>
            <button className="button primary" type="submit" disabled={status === 'sending'}>
              Preview consultation request
            </button>
            {status === 'sent' && (
              <p className="form-status success">Looks good. Sending will be connected after hosting storage is set up.</p>
            )}
            {status === 'error' && (
              <p className="form-status error">Could not save the request. Make sure the local dev server is running.</p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleLogin(event) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/admin/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setRequests(data.requests);
      setStatus('authorized');
    } catch {
      setRequests('');
      setStatus('error');
    }
  }

  async function handleClearAll() {
    const confirmed = window.confirm('Clear all saved consultation requests?');

    if (!confirmed) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/admin/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Clear failed');
      }

      setRequests(data.requests);
      setStatus('authorized');
    } catch {
      setStatus('authorized');
    }
  }

  function renderRequestLine(line, index) {
    const fieldMatch = line.match(/^([^:\n]+:)(.*)$/);

    if (!fieldMatch) {
      return <div key={`${line}-${index}`}>{line || '\u00a0'}</div>;
    }

    return (
      <div key={`${line}-${index}`}>
        <span className="request-field-label">{fieldMatch[1]}</span>
        <span>{fieldMatch[2]}</span>
      </div>
    );
  }

  return (
    <div className="site-shell consultation-shell">
      <header className="consultation-header">
        <a className="brand" href="/" aria-label="Go to homepage">
          <img className="brand-mark" src="/jonathan-shelley-logo.svg" alt="" />
          <span>
            <strong>Jonathan Shelley</strong>
            <small>Admin</small>
          </span>
        </a>
      </header>

      <main className="consultation-page">
        <section className="consultation-card admin-card" aria-labelledby="admin-title">
          <p className="eyebrow">Owner access</p>
          <h2 id="admin-title">Consultation requests</h2>

          {status !== 'authorized' && (
            <form className="consultation-form admin-login" onSubmit={handleLogin}>
              <label htmlFor="admin-username">User</label>
              <input
                id="admin-username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button className="button primary" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Checking...' : 'Log in'}
              </button>

              {status === 'error' && (
                <p className="form-status error">Login failed. Check the user and password.</p>
              )}
            </form>
          )}

          {status === 'authorized' && (
            <div className="admin-viewer">
              <div className="admin-viewer-top">
                <span>Local request file</span>
                <div className="admin-actions">
                  <button className="button danger" type="button" onClick={handleClearAll}>
                    Clear all
                  </button>
                  <button className="button secondary" type="button" onClick={() => setStatus('idle')}>
                    Log out
                  </button>
                </div>
              </div>
              <div className="request-log" aria-label="Saved consultation requests">
                {requests.split('\n').map(renderRequestLine)}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ServiceIcon({ Icon }) {
  return (
    <span className="service-icon" aria-hidden="true">
      <Icon size={34} strokeWidth={2.6} />
    </span>
  );
}

const pageCopy = {
  en: {
    languageButton: 'ESP',
    brandRole: 'Traveling Field Tech',
    servingLabel: 'Currently Serving:',
    servingArea: 'Santa Fe + Albuquerque',
    nav: ['About', 'Services', 'Contact'],
    eyebrow: 'Toast POS systems / menu help / printers / network installs',
    heroTitle: 'Restaurant tech that works when service starts.',
    heroText:
      'Toast setup, menu routing, printers, networking, and go-live support for restaurants that need reliable systems on day one.',
    contactCta: 'Contact me',
    servicesCta: 'View services',
    liveReadout: 'FIELD READOUT',
    ready: 'Ready',
    serviceArea: 'Service area',
    maybeSoon: 'maybe soon',
    metrics: [
      ['Terminals', 'POS + printers online'],
      ['Menus', 'Items routed correctly'],
      ['Network', 'Router + switch checked'],
    ],
    aboutEyebrow: 'About me',
    aboutTitle: 'I understand the restaurant floor and the systems behind it.',
    aboutText: [
      'I have installed Toast systems and built menus for restaurants across the country, helping teams get terminals, printers, routing, and menu workflows ready for service.',
      'I know restaurants inside and out. With years of experience in both the kitchen and front of house, I understand how a restaurant actually operates, how fast problems need to be solved, and how important clear communication is when the team is trying to stay focused on guests.',
    ],
    servicesEyebrow: 'Services',
    servicesTitle: 'Technical support that stays grounded in outcomes.',
    services: [
      ['POS Terminal and Printer Install', 'Terminal setup, printer installation, device checks, and troubleshooting when stations or printers are not communicating.'],
      ['Menu Help', 'Building, editing, and routing menus so items, prep stations, and print paths are organized for real service workflows.'],
      ['Networking Setup', 'Toast router, switch, printer, and connected-device setup with practical troubleshooting across the local network.'],
      ['New Restaurant Setup', 'Hands-on support for new locations, including Toast hardware, menus, printers, routing, and launch-ready system checks.'],
      ['GO LIVE! Support', 'Opening-day support for Toast launches, with on-site or remote options to help teams troubleshoot and keep service moving.'],
      ['Post-Launch Cleanup', 'Follow-up support after opening day to adjust menus, fix routing issues, clean up device settings, and smooth out team workflows.'],
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'Need a system installed, cleaned up, or brought back online?',
    contactText: 'I am available for installation, troubleshooting, technical setup work, and field support projects.',
    consultation: 'Schedule free consultation!',
    email: 'Email me',
    call: 'Call me',
    footer: 'Designed in React by Jonathan Shelley',
  },
  es: {
    languageButton: 'ENG',
    brandRole: 'Tecnico de Campo Movil',
    servingLabel: 'Actualmente sirviendo:',
    servingArea: 'Santa Fe + Albuquerque',
    nav: ['Sobre mi', 'Servicios', 'Contacto'],
    eyebrow: 'Toast POS / menus / impresoras / redes',
    heroTitle: 'Tecnologia de restaurante lista cuando empieza el servicio.',
    heroText:
      'Instalacion de Toast, rutas de menu, impresoras, redes y soporte de apertura para restaurantes que necesitan sistemas confiables desde el primer dia.',
    contactCta: 'Contactame',
    servicesCta: 'Ver servicios',
    liveReadout: 'LECTURA DE CAMPO',
    ready: 'Listo',
    serviceArea: 'Area de servicio',
    maybeSoon: 'tal vez pronto',
    metrics: [
      ['Terminales', 'POS + impresoras en linea'],
      ['Menus', 'Articulos bien enrutados'],
      ['Red', 'Router + switch revisados'],
    ],
    aboutEyebrow: 'Sobre mi',
    aboutTitle: 'Entiendo el piso del restaurante y los sistemas que lo mantienen funcionando.',
    aboutText: [
      'He instalado sistemas Toast y construido menus para restaurantes en todo el pais, ayudando a equipos a dejar terminales, impresoras, rutas y flujos de menu listos para el servicio.',
      'Conozco los restaurantes por dentro y por fuera. Con anos de experiencia en cocina y frente de casa, entiendo como opera un restaurante, que tan rapido se deben resolver los problemas y la importancia de comunicarse claro cuando el equipo esta enfocado en los clientes.',
    ],
    servicesEyebrow: 'Servicios',
    servicesTitle: 'Soporte tecnico enfocado en resultados reales.',
    services: [
      ['Instalacion de terminales POS e impresoras', 'Configuracion de terminales, instalacion de impresoras, revision de dispositivos y solucion de problemas cuando estaciones o impresoras no se comunican.'],
      ['Ayuda con menus', 'Creacion, edicion y enrutamiento de menus para que articulos, estaciones de preparacion y rutas de impresion funcionen con el flujo real del servicio.'],
      ['Configuracion de red', 'Configuracion de router Toast, switch, impresoras y dispositivos conectados, con solucion practica de problemas en la red local.'],
      ['Apertura de nuevo restaurante', 'Soporte en sitio para nuevas ubicaciones, incluyendo hardware Toast, menus, impresoras, rutas y revision del sistema antes de abrir.'],
      ['Soporte GO LIVE!', 'Soporte el dia de apertura para lanzamientos Toast, con opciones en sitio o remoto para resolver problemas y mantener el servicio avanzando.'],
      ['Limpieza despues del lanzamiento', 'Soporte despues de abrir para ajustar menus, arreglar rutas, limpiar configuraciones de dispositivos y mejorar flujos del equipo.'],
    ],
    contactEyebrow: 'Contacto',
    contactTitle: 'Necesitas instalar, limpiar o volver a poner en linea un sistema?',
    contactText: 'Estoy disponible para instalacion, solucion de problemas, configuracion tecnica y proyectos de soporte en campo.',
    consultation: 'Programa una consulta gratis!',
    email: 'Enviame un email',
    call: 'Llamame',
    footer: 'Disenado en React por Jonathan Shelley',
  },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const copy = pageCopy[language];
  const serviceIcons = [MonitorCog, ClipboardCheck, Network, Store, RadioTower, CookingPot];

  if (window.location.pathname === '/consultation') {
    return <ConsultationPage />;
  }

  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Go to homepage">
          <img className="brand-mark" src="/jonathan-shelley-logo.svg" alt="" />
          <span>
            <strong>Jonathan Shelley</strong>
            <small>{copy.brandRole}</small>
          </span>
        </a>

        <p className="header-service-area">
          <span>{copy.servingLabel}</span>
          <strong>{copy.servingArea}</strong>
        </p>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">{copy.nav[0]}</a>
          <a href="#services">{copy.nav[1]}</a>
          <a href="#contact">{copy.nav[2]}</a>
        </nav>

        <button
          className="language-toggle"
          type="button"
          onClick={() => setLanguage((current) => (current === 'en' ? 'es' : 'en'))}
        >
          {copy.languageButton}
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>{copy.nav[0]}</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>{copy.nav[1]}</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>{copy.nav[2]}</a>
          <button
            className="mobile-language-toggle"
            type="button"
            onClick={() => {
              setLanguage((current) => (current === 'en' ? 'es' : 'en'));
              setIsMenuOpen(false);
            }}
          >
            {copy.languageButton}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="hero-title">{copy.heroTitle}</h2>
            <p className="hero-lede">
              {copy.heroText}
            </p>

            <div className="hero-actions" aria-label="Main actions">
              <a className="button primary" href="#contact">{copy.contactCta}</a>
              <a className="button secondary" href="#services">{copy.servicesCta}</a>
            </div>
          </div>

          <div className="systems-panel" aria-label="Field systems overview">
            <div className="panel-topline">
              <span><strong className="live-word">LIVE</strong> {copy.liveReadout}</span>
              <span className="status-pill">
                <span className="status-led" aria-hidden="true" />
                {copy.ready}
              </span>
            </div>

            <div className="system-map">
              <div className="map-label">
                <span>{copy.serviceArea}</span>
                <strong>{copy.servingArea}</strong>
              </div>

              <svg className="us-map" viewBox="0 0 640 390" role="img" aria-label="Regional Southwest map with a radar marker near Santa Fe, New Mexico">
                <g className="regional-map">
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-az" d="M138 113 L282 113 L282 292 L222 292 L205 318 L150 302 L130 220 Z" />
                    <g className="state-tooltip" transform="translate(158 198)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">{copy.maybeSoon}</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-co" d="M282 63 L416 63 L416 113 L282 113 Z" />
                    <g className="state-tooltip" transform="translate(308 78)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">{copy.maybeSoon}</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-ok" d="M416 113 L520 113 L520 153 L416 153 Z" />
                    <g className="state-tooltip" transform="translate(428 126)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">{copy.maybeSoon}</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-tx" d="M416 153 L528 153 L558 224 L520 326 L458 308 L416 288 Z" />
                    <g className="state-tooltip" transform="translate(452 220)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">{copy.maybeSoon}</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-mx" d="M244 296 L416 296 L458 308 L420 340 L250 340 Z" />
                    <g className="state-tooltip sombrero-tooltip" transform="translate(326 300)">
                      <path className="sombrero-brim" d="M3 24 C15 34, 49 34, 61 24 C48 28, 16 28, 3 24Z" />
                      <path className="sombrero-crown" d="M20 23 C22 8, 42 8, 44 23Z" />
                      <path className="sombrero-band" d="M20 21H44" />
                    </g>
                  </g>
                  <path className="state-shape state-new-mexico" d="M282 113 L416 113 L416 282 L352 282 L352 296 L282 296 Z" />

                  <path className="state-line" d="M282 113 L416 113 M352 282 L416 282 M352 282 L352 296 M416 153 L520 153 M416 288 L458 308 M244 296 L416 296" />

                  <text className="state-label" x="190" y="214">AZ</text>
                  <text className="state-label" x="340" y="96">CO</text>
                  <text className="state-label" x="458" y="140">OK</text>
                  <text className="state-label" x="476" y="238">TX</text>
                  <text className="state-label state-label-active" x="331" y="220">NM</text>
                </g>

                <circle className="radar-ring ring-one" cx="348" cy="170" r="28" />
                <circle className="radar-ring ring-two" cx="348" cy="170" r="52" />
                <circle className="radar-ring ring-three" cx="348" cy="170" r="78" />
                <circle className="radar-halo" cx="348" cy="170" r="15" />
                <circle className="radar-core" cx="348" cy="170" r="9" />
                <path className="abq-link" d="M348 170 C342 184, 337 196, 330 210" />
                <circle className="abq-dot" cx="330" cy="210" r="5" />
              </svg>

            </div>

            <div className="metrics-grid">
              {copy.metrics.map(([label, value]) => (
                <div key={label}>
                  <span className="metric-leds" aria-hidden="true">
                    <span className="metric-led green" />
                    <span className="metric-led red" />
                  </span>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section page-band" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">{copy.aboutEyebrow}</p>
            <h2 id="about-title">{copy.aboutTitle}</h2>
          </div>
          <div className="about-copy">
            {copy.aboutText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="services-section page-band" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">{copy.servicesEyebrow}</p>
            <h2 id="services-title">{copy.servicesTitle}</h2>
          </div>

          <div className="service-grid">
            {copy.services.map(([title, description], index) => (
              <article className="service-card" key={title}>
                <ServiceIcon Icon={serviceIcons[index]} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">{copy.contactEyebrow}</p>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p>
              {copy.contactText}
            </p>
          </div>

          <div className="contact-actions">
            <a
              className="button primary"
              href="/consultation"
            >
              {copy.consultation}
            </a>
            <a className="button secondary" href="mailto:jonshelley85@gmail.com">{copy.email}</a>
            <a className="button secondary" href="tel:+17173306130">{copy.call}</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{copy.footer}</span>
      </footer>
    </div>
  );
}

export default App;
