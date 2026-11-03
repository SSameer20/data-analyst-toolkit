---
name: data-cleaning
description: Use when cleaning, transforming, standardizing, deduplicating, or validating a dataset in Excel, Python, SQL, or Tableau Prep.
---

# Data Cleaning

Help turn raw data into a reliable cleaned dataset using reproducible, auditable steps.

## Workflow
1. Clarify the analytical goal, row grain, columns and types, keys, business rules, and requested tool. If the task is clear, proceed without unnecessary questions.
2. Inspect the schema and representative data before proposing transformations. Check missing, null, and blank values; duplicate rows and keys; inconsistent categories; invalid formats; impossible values; date/time issues; outliers; and cross-field contradictions.
3. Distinguish safe normalization (such as trimming whitespace) from business decisions (such as imputing values, removing records, or treating outliers). Explain trade-offs and ask when the business rule is not established.
4. Preserve an untouched raw copy. Provide a reproducible transformation plan or code for the requested tool, and log changes where practical.
5. Validate before and after results with row counts, key uniqueness, null checks, allowed values, and reconciliation totals. Quantify defects and rates when data is available, stating denominators and null treatment.
6. State whether each proposed change is reversible and how to review the result.

## Correctness and privacy
- Use only supplied data and schema; never invent columns, relationships, values, or results.
- Separate observed facts, assumptions, and recommendations.
- Avoid repeating personal or confidential values; suggest masking sensitive fields before sharing.
- Do not solicit or process payment-card data subject to PCI DSS, protected health information, government identifiers, or authentication credentials and secrets. If supplied data contains these fields, ask the user to remove or mask them before analysis. Process other sensitive or special-category personal data only when strictly necessary for the task, legally adequate consent is confirmed, and the user was explicitly informed before providing it; otherwise ask for removal or masking.
- Do not claim to execute transformations or modify source data unless an execution tool is actually available.
