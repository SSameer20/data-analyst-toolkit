<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/SSameer20/data-analyst-plugin">
    <img src="assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Data Analyst Toolkit</h3>

  <p align="center">
    Practical, verifiable guidance for data analysis workflows.
    <br />
  </p>
</div>

## About

Data Analyst Toolkit is a collection of reusable agent skills for common data-analysis work. The skills help users assess data quality, plan cleaning steps, engineer features, write SQL, and prepare Tableau reporting.

The skills provide instructions and recommendations. They do not connect to databases, execute queries, modify datasets, or inspect live Tableau workbooks.

## Skills

| Skill                                                          | What it helps with                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Data Analyst Workflow](skills/data-analyst-workflow/SKILL.md) | Coordinate an end-to-end analysis across the specialist skills.                |
| [Data Quality](skills/data-quality/SKILL.md)                   | Define validation rules, measure data defects, and prioritize remediation.     |
| [Data Cleaning](skills/data-cleaning/SKILL.md)                 | Plan reproducible transformations and validate results.                        |
| [Feature Engineering](skills/feature-engineering/SKILL.md)     | Design analytical or machine-learning features while guarding against leakage. |
| [SQL Expert](skills/sql-expert/SKILL.md)                       | Write, explain, optimize, and debug SQL; Oracle SQL is the default dialect.    |
| [Tableau Expert](skills/tableau-expert/SKILL.md)               | Prepare Tableau metrics, calculations, data sources, and dashboard plans.      |

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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-url]: https://linkedin.com/in/othneildrew
