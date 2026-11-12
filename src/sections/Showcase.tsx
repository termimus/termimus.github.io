import { useState } from "react";
import { ArrowRight, Check, CloudCog, File, Folder, FolderSync, KeyRound, Laptop, Server, ShieldCheck, Waypoints } from "lucide-react";
import { MockWindow } from "./Mockup";

type TabKey = "sftp" | "tunnels" | "twofa";
type TunnelType = "local" | "remote" | "dynamic";

const tunnelTypes: Record<TunnelType, { label: string; flag: string; desc: string; left: string; right: string; reverse?: boolean }> = {
  local: { label: "Local", flag: "-L", desc: "Access a remote server's listening port as though it were local.", left: "localhost:5432", right: "db.internal:5432" },
  remote: { label: "Remote", flag: "-R", desc: "Open a port on the SSH server and tunnel its connections back to a service reachable from this computer.", left: "localhost:3000", right: "server:8080", reverse: true },
  dynamic: { label: "Dynamic", flag: "-D", desc: "Turn a local port into a SOCKS5 proxy that routes any traffic through the SSH server, with DNS resolved remotely.", left: "SOCKS5 :1080", right: "any host" },
};

const tabs: { key: TabKey; label: string; icon: typeof FolderSync; title: string; text: string; points: string[] }[] = [
  {
    key: "sftp", label: "SFTP", icon: FolderSync, title: "Move files between servers directly",
    text: "Pick any host as the source pane, local or remote. Copy from one server straight to another without downloading to your disk first.",
    points: ["Dual-pane browser with a switchable source", "Cloud-to-cloud transfers streamed in memory", "Bulk transfers, progress, and conflict handling"],
  },
  {
    key: "tunnels", label: "Tunnels", icon: Waypoints, title: "Every kind of port forwarding",
    text: "A guided setup explains each tunnel type with a live diagram, then asks only for the fields that type needs.",
    points: ["Local (-L), Remote (-R), and Dynamic SOCKS5 (-D)", "Remote DNS for SOCKS5, so lookups don't leak locally", "Tunnels report when the SSH connection drops"],
  },
  {
    key: "twofa", label: "2FA", icon: KeyRound, title: "Works with servers that require 2FA",
    text: "Servers that ask for a key and a one-time code (e.g. PAM + Google Authenticator) now just work. Termimus prompts you for each step.",
    points: ["Keyboard-interactive auth after key or password", "Stored host passwords fill in automatically", "Clear errors: key, password, or code rejected"],
  },
];

const files = [
  { name: "releases", dir: true, size: "—" },
  { name: "uploads", dir: true, size: "—" },
  { name: "nginx.conf", dir: false, size: "4.2 KB" },
  { name: "backup-2026-11.tar.gz", dir: false, size: "1.8 GB", selected: true },
];

function SftpMock() {
  return <MockWindow title="SFTP File Browser">
    <div className="sftp-mock">
      {[{ role: "Source", host: "prod-web-01", list: files }, { role: "Destination", host: "backup-01", list: files.slice(0, 2) }].map((pane) => <div className="sftp-pane" key={pane.role}>
        <div className="sftp-head"><small>{pane.role}</small><span><Server size={12} /> {pane.host}</span><em>Remote (SFTP)</em></div>
        {pane.list.map((f) => <div className={`sftp-row ${"selected" in f && f.selected ? "selected" : ""}`} key={f.name}>{f.dir ? <Folder size={12} /> : <File size={12} />}<span>{f.name}</span><b>{f.size}</b></div>)}
      </div>)}
    </div>
    <div className="sftp-transfer">
      <div><CloudCog size={13} /> Cloud-to-cloud · backup-2026-11.tar.gz</div>
      <div className="progress"><span /></div>
      <small>Transfers between remote servers are streamed directly through Termimus in memory.</small>
    </div>
  </MockWindow>;
}

function TunnelMock() {
  const [type, setType] = useState<TunnelType>("local");
  const t = tunnelTypes[type];
  return <div className="mock-window tunnel-mock">
    <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>New Tunnel</span><span className="window-lock"><ShieldCheck size={13} /> SSH</span></div>
    <div className="tunnel-body">
      <div className="segmented" role="radiogroup" aria-label="Tunnel type">
        {(Object.keys(tunnelTypes) as TunnelType[]).map((key) => <button key={key} role="radio" aria-checked={type === key} className={type === key ? "active" : ""} onClick={() => setType(key)}>{tunnelTypes[key].label} <small>{tunnelTypes[key].flag}</small></button>)}
      </div>
      <div className={`tunnel-diagram ${t.reverse ? "reverse" : ""}`} key={type}>
        <div className="tunnel-node"><Laptop size={20} /><span>This computer</span><small>{t.left}</small></div>
        <div className="tunnel-link"><span /><span /><span /></div>
        <div className="tunnel-node ssh"><Server size={20} /><span>SSH server</span><small>bastion</small></div>
        <div className="tunnel-link"><span /><span /><span /></div>
        <div className="tunnel-node"><Waypoints size={20} /><span>Destination</span><small>{t.right}</small></div>
      </div>
      <p className="tunnel-desc">{t.desc}</p>
    </div>
  </div>;
}

function TwoFaMock() {
  return <MockWindow title="deploy@bastion">
    <div className="twofa-mock">
      <ol className="twofa-steps">
        <li className="done"><Check size={12} /> SSH key accepted</li>
        <li className="active"><span /> Verification code</li>
      </ol>
      <div className="twofa-modal">
        <strong>Additional Authentication</strong>
        <small>deploy@bastion requires more verification</small>
        <div className="otp">{["4", "8", "2", "9", "1", ""].map((d, i) => <span key={i} className={d ? "" : "caret"}>{d}</span>)}</div>
        <p>Open your authenticator app and enter the current code.</p>
        <div className="twofa-btn">Continue</div>
      </div>
    </div>
  </MockWindow>;
}

export default function Showcase() {
  const [active, setActive] = useState<TabKey>("sftp");
  const tab = tabs.find((t) => t.key === active)!;
  return <section className="section shell showcase" id="showcase">
    <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> NEW IN 0.9</div><h2>See it in action.<br /><span>Built for real servers.</span></h2></div><p>File transfers, tunnels, and logins that hold up when your infrastructure gets complicated.</p></div>
    <div className="showcase-tabs" role="tablist" aria-label="Feature showcase">
      {tabs.map(({ key, label, icon: Icon }) => <button key={key} role="tab" id={`tab-${key}`} aria-controls={`panel-${key}`} aria-selected={active === key} className={active === key ? "active" : ""} onClick={() => setActive(key)}><Icon size={15} /> {label}</button>)}
    </div>
    <div className="showcase-panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
      <div className="showcase-copy">
        <h3>{tab.title}</h3>
        <p>{tab.text}</p>
        <ul>{tab.points.map((p) => <li key={p}><Check size={14} /> {p}</li>)}</ul>
        <a className="text-link" href="/changelog.html#v0.9.0">Full 0.9.0 release notes <ArrowRight size={16} /></a>
      </div>
      <div className="showcase-visual">{active === "sftp" ? <SftpMock /> : active === "tunnels" ? <TunnelMock /> : <TwoFaMock />}</div>
    </div>
  </section>;
}
