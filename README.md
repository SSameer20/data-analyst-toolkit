# Data Analyst Toolkit

Practical guidance for careful, checkable data analysis.

## What it does

Data Analyst Toolkit provides focused skills to help plan and explain data workflows, from quality checks and cleaning to SQL and Tableau reporting. It offers guidance and examples; it does not connect to databases or modify datasets.

## Skills

- [Data Analyst Workflow](skills/data-analyst-workflow/SKILL.md) — Coordinates an end-to-end analysis across the specialist skills.
- [Data Quality](skills/data-quality/SKILL.md) — Defines validation rules, measures defects, and recommends remediation.
- [Data Cleaning](skills/data-cleaning/SKILL.md) — Plans reproducible transformations and validates results.
- [Feature Engineering](skills/feature-engineering/SKILL.md) — Designs useful analytical or machine-learning features while guarding against leakage.
- [SQL Expert](skills/sql-expert/SKILL.md) — Writes, explains, optimizes, and debugs SQL, using Oracle SQL by default.
- [Tableau Expert](skills/tableau-expert/SKILL.md) — Helps prepare Tableau data, calculations, KPIs, and dashboards.

## Install for Claude Code or Codex

These are standard `SKILL.md` files. Clone the repository, then copy the skills into your user-level skills folder. Copy the complete `skills` directory so the workflow skill can reference its specialist skills.

### Claude Code marketplace install

Add this GitHub repository as a marketplace, then install the toolkit plugin:

```text
/plugin marketplace add SSameer20/data-analyst-plugin
/plugin install data-analyst-toolkit@data-analyst-skills
```

The plugin installs all six skills. Invoke one with its plugin-qualified command, for example `/data-analyst-toolkit:data-cleaning` or `/data-analyst-toolkit:sql-expert`. Claude Code can also select a skill automatically when the request matches its description.

To update later, run:

```text
/plugin marketplace update data-analyst-skills
/plugin update data-analyst-toolkit@data-analyst-skills
```

### Manual install

If you prefer not to use the marketplace, clone the repository and copy the skills into your user-level skills folder:

```bash
git clone https://github.com/SSameer20/data-analyst-plugin.git ~/data-analyst-plugin
```

### Claude Code

```bash
mkdir -p ~/.claude/skills
cp -R ~/data-analyst-plugin/skills/. ~/.claude/skills/
```

Use a skill by entering its slash command in Claude Code, for example `/data-cleaning`.

### Codex

```bash
mkdir -p ~/.agents/skills
cp -R ~/data-analyst-plugin/skills/. ~/.agents/skills/
```

Use `/skills` to see the available skills, or mention one directly, such as `$data-cleaning`. Restart Codex if newly installed skills do not appear.

To install skills for one project only, copy their folders into `.claude/skills/` for Claude Code or `.agents/skills/` for Codex inside that project instead of using the user-level folders.
