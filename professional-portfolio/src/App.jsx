import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Cable,
  Camera,
  Code2,
  Gamepad2,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Mountain,
  Music,
  Network,
  Play,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Wrench,
  X,
} from 'lucide-react'

const jobs = [
  {
    date: 'Aug 2025 — Present',
    company: 'Self-Employed',
    role: 'Remote Projects',
    summary: 'Independent web development, game design, and technical projects delivered remotely.',
    bullets: [
      'Designing responsive React interfaces and polished portfolio experiences.',
      'Building Chalkboard Dungeon in Godot, including gameplay, UI, progression, and visual direction.',
      'Managing scope, testing, iteration, and communication from concept through deployment.',
    ],
  },
  {
    date: 'Jul 2024 — Jul 2025',
    company: 'F3 Technologies',
    role: 'Field Implementation Technician',
    summary: 'Implemented commercial network systems and provided on-site technical support.',
    bullets: [
      'Installed and configured network hardware and software for commercial clients.',
      'Performed cable terminations, VLAN setup, and network troubleshooting.',
      'Delivered customer training and assisted with secure network infrastructure.',
    ],
  },
  {
    date: 'Apr 2024 — Aug 2025',
    company: 'KIT Communications',
    role: 'Field Technician',
    summary: 'Installed, maintained, and troubleshot connected systems in varied field environments.',
    bullets: [
      'Installed and serviced camera systems, networking equipment, software, and hardware.',
      'Completed cable terminations and fiber-optic splicing with an emphasis on reliable, clean work.',
      'Diagnosed technical issues, performed maintenance, and supported broader field systems.',
    ],
  },
  {
    date: 'May 2008 — Oct 2011',
    company: 'Staples',
    role: 'Easy Tech Associate',
    summary: 'Customer-facing hardware and software support in Lancaster, Pennsylvania.',
    bullets: [
      'Troubleshot PCs, performed upgrades, and installed software.',
      'Provided technical guidance and managed sales of IT products and accessories.',
    ],
  },
]

const projects = [
  {
    type: 'Featured game',
    title: 'Chalkboard Dungeon',
    copy: 'A hand-built action dungeon where classroom doodles, water-powered weapons, and playful systems collide.',
    tags: ['Godot', 'GDScript', 'Game systems', 'UI design'],
    href: '/projects/chalkboard-dungeon',
    playUrl: '/chalkboard-dungeon/index.html',
    featured: true,
    status: 'In active development',
  },
  {
    type: 'Web application',
    title: 'CarComparePro',
    copy: 'A responsive React app for comparing vehicles, with authentication, favorites, and API-driven data.',
    tags: ['React', 'REST API', 'Responsive UI'],
    href: 'https://github.com/jonio298',
  },
  {
    type: 'Web application',
    title: 'To-Do List',
    copy: 'A stylized API-backed task manager with saving, deleting, and a clear, focused user experience.',
    tags: ['JavaScript', 'API', 'UI design'],
    href: 'https://github.com/jonio298',
  },
]

const skillGroups = [
  {
    Icon: Code2,
    title: 'Web Development',
    intro: 'Responsive experiences ready for real users.',
    items: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Python', 'Node.js', 'Flask', 'REST APIs', 'MySQL', 'Git & GitHub'],
  },
  {
    Icon: Gamepad2,
    title: 'Game Design',
    intro: 'Playable systems with a distinct visual identity.',
    items: ['Godot', 'GDScript', 'Gameplay systems', 'UI & HUD design', 'Progression', 'Balancing', 'Playtesting', 'Interaction design'],
  },
  {
    Icon: Network,
    title: 'Networking & IT',
    intro: 'Infrastructure, diagnosis, and practical support.',
    items: ['Routing & switching', 'VLANs', 'TCP/IP', 'DNS & DHCP', 'VPNs', 'Firewalls', 'Remote support', 'Ticketing systems'],
  },
  {
    Icon: Wrench,
    title: 'Field Systems',
    intro: 'Reliable installation from cable to configuration.',
    items: ['Camera systems', 'Fiber-optic splicing', 'Cable terminations', 'Cable toning', 'Hardware installation', 'Software setup', 'Maintenance', 'Troubleshooting'],
  },
]

