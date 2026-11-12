import { useState } from "react";
import { VERSION, downloads, releasesUrl, detectPlatform } from "./release";
import AiCopilot from "./sections/AiCopilot";
import Showcase from "./sections/Showcase";
import "./sections.css";
import {
  ArrowRight, Check, ChevronDown, CloudOff, Code2, Command,
  Copy, Download, FolderSync, GitBranch, KeyRound, Menu, Monitor, Network, Play, ShieldCheck,
  Sparkles, Terminal, Waypoints, X, Zap,
} from "lucide-react";

const features = [
  { icon: Terminal, title: "Remote & local terminal", link: "https://github.com/termimus/termimus-ssh#%EF%B8%8F-native-terminal-experience", text: "Work over SSH or an integrated local PTY shell with tabs, split panes, search, and responsive interactive input.", tone: "mint" },
  { icon: Sparkles, title: "AI Copilot", link: "https://github.com/termimus/termimus-ssh#-ai-terminal-copilot-bring-your-own-key", text: "Turn plain language into shell commands and get terminal errors explained. Bring your own OpenAI-compatible, Anthropic, or Ollama key. Commands are never run without you.", tone: "rose" },
  { icon: Network, title: "Workspaces that scale", link: "https://github.com/termimus/termimus-ssh#%EF%B8%8F-workspaces--multi-server-cluster-launcher", text: "Organize hosts into workspaces, launch multi-server clusters, and move between environments without losing context.", tone: "blue" },
  { icon: KeyRound, title: "Vault, keys & 2FA", link: "https://github.com/termimus/termimus-ssh#-keychain--identity-management", text: "Protect credentials with an encrypted local vault, reusable identities, biometric quick unlock, and keyboard-interactive 2FA logins.", tone: "green" },
  { icon: FolderSync, title: "SFTP & cloud-to-cloud", link: "https://github.com/termimus/termimus-ssh#-dual-pane-sftp--in-app-code-editor", text: "Browse, edit, and bulk-transfer files between your machine and servers, or straight from one remote host to another.", tone: "orange" },
  { icon: Waypoints, title: "Local, remote & SOCKS5 tunnels", link: "https://github.com/termimus/termimus-ssh#-port-forwarding--ssh-tunnels", text: "Set up local, remote (-R), and dynamic SOCKS5 port forwarding with a guided picker and remote DNS resolution.", tone: "cyan" },
];

