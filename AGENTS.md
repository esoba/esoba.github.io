# Elijah Soba’s Logbook

This is a personal site using the al-folio v1 runtime, rather than the upstream academic demo. Keep navigation to Logbook, Resources, and About. The Logbook owns `/`; retain existing published `/blog/:year/:title/` URLs unless explicitly asked to change them.

Use `_posts` for published entries, `_drafts` for work in progress, `_data/resources.yml` for saved links, and `_data/topics.yml` for the hierarchical taxonomy. Resource tags use `Topic/Child`; discovery dates are optional. Do not invent discovery dates or update About facts without user-supplied information.

Gem versions are pinned in `Gemfile` and resolved in `Gemfile.lock`. Plugin activation must agree between `Gemfile` and `_config.yml`. Local layouts, the header, and `assets/css/logbook.css` are intentional site-owned overrides. Review `.al-folio-overrides.yml` during upgrades. Do not copy upstream template demos or academic features into this site by default.

Use Ruby 3.3. Validate material changes with:

```sh
bundle exec jekyll build --trace
python3 bin/check_site.py
npm ci
npm run format:check
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit --fail-on-stale
```

For migration work, consult `.agents/skills/al-folio-v1-migration/SKILL.md` and `docs/MODERNIZATION.md`. GitHub deployment comes from `main`; `gh-pages` is generated. This checkout uses the personal GitHub noreply identity. Preserve it instead of inheriting a global work email. Branch/contributor cleanup and the backup location are documented in `docs/GITHUB-CLEANUP.md`.