function Brand() {
  return (
    <a className="brand" href="/#top" aria-label="Roaming Sketch Studio home">
      <img src="/jonathan-shelley-logo.svg" alt="" />
      <span><b>Roaming Sketch Studio</b><small>Jonathan Shelley · Designer · Developer</small></span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header>
      <Brand />
      <div className="location"><span className="location-status"><i aria-hidden="true" /><small>Current location</small></span><b>Santa Fe</b></div>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        <a href="/#projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="/resume" onClick={() => setOpen(false)}>Experience & Skills</a>
        <a href="/bio" onClick={() => setOpen(false)}>Bio</a>
        <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
      <button onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </header>
  )
}

function LocationRadar() {
  return (
    <div className="radar-panel" aria-label="Current location and creative disciplines">
      <div className="panel-top"><span><b>LIVE</b> CREATIVE SYSTEMS</span><span className="ready"><i />AVAILABLE</span></div>
      <div className="map-stage">
        <div className="map-label"><small>Current location</small><strong>Santa Fe, New Mexico</strong></div>
        <svg className="southwest-map" viewBox="0 0 640 390" role="img" aria-label="Southwest map with Santa Fe marked in New Mexico">
          <path className="state muted" d="M138 113 L282 113 L282 292 L222 292 L205 318 L150 302 L130 220 Z" />
          <path className="state muted" d="M282 63 L416 63 L416 113 L282 113 Z" />
          <path className="state muted" d="M416 113 L520 113 L520 153 L416 153 Z" />
          <path className="state muted" d="M416 153 L528 153 L558 224 L520 326 L458 308 L416 288 Z" />
          <path className="state active" d="M282 113 L416 113 L416 282 L352 282 L352 296 L282 296 Z" />
          <text x="185" y="214">AZ</text><text x="337" y="96">CO</text><text x="458" y="140">OK</text><text x="476" y="238">TX</text><text className="active-label" x="329" y="223">NM</text>
          <circle className="pulse p1" cx="348" cy="170" r="28" /><circle className="pulse p2" cx="348" cy="170" r="52" /><circle className="pulse p3" cx="348" cy="170" r="78" />
          <circle className="map-core" cx="348" cy="170" r="10" />
        </svg>
        <div className="discipline-list" aria-label="Skills">
          <strong>Skills:</strong>
          <span className="discipline"><Code2 />Web design</span>
          <span className="discipline"><Gamepad2 />Game design</span>
          <span className="discipline"><Network />Field tech</span>
        </div>
      </div>
      <div className="readouts">
        <span><i />BUILDING<b>Responsive interfaces</b></span>
        <span><i />PLAYTESTING<b>Chalkboard Dungeon</b></span>
        <span><i />CONNECTED<b>Reliable Starlink setup</b></span>
      </div>
    </div>
  )
}

function Tags({ items }) {
  return <div className="tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
}

