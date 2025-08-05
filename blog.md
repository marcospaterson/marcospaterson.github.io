---
layout: page
permalink: /blog/
---

<div class="blog-page space-y-6 mb-6">
  <p>Here you'll find tutorials, project documentation, and insights from my development journey. I write about everything from Python automation to React applications, sharing both the successes and the lessons learned along the way.</p>

  {% if site.posts.size > 0 %}
    <div class="post-list space-y-2">
      {% for post in site.posts %}
        <article class="post-preview bg-white px-4 rounded-lg shadow hover:shadow-lg transition border-l-4 border-gray-300">
          <h2 class="pt-2">
            <a class="text-gray-900" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h2>
          <p class="post-meta m-0 p-0">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %-d, %Y" }}
            </time>
          </p>
          {% if post.excerpt %}
            <div class="post-excerpt m-0 p-0 pb-2">
              {{ post.excerpt | strip_html | truncatewords: 50 }}
            </div>
          {% endif %}
          <a href="{{ post.url | relative_url }}" class="read-more text-gray-900 pb-4 inline-block">Read more →</a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>No posts published yet. The first post will be a step-by-step guide on creating this very GitHub Pages site with Jekyll!</p>
  {% endif %}
</div>
