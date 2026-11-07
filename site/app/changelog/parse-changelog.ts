export type ChangelogEntry = {
  title: string;
  summary: string;
  authors: string;
  sourceUrl?: string;
};

export type ChangelogDay = {
  date: string;
  entries: ChangelogEntry[];
};

const MARKER = "<!-- changelog entries -->";
const FIELDS = {
  "- **Title:**": "title",
  "**Summary:**": "summary",
  "**Authors participated:**": "authors",
} as const;

/**
 * Parses the format written by .github/scripts/update-changelog.py.
 * Unrecognized lines throw, so a format change fails the build (keeping the
 * last good deployment live) instead of silently hiding entries from readers.
 */
export function parseChangelog(markdown: string): ChangelogDay[] {
  const start = markdown.indexOf(MARKER);
  if (start === -1) throw new Error(`CHANGELOG.md is missing the ${MARKER} marker`);

  const days: ChangelogDay[] = [];
  let pendingSource: string | undefined;
  let field: keyof ChangelogEntry | undefined;

  markdown
    .slice(start + MARKER.length)
    .split(/\r?\n/)
    .forEach((rawLine, index) => {
      const line = rawLine.trim();
      if (!line) return;

      const heading = line.match(/^## (\d{4}-\d{2}-\d{2})$/);
      if (heading) {
        days.push({ date: heading[1], entries: [] });
        field = undefined;
        return;
      }

      const source = line.match(/^<!-- changelog-source: (\S+) -->$/);
      if (source) {
        pendingSource = source[1];
        field = undefined;
        return;
      }

      const day = days.at(-1);
      const prefix = Object.keys(FIELDS).find((key) => line.startsWith(key)) as keyof typeof FIELDS | undefined;
      if (day && prefix) {
        field = FIELDS[prefix];
        if (field === "title") {
          day.entries.push({ title: "", summary: "", authors: "", sourceUrl: pendingSource });
          pendingSource = undefined;
        }
        const entry = day.entries.at(-1);
        if (entry) {
          entry[field] = line.slice(prefix.length).trim();
          return;
        }
      }

      // Indented text continues the previous field, such as a wrapped summary.
      const entry = day?.entries.at(-1);
      if (entry && field && /^\s/.test(rawLine)) {
        entry[field] = `${entry[field]} ${line}`;
        return;
      }

      throw new Error(`Unrecognized CHANGELOG.md content after marker, line ${index + 1}: ${line}`);
    });

  return days;
}
