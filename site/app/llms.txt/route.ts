import { posts } from "../lib/posts";
import { REPOSITORY, SITE_URL, skills } from "../lib/skills";

export function GET() {
  const body = `# Data Analyst Toolkit

> Data Analyst Toolkit is an open-source collection of reusable AI-agent skills for data analysts: data quality checks, data cleaning, feature engineering, SQL, and business-intelligence reporting (Tableau, Power BI, Looker, Qlik, Excel, Google Sheets). The skills guide an AI agent such as Claude Code or Codex. They do not connect to databases, access live BI workspaces, or modify source data on their own.

Source code: ${REPOSITORY} (MIT License)

## Skills
${skills.map((s) => `- [${s.name}](${SITE_URL}/skills/${s.slug}): ${s.short} ${s.detail}`).join("\n")}

## Guides
${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.question}`).join("\n")}

## Install
- Claude Code: /plugin marketplace add SSameer20/data-analyst-plugin, then /plugin install data-analyst-toolkit@data-analyst-skills
- Codex: codex plugin marketplace add SSameer20/data-analyst-toolkit, then codex plugin add data-analyst-toolkit@data-analyst-toolkit
- Single skill: npx skills add SSameer20/data-analyst-toolkit --skill <skill-name>
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