function Project({ project }) {
  const external = project.href.startsWith('http')
  return (
    <article className={`project ${project.featured ? 'featured' : ''}`}>
      {project.featured && <div className="project-art logo-art"><img src="/chalkboard-dungeon-logo.png" alt="Chalkboard Dungeon logo" /></div>}
      <div>
        <div className="project-meta"><span>{project.type}</span>{project.status && <em>{project.status}</em>}</div>
        <h3>{project.title}</h3><p>{project.copy}</p><Tags items={project.tags} />
        <div className="project-links">
          <a className="text-link" href={project.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            {project.featured ? 'Explore the project' : 'View on GitHub'} <ArrowUpRight size={17} />
          </a>
          {project.playUrl && <a className="play-link" href={project.playUrl} target="_blank" rel="noreferrer"><Play size={16} fill="currentColor" />Play now</a>}
        </div>
      </div>
    </article>
  )
}

function Intro({ eyebrow, title, copy }) {
  return <div className="intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function WorkStyle() {
  return (
    <section className="work-style" aria-labelledby="work-style-title">
      <div className="work-style-lead">
        <p className="eyebrow">HOW I WORK</p>
        <h2 id="work-style-title">Independent drive. Team-first mindset.</h2>
      </div>
      <div className="work-style-copy">
        <p>I do my best work with people who care about building something useful. I enjoy being part of a collaborative team, and I’m equally comfortable taking ownership, solving problems independently, and keeping a project moving without constant supervision.</p>
        <p>I’m an honest, reliable, and hardworking technical professional with years of experience across IT, field systems, and web development—and a growing focus on video game design. I stay with the work until it feels polished, dependable, and ready to deploy.</p>
        <div className="work-values">
          <span><Users />Collaborative teammate</span>
          <span><Sparkles />Polish-driven</span>
          <span><Wifi />Remote-ready via Starlink</span>
        </div>
      </div>
      <aside className="remote-note">
        <RadioTower />
        <p className="eyebrow">LOOKING FOR</p>
        <strong>A steady, full-time remote opportunity.</strong>
        <p>I currently live a flexible, nomadic lifestyle and maintain reliable internet wherever I travel. I’m ready to bring consistency, curiosity, and hands-on experience to a team that values thoughtful design and dependable execution.</p>
      </aside>
    </section>
  )
}

function Home() {
  return (
    <div className="shell">
      <Header />
      <main id="top">
        <section className="hero">
          <div>
            <p className="eyebrow">ROAMING SKETCH STUDIO · WEB · GAME · TECH</p>
            <h1>I build useful things with <span>character.</span></h1>
            <p className="lede">I’m Jonathan Shelley—a designer and developer who combines creative ideas with hands-on technical experience. I build responsive websites, game systems, and reliable real-world installations.</p>
            <p className="remote-statement">After a year of traveling, I’ve built a reliable remote setup and a working rhythm that lets me contribute from anywhere. I’m looking for a genuinely remote role with a team that values consistency, ownership, and thoughtful work.</p>
            <div className="actions"><a className="button primary" href="#projects">See my work <ArrowUpRight size={18} /></a><a className="button" href="mailto:jonio298@gmail.com">Let’s talk</a></div>
            <div className="facts"><span><MapPin />Santa Fe, New Mexico</span><span><RadioTower />Seeking full-time remote work</span></div>
          </div>
          <LocationRadar />
        </section>

        <WorkStyle />

        <section className="section" id="projects">
          <Intro eyebrow="SELECTED WORK" title="Projects that show how I think." copy="Creative concepts backed by working systems, deliberate interfaces, and the persistence to keep improving them." />
          <div className="projects">{projects.map((project) => <Project project={project} key={project.title} />)}</div>
        </section>

        <section className="contact" id="contact">
          <div><p className="eyebrow">CONTACT</p><h2>Let’s build something useful together.</h2><p>I’m looking for a full-time remote role where I can contribute to web projects, product design, game systems, or technical implementation—and grow with a good team.</p></div>
          <div className="actions"><a className="button primary" href="mailto:jonio298@gmail.com"><Mail />Email me</a><a className="button" href="https://github.com/jonio298" target="_blank" rel="noreferrer"><Code2 />GitHub</a></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ResumePage() {
  return (
    <div className="shell resume-page">
      <Header />
      <main>
        <a className="back" href="/"><ArrowLeft />Back home</a>
        <section className="resume-hero">
          <div><p className="eyebrow">EXPERIENCE & SKILLS</p><h1>A creative technologist who knows how to <span>deliver.</span></h1></div>
          <p className="lede">My experience crosses web development, game design, networking, and hands-on field implementation. That range helps me see the whole system—not just the part in front of me.</p>
        </section>

        <section className="section resume-section" id="experience">
          <Intro eyebrow="EXPERIENCE" title="Creative work, grounded in the field." copy="Software, networking, customer support, physical installation, and independent product development." />
          <div className="timeline">{jobs.map((job) => (
            <article key={`${job.company}-${job.date}`}>
              <div className="date">{job.date}</div>
              <div><p className="company">{job.company}</p><h3>{job.role}</h3><p>{job.summary}</p><ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
            </article>
          ))}</div>
        </section>

        <section className="section resume-section" id="skills">
          <Intro eyebrow="CAPABILITIES" title="A practical, creative toolkit." copy="I can move between a design problem, a code problem, and a hardware problem—and understand how each affects the final experience." />
          <div className="skills expanded">{skillGroups.map(({ Icon, title, intro, items }) => (
            <article key={title}><Icon /><h3>{title}</h3><p>{intro}</p><Tags items={items} /></article>
          ))}</div>
        </section>

        <section className="credentials">
          <article><GraduationCap /><div><p className="eyebrow">EDUCATION</p><h3>Full Stack Software Engineering</h3><p>4Geeks Academy · 2023</p><h3>Computer Information Systems</h3><p>HACC, Lancaster Campus · 2010–2014</p></div></article>
          <article><ShieldCheck /><div><p className="eyebrow">RECOGNITION</p><h3>2nd Place, State Computer Fair</h3><p>2008</p><h3>Employee of the Month</h3><p>Staples Easy Tech · 2010</p></div></article>
        </section>

        <section className="contact">
          <div><p className="eyebrow">READY TO CONTRIBUTE</p><h2>Looking for a dependable teammate?</h2><p>I’m available for full-time remote roles across web design, front-end development, game design, and technical implementation.</p></div>
          <a className="button primary" href="mailto:jonio298@gmail.com"><Mail />Contact me</a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function BioPage() {
  return (
    <div className="shell bio-page">
      <Header />
      <main>
        <a className="back" href="/"><ArrowLeft />Back home</a>
        <section className="bio-hero">
          <div>
            <p className="eyebrow">A LITTLE MORE ABOUT ME</p>
            <h1>Curious by nature. Always <span>creating.</span></h1>
          </div>
          <div className="bio-intro">
            <p>I’m Jonathan Shelley, a designer, developer, and lifelong problem-solver. My background has taken me from customer-facing technical support to field installations, networking, web development, and independent game design. I enjoy working with a thoughtful team, but I’m equally comfortable taking an idea, finding the path forward, and carrying it through to a polished result.</p>
            <p>I currently live a nomadic lifestyle, moving when inspiration—or a good trail—calls. Reliable Starlink internet keeps me fully connected and ready for steady remote work wherever I’m based. Traveling has made me adaptable, observant, and comfortable solving problems in new environments.</p>
          </div>
        </section>

        <section className="passion-grid">
          <article><Music /><p className="eyebrow">MUSIC</p><h2>Original sound, built into the game.</h2><p>I play guitar and write music. Chalkboard Dungeon features my own original music, giving me another way to shape the atmosphere, pacing, and personality of the experience.</p></article>
          <article><Mountain /><p className="eyebrow">OUTDOORS</p><h2>Finding perspective on the trail.</h2><p>Hiking is how I reset, explore, and stay curious. I’m drawn to landscapes that make you slow down and notice the details—a habit that carries directly into my design work.</p></article>
          <article><Camera /><p className="eyebrow">DRONE PHOTOGRAPHY</p><h2>Seeing familiar places differently.</h2><p>Drone photography combines technology, composition, and exploration. I love finding a perspective that reveals the shape and character of a place from above.</p><a className="text-link" href="/photography">Open the photography album <ArrowUpRight /></a></article>
        </section>

        <section className="bio-quote">
          <span>“</span>
          <p>I’m at my best when I can combine technical problem-solving with imagination—and leave the finished work better than anyone expected.</p>
        </section>

        <section className="contact">
          <div><p className="eyebrow">LET’S CONNECT</p><h2>Good work starts with a good conversation.</h2><p>If my combination of creative thinking, technical experience, and independent drive sounds useful to your team, I’d love to talk.</p></div>
          <a className="button primary" href="mailto:jonio298@gmail.com"><Mail />Email me</a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function PhotographyPage() {
  return (
    <div className="shell photography-page">
      <Header />
      <main>
        <a className="back" href="/bio"><ArrowLeft />Back to bio</a>
        <section className="album-hero">
          <div><p className="eyebrow">DRONE PHOTOGRAPHY</p><h1>Views from <span>above.</span></h1></div>
          <p className="lede">A growing visual record of the landscapes, roads, and places I discover while traveling.</p>
        </section>
        <section className="album-empty">
          <Camera />
          <p className="eyebrow">FIRST COLLECTION COMING NEXT</p>
          <h2>The album is ready for takeoff.</h2>
          <p>The gallery structure is in place. Add a selection of original drone photographs here to tell the visual side of the journey.</p>
          <a className="button" href="mailto:jonio298@gmail.com?subject=Drone%20Photography">Ask about my photography</a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Footer() {
  return <footer><span>Roaming Sketch Studio · Jonathan Shelley</span><span>React · 2026</span></footer>
}

function GamePage() {
  return (
    <div className="shell">
      <Header />
      <main>
        <a className="back" href="/#projects"><ArrowLeft />All projects</a>
        <section className="case-hero">
          <div><p className="eyebrow">INDEPENDENT GAME PROJECT · PLAYABLE NOW</p><h1>Chalkboard<br /><span>Dungeon</span></h1><p className="lede">A playful action dungeon built around hand-drawn classroom energy, water-powered combat, procedural rewards, and systems that invite experimentation.</p><Tags items={['Godot', 'GDScript', 'Solo development', 'Game design']} /><a className="button primary case-play" href="/chalkboard-dungeon/index.html"><Play fill="currentColor" />Play Chalkboard Dungeon</a></div>
          <div className="case-art logo-case"><img src="/chalkboard-dungeon-logo.png" alt="Chalkboard Dungeon logo" /><small>Original game logo</small></div>
        </section>
        <section className="stats"><div><b>ROLE</b><span>Designer & developer</span></div><div><b>FOCUS</b><span>Combat, progression, UI</span></div><div><b>STATUS</b><span>Playable development build</span></div></section>
        <section className="case-copy"><Intro eyebrow="THE PROJECT" title="Learning by building the whole loop." /><div><p>Chalkboard Dungeon is my proving ground for game design: visual identity, moment-to-moment play, item systems, balancing, and technical implementation all have to support one another.</p><p>I’ve built weapon and upgrade systems, loot behavior, player interactions, stage progression, menus, visual feedback, and a growing collection of playful items. The work is still evolving—and that iteration is an important part of the story.</p></div></section>
        <section className="showcase"><div><p className="eyebrow">SYSTEM DESIGN</p><h2>Weapons, upgrades, and readable choices.</h2><p>The icon language gives each upgrade a distinct identity while keeping decisions readable.</p></div><img src="/chalkboard-upgrades.png" alt="Colorful upgrade icons from Chalkboard Dungeon" /></section>
        <section className="contact"><div><p className="eyebrow">PLAY THE BUILD</p><h2>The dungeon is open.</h2><p>Try the current browser build and experience the combat, progression, visual identity, and systems firsthand.</p></div><a className="button primary" href="/chalkboard-dungeon/index.html"><Play fill="currentColor" />Play now</a></section>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  if (location.pathname.startsWith('/projects/chalkboard-dungeon')) return <GamePage />
  if (location.pathname.startsWith('/resume')) return <ResumePage />
  if (location.pathname.startsWith('/photography')) return <PhotographyPage />
  if (location.pathname.startsWith('/bio')) return <BioPage />
  return <Home />
}
