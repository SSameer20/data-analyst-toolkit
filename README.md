<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

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
<p align="center">
  <a href="https://github.com/SSameer20/data-analyst-plugin/graphs/contributors"><img src="https://img.shields.io/github/contributors/SSameer20/data-analyst-plugin.svg?style=for-the-badge" alt="Contributors"></a>
  <a href="https://github.com/SSameer20/data-analyst-plugin/network/members"><img src="https://img.shields.io/github/forks/SSameer20/data-analyst-plugin.svg?style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/SSameer20/data-analyst-plugin/stargazers"><img src="https://img.shields.io/github/stars/SSameer20/data-analyst-plugin.svg?style=for-the-badge" alt="Stargazers"></a>
  <a href="https://github.com/SSameer20/data-analyst-plugin/issues"><img src="https://img.shields.io/github/issues/SSameer20/data-analyst-plugin.svg?style=for-the-badge" alt="Issues"></a>
  <a href="https://data-analyst-toolkit.sameerdev.website/">
  <img src="https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fdata-analyst-toolkit.sameerdev.website%2F" alt="Website">
</a>
</p>

## About

Data Analyst Toolkit is a collection of reusable agent skills for common data-analysis work. The skills help users assess data quality, plan cleaning steps, engineer features, write SQL, and prepare business intelligence reporting across platforms such as Tableau, Power BI, Looker, Qlik, Excel, and Google Sheets.

The skills do not connect to databases or inspect live BI workspaces. They can create report artifacts when the host environment provides suitable tools; they do not modify source datasets. Review generated queries, formulas, and reports before using them.

<p>
<a href="https://www.producthunt.com/products/data-analyst-toolkit?utm_source=badge-follow&utm_medium=badge&utm_source=badge-data&#0045;analyst&#0045;toolkit" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1370814&theme=light" alt="Data&#0032;Analyst&#0032;Toolkit - Data&#0032;Analyst&#0032;Toolkit | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

## Skills

| Skill                                                          | What it helps with                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Data Analyst Workflow](skills/data-analyst-workflow/SKILL.md) | Coordinate an end-to-end analysis across the specialist skills.                     |
| [Data Quality](skills/data-quality/SKILL.md)                   | Define validation rules, measure data defects, and prioritize remediation.          |
| [Data Cleaning](skills/data-cleaning/SKILL.md)                 | Plan reproducible transformations and validate results.                             |
| [Feature Engineering](skills/feature-engineering/SKILL.md)     | Design analytical or machine-learning features while guarding against leakage.      |
| [SQL Expert](skills/sql-expert/SKILL.md)                       | Write, explain, optimize, and debug SQL; Oracle SQL is the default dialect.         |
| [BI Expert](skills/bi-expert/SKILL.md)                         | Build cross-platform BI dashboards and reporting deliverables in requested formats. |

## Install

### CLI

```
npx skills add https://github.com/SSameer20/data-analyst-toolkit
```

### Install a specific skill

```text
npx skills add https://github.com/SSameer20/data-analyst-toolkit --skill data-cleaning
```

Available Sub-Skills

- `bi-expert` — Business intelligence and visualization
- `data-analyst-workflow` — End-to-end data analysis
- `data-cleaning` — Dataset cleaning and preparation
- `data-quality` — Data quality checks and validation
- `feature-engineering` — Feature preparation and transformation
- `sql-expert` — SQL queries and database analysis

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

```bash
# Add marketplace
codex plugin marketplace add SSameer20/data-analyst-toolkit

# Install plugin
codex plugin add data-analyst-toolkit@data-analyst-toolkit
```

Codex scans `~/.agents/skills/` for user skills. If the new skills do not appear, restart Codex.


## Contributing

Suggestions and corrections are welcome. See the [contributor guide](CONTRIBUTING.md) for onboarding, good first issues, and pull request instructions, and follow our [Code of Conduct](CODE_OF_CONDUCT.md). You can also [open an issue](https://github.com/SSameer20/data-analyst-toolkit/issues/new/choose) to discuss a proposal.

## License

This project is distributed under the [MIT License](LICENSE).

## Contact

For questions or support, email [sameer.kattubadi@gmail.com](mailto:sameer.kattubadi@gmail.com).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/SSameer20/data-analyst-plugin.svg?style=for-the-badge
[contributors-url]: https://github.com/SSameer20/data-analyst-plugin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SSameer20/data-analyst-plugin.svg?style=for-the-badge
[forks-url]: https://github.com/SSameer20/data-analyst-plugin/network/members
[stars-shield]: https://img.shields.io/github/stars/SSameer20/data-analyst-plugin.svg?style=for-the-badge
[stars-url]: https://github.com/SSameer20/data-analyst-plugin/stargazers
[issues-shield]: https://img.shields.io/github/issues/SSameer20/data-analyst-plugin.svg?style=for-the-badge
[issues-url]: https://github.com/SSameer20/data-analyst-plugin/issues
[website-shield]: https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fssameer20.github.io%2Fdata-analyst-plugin%2F
[website-url]: https://data-analyst-toolkit.sameerdev.website/
