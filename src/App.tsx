import { useState } from "react";
import {
  ArrowRight, Check, ChevronDown, CircleDot, CloudOff, Code2, Command,
  Copy, Download, GitBranch, KeyRound, Menu, Monitor, Network, Play, ShieldCheck,
  Terminal, X, Zap,
} from "lucide-react";

const features = [
  { icon: Terminal, title: "A terminal that keeps up", text: "Multi-tab sessions, split panes, broadcast input, and a fast async SSH engine built for serious work.", tone: "mint" },
  { icon: Network, title: "See the whole cluster", text: "Save multi-server workspaces and launch your entire infrastructure in one click.", tone: "blue" },
  { icon: KeyRound, title: "Your keys stay yours", text: "Encrypted local vault for hosts, identities, snippets, and private keys. No account required.", tone: "violet" },
  { icon: Code2, title: "More than SSH", text: "Move files with dual-pane SFTP, edit remote configs, and manage tunnels without leaving the app.", tone: "orange" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Termimus home">
    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
    <span>termimus<span className="brand-dot">.</span></span>
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const syncCompose = `services:
  termimus-sync:
    image: ghcr.io/itsmefdil/termimus-sync:latest
    container_name: termimus-sync
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - ./data:/data
    environment:
      - PORT=8080
      - DB_PATH=/data/sync.db
      - TERMIMUS_AUTH_TOKEN=your-secure-random-token`;
  const copyCommand = () => {
    navigator.clipboard?.writeText(syncCompose);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <div className="page" id="top">
    <div className="announcement"><span className="pulse" /> Termimus v0.2 is out <a href="#download">Get the latest release <ArrowRight size={14} /></a></div>
    <header className="nav shell">
      <Logo />
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#security" onClick={() => setMenuOpen(false)}>Security</a>
        <a href="#sync" onClick={() => setMenuOpen(false)}>Sync server</a>
        <a href="https://github.com/itsmefdil/termimus-ssh" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub <GitBranch size={15} /></a>
        <a className="nav-download" href="#download" onClick={() => setMenuOpen(false)}>Download <ArrowRight size={15} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> OPEN SOURCE · LOCAL-FIRST</div>
          <h1>Your servers.<br /><em>Your keys.</em><br />Your control.</h1>
          <p className="hero-lead">A beautiful, secure SSH client for people who care where their infrastructure lives. Connect, organize, and operate without giving your secrets to a third party.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#download"><Download size={17} /> Download for free <ArrowRight size={16} /></a>
            <a className="button button-quiet" href="https://github.com/itsmefdil/termimus-ssh" target="_blank" rel="noreferrer"><GitBranch size={17} /> View on GitHub</a>
          </div>
          <div className="platforms"><span>Available for</span><span><Monitor size={14} /> Linux</span><span><span className="apple">●</span> macOS</span><span><Monitor size={14} /> Windows</span></div>
        </div>
        <div className="hero-art" aria-label="Termimus application preview">
          <img className="product-shot" src={`${import.meta.env.BASE_URL}termimus-hosts.png`} alt="Termimus hosts dashboard showing organized server groups and SSH connections" />
          <div className="glow" />
          <div className="terminal-window">
            <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>termimus / production</span><span className="window-lock"><ShieldCheck size={13} /> encrypted</span></div>
            <div className="terminal-body">
              <aside><div className="sidebar-label">WORKSPACES <span>+</span></div><div className="side-item active"><span className="folder">⌁</span> Production <b>4</b></div><div className="side-item"><span className="folder">⌁</span> Staging <b>2</b></div><div className="sidebar-label hosts-label">HOSTS <span>•••</span></div><div className="side-item muted"><CircleDot size={10} /> api-01</div><div className="side-item muted"><CircleDot size={10} /> db-primary</div><div className="side-item muted"><CircleDot size={10} /> edge-router</div></aside>
              <div className="code-pane"><div className="tab-row"><span className="tab active-tab"><CircleDot size={9} /> api-01</span><span className="tab"><CircleDot size={9} /> db-primary</span><span className="tab-add">+</span></div><div className="code"><div><span className="line-no">01</span><span className="green">➜</span> <span className="cyan">api-01</span> <span className="dim">~</span> <span className="white">git status</span></div><div><span className="line-no">02</span><span className="dim">On branch </span><span className="yellow">main</span></div><div><span className="line-no">03</span><span className="dim">Your branch is up to date with </span><span className="green">'origin/main'</span></div><br /><div><span className="line-no">05</span><span className="green">➜</span> <span className="cyan">api-01</span> <span className="dim">~</span> <span className="white">docker compose ps</span></div><div><span className="line-no">06</span><span className="blue">NAME</span><span className="dim">                 STATUS</span></div><div><span className="line-no">07</span><span className="white">api-server</span><span className="dim">           </span><span className="green">Up 14 minutes</span></div><div><span className="line-no">08</span><span className="white">worker</span><span className="dim">              </span><span className="green">Up 14 minutes</span></div><div className="cursor-line"><span className="line-no">09</span><span className="green">➜</span> <span className="cyan">api-01</span> <span className="dim">~</span> <span className="cursor" /></div></div></div>
            </div>
            <div className="status-bar"><span><span className="status-dot" /> Connected</span><span>SSH · 22</span><span className="status-right">AES-256-GCM <ShieldCheck size={11} /></span></div>
          </div>
          <div className="floating-card"><Zap size={15} /><span><strong>4 sessions</strong><small>connected securely</small></span><Check size={15} /></div>
        </div>
      </section>

      <section className="trust-row"><div className="shell trust-inner"><span>BUILT FOR THE WAY YOU WORK</span><div className="trust-line" /><span className="trust-tag"><CloudOff size={15} /> NO CLOUD ACCOUNT REQUIRED</span><span className="trust-tag"><ShieldCheck size={15} /> ZERO-KNOWLEDGE BY DESIGN</span></div></section>

      <section className="section shell" id="features"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE TOOLBOX</div><h2>Everything you need.<br /><span>Nothing in your way.</span></h2></div><p>Termimus brings the daily tools of a modern infrastructure team into one focused, native workspace.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, text, tone }) => <article className={`feature-card ${tone}`} key={title}><div className="feature-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><a href="#download">Explore feature <ArrowRight size={14} /></a></article>)}</div></section>

      <section className="security-section" id="security"><div className="shell security-layout"><div><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE BY DEFAULT</div><h2>Built with a<br /><span>healthy paranoia.</span></h2><p className="security-lead">Your infrastructure is not our business. Termimus is local-first from the ground up, so your credentials and connection data never need to leave your machine.</p><a className="text-link" href="https://github.com/itsmefdil/termimus-ssh/blob/main/README.md#-security--cryptography-model" target="_blank" rel="noreferrer">Read our security model <ArrowRight size={16} /></a></div><div className="security-list"><div className="security-item"><div className="security-number">01</div><div><h3>AES-256-GCM vault</h3><p>Passwords and keys are encrypted at rest with Argon2id-derived keys.</p></div><ShieldCheck /></div><div className="security-item"><div className="security-number">02</div><div><h3>Trust on first use</h3><p>Host fingerprints are verified on every SSH, SFTP, and tunnel connection.</p></div><KeyRound /></div><div className="security-item"><div className="security-number">03</div><div><h3>Blind sync relay</h3><p>Self-host the relay. It stores ciphertext, never your plaintext.</p></div><CloudOff /></div></div></div></section>

      <section className="sync-section shell" id="sync"><div className="sync-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR INFRASTRUCTURE, YOUR RULES</div><h2>Sync on your<br /><span>own terms.</span></h2><p>Need your setup on another machine? Run the lightweight Go relay on your own server. End-to-end encryption means the relay can connect your devices without ever being able to read your data.</p><div className="command-box compose-box"><pre>{syncCompose}</pre><button onClick={copyCommand} aria-label="Copy Docker Compose configuration">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><small className="command-note"><Check size={13} /> Copy this as <code>docker-compose.yml</code> · under 20 MB RAM</small></div><div className="sync-visual"><div className="sync-node node-laptop"><Monitor size={24} /><span>work laptop</span><small>encrypted data</small></div><div className="connection"><span /><span /><span /></div><div className="sync-server"><div className="server-icon"><Network size={25} /></div><span>your relay</span><small>blind storage</small></div><div className="connection reverse"><span /><span /><span /></div><div className="sync-node node-home"><Monitor size={24} /><span>home desktop</span><small>encrypted data</small></div></div></section>

      <section className="download-section shell" id="download"><div className="download-card"><div className="download-copy"><div className="eyebrow"><span className="eyebrow-line" /> START CONNECTING</div><h2>Make your terminal<br /><em>feel like home.</em></h2><p>Free, open source, and built for the long haul.</p><a className="button button-primary" href="https://github.com/itsmefdil/termimus-ssh/releases/latest" target="_blank" rel="noreferrer"><Download size={17} /> Download Termimus <ArrowRight size={16} /></a><small>v0.2.1 · MIT License · No account required</small></div><div className="download-mark"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Termimus" /><div className="mark-ring" /></div></div></section>
    </main>

    <footer className="footer shell"><Logo compact /><span>© 2025 Termimus. Crafted for people who ship.</span><div><a href="https://github.com/itsmefdil/termimus-ssh" target="_blank" rel="noreferrer">GitHub</a><a href="#security">Security</a><a href="https://github.com/itsmefdil/termimus-ssh/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a></div></footer>
  </div>;
}

export default App;
