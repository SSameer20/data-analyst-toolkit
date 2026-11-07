# Contributing

Thanks for helping improve Data Analyst Toolkit. Contributions of all sizes are welcome, including clearer instructions, corrected examples, bug fixes, and new ideas for the skills or website.

## Find something to work on

- Browse open issues labeled [good first issue](https://github.com/SSameer20/data-analyst-toolkit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). The label is intended to identify approachable tasks; read the full issue and ask questions before starting if anything is unclear.
- Found a problem that is not reported? [Open an issue](https://github.com/SSameer20/data-analyst-toolkit/issues/new/choose) with what you expected, what happened, and enough context to understand it. Do not include private datasets, credentials, or personal information.

If you plan to take an issue, leave a comment so others know it is being worked on. For substantial changes, open an issue or discuss your approach before investing time.

## Set up your fork

1. Fork the [repository](https://github.com/SSameer20/data-analyst-toolkit/fork) on GitHub.
2. Clone your fork and add the original repository as `upstream`:

   ```bash
   git clone https://github.com/<YOUR-USERNAME>/data-analyst-toolkit.git
   cd data-analyst-toolkit
   git remote add upstream https://github.com/SSameer20/data-analyst-toolkit.git
   ```

3. Start each change from an up-to-date `main` branch, and create a descriptive branch for your work:

   ```bash
   git fetch upstream
   git switch main
   git pull --ff-only upstream main
   git switch -c docs/short-description
   ```

   Use a relevant prefix such as `docs/`, `fix/`, or `feat/` and keep the branch focused on one change.

## Make a focused change

- Update the relevant skill in `skills/`, or the appropriate page in `site/`; avoid unrelated formatting or scope changes.
- Keep skill guidance practical, accurate, and clear about assumptions. Do not imply that a skill accesses a database or changes source data when it does not.
- Use examples that are safe to share. Never add secrets, credentials, or real personal or restricted data.
- Write clear Markdown and descriptive link text. Preserve existing file and content conventions.

## Check your work

This repository does not currently define a general test command. Before opening a pull request:

- Review your diff with `git diff` and make sure it contains only the intended changes.
- Preview Markdown and check that links and code blocks render correctly.
- For website changes, open the affected page and check the layout at desktop and mobile widths.
- For skill changes, check that examples and instructions agree with the skill's intended behavior.

If you add a test or run a relevant validation, include what you ran and its result in the pull request.

## Open a pull request

Commit your changes with a concise message, then push your branch to your fork:

```bash
git add <changed-files>
git commit -m "docs: clarify contribution setup"
git push -u origin docs/short-description
```

Open a pull request from your branch to `main` in the upstream repository. In the description:

- Summarize what changed and why.
- Link the related issue (use `Closes #<issue-number>` only when the PR fully resolves it).
- List the checks you ran, or say that no automated checks were available.
- Include screenshots for visual website changes when useful.

Keep the PR focused, respond constructively to review feedback, and make requested follow-up changes on the same branch. A maintainer will review and merge the contribution.

Merged pull requests to `main` are recorded in the [changelog](CHANGELOG.md) by date, with a title, short summary, and participating authors. Automation opens a pull request for changelog updates, and a nightly catch-up job checks the previous 48 hours for missed entries.

## Community

Be welcoming, respectful, and constructive in issues and reviews. Ask questions when you are unsure; first-time contributors are encouraged to participate.
