import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/">
        <Image src="/icon.png" alt="" width={30} height={30} priority />
        <span>Data Analyst Toolkit</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#skills">Skills</Link>
        <Link href="/#install">Install</Link>
      </nav>
      <a className="header-action" href="https://github.com/SSameer20/data-analyst-toolkit" target="_blank" rel="noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.1.8 2.02 1.43.22-.73.58-1.22 1.05-1.5-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.43.11-2.97 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.97.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.6.52 1.13 1.53 1.13 3.08v2.28c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg><span>GitHub</span><span aria-hidden="true">↗</span></a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <span>Practical guidance for data analysis.</span>
      <div><Link href="/about">About</Link><Link href="/support">Support</Link><Link href="/privacy">Privacy</Link></div>
      <span>Data Analyst Toolkit</span>
    </footer>
  );
}
