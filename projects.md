---
layout: page
title: Projects
permalink: /projects/
---

<div class="projects-page">
  <h1>My Projects</h1>
  <p class="intro">
    Here's a collection of projects I've been working on, ranging from Python automation scripts 
    to full-stack web applications. Each project includes links to the source code and, 
    where applicable, live demos.
  </p>

  <div class="projects-filter">
    <h2>Filter by Technology</h2>
    <div class="filter-buttons">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="python">Python</button>
      <button class="filter-btn" data-filter="cpp">C++</button>
      <button class="filter-btn" data-filter="react">React</button>
      <button class="filter-btn" data-filter="bash">Bash</button>
      <button class="filter-btn" data-filter="javascript">JavaScript</button>
    </div>
  </div>

  <div class="projects-grid">
    
    <!-- Example Project 1 -->
    <div class="project-card" data-tags="python automation">
      <div class="project-image">
        <div class="placeholder-image">🐍</div>
      </div>
      <div class="project-content">
        <h3>Python Automation Suite</h3>
        <p>A collection of Python scripts for automating common development tasks including file organization, data processing, and system monitoring.</p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">Click</span>
          <span class="tech-tag">Pytest</span>
        </div>
        <div class="project-links">
          <a href="#" class="project-link github" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
          <a href="#" class="project-link demo" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Demo
          </a>
        </div>
      </div>
    </div>

    <!-- Example Project 2 -->
    <div class="project-card" data-tags="cpp algorithms">
      <div class="project-image">
        <div class="placeholder-image">⚡</div>
      </div>
      <div class="project-content">
        <h3>High-Performance Data Structures</h3>
        <p>Custom implementations of advanced data structures in C++ with focus on performance optimization and memory efficiency.</p>
        <div class="project-tech">
          <span class="tech-tag">C++</span>
          <span class="tech-tag">CMake</span>
          <span class="tech-tag">Google Test</span>
        </div>
        <div class="project-links">
          <a href="#" class="project-link github" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
        </div>
      </div>
    </div>

    <!-- Example Project 3 -->
    <div class="project-card" data-tags="react javascript">
      <div class="project-image">
        <div class="placeholder-image">⚛️</div>
      </div>
      <div class="project-content">
        <h3>Interactive Dashboard</h3>
        <p>A responsive React dashboard for visualizing real-time data with interactive charts and customizable widgets.</p>
        <div class="project-tech">
          <span class="tech-tag">React</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Chart.js</span>
          <span class="tech-tag">Styled Components</span>
        </div>
        <div class="project-links">
          <a href="#" class="project-link github" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
          <a href="#" class="project-link demo" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>

    <!-- Example Project 4 -->
    <div class="project-card" data-tags="bash devops">
      <div class="project-image">
        <div class="placeholder-image">🔧</div>
      </div>
      <div class="project-content">
        <h3>DevOps Automation Scripts</h3>
        <p>A collection of Bash scripts for automating deployment processes, server setup, and monitoring tasks.</p>
        <div class="project-tech">
          <span class="tech-tag">Bash</span>
          <span class="tech-tag">Docker</span>
          <span class="tech-tag">Nginx</span>
          <span class="tech-tag">Systemd</span>
        </div>
        <div class="project-links">
          <a href="#" class="project-link github" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
        </div>
      </div>
    </div>

  </div>

  <div class="projects-note">
    <h2>Coming Soon</h2>
    <p>
      I'm constantly working on new projects and updating existing ones. 
      Check back regularly for updates, or follow me on 
      <a href="https://github.com/marcospaterson" target="_blank">GitHub</a> 
      to see my latest work in real-time.
    </p>
    <p>
      Have an interesting project idea or want to collaborate? 
      Feel free to <a href="/contact/">reach out</a>!
    </p>
  </div>

</div>

<script>
// Simple project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          const tags = card.getAttribute('data-tags');
          if (tags && tags.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});
</script>
