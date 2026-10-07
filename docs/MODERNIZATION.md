# Modernization notes

Compared this customized 2024 fork with the current [al-folio main branch](https://github.com/alshedivat/al-folio) on October 7, 2026 (upstream commit `d83066c21e6cdb9c0846e548a499064abe23e0ef`). The upstream migration workflow is retained in `.agents/skills/al-folio-v1-migration/SKILL.md`.

| Area              | Old fork                                                    | Updated site                                                                       |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Theme ownership   | Copied layouts, includes, Sass, plugins, and JS             | Pinned `al_folio_core` 1.0.15; a small set of intentional site overrides           |
| Upgrades          | Merge upstream source with personal edits                   | Bump gem versions and audit local overrides with `al_folio_upgrade` 1.0.3          |
| Dependencies      | Unpinned gems; ignored lockfile                             | Ruby 3.3, constrained dependencies, committed lockfile                             |
| Landing page      | About                                                       | Logbook at `/`; `/blog/` redirects to it                                           |
| Navigation        | About, Blog, Projects, Resources, Resume                    | Logbook, Resources, About                                                          |
| Resources         | External repository-stat images and template repositories   | Searchable records with optional saved dates and hierarchical tags                 |
| Personal pages    | Background, interests, imposter syndrome, Spotify           | Retired; existing About prose retained for future editing                          |
| Publishing        | Builds on master/main, LSI, Python notebooks, CSS purge     | Main-only build, internal-link verification, preview artifact, gh-pages deployment |
| Optional features | Academic demos, external al-folio Medium feed, CV, trophies | Only math, archives, feeds, sitemap, and pagination enabled                        |

A wholesale upstream merge would import academic demo content and require resolving a different runtime architecture. Instead, this follows the upstream v1 starter contract: `theme: al_folio_core`, matching Gemfile/config plugin lists, and versioned runtime gems. Custom layouts, navigation, entry rows, and a plain CSS stylesheet define this site's appearance. The site does not require a local Tailwind build or Bootstrap compatibility layer.

Original technical posts, draft files, and assets remain available. Existing `/blog/:year/:title/` links are preserved. Their front-matter dates are all February 26, 2024 despite different filenames; those dates were deliberately retained to avoid changing published URLs. The LLM uncertainty entry remains labeled work in progress, with its expired deadline removed.

Training, Inference, and Agents form the initial resource taxonomy. Existing relevant resource links were migrated; bundled jQuery, Font Awesome, Academicons, and MathJax template references were removed from the shelf. No new resource discovery dates were invented.

Copied theme runtime and obsolete demo pages, project/news collections, CSS/JS bundles, contributor-template metadata, Lighthouse reports, and template CI workflows were removed. The upstream MIT license is retained. Docker wiring now builds this site's pinned dependencies rather than pulling an unrelated prebuilt template image. Docker requires a separate runtime validation if used.

Validation completed with `bundle exec jekyll build --trace`, `python3 bin/check_site.py`, formatting checks, and Playwright browser checks. Desktop and 320/375 px mobile views, entry search, populated year/tag archives, hierarchical filters, empty results, favicon, and resource access without JavaScript were checked. Five intentional runtime overrides are acknowledged. The upgrade audit has zero blocking findings and one advisory about the omitted `al_icons` plugin; the site uses text, Unicode arrows, and its own favicon, so it does not need that icon runtime.

The local macOS native gem build required `SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk` because the default SDK and linker were incompatible. This is a machine-specific installation workaround and is not baked into the site or CI.
