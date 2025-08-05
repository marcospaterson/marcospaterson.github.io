---
layout: post
title: "How to Create a GitHub Pages Site with Jekyll: A Step-by-Step Guide"
date: 2025-08-05 10:00:00 -0000
categories: [tutorial, jekyll, github-pages]
tags: [jekyll, github, static-site, blog, tutorial]
excerpt: "Learn how to create your own GitHub Pages site with Jekyll from scratch. This comprehensive guide covers everything from initial setup to deployment, perfect for developers who want to showcase their projects and share their knowledge through blogging."
---

# How to Create a GitHub Pages Site with Jekyll: A Step-by-Step Guide

Welcome to my very first blog post! In this tutorial, I'll walk you through the exact process I used to create this GitHub Pages site with Jekyll. This is a perfect solution for developers who want to showcase their projects and share knowledge through blogging, all for free using GitHub's hosting.

## What You'll Learn

By the end of this tutorial, you'll have:
- A fully functional GitHub Pages site
- A blog structure for writing posts
- A professional landing page
- A contact page for networking
- The knowledge to customize and expand your site

## Prerequisites

Before we start, make sure you have:
- A GitHub account
- Git installed on your computer
- Basic knowledge of Markdown
- A text editor (VS Code recommended)

## Step 1: Create Your GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace with your actual GitHub username)
3. Make sure it's public
4. Initialize with a README if desired
5. Clone the repository to your local machine:

```



```ruby
source "https://rubygems.org"

This is Jekyll's main configuration file:


  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
end
```
```yaml
# Site settings
title: Your Name
email: your-email@example.com
description: >-
  Your site description here. This will appear in search results
  and social media previews.
baseurl: ""
url: "https://yourusername.github.io"

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima
plugins:
  - jekyll-feed
  - jekyll-sitemap

# Collections
collections:
  posts:
    output: true
    permalink: /blog/:year/:month/:day/:title/
```

### The `Gemfile`

This specifies the Ruby gems (packages) your site needs:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
end
```

## Step 3: Create Your Pages

### Landing Page (`index.md`)

Your homepage should welcome visitors and explain what they'll find:

```markdown
---
layout: default
---

<div class="home">
  <section class="hero">
    <h1>Welcome to My Development Journey</h1>
    <p>Description of your site and what visitors will find here.</p>
  </section>
  
  <!-- Add sections for recent posts, project highlights, etc. -->
</div>
```

### Blog Page (`blog.md`)

A dedicated page to list all your blog posts:

```markdown
---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-page">
  <h1>Blog Posts</h1>
  {% for post in site.posts %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
      {{ post.excerpt }}
      <a href="{{ post.url }}">Read more →</a>
    </article>
  {% endfor %}
</div>
```

### Contact Page (`contact.md`)

Essential for networking and job opportunities:

```markdown
---
layout: page
title: Contact
permalink: /contact/
---

# Let's Connect

Information about how people can reach you, including:
- Email
- LinkedIn
- GitHub
- Twitter

Special section for recruiters with:
- What you're looking for
- Technologies you work with
- Link to resume
```

## Step 4: Create Your First Blog Post

Blog posts go in the `_posts` directory with a specific naming convention:
`YYYY-MM-DD-title.md`

Example: `2025-08-05-how-to-create-github-pages-with-jekyll.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-08-05 10:00:00 -0000
categories: [tutorial, jekyll]
tags: [jekyll, github, tutorial]
excerpt: "Brief description of your post"
---

# Your Post Title

Your post content here using Markdown syntax.
```

## Step 5: Test Locally (Optional but Recommended)

If you have Ruby installed, you can test your site locally:

```bash
# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve

# Visit http://localhost:4000 in your browser
```

## Step 6: Deploy to GitHub Pages

1. Commit all your changes:
```bash
git add .
git commit -m "Initial Jekyll site setup"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)"
   - Save

3. Wait a few minutes and visit `https://yourusername.github.io`

## Step 7: Customize and Expand

Now that your basic site is working, you can:

- Customize the CSS in `_sass` directory
- Add custom layouts in `_layouts`
- Create additional pages
- Add a projects section
- Integrate analytics
- Add a comment system

## Best Practices for Blogging

1. **Write regularly**: Consistency helps build an audience
2. **Document your projects**: Share what you're building and learning
3. **Use proper SEO**: Good titles, descriptions, and tags
4. **Include code examples**: Make your posts practical and useful
5. **Proofread**: Professional writing reflects well on you

## Conclusion

Congratulations! You now have a professional portfolio site with blogging capabilities. This platform is perfect for:

- Showcasing your projects
- Sharing tutorials and insights
- Building your professional brand
- Connecting with other developers
- Attracting potential employers

The best part? It's completely free and you have full control over the content and design.

## What's Next?

In future posts, I'll cover:
- Advanced Jekyll customization
- Adding a projects portfolio
- SEO optimization for GitHub Pages
- Integrating analytics and comments
- Custom domain setup

Have questions about setting up your own GitHub Pages site? Feel free to [reach out](/contact/)!

---

*This post was written as I built this very site, so you're seeing the result of following this tutorial. Pretty meta, right?*
