"use client";

import { useState } from "react";
import CopyCode from "./copy-code";

const repository = "https://github.com/SSameer20/data-analyst-toolkit";

const skills = [
  {
    slug: "data-analyst-workflow",
    name: "Data Analyst Workflow",
    short: "Coordinate a complete analysis across the specialist skills.",
    detail: "Route a broad analysis request through the right specialist steps, then carry assumptions forward into one coherent result.",
    tasks: ["Assess data quality", "Clean and transform", "Engineer features", "Query and report"],
    icon: "workflow",
  },
  {
    slug: "data-quality",
    name: "Data Quality",
    short: "Measure data defects and prioritize practical fixes.",
    detail: "Turn quality concerns into measurable checks, explain their reporting impact, and recommend clear next actions.",
    tasks: ["Define validation rules", "Measure affected rows", "Prioritize by impact", "Recommend remediation"],
    icon: "quality",
  },
  {
    slug: "data-cleaning",
    name: "Data Cleaning",
    short: "Plan reproducible transformations and validate results.",
    detail: "Profile datasets, choose careful treatments for missing and inconsistent values, and document changes for traceability.",
    tasks: ["Profile and inspect", "Standardize values", "Preserve source data", "Validate before and after"],
    icon: "cleaning",
  },
  {
    slug: "feature-engineering",
    name: "Feature Engineering",
    short: "Build useful features while guarding against leakage.",
    detail: "Design reproducible analytical or machine-learning features that match the task, data grain, and prediction timing.",
    tasks: ["Define feature meaning", "Choose transformations", "Prevent target leakage", "Validate splits and outputs"],
    icon: "features",
  },
  {
    slug: "sql-expert",
    name: "SQL Expert",
    short: "Write, explain, optimize, and debug SQL queries.",
    detail: "Get dialect-aware SQL guidance, with Oracle SQL as the default and clear assumptions about joins, dates, and aggregation.",
    tasks: ["Write clear queries", "Debug dialect issues", "Use analytic functions", "Review query performance"],
    icon: "sql",
  },
  {
    slug: "bi-expert",
    name: "BI Expert",
    short: "Plan dashboards and reports for your chosen platform.",
    detail: "Shape accurate, accessible reporting deliverables across Tableau, Power BI, Looker, Qlik, Excel, and Google Sheets.",
    tasks: ["Define metrics", "Choose clear visuals", "Plan useful interactions", "Validate the report"],
    icon: "bi",
  },
];

function SkillIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    workflow: <><path d="M5 7h5l2 3h7"/><path d="m16 7 3 3-3 3"/><path d="M19 17h-5l-2-3H5"/><path d="m8 11-3 3 3 3"/></>,
    quality: <><path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    cleaning: <><path d="M4 18h16"/><path d="m6 15 5-10 2.5 5"/><path d="m12 14 3-6 4 7"/><path d="M8 18v-2"/></>,
    features: <><path d="M12 3v4"/><path d="M12 17v4"/><path d="m4.9 4.9 2.8 2.8"/><path d="m16.3 16.3 2.8 2.8"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m4.9 19.1 2.8-2.8"/><path d="m16.3 7.7 2.8-2.8"/><circle cx="12" cy="12" r="3"/></>,
    sql: <><path d="M5 5.5C5 4.1 8.1 3 12 3s7 1.1 7 2.5S15.9 8 12 8 5 6.9 5 5.5Z"/><path d="M5 5.5v13C5 19.9 8.1 21 12 21"/><path d="M19 5.5v5"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5"/><circle cx="17" cy="17" r="4"/><path d="m20 20 2 2"/></>,
    bi: <><path d="M4 19V5"/><path d="M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
}

export default function SkillExplorer() {
  const [selected, setSelected] = useState(0);
  const active = skills[selected];

  return (
    <div className="skill-explorer">
      <div className="skill-picker" role="tablist" aria-label="Choose a toolkit skill" aria-orientation="vertical">
        {skills.map((skill, index) => (
          <button
            aria-selected={selected === index}
            className={`skill-option${selected === index ? " is-active" : ""}`}
            id={`skill-tab-${skill.slug}`}
            key={skill.slug}
            onKeyDown={(event) => {
              const nextIndex = event.key === "ArrowDown" || event.key === "ArrowRight"
                ? (index + 1) % skills.length
                : event.key === "ArrowUp" || event.key === "ArrowLeft"
                  ? (index - 1 + skills.length) % skills.length
                  : event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? skills.length - 1
                      : -1;
              if (nextIndex >= 0) {
                event.preventDefault();
                setSelected(nextIndex);
                document.getElementById(`skill-tab-${skills[nextIndex].slug}`)?.focus();
              }
            }}
            onClick={() => setSelected(index)}
            role="tab"
            tabIndex={selected === index ? 0 : -1}
            type="button"
            aria-controls="skill-detail"
          >
            <span className="skill-icon"><SkillIcon name={skill.icon} /></span>
            <span className="skill-option-copy"><span className="skill-name">{skill.name}</span><span className="skill-description">{skill.short}</span></span>
          </button>
        ))}
      </div>
      <section className="skill-detail" id="skill-detail" role="tabpanel" aria-labelledby={`skill-tab-${active.slug}`} key={active.slug}>
        <div className="detail-topline"><span className="detail-icon"><SkillIcon name={active.icon} /></span><span>Toolkit skill</span></div>
        <h3>{active.name}</h3>
        <p>{active.detail}</p>
        <ul>{active.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
        <div className="detail-actions">
          <a className="detail-button" href={`${repository}/tree/main/skills/${active.slug}`}>Read skill</a>
          <CopyCode text={`npx skills add SSameer20/data-analyst-toolkit --skill ${active.slug}`} />
        </div>
      </section>
    </div>
  );
}
