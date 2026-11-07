# Design system

## Direction

The public site uses the approved Statistical Atlas direction: warm-gray paper, charcoal text, botanical-green route marks, flat surfaces, and cartographic lines only where they explain relationships. The homepage leads with the analysis route and its six skills; the quality-review fragment is secondary.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f4f2eb` | Page background |
| `--surface` | `#fbfaf6` | Primary content surface |
| `--line` | `#d8d5ca` | Rules and boundaries |
| `--ink` | `#22251f` | Primary text |
| `--muted` | `#555b52` | Supporting text |
| `--accent` | `#397b3d` | Primary actions and route |
| `--green` | `#34723c` | Positive quality status |
| `--amber` | `#805900` | Review status |

Typography uses a clear sans-serif system stack. Headings are compact and high contrast; body copy stays readable and calm. Interactive links retain visible underlines or focus outlines, and action targets are at least 44px tall where they form controls.

## Components and behavior

- The header keeps Skills, Install, and GitHub available across viewports; About, Changelog, Support, and Privacy remain in the footer.
- The changelog page is generated at build time from the root `CHANGELOG.md`; never edit entries in the site.
- Installation guidance is split into Claude Code and Codex sections with platform-specific commands.
- The header GitHub action links to the repository and retrieves its current star count from GitHub's public repository API.
- Every command snippet has a clipboard button with copied and failure announcements.
- The atlas route maps Understand, Prepare, Analyze, and Communicate to the six named skills.
- The skill explorer remains keyboard-operable with tabs and arrow-key navigation.
- Reduced-motion preferences remove decorative transitions and the detail-panel entrance while preserving selection changes.
- The quality-review fragment is illustrative and carries no customer or performance claim.

## Raster provenance

| Asset | Provenance |
|---|---|
| `public/icon.png` | Generated from the authored `public/icon.svg` source in this polish pass. |
| `public/social-media-preview.jpg` | Rendered from the authored `public/social-media-preview.svg` source in this polish pass. |

Both SVG sources are the editable originals. No external imagery is used.
