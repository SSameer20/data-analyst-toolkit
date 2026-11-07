import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseChangelog } from "./parse-changelog";

export const metadata = {
  title: "Changelog — Data Analyst Toolkit",
  description: "What changed in the Data Analyst Toolkit, when, and who worked on it.",
};

// Read at build time from the single source of truth at the repository root.
const days = parseChangelog(readFileSync(join(process.cwd(), "..", "CHANGELOG.md"), "utf-8"));

const REPO_URL = "https://github.com/SSameer20/data-analyst-toolkit";

function sourceLabel(url: string) {
  const pullRequest = url.match(/\/pull\/(\d+)/);
  if (pullRequest) return `Pull request #${pullRequest[1]}`;
  const commit = url.match(/\/commit\/([0-9a-f]{7})/);
  return commit ? `Commit ${commit[1]}` : "View source";
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
        <p>What changed, when, and who worked on it, in the open.</p>
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
          <p>Dates are UTC. Pull requests are recorded on merge, and direct commits to main are added by a nightly job. Merge commits are left out, so the commit history is the complete record.</p>
          <a className="text-link" href={`${REPO_URL}/commits/main`}>See all commits</a>
        </section>
      </div>
    </main>
  );
}
