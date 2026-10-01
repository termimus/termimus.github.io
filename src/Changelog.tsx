import { ArrowLeft, ArrowRight, GitBranch } from "lucide-react";
import { changelog } from "./changelog";

function Logo() {
  return <a className="brand" href="/" aria-label="Termimus home">
    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
    <span>termimus<span className="brand-dot">.</span></span>
  </a>;
}

export default function Changelog() {
  return <div className="page changelog-page">
    <header className="nav shell">
      <Logo />
      <nav className="nav-links changelog-nav">
        <a href="/#features">Features</a>
        <a href="/#security">Security</a>
        <a href="/#sync">Sync server</a>
        <a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer">GitHub <GitBranch size={15} /></a>
        <a className="nav-support" href="/donate.html"><img src={`${import.meta.env.BASE_URL}kofi.png`} alt="" /> Support us</a>
      </nav>
    </header>

    <main className="changelog-main shell">
      <a className="back-link" href="/"><ArrowLeft size={15} /> Back to home</a>
      <div className="changelog-hero"><div className="eyebrow"><span className="eyebrow-line" /> RELEASE HISTORY</div><h1>What’s new in<br /><em>Termimus.</em></h1><p>Every release, improvement, and fix — from the initial launch to the latest version.</p></div>
      <div className="changelog-list">{changelog.map(({ version, title, items, link }) => <article className="changelog-item" key={version}><div className="changelog-version">v{version}</div><div className="changelog-content"><div className="changelog-title-row"><h2>{title}</h2><a href={link} target="_blank" rel="noreferrer" aria-label={`View Termimus v${version} details`}><ArrowRight size={15} /></a></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</div>
    </main>

    <footer className="footer shell"><Logo /><span>© 2026 Termimus. Crafted for people who ship.</span><div><a href="/">Home</a><a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer">GitHub</a></div></footer>
  </div>;
}