const faqs = [
  { question: "What is Termimus?", answer: "Termimus is a free, open-source SSH client and server management suite for connecting to, organizing, and operating your infrastructure." },
  { question: "Is Termimus an alternative to Termius?", answer: "Yes. Termimus is a free and open-source alternative to paid SSH clients like Termius, with a local-first approach and no required cloud account." },
  { question: "Where is my data stored?", answer: "Your hosts, credentials, keys, and settings are stored locally on your device. Sensitive data is protected by the encrypted vault and never needs to leave your machine." },
  { question: "What platforms are supported?", answer: "Termimus is built for Linux, macOS, and Windows. Visit the GitHub releases page to download the latest version for your platform." },
  { question: "Can I sync Termimus across devices?", answer: "Yes. You can run the self-hosted sync relay on your own server. End-to-end encryption keeps the relay from reading your data." },
  { question: "How can I report a bug or request a feature?", answer: "Open an issue on the Termimus GitHub repository with the version, operating system, steps to reproduce, and any relevant logs or screenshots." },
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
  const [platform] = useState(detectPlatform);
  const primary = platform ? downloads[platform] : null;
  const syncCompose = `services:
  termimus-sync:
    image: ghcr.io/termimus/termimus-sync:latest
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
    <div className="announcement"><span className="pulse" /> Termimus v{VERSION} is out <a href="/changelog.html#v{VERSION}">See what’s new <ArrowRight size={14} /></a></div>
    <header className="nav shell">
      <Logo />
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#ai" onClick={() => setMenuOpen(false)}>AI Copilot</a>
        <a href="#security" onClick={() => setMenuOpen(false)}>Security</a>
        <a href="#sync" onClick={() => setMenuOpen(false)}>Sync server</a>
        <a href="/changelog.html" onClick={() => setMenuOpen(false)}>Changelog</a>
        <a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub <GitBranch size={15} /></a>
        <a className="nav-support" href="/donate.html" onClick={() => setMenuOpen(false)}><img src={`${import.meta.env.BASE_URL}kofi.png`} alt="" /> Support us</a>
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
            <a className="button button-primary" href={primary ? primary.url : releasesUrl} {...(primary ? {} : { target: "_blank", rel: "noreferrer" })}><Download size={17} /> {primary ? `Download for ${primary.label}` : "Download for free"} <ArrowRight size={16} /></a>
            <a className="button button-quiet" href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer"><GitBranch size={17} /> View on GitHub</a>
          </div>
          <div className="platforms"><span>Available for</span>{(Object.keys(downloads) as (keyof typeof downloads)[]).map((key) => <a key={key} className={key === platform ? "current" : undefined} href={downloads[key].url}><Download size={12} /> {downloads[key].label}</a>)}<a href={releasesUrl} target="_blank" rel="noreferrer">All builds</a></div>
        </div>
        <div className="hero-art" aria-label="Termimus application preview">
          <img className="product-shot" src={`${import.meta.env.BASE_URL}termimus-hosts.webp`} width={1400} height={756} fetchPriority="high" alt="Termimus hosts dashboard showing organized server groups and SSH connections" />
          <div className="glow" />
          <div className="floating-card"><Zap size={15} /><span><strong>4 sessions</strong><small>connected securely</small></span><Check size={15} /></div>
        </div>
      </section>

      <section className="trust-row"><div className="shell trust-inner"><span>BUILT FOR THE WAY YOU WORK</span><div className="trust-line" /><span className="trust-tag"><CloudOff size={15} /> NO CLOUD ACCOUNT REQUIRED</span><span className="trust-tag"><ShieldCheck size={15} /> ZERO-KNOWLEDGE BY DESIGN</span></div></section>

      <section className="section shell" id="features"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE TOOLBOX</div><h2>Everything you need.<br /><span>Nothing in your way.</span></h2></div><p>Termimus brings the daily tools of a modern infrastructure team into one focused, native workspace.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, link, text, tone }) => <article className={`feature-card ${tone}`} key={title}><div className="feature-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><a href={link} target="_blank" rel="noreferrer">Learn more <ArrowRight size={14} /></a></article>)}</div></section>

      <AiCopilot />

      <Showcase />

      <section className="security-section" id="security"><div className="shell security-layout"><div><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE BY DEFAULT</div><h2>Built with a<br /><span>healthy paranoia.</span></h2><p className="security-lead">Your infrastructure is not our business. Termimus is local-first from the ground up, so your credentials and connection data never need to leave your machine.</p><a className="text-link" href="https://github.com/termimus/termimus-ssh/blob/main/README.md#-security--cryptography-model" target="_blank" rel="noreferrer">Read our security model <ArrowRight size={16} /></a></div><div className="security-list"><div className="security-item"><div className="security-number">01</div><div><h3>AES-256-GCM vault</h3><p>Passwords and keys are encrypted at rest with Argon2id-derived keys.</p></div><ShieldCheck /></div><div className="security-item"><div className="security-number">02</div><div><h3>Trust on first use</h3><p>Host fingerprints are verified on every SSH, SFTP, and tunnel connection.</p></div><KeyRound /></div><div className="security-item"><div className="security-number">03</div><div><h3>Blind sync relay</h3><p>Self-host the relay. It stores ciphertext, never your plaintext.</p></div><CloudOff /></div></div></div></section>

      <section className="sync-section shell" id="sync"><div className="sync-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR INFRASTRUCTURE, YOUR RULES</div><h2>Sync on your<br /><span>own terms.</span></h2><p>Need your setup on another machine? Run the lightweight Go relay on your own server. End-to-end encryption means the relay can connect your devices without ever being able to read your data.</p><div className="command-box compose-box"><pre>{syncCompose}</pre><button onClick={copyCommand} aria-label="Copy Docker Compose configuration">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><small className="command-note"><Check size={13} /> Copy this as <code>docker-compose.yml</code> · under 20 MB RAM</small></div><div className="sync-visual"><div className="sync-node node-laptop"><Monitor size={24} /><span>work laptop</span><small>encrypted data</small></div><div className="connection"><span /><span /><span /></div><div className="sync-server"><div className="server-icon"><Network size={25} /></div><span>your relay</span><small>blind storage</small></div><div className="connection reverse"><span /><span /><span /></div><div className="sync-node node-home"><Monitor size={24} /><span>home desktop</span><small>encrypted data</small></div></div></section>

      <section className="download-section shell" id="download"><div className="download-card"><div className="download-copy"><div className="eyebrow"><span className="eyebrow-line" /> START CONNECTING</div><h2>Make your terminal<br /><em>feel like home.</em></h2><p>Free, open source, and built for the long haul.</p><a className="button button-primary" href={primary ? primary.url : releasesUrl} {...(primary ? {} : { target: "_blank", rel: "noreferrer" })}><Download size={17} /> {primary ? `Download for ${primary.label}` : "Download Termimus"} <ArrowRight size={16} /></a><small>v{VERSION} · MIT License · No account required{primary?.alt ? <> · <a href={primary.alt.url}>{primary.alt.label}</a></> : null} · <a href={releasesUrl} target="_blank" rel="noreferrer">Other platforms</a></small></div><div className="download-mark"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Termimus" /><div className="mark-ring" /></div></div></section>

      <section className="faq-section section shell" id="faq"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> NEED TO KNOW</div><h2>Frequently Asked<br /><span>Questions.</span></h2></div><p>Still curious? Find more answers and start a conversation in the Termimus community.</p></div><div className="faq-list">{faqs.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}<ChevronDown size={17} /></summary><p>{answer}</p></details>)}</div></section>
    </main>

    <footer className="footer shell"><Logo compact /><span>© 2026 Termimus. Crafted for people who ship.</span><div><a href="/changelog.html">Changelog</a><a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer">GitHub</a><a href="#security">Security</a><a href="https://github.com/termimus/termimus-ssh/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a></div></footer>
  </div>;
}

export default App;
