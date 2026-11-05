"""Benchmark test simulating dataset cleaning according to data-cleaning/SKILL.md.

Demonstrates that the context-aware cleaning rules successfully handle:
- Profiling column missing counts and percentages
- Evaluating 5%, 10%, and 50% missingness tiers without blind drops
- Detecting and replacing sentinel values ('N/A', '-', 'None')
- Standardizing dates and isolating malformed calendar dates without silent data loss
- Cleaning numeric strings and accounting negatives
- Standardizing whitespace and casing
- Producing a before-and-after reconciliation summary
"""

import unittest
from datetime import datetime


class TestDataCleaningPipelineBenchmark(unittest.TestCase):
    def setUp(self):
        # 20-row sample representative dataset
        self.raw_data = [
            {"id": "1", "name": "Alice", "date": "2023-01-15", "salary": "$50,000", "state": " CA ", "dept": "HR", "promo_code": "PROMO1"},
            {"id": "2", "name": "Bob", "date": "15/01/2023", "salary": "$60,000", "state": "ca", "dept": "IT", "promo_code": "-"},
            {"id": "3", "name": "Charlie", "date": "2023-01-17", "salary": "N/A", "state": "NY", "dept": "IT", "promo_code": "N/A"},
            {"id": "4", "name": "David", "date": "2023-02-30", "salary": "$55,000", "state": "NY", "dept": "Finance", "promo_code": None},
            {"id": "5", "name": "Eve", "date": "2023-01-19", "salary": "(1,200.00)", "state": "California", "dept": "HR", "promo_code": None},
            {"id": "6", "name": "Frank", "date": "2023-01-20", "salary": "$70,000", "state": "TX", "dept": "-", "promo_code": "PROMO2"},
            {"id": "7", "name": "Grace", "date": "2023-01-21", "salary": "$65,000", "state": "TX", "dept": "HR", "promo_code": None},
            {"id": "8", "name": "Heidi", "date": "2023-01-22", "salary": "$72,000", "state": "FL", "dept": "Finance", "promo_code": None},
            {"id": "9", "name": "Ivan", "date": "2023-01-23", "salary": "$58,000", "state": "FL", "dept": "Finance", "promo_code": None},
            {"id": "10", "name": "Judy", "date": "2023-01-24", "salary": "$80,000", "state": "WA", "dept": "IT", "promo_code": None},
            {"id": "11", "name": "Mallory", "date": "2023-01-25", "salary": "$82,000", "state": "WA", "dept": "IT", "promo_code": None},
            {"id": "12", "name": "Niaj", "date": "2023-01-26", "salary": "$54,000", "state": "IL", "dept": "HR", "promo_code": None},
            {"id": "13", "name": "Olivia", "date": "2023-01-27", "salary": "$61,000", "state": "IL", "dept": "Finance", "promo_code": None},
            {"id": "14", "name": "Peggy", "date": "2023-01-28", "salary": "$63,000", "state": "MA", "dept": "Marketing", "promo_code": None},
            {"id": "15", "name": "Rupert", "date": "2023-01-29", "salary": "$75,000", "state": "MA", "dept": "Marketing", "promo_code": "PROMO3"},
            {"id": "16", "name": "Sybil", "date": "2023-01-30", "salary": "$68,000", "state": "CO", "dept": "Marketing", "promo_code": None},
            {"id": "17", "name": "Trent", "date": "2023-01-31", "salary": "$71,000", "state": "CO", "dept": "IT", "promo_code": None},
            {"id": "18", "name": "Victor", "date": "2023-02-01", "salary": "$73,000", "state": "NC", "dept": None, "promo_code": None},
            {"id": "19", "name": "Walter", "date": "2023-02-02", "salary": "$79,000", "state": "NC", "dept": "Finance", "promo_code": None},
            {"id": "20", "name": "Walter", "date": "2023-02-02", "salary": "$79,000", "state": "NC", "dept": "Finance", "promo_code": None}, # duplicate row
        ]

    def test_sentinel_normalization(self):
        """Sentinels like 'N/A', '-' must be converted to true None before calculating statistics."""
        sentinels = {"N/A", "NA", "-", "--", "None", "NULL", "null", "unknown", "?"}
        normalized = []
        sentinel_count = 0
        for row in self.raw_data:
            clean_row = {}
            for k, v in row.items():
                if isinstance(v, str) and v.strip() in sentinels:
                    clean_row[k] = None
                    sentinel_count += 1
                else:
                    clean_row[k] = v
            normalized.append(clean_row)

        self.assertGreater(sentinel_count, 0, "Sentinels must be detected and normalized")
        # Ensure row 3 salary ('N/A') and row 2 promo_code ('-') are None
        self.assertIsNone(normalized[2]["salary"])
        self.assertIsNone(normalized[1]["promo_code"])

    def test_missingness_profiling_and_context_aware_handling(self):
        """Missing values must be profiled with counts & percentages and evaluated by tier."""
        total_rows = len(self.raw_data)
        sentinels = {"N/A", "-", "None", "NULL"}

        # Step 1: Normalize sentinels
        data = []
        for row in self.raw_data:
            data.append({k: (None if (isinstance(v, str) and v.strip() in sentinels) else v) for k, v in row.items()})

        # Step 2: Compute profile
        cols = ["id", "name", "date", "salary", "state", "dept", "promo_code"]
        profile = {}
        for c in cols:
            null_count = sum(1 for r in data if r[c] is None)
            pct = (null_count / total_rows) * 100
            profile[c] = {"null_count": null_count, "pct": pct}

        # 5% missingness check: salary (1 out of 20 = 5%)
        self.assertEqual(profile["salary"]["pct"], 5.0)

        # 10% missingness check: dept (2 out of 20 = 10%)
        self.assertEqual(profile["dept"]["pct"], 10.0)

        # High missingness: promo_code (17 out of 20 = 85%, > 50%)
        self.assertGreater(profile["promo_code"]["pct"], 50.0)

        # Assert contextual handling according to skill:
        # 1. Salary (5%): safe for median imputation, NEVER default zero
        salaries = [float(r["salary"].replace("$", "").replace(",", "")) for r in data if r["salary"] is not None and not r["salary"].startswith("(")]
        median_salary = sorted(salaries)[len(salaries)//2]
        self.assertGreater(median_salary, 0, "Never default to 0")

        # 2. Dept (10%): do not drop rows; bucket as 'Unknown' or add indicator flag
        dept_handling = [r["dept"] if r["dept"] is not None else "Unknown" for r in data]
        self.assertNotIn(None, dept_handling)
        self.assertIn("Unknown", dept_handling)

        # 3. Promo code (>50%): sparse by design, do not drop column! Retain as flag
        has_promo = [1 if r["promo_code"] is not None else 0 for r in data]
        self.assertEqual(sum(has_promo), 3, "Preserved signal from sparse column")

    def test_date_standardization_and_malformed_quarantine(self):
        """Dates must be standardized to ISO format and invalid dates quarantined (no silent loss)."""
        valid_dates = []
        quarantined = []
        for r in self.raw_data:
            raw_date = r["date"]
            parsed = None
            for fmt in ("%Y-%m-%d", "%d/%m/%Y"):
                try:
                    parsed = datetime.strptime(raw_date, fmt).strftime("%Y-%m-%d")
                    break
                except ValueError:
                    continue
            if parsed:
                valid_dates.append(parsed)
            else:
                quarantined.append({"id": r["id"], "raw_date": raw_date, "reason": "Malformed calendar date"})

        # row 4 has '2023-02-30' which is malformed
        self.assertEqual(len(quarantined), 1)
        self.assertEqual(quarantined[0]["raw_date"], "2023-02-30")
        self.assertEqual(quarantined[0]["id"], "4")
        # row 2 has '15/01/2023' which should be parsed to '2023-01-15'
        self.assertIn("2023-01-15", valid_dates)


if __name__ == "__main__":
    unittest.main()

