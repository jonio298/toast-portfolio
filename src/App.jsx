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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <small>Traveling Field Tech</small>
          </span>
        </a>

        <p className="header-service-area">
          <span>Currently Serving:</span>
          <strong>Santa Fe + Albuquerque</strong>
        </p>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

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
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Toast POS systems / menu help / printers / network installs</p>
            <h2 id="hero-title">Restaurant tech that works when service starts.</h2>
            <p className="hero-lede">
              Toast setup, menu routing, printers, networking, and go-live support for
              restaurants that need reliable systems on day one.
            </p>

            <div className="hero-actions" aria-label="Main actions">
              <a className="button primary" href="#contact">Contact me</a>
              <a className="button secondary" href="#services">View services</a>
            </div>
          </div>

          <div className="systems-panel" aria-label="Field systems overview">
            <div className="panel-topline">
              <span><strong className="live-word">LIVE</strong> FIELD READOUT</span>
              <span className="status-pill">
                <span className="status-led" aria-hidden="true" />
                Ready
              </span>
            </div>

            <div className="system-map">
              <div className="map-label">
                <span>Service area</span>
                <strong>Santa Fe + Albuquerque</strong>
              </div>

              <svg className="us-map" viewBox="0 0 640 390" role="img" aria-label="Regional Southwest map with a radar marker near Santa Fe, New Mexico">
                <g className="regional-map">
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-az" d="M138 113 L282 113 L282 292 L222 292 L205 318 L150 302 L130 220 Z" />
                    <g className="state-tooltip" transform="translate(158 198)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">maybe soon</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-co" d="M282 63 L416 63 L416 113 L282 113 Z" />
                    <g className="state-tooltip" transform="translate(308 78)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">maybe soon</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-ok" d="M416 113 L520 113 L520 153 L416 153 Z" />
                    <g className="state-tooltip" transform="translate(428 126)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">maybe soon</text>
                    </g>
                  </g>
                  <g className="inactive-state-group">
                    <path className="state-shape state-muted state-tx" d="M416 153 L528 153 L558 224 L520 326 L458 308 L416 288 Z" />
                    <g className="state-tooltip" transform="translate(452 220)">
                      <rect width="82" height="24" rx="7" />
                      <text x="41" y="16">maybe soon</text>
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
                  <path className="state-shape state-new-mexico" d="M282 113 L416 113 L416 296 L352 296 L352 282 L282 282 Z" />

                  <path className="state-line" d="M282 113 L416 113 M282 282 L352 282 L352 296 M416 153 L520 153 M416 288 L458 308 M244 296 L416 296" />

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
              <div>
                <span className="metric-leds" aria-hidden="true">
                  <span className="metric-led green" />
                  <span className="metric-led red" />
                </span>
                <span>Terminals</span>
                <strong>POS + printers online</strong>
              </div>
              <div>
                <span className="metric-leds" aria-hidden="true">
                  <span className="metric-led green" />
                  <span className="metric-led red" />
                </span>
                <span>Menus</span>
                <strong>Items routed correctly</strong>
              </div>
              <div>
                <span className="metric-leds" aria-hidden="true">
                  <span className="metric-led green" />
                  <span className="metric-led red" />
                </span>
                <span>Network</span>
                <strong>Router + switch checked</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section page-band" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">About me</p>
            <h2 id="about-title">I work where software meets messy real-world hardware.</h2>
          </div>
          <div className="about-copy">
            <p>
              I have installed Toast systems and built menus for restaurants across the
              country, helping teams get terminals, printers, routing, and menu workflows
              ready for service.
            </p>
            <p>
              I know restaurants inside and out. With years of experience in both the
              kitchen and front of house, I understand how a restaurant actually operates,
              how fast problems need to be solved, and how important clear communication is
              when the team is trying to stay focused on guests.
            </p>
          </div>
        </section>

        <section className="services-section page-band" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2 id="services-title">Technical support that stays grounded in outcomes.</h2>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <ServiceIcon Icon={MonitorCog} />
              <h3>POS Terminal and Printer Install</h3>
              <p>Terminal setup, printer installation, device checks, and troubleshooting when stations or printers are not communicating.</p>
            </article>
            <article className="service-card">
              <ServiceIcon Icon={ClipboardCheck} />
              <h3>Menu Help</h3>
              <p>Building, editing, and routing menus so items, prep stations, and print paths are organized for real service workflows.</p>
            </article>
            <article className="service-card">
              <ServiceIcon Icon={Network} />
              <h3>Networking Setup</h3>
              <p>Toast router, switch, printer, and connected-device setup with practical troubleshooting across the local network.</p>
            </article>
            <article className="service-card">
              <ServiceIcon Icon={Store} />
              <h3>New Restaurant Setup</h3>
              <p>Hands-on support for new locations, including Toast hardware, menus, printers, routing, and launch-ready system checks.</p>
            </article>
            <article className="service-card">
              <ServiceIcon Icon={RadioTower} />
              <h3>GO LIVE! Support</h3>
              <p>Opening-day support for Toast launches, with on-site or remote options to help teams troubleshoot and keep service moving.</p>
            </article>
            <article className="service-card">
              <ServiceIcon Icon={CookingPot} />
              <h3>Post-Launch Cleanup</h3>
              <p>Follow-up support after opening day to adjust menus, fix routing issues, clean up device settings, and smooth out team workflows.</p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Need a system installed, cleaned up, or brought back online?</h2>
            <p>
              I am available for installation, troubleshooting, technical setup work,
              and field support projects.
            </p>
          </div>

          <div className="contact-actions">
            <a
              className="button primary"
              href="/consultation"
            >
              Schedule free consultation!
            </a>
            <a className="button secondary" href="mailto:jonshelley85@gmail.com">Email me</a>
            <a className="button secondary" href="tel:+17173306130">Call me</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
