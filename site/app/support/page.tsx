export const metadata = { title: "Support — Data Analyst Toolkit" };

export default function SupportPage() {
  return (
    <main className="document-page wrap">
      <div className="document-heading">
        <h1>Support</h1>
        <p>Questions, corrections, and ideas for improving the toolkit are welcome.</p>
      </div>
      <div className="document-body">
        <section>
          <h2>Get in touch</h2>
          <p>Email the maintainer for help with the project or its skills.</p>
          <a className="text-link" href="mailto:sameer.kattubadi@gmail.com?subject=Data%20Analyst%20Toolkit%20support">sameer.kattubadi@gmail.com <span aria-hidden="true">↗</span></a>
        </section>
        <section>
          <h2>Report an issue</h2>
          <p>For a reproducible problem or a suggestion, open a GitHub issue. Include the skill name, what you expected, and what happened. Remove private or sensitive data from examples.</p>
          <a className="text-link" href="https://github.com/SSameer20/data-analyst-toolkit/issues/new/choose">Open an issue <span aria-hidden="true">↗</span></a>
        </section>
        <section>
          <h2>Using generated work</h2>
          <p>Check queries, formulas, and reports before relying on them. The skills do not connect to your database or change your source data.</p>
        </section>
      </div>
    </main>
  );
}
