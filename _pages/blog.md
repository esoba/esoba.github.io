---
layout: default
permalink: /
title: Logbook
section: logbook
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
---

<section class="intro">
  <p class="eyebrow">A working notebook / Machine learning</p>
  <h1>Logbook<span class="accent">.</span></h1>
  <p class="lede">Notes, experiments, and lessons from the work.<br>Written down to make the next thing a little clearer.</p>
  <div class="intro-links"><a href="{{ '/resources/' | relative_url }}">Explore the resource shelf <span aria-hidden="true">↗</span></a></div>
</section>
<section data-search-list aria-label="Logbook entries">
  <div class="section-bar"><h2>Entries <span class="muted">/ {{ site.posts.size }}</span></h2><label class="search-control" hidden data-search-controls><span class="sr-only">Search entries on this page</span><input type="search" placeholder="Search entries…" data-search-input></label></div>
  {% if paginator %}{% assign entries = paginator.posts %}{% else %}{% assign entries = site.posts %}{% endif %}
  {% for post in entries %}{% include entry.liquid post=post %}{% endfor %}
  <p data-search-empty hidden>No entries match this search.</p>
</section>
{% if paginator.total_pages > 1 %}
<nav class="pagination" aria-label="Logbook pages">
  {% if paginator.previous_page %}<a href="{{ paginator.previous_page_path | relative_url }}">← Newer</a>{% endif %}
  <span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
  {% if paginator.next_page %}<a href="{{ paginator.next_page_path | relative_url }}">Older →</a>{% endif %}
</nav>
{% endif %}
