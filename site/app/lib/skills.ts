export const SITE_URL = "https://data-analyst-toolkit.sameerdev.website";
export const REPOSITORY = "https://github.com/SSameer20/data-analyst-toolkit";

export type Skill = {
  slug: string;
  name: string;
  short: string;
  detail: string;
  tasks: string[];
  icon: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  audience: string;
  problems: string[];
  inputs: string;
  outputs: string;
  example: { prompt: string; result: string };
  limitations: string[];
  related: string[];
};

export const skills: Skill[] = [
  {
    slug: "data-analyst-workflow",
    name: "Data Analyst Workflow",
    short: "Coordinate a complete analysis across the specialist skills.",
    detail: "Route a broad analysis request through the right specialist steps, then carry assumptions forward into one coherent result.",
    tasks: ["Assess data quality", "Clean and transform", "Engineer features", "Query and report"],
    icon: "workflow",
    seoTitle: "Data Analysis Workflow Skill for AI Agents",
    seoDescription: "Structure an end-to-end data analysis workflow with an AI-agent skill that routes quality checks, cleaning, features, SQL, and BI reporting to specialist skills.",
    h1: "Structure an End-to-End Data Analysis Workflow",
    intro: "The data-analyst-workflow skill coordinates broad analysis requests. Instead of handling every step itself, it routes each phase to the matching specialist skill and carries decisions and assumptions forward so you get one consistent result.",
    audience: "Analysts who hand an AI agent a broad request — “analyze this sales extract and build a report” — that spans several kinds of work.",
    problems: [
      "Broad requests that mix quality checks, cleaning, SQL, and reporting in one prompt.",
      "Assumptions about grain or metric definitions drifting between steps.",
      "Repetitive, disconnected instructions instead of one coherent answer.",
    ],
    inputs: "A business question plus the data, schema, or context you choose to share.",
    outputs: "A coordinated result that follows this order where relevant: assess data quality, clean or transform, engineer features, query or analyze, prepare BI reporting, then validate that assumptions, grain, and metrics stay consistent. Irrelevant phases are skipped.",
    example: {
      prompt: "Here is our monthly orders extract. Check it, clean it, and outline a Power BI report of revenue by region.",
      result: "The agent runs data-quality checks first, plans cleaning with data-cleaning, then hands consistent metric definitions to bi-expert for the Power BI report plan.",
    },
    limitations: [
      "It is a router: detailed procedures live in the specialist skills, which must also be installed.",
      "It works only with the data and context you provide in the conversation.",
    ],
    related: ["data-quality", "data-cleaning", "feature-engineering", "sql-expert", "bi-expert"],
  },
  {
    slug: "data-quality",
    name: "Data Quality",
    short: "Measure data defects and prioritize practical fixes.",
    detail: "Turn quality concerns into measurable checks, explain their reporting impact, and recommend clear next actions.",
    tasks: ["Define validation rules", "Measure affected rows", "Prioritize by impact", "Recommend remediation"],
    icon: "quality",
    seoTitle: "Data Quality Checks for Analysts",
    seoDescription: "An AI-agent skill for data quality checks: define validation rules, measure affected rows, prioritize defects by business impact, and recommend remediation.",
    h1: "Assess Data Quality Before Analysis",
    intro: "The data-quality skill turns vague concerns about a dataset into measurable validation rules. It explains the business impact of each defect and recommends practical, prioritized next actions.",
    audience: "Analysts and report owners who need to know whether a dataset can be trusted before it drives a decision.",
    problems: [
      "Duplicate business keys and referential-integrity failures.",
      "Missing critical values, invalid ranges, formats, or dates.",
      "Inconsistent mappings and cross-field contradictions.",
      "Totals that don’t reconcile with a trusted source.",
    ],
    inputs: "Your dataset or a sample, its schema, business definitions, expected ranges, and the report or decision at risk.",
    outputs: "A concise table listing each rule or defect with its definition and impact, validation logic in your tool or SQL dialect, count and rate (when data is available), severity, root-cause hypothesis, and recommended action.",
    example: {
      prompt: "Audit this customer orders table before we use it in the quarterly revenue report.",
      result: "A rule table — e.g. duplicate order_id, missing order_date, negative revenue — with SQL checks, affected-row rates with stated denominators, and fixes separated into safe normalization vs. decisions needing business approval.",
    },
    limitations: [
      "Automated checks surface potential issues; they cannot always prove a value is factually correct.",
      "Counts are reported only when data is supplied — unavailable measurements are omitted, never estimated.",
      "It does not run checks or modify source data unless the host environment provides an execution tool.",
    ],
    related: ["data-cleaning", "sql-expert", "data-analyst-workflow"],
  },
  {
    slug: "data-cleaning",
    name: "Data Cleaning",
    short: "Plan reproducible transformations and validate results.",
    detail: "Profile datasets, choose careful treatments for missing and inconsistent values, and document changes for traceability.",
    tasks: ["Profile and inspect", "Standardize values", "Preserve source data", "Validate before and after"],
    icon: "cleaning",
    seoTitle: "Data Cleaning Skills for Data Analysts",
    seoDescription: "Plan data-cleaning workflows with an AI-agent skill: profile missing values, standardize formats, handle duplicates and outliers, and validate before-and-after results.",
    h1: "Plan and Improve Data-Cleaning Workflows",
    intro: "The data-cleaning skill helps you profile, clean, standardize, deduplicate, and validate data in Excel, Google Sheets, Oracle SQL, Python/Pandas, Informatica IDMC, or similar tools — without silent data loss.",
    audience: "Analysts preparing raw extracts for analysis or reporting who want cleaning decisions that are documented and reversible.",
    problems: [
      "Missing values — profiled per column with counts and percentages, treated by context rather than fixed thresholds.",
      "Sentinel placeholders such as N/A, -, unknown, 999, or -1.",
      "Inconsistent dates, numeric strings, currency, casing, whitespace, and category labels.",
      "Exact duplicate rows vs. duplicate business keys.",
      "Type coercion that would strip leading zeros from postal codes or account IDs.",
      "Outliers that may be valid extremes or data-entry errors.",
    ],
    inputs: "A dataset or sample, the target tool, and the analysis the cleaned data will feed.",
    outputs: "A documented cleaning plan or code for your tool, with an audit trail of steps, exclusions, and assumptions, plus before-and-after summaries and reconciliation against untouched raw data.",
    example: {
      prompt: "Clean this signup export in Pandas. About 50% of referral_code is blank.",
      result: "Instead of dropping the column, the skill recognizes it as sparse by design, adds a has_referral_code flag, normalizes sentinel values, and reports row counts before and after each step.",
    },
    limitations: [
      "Validate every transformation before applying it to production data.",
      "It provides plans and code; it changes files only when the host environment gives the agent tools to do so.",
      "Column drops are proposed only with confirmed low value and stakeholder sign-off.",
    ],
    related: ["data-quality", "feature-engineering", "data-analyst-workflow"],
  },
  {
    slug: "feature-engineering",
    name: "Feature Engineering",
    short: "Build useful features while guarding against leakage.",
    detail: "Design reproducible analytical or machine-learning features that match the task, data grain, and prediction timing.",
    tasks: ["Define feature meaning", "Choose transformations", "Prevent target leakage", "Validate splits and outputs"],
    icon: "features",
    seoTitle: "Feature Engineering Skill for Data Analysis",
    seoDescription: "Design reproducible analytical and machine-learning features with an AI-agent skill that covers transformations, encoding, leakage prevention, and validation splits.",
    h1: "Prepare Useful Features from Existing Data",
    intro: "The feature-engineering skill designs features that match your analytical objective and data grain — for prediction, segmentation, forecasting, or descriptive analysis — without introducing leakage or invented definitions.",
    audience: "Analysts and data scientists deriving fields for models, segments, or richer reporting.",
    problems: [
      "Choosing date parts, durations, ratios, and grouped aggregates.",
      "Categorical encoding and numeric scaling, including unseen-category handling.",
      "Target leakage from post-outcome information.",
      "Validation splits that ignore time order or recurring entities.",
    ],
    inputs: "The task and target, prediction or measurement time, row grain, available fields, and implementation tool.",
    outputs: "Proposed features with business meaning, formula, input columns, output type, and aggregation level, plus reproducible code or an implementation plan and validation checks.",
    example: {
      prompt: "Suggest features to predict customer churn next month from our transactions table.",
      result: "Recency, frequency, and spend features computed only from data available before the prediction date, with a time-based split and transformations fitted on training data only.",
    },
    limitations: [
      "Feature engineering does not automatically improve model performance; validate each feature.",
      "Code is executed only when the host environment provides an execution tool.",
    ],
    related: ["data-cleaning", "sql-expert", "data-analyst-workflow"],
  },
  {
    slug: "sql-expert",
    name: "SQL Expert",
    short: "Write, explain, optimize, and debug SQL queries.",
    detail: "Get dialect-aware SQL guidance, with Oracle SQL as the default and clear assumptions about joins, dates, and aggregation.",
    tasks: ["Write clear queries", "Debug dialect issues", "Use analytic functions", "Review query performance"],
    icon: "sql",
    seoTitle: "SQL Skills for Data Analysts",
    seoDescription: "Write, explain, debug, and review SQL with an AI-agent skill: explicit joins, aggregations, analytic window functions, date handling, and dialect awareness.",
    h1: "Write and Review SQL for Data Analysis",
    intro: "The sql-expert skill writes clear, correct SQL that matches your database dialect. It uses Oracle SQL by default unless you name another dialect, and it states assumptions about joins, grain, nulls, and dates.",
    audience: "Analysts writing analytical queries, debugging errors, or reviewing someone else’s SQL.",
    problems: [
      "Drafting queries with explicit joins, aliases, filtering, and grouping.",
      "Analytic functions such as ROW_NUMBER, RANK, and DENSE_RANK, filtered in an outer query or CTE.",
      "Date ranges with time components, using half-open boundaries.",
      "Dialect errors, such as using LIMIT in Oracle.",
      "Performance review based on filters, join keys, indexes, and execution plans.",
    ],
    inputs: "The result you want and the tables and columns you actually have. The skill does not invent schema.",
    outputs: "The query first, followed by assumptions and a concise explanation. For destructive statements, a preview query and transaction-safe approach.",
    example: {
      prompt: "Top 3 products by revenue in each region for last month (Oracle).",
      result: "A CTE using ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC), filtered in the outer query, with a half-open date range and stated tie-handling assumptions.",
    },
    limitations: [
      "It does not connect to databases or run queries unless the host provides a connection or execution tool.",
      "Performance advice is guidance, not a benchmarked guarantee.",
    ],
    related: ["data-quality", "bi-expert", "data-analyst-workflow"],
  },
  {
    slug: "bi-expert",
    name: "BI Expert",
    short: "Plan dashboards and reports for your chosen platform.",
    detail: "Shape accurate, accessible reporting deliverables across Tableau, Power BI, Looker, Qlik, Excel, and Google Sheets.",
    tasks: ["Define metrics", "Choose clear visuals", "Plan useful interactions", "Validate the report"],
    icon: "bi",
    seoTitle: "BI Reporting Skills for Tableau, Power BI and More",
    seoDescription: "Prepare business-intelligence reporting workflows for Tableau, Power BI, Looker, Qlik, Excel, and Google Sheets: KPI definitions, visuals, formulas, and validation.",
    h1: "Prepare Business-Intelligence Reporting Workflows",
    intro: "The bi-expert skill turns business questions and data into accurate reporting plans for the platform you choose — Tableau, Power BI, Looker, Qlik, Excel, Google Sheets, or others — instead of assuming one tool.",
    audience: "Analysts building dashboards, workbooks, or static reports for stakeholders.",
    problems: [
      "KPIs defined with formula, aggregation level, units, null/zero handling, and comparison period.",
      "Double-counting and grain mismatches before visuals are designed.",
      "Platform-native syntax: Tableau calculations, Power BI DAX, LookML, Qlik expressions, spreadsheet formulas.",
      "Misleading scales and unsuitable chart forms.",
    ],
    inputs: "The business question, audience, data or schema, metric definitions, target platform, and desired deliverable.",
    outputs: "KPI definitions, visual and interaction choices, and platform-specific implementation details. Where the host environment can create files, artifacts such as workbooks, HTML reports, CSVs, or chart images.",
    example: {
      prompt: "Plan a Power BI dashboard for monthly revenue vs. target by region.",
      result: "DAX measures for revenue and variance, a defined comparison period, recommended visuals and slicers, and validation steps that reconcile totals to the source data.",
    },
    limitations: [
      "It does not access live Tableau, Power BI, or other BI workspaces.",
      "Artifact creation depends on tools available in the host environment; otherwise you get formulas, a layout spec, or export steps.",
      "Final build and publishing still happen in your BI application.",
    ],
    related: ["sql-expert", "data-quality", "data-analyst-workflow"],
  },
];

export function getSkill(slug: string) {
  return skills.find((s) => s.slug === slug);
}
