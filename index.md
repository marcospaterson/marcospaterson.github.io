---
layout: default
---

<div class="container mx-auto px-4 py-8">
  
  <!-- Construction GIFs -->
  <div class="flex justify-center items-center mb-8 flex-wrap">
    <img src="/assets/ConstructionSite.gif" alt="Construction Site" class="rounded-lg">
  </div>
  
  <!-- Hero Section -->
  <section class="bg-gray-800 text-white py-4 px-8 mb-10 mt-2 rounded-xl text-center">
    <p class="text-xl leading-relaxed max-w-4xl mx-auto text-gray-100">
      “Around here, however, we don’t look backwards for very long. We keep moving forward, opening up new doors and doing new things, because we’re curious…and curiosity keeps leading us down new paths.”
– Walt Disney
    </p>
  </section>

  <!-- What You'll Find Here -->
  <section class="mb-12">
    <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">What You'll Find Here</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-600 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-4"><img src="/assets/python.svg" alt="Python" class="inline w-8 h-8 align-middle"/>Python Projects</h3>
        <p class="text-gray-600 leading-relaxed">Data analysis, automation scripts, web applications, and machine learning experiments.</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-600 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-4"><img src="/assets/c.svg" alt="Cpp" class="inline w-8 h-8 align-middle"/>C++ Development</h3>
        <p class="text-gray-600 leading-relaxed">Performance-critical applications, algorithms, and system programming projects.</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-600 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-4"><img src="/assets/bash.svg" alt="Cpp" class="inline w-8 h-8 align-middle"/>Bash & Automation</h3>
        <p class="text-gray-600 leading-relaxed">Shell scripts, DevOps tools, and system administration utilities.</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-600 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-4"><img src="/assets/react.svg" alt="Cpp" class="inline w-8 h-8 align-middle"/>React & Frontend</h3>
        <p class="text-gray-600 leading-relaxed">Interactive web applications, UI components, and modern JavaScript development.</p>
      </div>
    </div>
  </section>

  <!-- Latest Blog Posts -->
  <section class="mb-12">
    <h2 class="text-3xl font-bold mb-6 border-b-2 border-gray-600 pb-2 text-gray-900">Latest Blog Posts</h2>
    {% assign recent_posts = site.posts | slice: 0, 3 %}
    {% if recent_posts.size > 0 %}
      <div class="space-y-6">
        {% for post in recent_posts %}
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-gray-300">
            <span class="text-gray-500 text-sm font-medium">{{ post.date | date: "%b %-d, %Y" }}</span>
            <h3 class="text-xl font-semibold mt-2 mb-2">
              <a class="text-gray-800 hover:text-gray-600 transition-colors" href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
              </a>
            </h3>
            {% if post.excerpt %}
              <p class="text-gray-600 leading-relaxed">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            {% endif %}
          </div>
        {% endfor %}
      </div>
      <div class="mt-6 text-center">
        <a href="/blog/" class="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-200 hover:text-black transition-colors">View all posts →</a>
      </div>
    {% else %}
      <div class="bg-gray-100 p-8 rounded-lg text-center">
        <p class="text-gray-600 text-lg">No posts yet. Check back soon for tutorials and project updates!</p>
      </div>
    {% endif %}
  </section>

  <!-- Featured Projects -->
  <section class="bg-gray-100 p-8 rounded-xl">
    <h2 class="text-3xl font-bold text-center mb-4 text-gray-900">Featured Projects</h2>
    <p class="text-center text-gray-600 mb-8 text-lg">Check out some of my recent work and ongoing projects. From Python automation to React applications, I love building useful tools and sharing the process.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center border-l-4 border-gray-600">
        <h3 class="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-4"><img src="/assets/python.svg" alt="Python" class="inline w-8 h-8 align-middle"/>Python Automation</h3>
        <p class="text-gray-600">Scripts and tools for automating development workflows</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center border-l-4 border-gray-600">
        <h3 class="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-4"><img src="/assets/react.svg" alt="react" class="inline w-8 h-8 align-middle"/>React Applications</h3>
        <p class="text-gray-600">Interactive web applications with modern JavaScript</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center border-l-4 border-gray-600">
        <h3 class="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-4"><img src="/assets/c.svg" alt="Cpp" class="inline w-8 h-8 align-middle"/>C++ Performance</h3>
        <p class="text-gray-600">High-performance algorithms and data structures</p>
      </div>
    </div>
    
    <div class="text-center">
      <a href="/projects/" class="inline-block bg-gray-900 text-white px-8 py-2 rounded-lg font-small hover:bg-gray-200 hover:text-black transition-colors text-lg">Explore All Projects →</a>
    </div>
  </section>

</div>
