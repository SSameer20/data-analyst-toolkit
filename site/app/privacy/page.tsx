export const metadata = { title: "Privacy — Data Analyst Toolkit" };

export default function PrivacyPage() {
  return (
    <main className="document-page wrap">
      <div className="document-heading">
        <h1>Privacy</h1>
        <p>What this project does, and what it does not do, with your data.</p>
      </div>
      <div className="document-body">
        <section>
          <h2>Analysis data</h2>
          <p>The toolkit’s skills do not connect to databases, inspect live BI workspaces, or modify source datasets. How prompts and files are handled depends on the AI assistant or host environment where you use the skills.</p>
        </section>
        <section>
          <h2>Generated output</h2>
          <p>Skills may help create queries, formulas, and reports when the host environment provides suitable tools. Review the output and follow your organization’s data handling rules before sharing or using it.</p>
        </section>
        <section>
          <h2>This website</h2>
          <p>This site provides project information and links to the public repository. If you contact the maintainer by email or GitHub, that service processes the information you submit under its own privacy terms.</p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>For questions about privacy or the project, contact the maintainer.</p>
          <a className="text-link" href="mailto:sameer.kattubadi@gmail.com?subject=Privacy%20question">Email the maintainer</a>
        </section>
      </div>
    </main>
  );
}
