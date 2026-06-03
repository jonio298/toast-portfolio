import { useState } from 'react';

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
    setStatus('sending');

    const message = [
      `Name: ${formData.name}`,
      `Name of restaurant: ${formData.restaurant}`,
      `Location: ${formData.location}`,
      `Phone number: ${formData.phone}`,
      `Preferred time to talk: ${formData.preferredTime}`,
      '',
      'What do you need help with?',
      formData.details,
    ].join('\n');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('sent');
      setFormData(emptyConsultation);
    } catch {
      setStatus('error');
    }
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
            Fill in the details below and hit send. While this site is running locally,
            the request will be saved to a text file on this computer.
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
              {status === 'sending' ? 'Saving request...' : 'Send consultation request'}
            </button>
            {status === 'sent' && (
              <p className="form-status success">Saved to consultation-requests.txt.</p>
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

function App() {
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
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Toast POS systems / menu help / printers / network installs</p>
            <h2 id="hero-title">Reliable, experienced restaurant tech, installed and fixed in the field.</h2>
            <p className="hero-lede">
              I help restaurants get Toast front-end workflows and back-end setup online,
              routed, printing, and ready for real service pressure.
            </p>

            <div className="hero-actions" aria-label="Main actions">
              <a className="button primary" href="#contact">Contact me</a>
              <a className="button secondary" href="#services">View services</a>
            </div>
          </div>

          <div className="systems-panel" aria-label="Field systems overview">
            <div className="panel-topline">
              <span>LIVE FIELD READOUT</span>
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
                  <path className="state-shape state-muted" d="M126 118 L264 118 L264 292 L224 292 L208 312 L144 298 L126 218 Z" />
                  <path className="state-shape state-muted" d="M264 66 L408 66 L408 118 L264 118 Z" />
                  <path className="state-shape state-muted" d="M408 118 L486 118 L486 164 L408 164 Z" />
                  <path className="state-shape state-muted" d="M408 164 L524 164 L548 232 L516 312 L456 300 L424 264 L408 264 Z" />
                  <path className="state-shape state-muted" d="M300 300 L424 264 L456 300 L420 336 L304 336 Z" />
                  <path className="state-shape state-new-mexico" d="M264 118 L408 118 L408 264 L424 264 L424 300 L300 300 L300 284 L264 284 Z" />

                  <path className="state-line" d="M264 118 L408 118 M264 284 L300 284 L300 300 M408 164 L486 164 M408 264 L424 264 M300 300 L424 300" />

                  <text className="state-label" x="193" y="214">AZ</text>
                  <text className="state-label" x="329" y="96">CO</text>
                  <text className="state-label" x="444" y="147">OK</text>
                  <text className="state-label" x="473" y="236">TX</text>
                  <text className="state-label state-label-active" x="323" y="223">NM</text>
                </g>

                <circle className="radar-ring ring-one" cx="336" cy="178" r="28" />
                <circle className="radar-ring ring-two" cx="336" cy="178" r="52" />
                <circle className="radar-ring ring-three" cx="336" cy="178" r="78" />
                <circle className="radar-halo" cx="336" cy="178" r="15" />
                <circle className="radar-core" cx="336" cy="178" r="9" />
                <path className="abq-link" d="M336 178 C330 190, 324 202, 318 216" />
                <circle className="abq-dot" cx="318" cy="216" r="5" />
              </svg>

            </div>

            <div className="metrics-grid">
              <div>
                <span>Response</span>
                <strong>Service-ready systems</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>Install to uptime</strong>
              </div>
              <div>
                <span>Environment</span>
                <strong>Restaurants + offices</strong>
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
              
              <h3>POS Terminal and Printer Install</h3>
              <p>Terminal setup, printer installation, device checks, and troubleshooting when stations or printers are not communicating.</p>
            </article>
            <article className="service-card">
              
              <h3>Menu Help</h3>
              <p>Building, editing, and routing menus so items, prep stations, and print paths are organized for real service workflows.</p>
            </article>
            <article className="service-card">
              
              <h3>Networking Setup</h3>
              <p>Toast router, switch, printer, and connected-device setup with practical troubleshooting across the local network.</p>
            </article>
            <article className="service-card">
              
              <h3>New Restaurant Setup</h3>
              <p>Hands-on support for new locations, including Toast hardware, menus, printers, routing, and launch-ready system checks.</p>
            </article>
            <article className="service-card">
              
              <h3>GO LIVE! Support</h3>
              <p>Opening-day support for Toast launches, with on-site or remote options to help teams troubleshoot and keep service moving.</p>
            </article>
            <article className="service-card">
              
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
