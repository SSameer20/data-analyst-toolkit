import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseChangelog } from "./parse-changelog";

export const metadata = {
  title: "Changelog — Data Analyst Toolkit",
  description: "Every merged pull request to the Data Analyst Toolkit, with its summary and authors.",
};

// Read at build time from the single source of truth at the repository root.
const days = parseChangelog(readFileSync(join(process.cwd(), "..", "CHANGELOG.md"), "utf-8"));

const REPO_URL = "https://github.com/SSameer20/data-analyst-toolkit";

function sourceLabel(url: string) {
  const pullRequest = url.match(/\/pull\/(\d+)/);
  return pullRequest ? `Pull request #${pullRequest[1]}` : "View source";
}

function Authors({ value }: { value: string }) {
  return value.split(/(@[\w-]+(?:\[bot\])?)/).map((part, index) =>
    part.startsWith("@") ? (
      <a className="text-link" href={`https://github.com/${part.slice(1).replace("[bot]", "")}`} key={index}>{part}</a>
    ) : (
      part
    ),
  );
}

export default function ChangelogPage() {
  return (
    <main className="document-page wrap">
      <div className="document-heading">
        <h1>Changelog</h1>
        <p>Every merged pull request, in the open: what changed, when, and who worked on it.</p>
      </div>
      <div className="document-body">
        {days.map((day) => (
          <section key={day.date}>
            <h2><time dateTime={day.date}>{day.date}</time></h2>
            <ul className="changelog-entries">
              {day.entries.map((entry) => (
                <li key={entry.sourceUrl ?? entry.title}>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <p className="changelog-meta">
                    <span>By <Authors value={entry.authors} /></span>
                    {entry.sourceUrl?.startsWith("https://github.com/") ? (
                      <a className="text-link" href={entry.sourceUrl}>{sourceLabel(entry.sourceUrl)}</a>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2>Full history</h2>
          <p>Dates are UTC. Changes pushed directly without a pull request are not listed here; the commit history has everything.</p>
          <a className="text-link" href={`${REPO_URL}/commits/main`}>See all commits</a>
        </section>
      </div>
    </main>
  );
}
