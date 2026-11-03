## Conversation summary

- Reviewed the attached plugin guidelines and added privacy safeguards across all six skills.
- Built a static site with a skills showcase, privacy policy, terms, and support page. Added your logo and deployed the site to GitHub Pages:
  - [Website](https://ssameer20.github.io/data-analyst-plugin/)
  - [Privacy policy](https://ssameer20.github.io/data-analyst-plugin/privacy.html)
  - [Terms](https://ssameer20.github.io/data-analyst-plugin/terms.html)
  - [Support](https://ssameer20.github.io/data-analyst-plugin/support.html)
- Added a GitHub Actions workflow to publish the `site/` folder and updated `plugin.json` with the public site URLs.
- Created a root `README.md` describing the project and its six skills.
- Addressed review feedback by changing the listing name to **Data Analyst Toolkit**, clarifying its data-analysis purpose, shortening the subtitle to 21 characters, and limiting prompts to three. The category remains **Productivity**; confirm it in the submission portal or choose a more specific data category if offered.
- Expanded the privacy policy to explain what the plugin and website handle, relevant service providers, retention responsibility, and user choices.

## Still unresolved

The portal says **new skills-only submissions aren’t being accepted**. Metadata changes can’t override that restriction.

You then asked to add Tableau MCP using a local `npx`/PAT example. I checked the documentation but **did not add that config**: the example starts a local server with Tableau credentials, while directory submission requires a public HTTPS MCP endpoint. Tableau also offers a hosted service using OAuth. Don’t commit real PAT credentials. Adding MCP should be a genuine product feature, not just a workaround for the skills-only restriction.
