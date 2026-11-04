import Image from "next/image";
import GitHubStarLink from "./github-star-link";

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <a className="wordmark" href="/">
        <Image src="/icon.png" alt="" width={30} height={30} priority />
        <span>Data Analyst Toolkit</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#skills">Skills</a>
        <a href="/#install">Install</a>
      </nav>
      <GitHubStarLink />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <span>Practical guidance for data analysis.</span>
      <div><a href="/about">About</a><a href="/support">Support</a><a href="/privacy">Privacy</a></div>
      <span>Data Analyst Toolkit</span>
    </footer>
  );
}
