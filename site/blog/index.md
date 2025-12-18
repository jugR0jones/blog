---
title: Blog
layout: base.njk
---

# Blog

{% if collections.posts and collections.posts.size > 0 %}
  {% for post in collections.posts | slice(0, 5) %}
    <article class="post-summary">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      {% if post.date %}
        <time datetime="{{ post.date | isoDate }}">{{ post.date | readableDate }}</time>
      {% endif %}

      {% if post.data.summary %}
        <p>{{ post.data.summary }}</p>
      {% else %}
        <p>{{ post.templateContent | strip_html | truncate: 160 }}</p>
      {% endif %}
    </article>
  {% endfor %}
{% else %}
  <p>No posts yet.</p>
{% endif %}
