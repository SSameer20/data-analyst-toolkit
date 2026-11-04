import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen


def short_description(body: str, title: str) -> str:
    for line in body.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or line.startswith("<!--"):
            continue
        line = re.sub(r"^(?:[-*+]|\d+\.)\s+", "", line)
        if re.match(r"^\[[ xX]\]\s+", line):
            continue
        description = re.sub(r"\s+", " ", line).strip()
        return description[:240].rstrip()
    return title


def pull_request_usernames(repository: str, number: int, token: str) -> tuple[list[str], bool]:
    usernames: list[str] = []
    has_unlinked_identity = False
    page = 1

    while True:
        request = Request(
            f"https://api.github.com/repos/{repository}/pulls/{number}/commits"
            f"?per_page=100&page={page}",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
        with urlopen(request, timeout=30) as response:
            commits = json.load(response)

        for commit in commits:
            linked_users = []
            for role in ("author", "committer"):
                user = commit.get(role)
                if user and user.get("login"):
                    linked_users.append(user["login"])
                else:
                    has_unlinked_identity = True
            for username in linked_users:
                if username not in usernames:
                    usernames.append(username)

        if len(commits) < 100:
            break
        page += 1

    return usernames, has_unlinked_identity


def escape_markdown(text: str) -> str:
    return re.sub(r"([\\`*_{}\[\]()#+|<>])", r"\\\1", text)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: update-changelog.py EVENT_PATH CHANGELOG_PATH")

    event_path, changelog_path = map(Path, sys.argv[1:])
    event = json.loads(event_path.read_text(encoding="utf-8"))
    pull_request = event["pull_request"]
    url = pull_request["html_url"]

    changelog = changelog_path.read_text(encoding="utf-8")
    if url in changelog:
        return

    token = os.environ["GH_TOKEN"]
    repository = event["repository"]["full_name"]
    usernames, has_unlinked_identity = pull_request_usernames(
        repository, pull_request["number"], token
    )
    author = pull_request["user"]["login"]

    title = escape_markdown(pull_request["title"])
    description = short_description(pull_request.get("body") or "", pull_request["title"])
    description = escape_markdown(description)
    merged_at = datetime.fromisoformat(
        pull_request["merged_at"].replace("Z", "+00:00")
    ).astimezone(timezone.utc)
    date = merged_at.strftime("%Y-%m-%d")
    participants = ", ".join(
        f"@{escape_markdown(username)}"
        for username in [author, *(username for username in usernames if username != author)]
    )
    if has_unlinked_identity:
        participants += (
            " (some commit author/committer identities are not linked "
            "to a GitHub username)"
        )

    entry = (
        f"<!-- changelog-source: {url} -->\n"
        f"- **Title:** {title}\n"
        f"  **Summary:** {description}\n"
        f"  **Authors participated:** {participants}\n\n"
    )
    lines = changelog.splitlines(keepends=True)
    marker = "<!-- changelog entries -->"
    marker_index = next(
        (index for index, line in enumerate(lines) if line.strip() == marker),
        None,
    )
    if marker_index is None:
        raise ValueError(f"{changelog_path} is missing the {marker} marker")

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


if __name__ == "__main__":
    main()
