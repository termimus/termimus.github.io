import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

export function MockWindow({ title, badge = "encrypted", className = "", children }: { title: string; badge?: string; className?: string; children: ReactNode }) {
  return <div className={`mock-window ${className}`} aria-hidden="true">
    <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>{title}</span><span className="window-lock"><ShieldCheck size={13} /> {badge}</span></div>
    {children}
  </div>;
}
