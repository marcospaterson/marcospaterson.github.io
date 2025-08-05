---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-page">
  <h1>Blog Posts</h1>
  <p>Here you'll find tutorials, project documentation, and insights from my development journey. I write about everything from Python automation to React applications, sharing both the successes and the lessons learned along the way.</p>

  {% if site.posts.size > 0 %}
    <div class="post-list">
      {% for post in site.posts %}
        <article class="post-preview">
          <h2>
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h2>
          <p class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %-d, %Y" }}
            </time>
          </p>
          {% if post.excerpt %}
            <div class="post-excerpt">
              {{ post.excerpt | strip_html | truncatewords: 50 }}
            </div>
          {% endif %}
          <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>No posts published yet. The first post will be a step-by-step guide on creating this very GitHub Pages site with Jekyll!</p>
  {% endif %}
</div>
