import Link from "next/link";
import Image from "next/image";
import GitHubStarLink from "./github-star-link";

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
      <GitHubStarLink />
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
