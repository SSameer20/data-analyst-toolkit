import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.request import Request, urlopen


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
            if not merged_at:
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


if __name__ == "__main__":
    main()
