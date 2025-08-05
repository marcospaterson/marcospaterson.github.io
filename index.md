---
layout: default
---

<div class="home">
  
  <section class="hero">
    <h1 class="page-heading">Welcome to My Development Journey</h1>
    <p class="hero-description">
      Hi! I'm Marcos Paterson, a passionate developer who loves building things with code. 
      This site serves as both my portfolio and a place where I share my learning experiences 
      through detailed blog posts and project documentation.
    </p>
  </section>

  <section class="content-overview">
    <h2>What You'll Find Here</h2>
    <div class="content-grid">
      <div class="content-item">
        <h3>🐍 Python Projects</h3>
        <p>Data analysis, automation scripts, web applications, and machine learning experiments.</p>
      </div>
      <div class="content-item">
        <h3>⚡ C++ Development</h3>
        <p>Performance-critical applications, algorithms, and system programming projects.</p>
      </div>
      <div class="content-item">
        <h3>🔧 Bash & Automation</h3>
        <p>Shell scripts, DevOps tools, and system administration utilities.</p>
      </div>
      <div class="content-item">
        <h3>⚛️ React & Frontend</h3>
        <p>Interactive web applications, UI components, and modern JavaScript development.</p>
      </div>
    </div>
  </section>

  <section class="recent-posts">
    <h2>Latest Blog Posts</h2>
    {% if site.posts.size > 0 %}
      <ul class="post-list">
        {% for post in site.posts limit:3 %}
          <li>
            <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
            <h3>
              <a class="post-link" href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
              </a>
            </h3>
            {% if post.excerpt %}
              <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
      <p><a href="/blog/">View all posts →</a></p>
    {% else %}
      <p>No posts yet. Check back soon for tutorials and project updates!</p>
    {% endif %}
  </section>

</div>
