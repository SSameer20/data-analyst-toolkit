# Data Analyst Toolkit

Practical, verifiable guidance for data analysis workflows.

[Website](https://ssameer20.github.io/data-analyst-plugin/) · [Privacy](https://ssameer20.github.io/data-analyst-plugin/privacy.html) · [Support](https://ssameer20.github.io/data-analyst-plugin/support.html)

## Contents

- [About](#about)
- [Skills](#skills)
- [Install](#install)
  - [Claude Code marketplace](#claude-code-marketplace)
  - [Codex](#codex)
  - [Manual installation](#manual-installation)
- [Usage](#usage)
- [Repository layout](#repository-layout)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

Data Analyst Toolkit is a collection of reusable agent skills for common data-analysis work. The skills help users assess data quality, plan cleaning steps, engineer features, write SQL, and prepare Tableau reporting.

The skills provide instructions and recommendations. They do not connect to databases, execute queries, modify datasets, or inspect live Tableau workbooks.

## Skills

| Skill | What it helps with |
| --- | --- |
| [Data Analyst Workflow](skills/data-analyst-workflow/SKILL.md) | Coordinate an end-to-end analysis across the specialist skills. |
| [Data Quality](skills/data-quality/SKILL.md) | Define validation rules, measure data defects, and prioritize remediation. |
| [Data Cleaning](skills/data-cleaning/SKILL.md) | Plan reproducible transformations and validate results. |
| [Feature Engineering](skills/feature-engineering/SKILL.md) | Design analytical or machine-learning features while guarding against leakage. |
| [SQL Expert](skills/sql-expert/SKILL.md) | Write, explain, optimize, and debug SQL; Oracle SQL is the default dialect. |
| [Tableau Expert](skills/tableau-expert/SKILL.md) | Prepare Tableau metrics, calculations, data sources, and dashboard plans. |

## Install

### Claude Code marketplace

Add this repository as a marketplace and install the plugin:

```text
/plugin marketplace add SSameer20/data-analyst-plugin
/plugin install data-analyst-toolkit@data-analyst-skills
```

The plugin installs all six skills. To update the marketplace and plugin:

```text
/plugin marketplace update data-analyst-skills
/plugin update data-analyst-toolkit@data-analyst-skills
```

### Codex

Clone the repository and copy the skills to your user-level skills directory:

```bash
git clone https://github.com/SSameer20/data-analyst-plugin.git
mkdir -p ~/.agents/skills
cp -R data-analyst-plugin/skills/. ~/.agents/skills/
```

Codex scans `~/.agents/skills/` for user skills. If the new skills do not appear, restart Codex.

### Manual installation

For Claude Code, copy the skill folders to its user-level skill directory:

```bash
git clone https://github.com/SSameer20/data-analyst-plugin.git
mkdir -p ~/.claude/skills
cp -R data-analyst-plugin/skills/. ~/.claude/skills/
```

For installation in a single project, use `.agents/skills/` for Codex or `.claude/skills/` for Claude Code inside that project instead of the user-level directory.

## Usage

In Claude Code, invoke an installed plugin skill by name, for example:

```text
/data-analyst-toolkit:data-cleaning
```

In Codex, use `/skills` to browse available skills or mention one directly, such as `$data-cleaning`. You can also describe your data-analysis task and let the agent choose a relevant skill.

For an end-to-end request, use the Data Analyst Workflow skill. For a focused task, invoke the corresponding specialist skill.

## Repository layout

```text
.
├── .claude-plugin/  # Claude Code plugin and marketplace manifests
├── assets/          # Plugin icon
├── site/            # Public website, privacy, terms, and support pages
└── skills/          # Reusable skill instructions
```

## Contributing

Suggestions and corrections are welcome. Open an issue to describe the proposed change, or submit a pull request with focused updates to the relevant skill or documentation.

## License

This repository does not currently include a license file. Contact the maintainer before redistributing or reusing its contents.

## Contact

For questions or support, email [sameer.kattubadi@gmail.com](mailto:sameer.kattubadi@gmail.com).
