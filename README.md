# Elijah Soba’s Logbook

A working notebook about machine learning, with a resource shelf and an About page. Built with Jekyll and the versioned [al-folio](https://github.com/alshedivat/al-folio) v1 runtime.

## Run locally

Use Ruby 3.3 (see `.ruby-version`):

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000`. Alternatively, use `docker compose up --build` and open `http://localhost:8080`.

The sun/moon button at the right of the navigation switches between light and dark mode. The site initially follows your system preference and remembers an explicit choice across pages and visits.

## Write an entry

Add `_posts/YYYY-MM-DD-title.md` with this front matter:

```yaml
---
layout: post
title: A lesson from the work
date: 2026-10-07
description: A short description of the entry.
tags: [inference, serving]
---
```

Keep the `date` consistent with the filename. Existing posts retain their original front-matter dates and URLs. Work in `_drafts` until ready to publish; preview drafts with `bundle exec jekyll serve --drafts`. Math is enabled for posts. Interactive components can be included in individual entries.

## Save a resource

Append to `_data/resources.yml`:

```yaml
- title: A useful reference
  url: https://example.com/reference
  added: 2026-10-07
  description: What makes this worth keeping.
  tags: [Inference/Serving, Agents/Tool use]
```

Resources display newest additions first. Migrated entries have no discovery date because the old page did not record one. Topics and their child tags live in `_data/topics.yml`. Use the exact `Topic/Child` spelling in entries; add deeper levels using `/` when needed. Topic filters match descendants. Search matches titles, descriptions, and tags. All resources remain accessible without JavaScript.

## Validate and update

```sh
bundle exec jekyll build
python3 bin/check_site.py
npm ci
npm run format:check
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit
```

Theme versions are pinned in `Gemfile`; dependency resolution is committed in `Gemfile.lock`. Intentional site layouts are registered in `.al-folio-overrides.yml`. Review override drift when upgrading gems. See [the migration notes](docs/MODERNIZATION.md) for the upstream comparison and [GitHub cleanup](docs/GITHUB-CLEANUP.md) for the branch and contributor migration.
