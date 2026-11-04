const skills = [
  ["Data Analyst Workflow", "Coordinate a complete analysis from the first question to a clear deliverable."],
  ["Data Quality", "Define checks, measure defects, and decide what to fix first."],
  ["Data Cleaning", "Plan repeatable transformations and validate the result."],
  ["Feature Engineering", "Create useful analytical features while guarding against leakage."],
  ["SQL Expert", "Write, explain, tune, and debug SQL. Oracle is the default dialect."],
  ["BI Expert", "Plan dashboards and reports across Tableau, Power BI, Looker, Qlik, and spreadsheets."],
];

export default function Home() {
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="brand-mark">Data Analyst Toolkit</p>
          <h1>Better analysis, one skill at a time.</h1>
          <p className="hero-lede">A collection of reusable skills for data quality, cleaning, SQL, feature engineering, and BI reporting.</p>
          <div className="hero-actions">
            <a className="button" href="#install">Install skills</a>
            <a className="text-link" href="#skills">Explore the skills <span aria-hidden="true">↘</span></a>
          </div>
        </div>
        <div className="demo" data-ui aria-label="Example data quality analysis">
          <div className="demo-head"><span>Data quality</span><span>Validation rules</span></div>
          <div className="demo-row"><span>Customer ID</span><span className="demo-pass">Unique · 100%</span></div>
          <div className="demo-row"><span>Order date</span><span className="demo-warn">12 missing values</span></div>
          <div className="demo-row"><span>Net revenue</span><span className="demo-pass">No negative values</span></div>
          <p className="demo-note">Next: review missing dates before reporting.</p>
        </div>
      </section>

      <section className="skills-section wrap" id="skills">
        <div className="section-intro">
          <h2>Six skills. One toolkit.</h2>
          <p>Start with a specialist task or use the workflow skill to coordinate the full analysis.</p>
        </div>
        <ol className="skill-list">
          {skills.map(([name, description]) => (
            <li key={name}>
              <a href={`https://github.com/SSameer20/data-analyst-toolkit/tree/main/skills/${name.toLowerCase().replaceAll(" ", "-")}`}>
                <span className="skill-name">{name}</span>
                <span className="skill-description">{description}</span>
                <span className="skill-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="workflow-section">
        <div className="workflow wrap">
          <div>
            <h2>From question to useful report.</h2>
            <p>The workflow skill helps organize the work. Bring your context, choose the analysis steps, and review the output before using it.</p>
          </div>
          <div className="workflow-steps" aria-label="Analysis workflow">
            <span>Frame the question</span><span>Check the data</span><span>Analyze with care</span><span>Share the result</span>
          </div>
        </div>
      </section>

      <section className="install-section wrap" id="install">
        <div>
          <h2>Install the toolkit</h2>
          <p>Add the skills to a compatible agent setup, or install one specialist skill on its own.</p>
        </div>
        <div className="install-content">
          <code>npx skills add https://github.com/SSameer20/data-analyst-toolkit</code>
          <a className="text-link" href="https://github.com/SSameer20/data-analyst-toolkit">View repository <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="limits-section wrap">
        <h2>Designed for review.</h2>
        <p>The skills do not connect to databases or inspect live BI workspaces. They do not modify source datasets. Review generated queries, formulas, and reports before putting them to use.</p>
        <a className="text-link" href="/about">How the toolkit works <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
