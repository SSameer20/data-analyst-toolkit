export type Block =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Section = { heading: string; blocks: Block[] };

export type Post = {
  slug: string;
  title: string;
  question: string;
  description: string;
  published: string;
  skills: string[];
  answer: string;
  sections: Section[];
};

export const posts: Post[] = [
  {
    slug: "data-quality-checklist",
    title: "A Practical Data Quality Checklist Before Analysis",
    question: "What should you check before analyzing a dataset?",
    description: "A practical data quality checklist: grain, duplicate keys, missing critical values, ranges, dates, referential integrity, and reconciliation, with SQL examples.",
    published: "2026-11-10",
    skills: ["data-quality", "data-cleaning"],
    answer: "Before analysis, confirm the dataset's grain, then check for duplicate business keys, missing critical values, invalid ranges and formats, invalid dates, broken references between tables, cross-field contradictions, and totals that don't reconcile with a trusted source. Measure each issue as a count and a rate with a stated denominator, and prioritize by the impact on the decision the data supports.",
    sections: [
      {
        heading: "1. Confirm the grain",
        blocks: [
          { type: "p", text: "Grain is what one row represents: one order, one order line, one customer per day. Most reporting errors — double-counted revenue, inflated customer counts — come from assuming the wrong grain. Write it down before running any other check." },
          { type: "code", lang: "sql", code: "-- If grain is one row per order, this should return no rows\nSELECT order_id, COUNT(*) AS row_count\nFROM orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;" },
        ],
      },
      {
        heading: "2. Run the core checks",
        blocks: [
          { type: "ul", items: [
            "Uniqueness: duplicate business keys (order_id, customer_id).",
            "Completeness: nulls or blanks in fields the report depends on.",
            "Validity: values outside expected ranges, such as negative quantities or impossible ages.",
            "Format: dates, currency, and codes stored inconsistently.",
            "Referential integrity: child rows whose foreign key has no matching parent.",
            "Consistency: contradictions across fields, such as ship_date earlier than order_date.",
            "Timeliness: the latest record date matches when the data should have been refreshed.",
            "Reconciliation: row counts and totals match a trusted source system or report.",
          ] },
          { type: "code", lang: "sql", code: "-- Completeness rate for a critical field, with the denominator stated\nSELECT COUNT(*) AS total_rows,\n       SUM(CASE WHEN order_date IS NULL THEN 1 ELSE 0 END) AS missing_order_date,\n       ROUND(100 * SUM(CASE WHEN order_date IS NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS missing_pct\nFROM orders;\n\n-- Orphaned order lines\nSELECT COUNT(*) AS orphan_lines\nFROM order_lines l\nLEFT JOIN orders o ON o.order_id = l.order_id\nWHERE o.order_id IS NULL;" },
        ],
      },
      {
        heading: "3. Report and prioritize",
        blocks: [
          { type: "p", text: "Put the results in one table: rule, definition and impact, validation logic, count and rate, severity, root-cause hypothesis, and recommended action. Rank by business impact and reporting risk, not by raw count — 3 duplicated high-value invoices can matter more than 3,000 missing optional phone numbers." },
          { type: "p", text: "Separate safe fixes (trimming whitespace, standardizing date formats) from decisions that need business approval (excluding records, redefining a metric)." },
        ],
      },
      {
        heading: "Common mistakes",
        blocks: [
          { type: "ul", items: [
            "Reporting a percentage without saying what the denominator is.",
            "Treating automated checks as proof of accuracy. A check can flag an implausible value, but it can't prove a plausible value is true.",
            "Presenting root causes as facts instead of hypotheses.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "find-and-handle-duplicate-rows",
    title: "How to Find and Handle Duplicate Rows in a Dataset",
    question: "How do you find and remove duplicate rows in a dataset?",
    description: "Find exact duplicate rows and duplicate business keys in SQL and pandas, decide which record to keep, and deduplicate without losing data.",
    published: "2026-11-10",
    skills: ["data-cleaning", "data-quality"],
    answer: "First decide what counts as a duplicate: an exact copy of every column, or two rows with the same business key (such as customer_id) but different values. Count both kinds, inspect examples, define a rule for which record to keep (for example, the most recently updated), apply it with ROW_NUMBER() in SQL or drop_duplicates() in pandas, and reconcile row counts before and after.",
    sections: [
      {
        heading: "Exact duplicates vs. duplicate keys",
        blocks: [
          { type: "p", text: "Exact duplicates are usually load errors — the same file imported twice. Duplicate keys are harder: two customer rows with the same ID but different addresses may mean one is outdated, or that the key isn't really unique. These need a business rule, not a blanket delete." },
        ],
      },
      {
        heading: "Find duplicates in SQL",
        blocks: [
          { type: "code", lang: "sql", code: "-- Duplicate business keys and how many copies each has\nSELECT customer_id, COUNT(*) AS copies\nFROM customers\nGROUP BY customer_id\nHAVING COUNT(*) > 1\nORDER BY copies DESC;" },
          { type: "p", text: "To keep one row per key, rank rows within each key and keep rank 1. Filter the ranked result in an outer query or CTE:" },
          { type: "code", lang: "sql", code: "WITH ranked AS (\n  SELECT c.*,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY updated_at DESC, load_id DESC\n         ) AS rn\n  FROM customers c\n)\nSELECT *\nFROM ranked\nWHERE rn = 1;" },
          { type: "p", text: "Add a tie-breaker (load_id above) so the result is deterministic when two rows share the same updated_at." },
        ],
      },
      {
        heading: "Find duplicates in pandas",
        blocks: [
          { type: "code", lang: "python", code: "import pandas as pd\n\nexact_dupes = df.duplicated(keep=False).sum()\nkey_dupes = df.duplicated(subset=[\"customer_id\"], keep=False).sum()\nprint(f\"exact: {exact_dupes}, by key: {key_dupes}\")\n\n# Inspect before deciding\ndf[df.duplicated(subset=[\"customer_id\"], keep=False)].sort_values(\"customer_id\")\n\n# Keep the latest record per customer\ndeduped = (df.sort_values([\"customer_id\", \"updated_at\"])\n             .drop_duplicates(subset=[\"customer_id\"], keep=\"last\"))\nprint(len(df), \"->\", len(deduped))" },
        ],
      },
      {
        heading: "Validate the result",
        blocks: [
          { type: "ul", items: [
            "Confirm the key is now unique.",
            "Record how many rows were removed and why.",
            "Reconcile totals (revenue, quantity) to check you didn't drop real activity.",
            "Keep the removed rows in a separate table or file so the change is reversible.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "handle-missing-values",
    title: "How to Handle Missing Values Without Losing Information",
    question: "How should you handle missing values in a dataset?",
    description: "Handle missing values by context, not fixed thresholds: profile missingness, understand MCAR/MAR/MNAR, and choose between retaining nulls, flags, buckets, and imputation.",
    published: "2026-11-10",
    skills: ["data-cleaning", "feature-engineering"],
    answer: "Profile missing counts and percentages for every column, figure out why values are missing, and choose a treatment based on the business meaning — not a fixed threshold like “drop anything over 50% missing.” Options include keeping nulls, adding an is_missing flag, mapping to an explicit “Unknown” category, or imputing with the median, mean, mode, or forward fill. Flag imputed values so they stay traceable.",
    sections: [
      {
        heading: "Profile first",
        blocks: [
          { type: "code", lang: "python", code: "missing = (df.isna().sum()\n             .to_frame(\"missing_count\")\n             .assign(missing_pct=lambda t: (t.missing_count / len(df) * 100).round(2))\n             .sort_values(\"missing_pct\", ascending=False))\nprint(missing)" },
          { type: "p", text: "Normalize placeholder values first. Strings like “N/A”, “-”, “unknown”, or sentinel numbers like 999 and -1 hide missingness and will skew the profile if left in place." },
        ],
      },
      {
        heading: "Why the values are missing matters",
        blocks: [
          { type: "ul", items: [
            "MCAR (missing completely at random): unrelated to any data. Dropping rows is least risky here.",
            "MAR (missing at random): related to other observed fields, such as income missing more often for one age group.",
            "MNAR (missing not at random): related to the missing value itself, such as high earners not reporting income. Dropping these rows biases results.",
          ] },
        ],
      },
      {
        heading: "Choosing a treatment",
        blocks: [
          { type: "ul", items: [
            "Retain nulls when the field is optional and downstream tools handle nulls correctly.",
            "Add a <col>_is_missing flag when missingness itself carries information.",
            "Map categorical gaps to “Unknown” or “Not applicable” — and don't merge the two if they mean different things.",
            "Median for skewed numbers, mean for symmetric numbers, mode for categories. All of these shrink variance.",
            "Forward or backward fill only for ordered time series, and never across different entities.",
          ] },
        ],
      },
      {
        heading: "High missingness isn't automatically useless",
        blocks: [
          { type: "p", text: "A referral_code column that's 60% empty is probably sparse by design — most customers didn't use one. Dropping it loses real information. A has_referral_code flag keeps the signal." },
          { type: "code", lang: "python", code: "df[\"has_referral_code\"] = df[\"referral_code\"].notna().astype(int)\ndf[\"income_is_missing\"] = df[\"income\"].isna().astype(int)\ndf[\"income\"] = df[\"income\"].fillna(df[\"income\"].median())" },
          { type: "p", text: "In a modeling workflow, compute the median on the training data only and apply it to the test data, to avoid leakage." },
        ],
      },
    ],
  },
  {
    slug: "sql-top-n-per-group-window-functions",
    title: "How to Use CTEs and Window Functions in Analytical SQL",
    question: "How do you get the top N rows per group in SQL?",
    description: "Get the top N rows per group with ROW_NUMBER, RANK, or DENSE_RANK in a CTE. Includes Oracle examples, tie handling, and safe date ranges.",
    published: "2026-11-10",
    skills: ["sql-expert"],
    answer: "Use a window function inside a CTE: rank rows within each group with ROW_NUMBER() OVER (PARTITION BY group ORDER BY metric DESC), then filter rank <= N in the outer query. You can't filter a window function in the same query's WHERE clause. Use RANK or DENSE_RANK instead of ROW_NUMBER if tied rows should all be included.",
    sections: [
      {
        heading: "Top 3 products by revenue in each region",
        blocks: [
          { type: "code", lang: "sql", code: "WITH product_revenue AS (\n  SELECT s.region,\n         s.product_id,\n         SUM(s.amount) AS revenue\n  FROM sales s\n  WHERE s.sale_date >= DATE '2026-10-01'\n    AND s.sale_date <  DATE '2026-11-01'\n  GROUP BY s.region, s.product_id\n),\nranked AS (\n  SELECT pr.*,\n         ROW_NUMBER() OVER (PARTITION BY pr.region ORDER BY pr.revenue DESC) AS rn\n  FROM product_revenue pr\n)\nSELECT region, product_id, revenue\nFROM ranked\nWHERE rn <= 3\nORDER BY region, rn;" },
          { type: "p", text: "The date filter uses a half-open range (>= start AND < next start). That stays correct when sale_date includes a time, which BETWEEN '2026-10-01' AND '2026-10-31' would miss after midnight on the last day." },
        ],
      },
      {
        heading: "ROW_NUMBER vs. RANK vs. DENSE_RANK",
        blocks: [
          { type: "ul", items: [
            "ROW_NUMBER: always 1, 2, 3 — ties are broken arbitrarily unless you add a tie-breaker column. Exactly N rows per group.",
            "RANK: ties share a rank and the next rank is skipped (1, 1, 3). May return more than N rows.",
            "DENSE_RANK: ties share a rank with no gaps (1, 1, 2). Use it for “top 3 distinct revenue values.”",
          ] },
        ],
      },
      {
        heading: "Dialect notes",
        blocks: [
          { type: "p", text: "Oracle doesn't support LIMIT. For a simple overall limit in Oracle 12c and later, use FETCH FIRST n ROWS ONLY. PostgreSQL, MySQL, and SQLite use LIMIT. Snowflake, BigQuery, and Databricks also support QUALIFY, which filters a window function directly:" },
          { type: "code", lang: "sql", code: "-- Snowflake / BigQuery / Databricks\nSELECT region, product_id, revenue\nFROM product_revenue\nQUALIFY ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) <= 3;" },
        ],
      },
      {
        heading: "Common mistakes",
        blocks: [
          { type: "ul", items: [
            "Putting the window function in WHERE — it errors, because window functions are evaluated after WHERE.",
            "Ranking before aggregating, so you get top order lines instead of top products.",
            "Using ROW_NUMBER without a tie-breaker and getting different results on each run.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "prevent-target-leakage-feature-engineering",
    title: "Feature Engineering: How to Prevent Target Leakage",
    question: "What is target leakage in feature engineering and how do you prevent it?",
    description: "Target leakage makes models look accurate in testing and fail in production. Learn the common sources and how to prevent them with cutoff dates and proper splits.",
    published: "2026-11-10",
    skills: ["feature-engineering"],
    answer: "Target leakage happens when a feature uses information that wouldn't be available at the moment you make a prediction, such as data recorded after the outcome. It makes a model look accurate in testing and then fail in production. Prevent it by fixing a prediction cutoff time, building features only from data before that cutoff, fitting transformations on training data only, and using time-based or group-based validation splits.",
    sections: [
      {
        heading: "Common sources of leakage",
        blocks: [
          { type: "ul", items: [
            "Post-outcome fields: a cancellation_reason column when predicting cancellation.",
            "Aggregates over the full history, such as a customer's lifetime total spend, including purchases after the prediction date.",
            "Scaling, imputation, or target encoding fitted on the whole dataset before splitting.",
            "Random splits on time-ordered data, so the model trains on the future and tests on the past.",
            "The same customer appearing in both training and test sets.",
          ] },
        ],
      },
      {
        heading: "Build features up to a cutoff",
        blocks: [
          { type: "code", lang: "python", code: "cutoff = pd.Timestamp(\"2026-09-30\")\nhistory = tx[tx[\"tx_date\"] <= cutoff]\n\nfeatures = history.groupby(\"customer_id\").agg(\n    last_purchase=(\"tx_date\", \"max\"),\n    tx_count_90d=(\"tx_date\", lambda d: (d > cutoff - pd.Timedelta(days=90)).sum()),\n    spend_total=(\"amount\", \"sum\"),\n)\nfeatures[\"recency_days\"] = (cutoff - features[\"last_purchase\"]).dt.days\n\n# Label comes from the period AFTER the cutoff\nlabel_window = tx[(tx[\"tx_date\"] > cutoff) & (tx[\"tx_date\"] <= cutoff + pd.Timedelta(days=30))]\nfeatures[\"churned\"] = ~features.index.isin(label_window[\"customer_id\"])" },
        ],
      },
      {
        heading: "Validate the right way",
        blocks: [
          { type: "ul", items: [
            "Fit transformations inside each training fold, for example with a scikit-learn Pipeline.",
            "Use time-based splits for temporal prediction and group splits (GroupKFold) when entities repeat.",
            "Be suspicious of a feature that's far more predictive than everything else — it's often leakage.",
          ] },
          { type: "p", text: "New features don't automatically improve a model. Keep the ones that help on a leakage-free validation set." },
        ],
      },
    ],
  },
  {
    slug: "power-bi-data-checks-before-visualization",
    title: "Preparing Power BI and Tableau Reports: Data Checks Before Visualization",
    question: "What should you check before building a Power BI or Tableau dashboard?",
    description: "Before building a dashboard, define KPIs, confirm grain and relationships, prevent double counting, and reconcile totals. Includes DAX and Tableau examples.",
    published: "2026-11-10",
    skills: ["bi-expert", "data-quality"],
    answer: "Before building visuals, define every KPI precisely (formula, aggregation, units, filters, null handling, comparison period), confirm the grain of each table and how tables relate, check for duplicates that would double count, and reconcile totals with a trusted source. Then build measures in the platform's own language — DAX in Power BI, calculated fields in Tableau — and test filters and date boundaries.",
    sections: [
      {
        heading: "Define KPIs before charts",
        blocks: [
          { type: "p", text: "“Revenue” can mean gross or net, with or without tax, by order date or invoice date. Write one definition per KPI and use it in every visual, tab, and export. Also define how nulls and zeros are handled and which period each KPI is compared to." },
        ],
      },
      {
        heading: "Check grain and relationships",
        blocks: [
          { type: "ul", items: [
            "Know what one row means in each table.",
            "In Power BI, check relationship cardinality. An unexpected many-to-many usually means a key isn't unique.",
            "In Tableau, joining an order-line table to an order header repeats header values like shipping cost, so summing them overcounts. Relationships or LOD expressions avoid this.",
          ] },
        ],
      },
      {
        heading: "Example measures",
        blocks: [
          { type: "code", lang: "dax", code: "Revenue = SUM ( Sales[Amount] )\n\nRevenue vs Target % =\nDIVIDE ( [Revenue] - SUM ( Targets[Target] ), SUM ( Targets[Target] ) )\n\nRevenue LY =\nCALCULATE ( [Revenue], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )" },
          { type: "p", text: "DIVIDE returns blank instead of an error when the target is zero. Time-intelligence functions like SAMEPERIODLASTYEAR need a proper date table marked as a date table." },
          { type: "code", lang: "tableau", code: "// Tableau: shipping cost counted once per order, even on a line-level view\n{ FIXED [Order ID] : MAX([Shipping Cost]) }" },
        ],
      },
      {
        heading: "Validate before sharing",
        blocks: [
          { type: "ul", items: [
            "Reconcile dashboard totals to a trusted query.",
            "Test each filter and the first and last day of each date range.",
            "Check that labels, units, and number formats are correct.",
            "Avoid truncated axes on bar charts and other misleading scales.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "ai-agent-skills-for-data-analysts",
    title: "What Are AI Agent Skills and How Can They Help Data Analysts?",
    question: "What are AI agent skills for data analysis?",
    description: "AI agent skills are reusable instruction packages that guide an AI coding agent through tasks like data quality checks, cleaning, SQL, and BI reporting. Here's how they work.",
    published: "2026-11-10",
    skills: ["data-analyst-workflow"],
    answer: "An AI agent skill is a reusable package of instructions — usually a SKILL.md file — that an AI agent such as Claude Code or Codex loads when a task matches it. For data analysts, skills encode a consistent method for work like data quality audits, cleaning, SQL, feature engineering, and BI reporting, so the agent follows the same checks every time instead of improvising. Skills guide the agent; they don't add database connections or modify data on their own.",
    sections: [
      {
        heading: "How skills work",
        blocks: [
          { type: "p", text: "Each skill has a short description of when it applies and a body of instructions. When you ask the agent something that matches, it reads the skill and follows it. A data-quality skill, for example, tells the agent to state denominators, never invent counts, and label root causes as hypotheses." },
        ],
      },
      {
        heading: "Why analysts use them",
        blocks: [
          { type: "ul", items: [
            "Consistency: the same quality checks and cleaning rules every time.",
            "Fewer silent errors: skills can require before-and-after counts and reconciliation.",
            "Dialect and platform awareness: SQL in the right dialect, DAX for Power BI, calculated fields for Tableau.",
            "Shareable: a team can install the same skills and work the same way.",
          ] },
        ],
      },
      {
        heading: "What skills don't do",
        blocks: [
          { type: "p", text: "Skills are instructions, not integrations. Whether the agent can run a query, read a file, or create a workbook depends on the tools in the environment you use it in. You still review the output — skills support analyst judgment rather than replacing it." },
        ],
      },
      {
        heading: "Try it",
        blocks: [
          { type: "p", text: "Data Analyst Toolkit is an open-source set of six skills for this work. In Claude Code, install it with:" },
          { type: "code", lang: "text", code: "/plugin marketplace add SSameer20/data-analyst-plugin\n/plugin install data-analyst-toolkit@data-analyst-skills" },
          { type: "p", text: "Or add a single skill with: npx skills add SSameer20/data-analyst-toolkit --skill data-quality" },
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
