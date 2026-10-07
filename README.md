# Elijah Soba’s Logbook

A working notebook about machine learning, with a resource shelf and an About page. Built with Jekyll and the versioned [al-folio](https://github.com/alshedivat/al-folio) v1 runtime.

## Where to edit text

Edit the source files on `main`. The table below maps the visible parts of the site to their source files. Click a filename to open it on GitHub, then use the pencil button to edit it.

| What you want to change                                             | File                                                                           | What to edit                                                                                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| About biography                                                     | [\_pages/about.md](_pages/about.md)                                            | The paragraphs below the second `---` line. This is Markdown; leave the settings at the top in place.                                    |
| About heading and subtitle                                          | [\_pages/about.md](_pages/about.md)                                            | `title` and `description` in the settings at the top.                                                                                    |
| Logbook heading, subtitle, and resource link                        | [\_pages/blog.md](_pages/blog.md)                                              | The text inside `<h1>`, `<p class="lede…">`, and the link inside `intro-links`. Update the top-level `title` too when renaming the page. |
| Resources heading and subtitle                                      | [\_pages/resources.md](_pages/resources.md)                                    | The text inside `<h1>` and the first `<p class="lede…">`. Update the top-level `title` too when renaming the page.                       |
| Your name, “Notes from the workbench,” and navigation labels        | [\_includes/header.liquid](_includes/header.liquid)                            | The visible text inside the brand and navigation links. Keep the link destinations and Liquid expressions intact.                        |
| Footer name, “Logbook,” and link labels                             | [\_layouts/default.liquid](_layouts/default.liquid)                            | The text inside `<footer>`. The GitHub link destination is also set here.                                                                |
| Email and LinkedIn destinations                                     | [\_config.yml](_config.yml)                                                    | `email` and `linkedin_username`; use just the username for LinkedIn, not the full URL.                                                   |
| Site title and search/social description                            | [\_config.yml](_config.yml)                                                    | `title` and `description`. These do not replace the visible header name or page subtitles.                                               |
| Entry titles and summaries on the landing page                      | [\_posts/](_posts/)                                                            | Each entry’s `title` and `description` settings.                                                                                         |
| Saved resource names, descriptions, URLs, and tags                  | [\_data/resources.yml](_data/resources.yml)                                    | The fields in each resource entry.                                                                                                       |
| Resource topic names and descriptions                               | [\_data/topics.yml](_data/topics.yml)                                          | Each topic’s `name`, `description`, and `children`.                                                                                      |
| Repeated labels such as “Entries,” “Saved,” and search placeholders | [\_pages/blog.md](_pages/blog.md), [\_pages/resources.md](_pages/resources.md) | The corresponding visible text or `placeholder` value.                                                                                   |

Files starting with a block between two `---` lines use **front matter**: settings such as `title`, `description`, and `profile`. Below that block is the page’s content. Quote YAML values that contain a colon, for example `title: "Inference: first lessons"`, and keep indentation consistent using spaces.

About and posts accept Markdown:

```markdown
A paragraph about my work, with a [link](https://example.com).

Another paragraph. Leave a blank line between paragraphs.

## A section heading

- A list item
- Another list item
```

Logbook and Resources use HTML mixed with Liquid (`{{ … }}` and `{% … %}`). Change the words between HTML tags while keeping the tags and Liquid expressions in place. To change a tab’s name, update both its navigation label and page heading; its URL can stay the same.

## Change images and spacing

- **About portrait:** put the new image in [assets/img/](assets/img/), then set `profile.image` in [\_pages/about.md](_pages/about.md) to its filename, such as `blog_pic.jpeg`. Set `profile.alt` to a short description. `image_circular: false` keeps the square crop; `true` makes it circular.
- **Header icon and browser tab icon:** their image paths are in [\_includes/header.liquid](_includes/header.liquid) and [\_layouts/default.liquid](_layouts/default.liquid). Update `_config.yml`’s `icon` and `og_image` as well if changing the branding/social image.
- **Header subtext width:** set `intro_full_width: true` in a page’s front matter to span the content width, or `false` for a narrower introduction. Logbook and Resources currently enable this.
- **About spacing and portrait size:** edit `.about-prose` (column widths and gap), `.about-copy` (line spacing), `.about-copy p` (paragraph spacing), and `.about-photo` in [assets/css/logbook.css](assets/css/logbook.css). The media query beneath them controls the stacked mobile layout. The portrait stays vertically centered beside the text.
- **Colors and general layout:** use [assets/css/logbook.css](assets/css/logbook.css). The variables at the top define the light and dark palettes; `.intro` and `.compact` control heading spacing.

Use the image’s repo filename, not a path on your computer. Images must be committed along with the page change.

## Run locally

Use Ruby 3.3 (see `.ruby-version`):

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000`. Alternatively, use `docker compose up --build` and open `http://localhost:8080`.

The sun/moon button at the right of the navigation switches between light and dark mode. The site initially follows your system preference and remembers an explicit choice across pages and visits.

Content changes usually appear automatically during local preview. Restart Jekyll after editing `_config.yml`.

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

Write the entry in Markdown below the closing `---`. The `description` appears both under the entry heading and in its Logbook listing. Tags link to post archives; they are separate from the resource taxonomy.

Keep the `date` consistent with the filename. Existing posts retain their original front-matter dates and URLs. To revise an existing entry, edit its content, `title`, or `description` without renaming the file or changing its date. Published URLs use `/blog/:year/:title/`, where `:title` normally comes from the filename’s slug.

Work in [\_drafts/](_drafts/) until ready to publish; preview drafts with `bundle exec jekyll serve --drafts`. For a new draft, use a filename such as `_drafts/a-lesson-from-the-work.md`. Publish it by moving it to `_posts/2026-10-07-a-lesson-from-the-work.md` and setting its publication date. Math is enabled for posts. Interactive components can be included in individual entries.

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

For example, to add a Training subtopic, add `- Data preparation` under Training’s `children` in `_data/topics.yml`, then use `tags: [Training/Data preparation]` on the resource. If you rename a topic or child, update matching resource tags too. `added` is optional; dated resources come first, and undated resources follow in file order. Use the actual date you saved the resource when recording one.

## Publish your changes

For a small text edit, you can edit the file directly on GitHub and commit it to `main`. If GitHub offers to create a branch instead, open a pull request and merge it into `main` when ready.

For local edits, preview and validate them, then commit the specific files you changed:

```sh
git add _pages/about.md
git commit -m "Update About text"
git push origin main
```

Replace the path in `git add` with your changed files, including any new images. A push to `main` runs **Deploy site** and **Formatting** in the repository’s [Actions tab](https://github.com/esoba/esoba.github.io/actions). Once deployment runs, **pages build and deployment** publishes the result at [esoba.github.io](https://esoba.github.io). Wait for that run to finish before checking the live page; refresh if your browser shows an older copy.

Edit source files rather than `_site/` or the `gh-pages` branch, which are generated during deployment. Keep `/`, `/about/`, `/resources/`, and existing published post URLs stable when editing copy.

## Validate and update

```sh
bundle exec jekyll build --trace
python3 bin/check_site.py
npm ci
npm run format:check
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit --fail-on-stale
```

If the formatting check reports a problem, run `npm run format`, review the changes, and run the check again.

When intentionally editing a registered template override, acknowledge that file after reviewing your change. For example:

```sh
bundle exec al-folio upgrade overrides accept _includes/header.liquid
bundle exec al-folio upgrade overrides audit --fail-on-stale
```

Use the actual modified template path, such as `_layouts/default.liquid` for footer changes, and commit the resulting `.al-folio-overrides.yml` update with it. Ordinary edits to About text, posts, resources, or CSS do not require this step.

Theme versions are pinned in `Gemfile`; dependency resolution is committed in `Gemfile.lock`. Intentional site layouts are registered in `.al-folio-overrides.yml`. Review override drift when upgrading gems. See [the migration notes](docs/MODERNIZATION.md) for the upstream comparison and [GitHub cleanup](docs/GITHUB-CLEANUP.md) for the branch and contributor migration.
