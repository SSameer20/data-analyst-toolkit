import importlib.util
import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from changelog_entries import escape_markdown, insert_entry

_spec = importlib.util.spec_from_file_location(
    "update_changelog", Path(__file__).with_name("update-changelog.py")
)
_update_changelog = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_update_changelog)
short_description = _update_changelog.short_description


def closed_pull_requests(repository: str, token: str):
    page = 1
    while True:
        request = Request(
            f"https://api.github.com/repos/{repository}/pulls"
            f"?state=closed&base=main&per_page=100&page={page}",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
        with urlopen(request, timeout=30) as response:
            pull_requests = json.load(response)
        if not pull_requests:
            return
        yield from pull_requests
        page += 1


def github_get(path: str, token: str):
    request = Request(
        f"https://api.github.com/repos/{path}",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def main_branch_commits(repository: str, token: str, since: datetime):
    query = {"sha": "main", "since": since.isoformat(), "per_page": 100}
    page = 1
    while True:
        commits = github_get(
            f"{repository}/commits?{urlencode({**query, 'page': page})}", token
        )
        if not commits:
            return
        yield from commits
        page += 1


def landed_through_pull_request(repository: str, sha: str, token: str) -> bool:
    pull_requests = github_get(f"{repository}/commits/{sha}/pulls", token)
    return any(pull_request.get("merged_at") for pull_request in pull_requests)


def add_direct_commits(
    repository: str, token: str, changelog_path: Path, since: datetime
) -> None:
    # The API returns newest first; insert oldest first so newest stays on top.
    for commit in reversed(list(main_branch_commits(repository, token, since))):
        url = commit["html_url"]
        if url in changelog_path.read_text(encoding="utf-8"):
            continue
        # Merge commits add nothing new, and PR commits are covered by the PR entry.
        if len(commit["parents"]) > 1:
            continue
        if landed_through_pull_request(repository, commit["sha"], token):
            continue

        details = commit["commit"]
        title, _, body = details["message"].partition("\n")
        author = commit.get("author") or {}
        participants = (
            f"@{escape_markdown(author['login'])}"
            if author.get("login")
            else escape_markdown(details["author"]["name"])
        )
        landed_at = datetime.fromisoformat(
            details["committer"]["date"].replace("Z", "+00:00")
        ).astimezone(timezone.utc)
        insert_entry(
            changelog_path,
            landed_at.strftime("%Y-%m-%d"),
            url,
            escape_markdown(title.strip()),
            escape_markdown(short_description(body, title.strip())),
            participants,
        )


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: update-nightly-changelog.py CHANGELOG_PATH")

    changelog_path = Path(sys.argv[1])
    token = os.environ["GH_TOKEN"]
    repository = os.environ["GITHUB_REPOSITORY"]
    cutoff = datetime.now(timezone.utc) - timedelta(hours=48)

    with tempfile.TemporaryDirectory() as temporary_directory:
        event_path = Path(temporary_directory) / "event.json"
        for pull_request in closed_pull_requests(repository, token):
            merged_at = pull_request.get("merged_at")
            if not merged_at or pull_request["head"]["ref"] == "automation/changelog":
                continue
            merged_time = datetime.fromisoformat(merged_at.replace("Z", "+00:00"))
            if merged_time < cutoff:
                continue

            event_path.write_text(
                json.dumps(
                    {
                        "repository": {"full_name": repository},
                        "pull_request": pull_request,
                    }
                ),
                encoding="utf-8",
            )
            subprocess.run(
                [
                    sys.executable,
                    ".github/scripts/update-changelog.py",
                    str(event_path),
                    str(changelog_path),
                ],
                check=True,
            )

    add_direct_commits(repository, token, changelog_path, cutoff)


if __name__ == "__main__":
    main()
