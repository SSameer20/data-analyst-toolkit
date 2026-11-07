import re
from pathlib import Path

MARKER = "<!-- changelog entries -->"


def escape_markdown(text: str) -> str:
    return re.sub(r"([\\`*_{}\[\]()#+|<>])", r"\\\1", text)


def insert_entry(
    changelog_path: Path,
    date: str,
    url: str,
    title: str,
    summary: str,
    participants: str,
) -> None:
    """Insert an entry at the top of its date. All text must already be escaped."""
    entry = (
        f"<!-- changelog-source: {url} -->\n"
        f"- **Title:** {title}\n"
        f"  **Summary:** {summary}\n"
        f"  **Authors participated:** {participants}\n\n"
    )
    lines = changelog_path.read_text(encoding="utf-8").splitlines(keepends=True)
    marker_index = next(
        (index for index, line in enumerate(lines) if line.strip() == MARKER),
        None,
    )
    if marker_index is None:
        raise ValueError(f"{changelog_path} is missing the {MARKER} marker")

    date_heading = f"## {date}"
    date_index = next(
        (index for index, line in enumerate(lines) if line.strip() == date_heading),
        None,
    )
    if date_index is None:
        lines.insert(marker_index + 1, f"\n{date_heading}\n\n{entry}")
    else:
        lines.insert(date_index + 2, entry)
    changelog_path.write_text("".join(lines), encoding="utf-8")
