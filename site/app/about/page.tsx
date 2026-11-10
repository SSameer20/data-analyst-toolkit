export const metadata = {
  title: "About",
  description: "About Data Analyst Toolkit: open-source, reusable AI-agent skills for data quality, cleaning, feature engineering, SQL, and BI reporting.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <main className="document-page wrap">
      <div className="document-heading">
        <h1>About the toolkit</h1>
        <p>A collection of practical, verifiable guidance for common data analysis work.</p>
      </div>
      <div className="document-body">
        <section>
          <h2>What it helps with</h2>
          <p>Data Analyst Toolkit brings together six reusable agent skills: an end-to-end workflow, data quality, data cleaning, feature engineering, SQL, and business intelligence reporting.</p>
          <p>Use a specialist skill for a focused task, or begin with the workflow skill to coordinate several parts of an analysis.</p>
        </section>
        <section>
          <h2>How it works</h2>
          <p>The skills provide structured guidance and can help draft queries, formulas, validation rules, and reporting deliverables. What they can create depends on the tools available in the host environment.</p>
          <p>They do not connect to databases, inspect live BI workspaces, or modify source datasets. Review generated work before using it.</p>
        </section>
        <section>
          <h2>Open source</h2>
          <p>The project is distributed under the MIT License. Contributions and corrections are welcome on GitHub.</p>
          <a className="text-link" href="https://github.com/SSameer20/data-analyst-toolkit">Explore the project</a>
        </section>
      </div>
    </main>
  );
}
