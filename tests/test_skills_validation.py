"""Validation tests for skills in data-analyst-toolkit.

Verifies skill frontmatter, structure, link integrity, and acceptance
criteria for data analyst skills.
"""

import os
import re
import unittest
import yaml

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SKILLS_DIR = os.path.join(REPO_ROOT, "skills")


class TestSkillsStructure(unittest.TestCase):
    """Static checks for all skills."""

    def setUp(self):
        self.assertTrue(os.path.isdir(SKILLS_DIR), f"Skills directory not found: {SKILLS_DIR}")
        self.skill_folders = [
            f for f in os.listdir(SKILLS_DIR)
            if os.path.isdir(os.path.join(SKILLS_DIR, f))
        ]

    def test_skills_exist(self):
        """Ensure all required skills exist in the repository."""
        expected_skills = [
            "bi-expert",
            "data-analyst-workflow",
            "data-cleaning",
            "data-quality",
            "feature-engineering",
            "sql-expert",
        ]
        for skill in expected_skills:
            self.assertIn(skill, self.skill_folders, f"Missing skill folder: {skill}")

    def test_frontmatter_validity(self):
        """Ensure every SKILL.md has valid YAML frontmatter with name and description."""
        for folder in self.skill_folders:
            skill_md = os.path.join(SKILLS_DIR, folder, "SKILL.md")
            self.assertTrue(os.path.isfile(skill_md), f"SKILL.md missing in {folder}")

            with open(skill_md, "r", encoding="utf-8") as f:
                content = f.read()

            self.assertTrue(content.startswith("---"), f"{folder}/SKILL.md missing frontmatter start '---'")
            parts = content.split("---", 2)
            self.assertGreaterEqual(len(parts), 3, f"{folder}/SKILL.md malformed frontmatter delimiters")

            frontmatter_raw = parts[1]
            data = yaml.safe_load(frontmatter_raw)
            self.assertIsInstance(data, dict, f"{folder}/SKILL.md frontmatter must be a dictionary")
            self.assertIn("name", data, f"{folder}/SKILL.md frontmatter missing 'name'")
            self.assertEqual(data["name"], folder, f"{folder}/SKILL.md name mismatch")
            self.assertIn("description", data, f"{folder}/SKILL.md frontmatter missing 'description'")
            self.assertGreater(len(data["description"].strip()), 10, f"{folder}/SKILL.md description too short")

    def test_internal_links_resolve(self):
        """Ensure all relative markdown links in SKILL.md files resolve to existing files."""
        link_pattern = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
        for folder in self.skill_folders:
            skill_md = os.path.join(SKILLS_DIR, folder, "SKILL.md")
            with open(skill_md, "r", encoding="utf-8") as f:
                content = f.read()

            for text, target in link_pattern.findall(content):
                # Ignore URLs, mailto, and anchors
                if target.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                # Split anchor if present
                clean_target = target.split("#")[0]
                if not clean_target:
                    continue
                resolved_path = os.path.normpath(os.path.join(os.path.dirname(skill_md), clean_target))
                self.assertTrue(
                    os.path.exists(resolved_path),
                    f"Broken link in {folder}/SKILL.md: '{target}' resolved to '{resolved_path}' which does not exist"
                )


class TestDataCleaningSkillAcceptanceCriteria(unittest.TestCase):
    """Verifies that data-cleaning/SKILL.md satisfies all criteria from Issue #2."""

    def setUp(self):
        self.skill_file = os.path.join(SKILLS_DIR, "data-cleaning", "SKILL.md")
        self.assertTrue(os.path.isfile(self.skill_file))
        with open(self.skill_file, "r", encoding="utf-8") as f:
            self.content = f.read()

    def test_missing_value_profiling_and_percentages(self):
        """Acceptance Criteria: Reports missing-value counts and percentages for each column."""
        self.assertRegex(
            self.content,
            r"(?i)(count(s)?\s+and\s+percentage(s)?|percentage(s)?\s+and\s+count(s)?)",
            "Must mandate reporting missing counts and percentages"
        )

    def test_missingness_tier_evaluation_5_10_50(self):
        """Acceptance Criteria: Explains appropriate handling for 5%, 10%, and 50% missingness."""
        self.assertIn("5%", self.content, "Must explicitly assess 5% missingness")
        self.assertIn("10%", self.content, "Must explicitly assess 10% missingness")
        self.assertIn("50%", self.content, "Must explicitly assess 50% missingness")

    def test_context_based_decisions_over_fixed_thresholds(self):
        """Acceptance Criteria: Does not apply fixed thresholds as unconditional drop/impute rules."""
        self.assertRegex(
            self.content,
            r"(?i)(context|unconditional|blindly|fixed\s+threshold)",
            "Must emphasize context-based decisions over unconditional fixed thresholds"
        )
        self.assertRegex(
            self.content,
            r"(?i)(never|avoid).*(replace|substitute|impute).*missing.*(with\s+zero|by\s+default)",
            "Must forbid replacing missing values with zero by default"
        )

    def test_detects_invalid_and_inconsistent_formats(self):
        """Acceptance Criteria: Detects common invalid and inconsistent formats."""
        self.assertRegex(self.content, r"(?i)date", "Must cover date format standardization")
        self.assertRegex(self.content, r"(?i)(numeric|currency|number)", "Must cover numeric string formatting")
        self.assertRegex(self.content, r"(?i)(whitespace|casing|spelling)", "Must cover whitespace/casing standardization")
        self.assertRegex(self.content, r"(?i)(category|mixed\s+type|label)", "Must cover category and mixed types")

    def test_sentinel_values_and_edge_cases(self):
        """Acceptance Criteria: Handles edge cases without silent data loss."""
        # Sentinel values
        self.assertRegex(self.content, r"(?i)sentinel", "Must explicitly address sentinel values")
        self.assertIn("N/A", self.content, "Must mention 'N/A' sentinel")
        # Edge cases
        self.assertRegex(self.content, r"(?i)(all-null|all\s+null)", "Must cover all-null columns")
        self.assertRegex(self.content, r"(?i)(silent|quarantine|loss)", "Must guard against silent data loss")

    def test_before_and_after_summary(self):
        """Acceptance Criteria: Provides before-and-after data quality summaries."""
        self.assertRegex(
            self.content,
            r"(?i)before.*and.*after.*(summary|table|reconciliation)",
            "Must provide before-and-after data quality summary table"
        )


if __name__ == "__main__":
    unittest.main()

