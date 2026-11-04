"use client";

import { useEffect, useState } from "react";

type Repository = { stargazers_count?: number };

export default function GitHubStarLink() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.github.com/repos/SSameer20/data-analyst-toolkit", {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub star count unavailable");
        return response.json() as Promise<Repository>;
      })
      .then((repository) => {
        if (typeof repository.stargazers_count === "number") {
          setStars(repository.stargazers_count);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const label = stars === null
    ? "Star the toolkit on GitHub"
    : `Star the toolkit on GitHub, ${stars.toLocaleString("en-US")} stars`;

  return (
    <a className="header-action" href="https://github.com/SSameer20/data-analyst-toolkit" target="_blank" rel="noreferrer" aria-label={label}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6-4.8-4.7 6.6-.9L12 2Z" /></svg>
      <span>Star</span>
      <span className="star-count" aria-hidden="true">{stars === null ? "—" : stars.toLocaleString("en-US")}</span>
    </a>
  );
}
