import { version } from "../package.json";

export const VERSION = version;

const base = `https://github.com/termimus/termimus-ssh/releases/download/v${VERSION}/Termimus_${VERSION}`;

export type Platform = "linux" | "mac" | "windows";

export const downloads: Record<Platform, { label: string; url: string; alt?: { label: string; url: string } }> = {
  linux: { label: "Linux", url: `${base}_amd64.deb`, alt: { label: "AppImage", url: `${base}_amd64.AppImage` } },
  mac: { label: "macOS", url: `${base}_universal.dmg` },
  windows: { label: "Windows", url: `${base}_x64-setup.exe`, alt: { label: "MSI", url: `${base}_x64_en-US.msi` } },
};

export const releasesUrl = "https://github.com/termimus/termimus-ssh/releases/latest";

export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const ua = `${nav.userAgentData?.platform ?? ""} ${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (/android|iphone|ipad|ipod/.test(ua)) return null;
  if (/mac/.test(ua)) return "mac";
  if (/win/.test(ua)) return "windows";
  if (/linux|x11|cros/.test(ua)) return "linux";
  return null;
}
