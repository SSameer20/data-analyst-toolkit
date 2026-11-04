import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/">Data Analyst Toolkit</Link>
      <nav aria-label="Main navigation">
        <Link href="/#skills">Skills</Link>
        <Link href="/about">About</Link>
        <Link href="/support">Support</Link>
      </nav>
      <a className="header-action" href="https://github.com/SSameer20/data-analyst-toolkit">View on GitHub <span aria-hidden="true">↗</span></a>
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
