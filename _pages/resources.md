---
layout: default
title: Resources
permalink: /resources/
section: resources
nav: true
nav_order: 2
---

<header class="intro compact"><p class="eyebrow">The resource shelf</p><h1>Resources<span class="accent">.</span></h1><p class="lede">Useful things encountered along the way.<br>A growing collection, organized by topic.</p></header>
<div class="resource-layout" data-search-list data-resources>
  <aside class="resource-sidebar" aria-label="Resource topics">
    <p class="eyebrow">Browse the shelf</p>
    <button class="topic-filter all-topics" data-topic="" aria-pressed="true" hidden data-search-controls>All resources <span>{{ site.data.resources.size }}</span></button>
    {% for topic in site.data.topics %}
    <details open class="topic-group">
      <summary>{{ topic.name }}</summary>
      <p class="topic-description">{{ topic.description }}</p>
      <button data-topic="{{ topic.name }}" aria-pressed="false" hidden data-search-controls>All {{ topic.name | downcase }}</button>
      <ul>{% for child in topic.children %}<li><button data-topic="{{ topic.name }}/{{ child }}" aria-pressed="false" hidden data-search-controls>{{ child }}</button><span data-no-js>{{ child }}</span></li>{% endfor %}</ul>
    </details>
    {% endfor %}
  </aside>
  <section aria-label="Saved resources">
    <div class="section-bar"><h2>Saved <span class="muted" data-search-count>/ {{ site.data.resources.size }}</span></h2><label class="search-control" hidden data-search-controls><span class="sr-only">Search resources and tags</span><input type="search" placeholder="Search the shelf…" data-search-input></label></div>
    {% assign dated_resources = site.data.resources | where_exp: 'resource', 'resource.added != nil' | sort: 'added' | reverse %}
    {% assign undated_resources = site.data.resources | where_exp: 'resource', 'resource.added == nil' %}
    {% assign resources = dated_resources | concat: undated_resources %}
    {% for resource in resources %}
    <article class="resource-entry" data-search-item data-search="{{ resource.title | append: ' ' | append: resource.description | escape }}" data-tags="{{ resource.tags | jsonify | escape }}">
      {% if resource.added %}<time class="eyebrow" datetime="{{ resource.added | date: '%Y-%m-%d' }}">Saved {{ resource.added | date: '%b %d, %Y' }}</time>{% endif %}
      <h2><a href="{{ resource.url | escape }}" target="_blank" rel="noopener noreferrer">{{ resource.title | escape }} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></h2>
      <p>{{ resource.description | escape }}</p>
      <div class="tags">{% for tag in resource.tags %}<span>{{ tag | replace: '/', ' / ' | escape }}</span>{% endfor %}</div>
    </article>
    {% endfor %}
    <p data-search-empty hidden>No resources match these filters.</p>
    <p class="shelf-note" data-search-count aria-live="polite"></p>
  </section>
</div>
