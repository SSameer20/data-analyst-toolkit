---
name: data-cleaning
description: Use when profiling, cleaning, transforming, standardizing, deduplicating, or validating data with Excel, Google Sheets, Oracle SQL, Python/Pandas, Informatica IDMC, or similar tools.
---

# Data Cleaning

Data cleaning identifies, corrects, and manages inaccurate, incomplete, duplicated, or inconsistent data so it is reliable, consistent, and suitable for analysis and reporting. Preserve data integrity and avoid unnecessary information loss.

## Core tasks
- **Missing values:** Identify null, blank, and placeholder values; choose a treatment based on data type, missingness pattern, and business context.
- **Duplicates:** Detect exact duplicate rows and duplicate keys or entities; distinguish genuine repeats from records that should be consolidated.
- **Data types:** Correct types for dates, numbers, text, categories, and identifiers without losing meaningful formatting or leading zeros.
- **Standardization:** Align date and text formats, units, categories, and naming conventions.
- **Inconsistent or invalid values:** Correct spelling or label variations only when the intended value is clear; validate permitted values and business rules.
- **Outliers:** Identify unusual values and investigate whether they are errors or valid observations before changing or excluding them.
- **Validation:** Apply range, mandatory-field, cross-field, and referential-integrity checks where the schema and rules support them.
- **Documentation:** Record cleaning steps, assumptions, decisions, and modifications for traceability.

## Choosing how to handle missing values

| Method | Potential use |
| --- | --- |
| Remove rows | Missingness is limited, the records have low analytical value, and removal will not bias the analysis or break required coverage. |
| Remove columns | A field has excessive missingness and low relevance, after confirming it is not required for a business process or analysis. |
| Mean imputation | Numerical data is reasonably symmetric and the mean is an appropriate representation; assess distortion and preserve an indicator when useful. |
| Median imputation | Numerical data is skewed or has outliers, and a median replacement is justified for the analysis. |
| Mode imputation | Categorical data has a meaningful and sufficiently representative most common category. |
| Forward/backward fill | Ordered time-series data where carrying a nearby observation forward or backward is valid for the measurement and time interval. |
| Business-rule imputation | Domain knowledge explicitly supports a replacement and the rule is documented. |

Never replace missing values with zero by default. Zero may be a valid measurement and is not equivalent to unknown, unavailable, or not applicable. If the correct treatment depends on an unprovided business rule, explain the options and ask before applying it.

## Workflow
1. Clarify the analytical goal, row grain, columns and types, keys, business rules, and requested tool. If the task is clear, proceed without unnecessary questions.
2. Profile and inspect the schema and representative data. Check nulls and blanks, duplicates, types, format and category consistency, invalid values, outliers, business rules, referential integrity, and cross-field contradictions.
3. Identify and quantify quality issues, stating counts, denominators, and how nulls are treated when data is available.
4. Define cleaning rules appropriate to each issue. Separate safe normalization (such as trimming whitespace) from decisions that require business context (such as imputing values, removing records, or treating outliers); explain trade-offs and ask when a rule is not established.
5. Preserve an untouched raw copy. Apply or provide a reproducible transformation plan or code for the requested tool, and document changes, assumptions, and modifications for traceability.
6. Validate the cleaned result with before-and-after checks: row counts, key uniqueness, missing values, types, allowed values, business rules, and reconciliation totals.
7. State whether each change is reversible, how to review it, and any remaining limitations. Prepare the resulting dataset for the intended analysis, BI dashboard, or report without claiming to have modified data unless an execution tool was available and used.

## Common tools
- **Excel and Google Sheets:** Filters, conditional formatting, built-in duplicate removal, find/replace, and formulas. Recommend working on a copy and checking the effects of bulk edits.
- **Oracle SQL:** `IS NULL`, `COALESCE`, `NVL`, `TRIM`, `CASE`, and validation queries. Use the actual schema and business rules; do not claim to run queries without a database tool.
- **Python/Pandas:** `isnull()`, `fillna()`, `dropna()`, `drop_duplicates()`, and explicit type conversions. Provide executable, reviewable code when requested and avoid overwriting the source by default.
- **Informatica IDMC:** Data profiling, cleansing, standardization, and data-quality validation. Give platform-specific steps only when enough context is available.
- Adapt the approach to other requested tools rather than assuming a particular platform.

## Professional responsibilities and outcome
Support the analyst or data-quality professional in assessing data quality, applying approved rules, maintaining accuracy, completeness, consistency, and validity, avoiding unnecessary data loss, clarifying issues with business stakeholders, and documenting and validating changes before reporting.

The desired outcome is a clean, validated, analysis-ready dataset that supports accurate SQL analysis and reporting across BI tools and spreadsheet formats.

## Correctness and privacy
- Use only supplied data and schema; never invent columns, relationships, values, or results.
- Separate observed facts, assumptions, and recommendations.
- Avoid repeating personal or confidential values; suggest masking sensitive fields before sharing.
- Do not solicit or process payment-card data subject to PCI DSS, protected health information, government identifiers, or authentication credentials and secrets. If supplied data contains these fields, ask the user to remove or mask them before analysis. Process other sensitive or special-category personal data only when strictly necessary for the task, legally adequate consent is confirmed, and the user was explicitly informed before providing it; otherwise ask for removal or masking.
- Do not claim to execute transformations or modify source data unless an execution tool is actually available.
