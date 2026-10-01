import { ArrowLeft, ArrowRight, GitBranch } from "lucide-react";

function Logo() {
  return <a className="brand" href="/" aria-label="Termimus home">
    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
    <span>termimus<span className="brand-dot">.</span></span>
  </a>;
}

export default function Donate() {
  return <div className="page donation-page">
    <header className="nav shell">
      <Logo />
      <nav className="nav-links changelog-nav">
        <a href="/#features">Features</a>
        <a href="/#security">Security</a>
        <a href="/#sync">Sync server</a>
        <a href="/changelog.html">Changelog</a>
        <a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer">GitHub <GitBranch size={15} /></a>
      </nav>
    </header>

    <main className="donation-main shell">
      <a className="back-link" href="/"><ArrowLeft size={15} /> Back to home</a>
      <div className="donation-hero donation-simple">
        <div className="donation-simple-icon"><img src={`${import.meta.env.BASE_URL}kofi.png`} alt="Ko-fi" /></div>
        <div className="eyebrow"><span className="eyebrow-line" /> SUPPORT THE PROJECT</div>
        <h1>Keep Termimus<br /><em>independent.</em></h1>
        <p>Termimus is free and open source. If it helps you ship with confidence, your support helps keep it private, local-first, and independent.</p>
        <a className="button button-donation" href="https://ko-fi.com/termimus" target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}kofi.png`} alt="" /> Buy us a coffee <ArrowRight size={16} /></a>
        <small>Every contribution supports development, maintenance, and documentation.</small>
      </div>
    </main>

    <footer className="footer shell"><Logo /><span>© 2026 Termimus. Crafted for people who ship.</span><div><a href="/">Home</a><a href="/changelog.html">Changelog</a><a href="https://github.com/termimus/termimus-ssh" target="_blank" rel="noreferrer">GitHub</a></div></footer>
  </div>;
}
