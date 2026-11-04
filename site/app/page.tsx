import SkillExplorer, { GitHubLink } from "./components/skill-explorer";

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}

export default function Home() {
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>Clearer analysis.</h1>
          <p className="hero-lede">Six focused skills for the work behind trustworthy data.</p>
          <div className="hero-actions">
            <a className="button" href="#skills">Browse skills <ArrowIcon /></a>
            <GitHubLink compact />
          </div>
          <p className="hero-note">Reusable guidance for your AI workspace.</p>
        </div>
        <nav className="atlas-route" aria-label="Analysis route and toolkit skills">
          <div className="atlas-stage">
            <h2>Understand</h2>
            <ul><li><a href="#skills">Data Analyst Workflow</a></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Prepare</h2>
            <ul><li><a href="#skills">Data Quality</a></li><li><a href="#skills">Data Cleaning</a></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Analyze</h2>
            <ul><li><a href="#skills">Feature Engineering</a></li><li><a href="#skills">SQL Expert</a></li></ul>
          </div>
          <div className="atlas-stage">
            <h2>Communicate</h2>
            <ul><li><a href="#skills">BI Expert</a></li></ul>
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
          <div><h2>One toolkit. Six ways in.</h2></div>
          <p>Choose a skill to see what it covers, how it fits, and how to install it on its own.</p>
        </div>
        <SkillExplorer />
      </section>

      <section className="workflow-section">
        <div className="workflow wrap">
          <div className="workflow-copy">
            <h2>Keep the whole analysis connected.</h2>
            <p>The workflow skill routes each phase to a specialist and carries decisions forward, from the first data checks to the final report.</p>
            <a className="light-link" href="https://github.com/SSameer20/data-analyst-toolkit/tree/main/skills/data-analyst-workflow">Explore the workflow skill <span aria-hidden="true">↗</span></a>
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
          <h2>Bring the skills to your workflow.</h2>
          <p>Install the full toolkit, or add just the specialist you need. It’s open source under the MIT License.</p>
        </div>
        <div className="install-panel">
          <div className="install-panel-head"><span>Install all skills</span><span className="terminal-mark" aria-hidden="true">&gt;_</span></div>
          <code><span>$</span> npx skills add<br/> &nbsp; https://github.com/SSameer20/<br/> &nbsp; data-analyst-toolkit</code>
          <a href="https://github.com/SSameer20/data-analyst-toolkit" className="repo-link"><GitHubMark />Browse the repository <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="trust-section wrap">
        <div className="trust-mark" aria-hidden="true">↗</div>
        <div className="trust-copy"><h2>Made to support your judgment.</h2><p>The skills don’t connect to databases or change source data. Review generated queries, formulas, and reports before using them.</p></div>
        <a className="trust-link" href="/about">Learn about the toolkit <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}

function GitHubMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.1.8 2.02 1.43.22-.73.58-1.22 1.05-1.5-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.43.11-2.97 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.97.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.6.52 1.13 1.53 1.13 3.08v2.28c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
}
