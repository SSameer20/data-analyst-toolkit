import Link from "next/link";
import { JsonLd } from "./lib/json-ld";
import { REPOSITORY, SITE_URL } from "./lib/skills";
import SkillExplorer from "./components/skill-explorer";
import CopyCode from "./components/copy-code";

export default function Home() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", name: "Data Analyst Toolkit", url: `${SITE_URL}/` },
          {
            "@type": "SoftwareSourceCode",
            name: "Data Analyst Toolkit",
            description: "A collection of reusable AI-agent skills for data quality, data cleaning, feature engineering, SQL, and business-intelligence reporting workflows.",
            codeRepository: REPOSITORY,
            license: "https://opensource.org/licenses/MIT",
            url: `${SITE_URL}/`,
          },
        ],
      }} />
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>Practical AI agent skills for data analysts.</h1>
          <p className="hero-lede">Data Analyst Toolkit is a collection of reusable agent skills for common data-analysis workflows: assess data quality, plan data cleaning, engineer features, write SQL, and prepare BI reporting for Tableau, Power BI, Looker, Qlik, Excel, and Google Sheets.</p>
          <div className="hero-actions">
            <Link className="button" href="/skills">Explore the skills</Link>
            <a className="text-link" href="https://github.com/SSameer20/data-analyst-toolkit">View on GitHub</a>
          </div>
          <p className="hero-note">Open source. Works in Claude Code, Codex, and other agent environments that support skills.</p>
        </div>
        <nav className="atlas-route" aria-label="Analysis route and toolkit skills">
          <div className="atlas-stage">
            <h2>Understand</h2>
            <ul><li><Link href="/skills/data-analyst-workflow">Data Analyst Workflow</Link></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Prepare</h2>
            <ul><li><Link href="/skills/data-quality">Data Quality</Link></li><li><Link href="/skills/data-cleaning">Data Cleaning</Link></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Analyze</h2>
            <ul><li><Link href="/skills/feature-engineering">Feature Engineering</Link></li><li><Link href="/skills/sql-expert">SQL Expert</Link></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Communicate</h2>
            <ul><li><Link href="/skills/bi-expert">BI Expert</Link></li></ul>
          </div>
        </nav>
        <div className="hero-visual" data-ui role="group" aria-labelledby="quality-review-heading">
          <div className="quality-title"><div><strong id="quality-review-heading">Example quality review</strong></div></div>
          <div className="quality-row"><span>Unique customer ID</span><span className="status status-good">Passed</span></div>
          <div className="quality-row"><span>Required order date</span><span className="status status-review">Review</span></div>
          <div className="quality-row"><span>Revenue range</span><span className="status status-good">Passed</span></div>
        </div>
      </section>

      <section className="skills-section wrap" id="skills">
        <div className="section-intro">
          <div><h2>Data analysis skills for everyday workflows.</h2></div>
          <p>Choose a skill to see what it covers, how it fits, and how to install it on its own. Or <Link className="text-link" href="/skills">browse all skills</Link>.</p>
        </div>
        <SkillExplorer />
      </section>

      <section className="workflow-section">
        <div className="workflow wrap">
          <div className="workflow-copy">
            <h2>Keep the whole analysis connected.</h2>
            <p>The workflow skill routes each phase to a specialist and carries decisions forward, from the first data checks to the final report.</p>
            <a className="light-link" href="https://github.com/SSameer20/data-analyst-toolkit/tree/main/skills/data-analyst-workflow">Explore the workflow skill</a>
          </div>
          <div className="flow-graphic" role="list" aria-label="Analysis phases">
            <div className="flow-line" aria-hidden="true"><i/><i/><i/><i/></div>
            <div className="flow-item" role="listitem"><span>Understand</span><strong>Frame the question</strong></div>
            <div className="flow-item" role="listitem"><span>Prepare</span><strong>Check and clean</strong></div>
            <div className="flow-item" role="listitem"><span>Analyze</span><strong>Query and engineer</strong></div>
            <div className="flow-item" role="listitem"><span>Communicate</span><strong>Report with context</strong></div>
          </div>
        </div>
      </section>

      <section className="install-section wrap" id="install">
        <div className="install-copy">
          <h2>How to use the toolkit.</h2>
          <p>Choose your agent environment to add the Data Analyst Toolkit plugin.</p>
        </div>
        <div className="install-options">
          <section className="install-panel" aria-labelledby="claude-install-title">
            <h3 id="claude-install-title">Claude Code</h3>
            <p className="install-method">Add the marketplace, then install the plugin.</p>
            <div className="install-command"><span>1. Add marketplace</span><CopyCode text="/plugin marketplace add SSameer20/data-analyst-plugin" /></div>
            <div className="install-command"><span>2. Install plugin</span><CopyCode text="/plugin install data-analyst-toolkit@data-analyst-skills" /></div>
            <p className="install-note">The plugin installs all six skills.</p>
            <div className="install-updates">
              <h4>Update</h4>
              <CopyCode text="/plugin marketplace update data-analyst-skills" />
              <CopyCode text="/plugin update data-analyst-toolkit@data-analyst-skills" />
            </div>
          </section>
          <section className="install-panel" aria-labelledby="codex-install-title">
            <h3 id="codex-install-title">Codex</h3>
            <p className="install-method">Add the marketplace, then install the plugin.</p>
            <div className="install-command"><span>1. Add marketplace</span><CopyCode text="codex plugin marketplace add SSameer20/data-analyst-toolkit" /></div>
            <div className="install-command"><span>2. Install plugin</span><CopyCode text="codex plugin add data-analyst-toolkit@data-analyst-toolkit" /></div>
          </section>
        </div>
        <div className="install-resource">
          <a href="https://github.com/SSameer20/data-analyst-toolkit" className="repo-link"><GitHubMark />Browse the repository</a>
        </div>
      </section>

      <section className="trust-section wrap">
        <div className="trust-copy"><h2>Made to support your judgment.</h2><p>The skills don’t connect to databases or change source data. Review generated queries, formulas, and reports before using them.</p></div>
        <Link className="trust-link" href="/about">Learn about the toolkit</Link>
      </section>
    </main>
  );
}

function GitHubMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.1.8 2.02 1.43.22-.73.58-1.22 1.05-1.5-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.43.11-2.97 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.97.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.6.52 1.13 1.53 1.13 3.08v2.28c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
}
