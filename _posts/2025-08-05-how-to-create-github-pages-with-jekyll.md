---
layout: post
title: "How to Create a GitHub Pages Site with Jekyll: A Step-by-Step Guide"
date: 2025-08-05 10:00:00 -0000
categories: [tutorial, jekyll, github-pages]
tags: [jekyll, github, static-site, blog, tutorial]
excerpt: "Learn how to create your own GitHub Pages site with Jekyll from scratch. This comprehensive guide covers everything from initial setup to deployment, perfect for developers who want to showcase their projects and share their knowledge through blogging."
---

Welcome to my very first blog post! In this tutorial, I'll walk you through the exact process I used to create this GitHub Pages site with Jekyll. This is a perfect solution for developers who want to showcase their projects and share knowledge through blogging, all for free using GitHub's hosting.

## What You'll Learn

By the end of this tutorial, you'll have:
- **A fully functional GitHub Pages site** with modern design
- **A blog structure** for writing and publishing posts
- **A professional landing page** to showcase your work
- **A contact page** for networking and opportunities
- **The knowledge** to customize and expand your site

## Prerequisites

Before we start, make sure you have:
- **GitHub account** - Free account at [github.com](https://github.com)
- **Git installed** - Version control system on your computer
- **Basic Markdown knowledge** - Simple markup language
- **Text editor** - VS Code, Sublime Text, or similar

## Step 1: Create Your GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace with your actual GitHub username)
3. Make sure it's public
4. Initialize with a README if desired
5. Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
```

## Step 2: Set Up Your Jekyll Structure

Create the essential files for your Jekyll site.

### The `_config.yml`

This is Jekyll's main configuration file:

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
gem "rouge", "~> 4.0"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
```

## Step 3: Create Your Pages

### Landing Page (`index.md`)

Your homepage should welcome visitors and explain what they'll find. Here's how to create a modern landing page with Tailwind CSS:

```html
---
layout: default
---

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-white py-20">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h1 class="text-5xl font-bold text-gray-900 mb-6">
        Welcome to My Development Journey
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Full-stack developer passionate about creating innovative solutions
      </p>
      <div class="flex justify-center space-x-4">
        <a href="/projects/" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          View Projects
        </a>
        <a href="/blog/" class="border border-gray-600 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50">
          Read Blog
        </a>
      </div>
    </div>
  </section>
  
  <!-- Technologies Section -->
  <section class="py-16">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">
        Technologies I Work With
      </h2>
      <!-- Add your technology stack here -->
    </div>
  </section>
</div>
```

> 💡 **Full Example**: See the complete `index.md` implementation in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/index.md)

### Blog Page (`blog.md`)

A dedicated page to list all your blog posts with modern styling:

```html
---
layout: default
title: Blog
permalink: /blog/
---

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-12 text-center">Blog Posts</h1>
    <div class="space-y-8">
      {% for post in site.posts %}
        <article class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            <a href="{{ post.url }}" class="hover:text-gray-600 transition-colors">
              {{ post.title }}
            </a>
          </h2>
          <p class="text-gray-600 mb-4">{{ post.date | date: "%B %-d, %Y" }}</p>
          <div class="text-gray-700 mb-4">{{ post.excerpt }}</div>
          <a href="{{ post.url }}" class="text-gray-600 hover:text-gray-800 font-medium">
            Read more →
          </a>
        </article>
      {% endfor %}
    </div>
  </div>
</div>
```

> 💡 **Full Example**: See the complete `blog.md` implementation in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/blog.md)

### Contact Page (`contact.md`)

Essential for networking and job opportunities:

```html
---
layout: default
title: Contact
permalink: /contact/
---

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-2xl mx-auto px-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-12 text-center">Let's Connect</h1>
    
    <div class="bg-white rounded-lg shadow-sm p-8">
      <p class="text-lg text-gray-700 mb-8">
        I'm always interested in new opportunities and collaborations. 
        Feel free to reach out!
      </p>
      
      <!-- Contact links -->
      <div class="space-y-4">
        <a href="mailto:your-email@example.com" class="flex items-center text-gray-600 hover:text-gray-800">
          📧 Email: your-email@example.com
        </a>
        <a href="https://linkedin.com/in/yourprofile" class="flex items-center text-gray-600 hover:text-gray-800">
          💼 LinkedIn: /in/yourprofile
        </a>
        <a href="https://github.com/yourusername" class="flex items-center text-gray-600 hover:text-gray-800">
          🐙 GitHub: @yourusername
        </a>
      </div>
    </div>
  </div>
</div>
```

> 💡 **Full Example**: See the complete `contact.md` implementation in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/contact.md)

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

## Step 7: Modern Styling with Tailwind CSS

For a professional, modern look, you can use Tailwind CSS instead of the default Minima theme. Create an `assets/main.scss` file:

```scss
---
---

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');

* {
  font-family: 'Roboto', sans-serif;
}

/* Enhanced syntax highlighting styles */
.highlight {
  background-color: #1e1e1e;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.highlight pre {
  background: transparent;
  padding: 0;
  margin: 0;
  color: #d4d4d4;
}

.highlight code {
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
  line-height: 1.625;
}

/* Syntax highlighting colors */
.highlight .k { color: #569cd6; } /* Keywords */
.highlight .s { color: #ce9178; } /* Strings */
.highlight .c { color: #6a9955; } /* Comments */
.highlight .na { color: #9cdcfe; } /* Attributes */
.highlight .nt { color: #569cd6; } /* Tags */
/* ... more color definitions ... */
```

> 💡 **Complete Styling**: See the full `main.scss` with all syntax highlighting colors in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/assets/main.scss)

Update your `_config.yml` to remove the Minima theme:

```yaml
# Remove this line:
# theme: minima

# Keep everything else the same
plugins:
  - jekyll-feed
  - jekyll-sitemap
```

## Step 8: Create Custom Layouts

Create a `_layouts/default.html` file for your base layout:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
    <title>{% if page.title %}{{ page.title }} - {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>
</head>
<body class="bg-gray-50">
    {% include header.html %}
    <main>{{ content }}</main>
    {% include footer.html %}
</body>
</html>
```

## Step 9: Customize and Expand

Now that your basic site is working with modern styling, you can:

> - Add more Tailwind utility classes for responsive design
> - Create additional page layouts in `_layouts`
> - Add custom includes for navigation, footer, etc.
> - Create a projects portfolio section
> - Integrate analytics with Google Analytics
> - Add a comment system like Disqus
> - Implement dark mode toggle

## Step 10: Advanced Features

### Responsive Navigation

Create `_includes/header.html` for a mobile-friendly navigation:

```html
<header class="bg-white shadow-sm sticky top-0 z-50">
  <nav class="max-w-6xl mx-auto px-6 py-4">
    <div class="flex justify-between items-center">
      <a href="/" class="text-2xl font-bold text-gray-900">{{ site.title }}</a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a href="/" class="{% if page.url == '/' %}bg-gray-100 text-gray-800 px-3 py-2 rounded-md
          {% else %}text-gray-700 hover:text-gray-600 px-3 py-2 rounded-md hover:border hover:border-gray-300{% endif %}">
          Home
        </a>
        <a href="/blog/" class="{% if page.url contains '/blog' %}bg-gray-100 text-gray-800 px-3 py-2 rounded-md
          {% else %}text-gray-700 hover:text-gray-600 px-3 py-2 rounded-md hover:border hover:border-gray-300{% endif %}">
          Blog
        </a>
        <a href="/projects/" class="{% if page.url == '/projects/' %}bg-gray-100 text-gray-800 px-3 py-2 rounded-md
          {% else %}text-gray-700 hover:text-gray-600 px-3 py-2 rounded-md hover:border hover:border-gray-300{% endif %}">
          Projects
        </a>
        <a href="/contact/" class="{% if page.url == '/contact/' %}bg-gray-100 text-gray-800 px-3 py-2 rounded-md
          {% else %}text-gray-700 hover:text-gray-600 px-3 py-2 rounded-md hover:border hover:border-gray-300{% endif %}">
          Contact
        </a>
      </div>
    </div>
  </nav>
</header>
```

> 💡 **Complete Navigation**: See the full responsive navigation with mobile menu in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/_includes/header.html)

### Custom Layouts

Create layouts for different page types:

```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
    <title>{% if page.title %}{{ page.title }} - {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>
</head>
<body class="bg-gray-50">
    {% include header.html %}
    <main>{{ content }}</main>
    {% include footer.html %}
</body>
</html>
```

> 💡 **All Layouts**: See all layout files including `post.html` in the [GitHub repository](https://github.com/marcospaterson/marcospaterson.github.io/tree/master/_layouts)

## Best Practices for Blogging

1. **Write regularly**: Consistency helps build an audience
2. **Document your projects**: Share what you're building and learning
3. **Use proper SEO**: Good titles, descriptions, and tags
4. **Include code examples**: Make your posts practical and useful
5. **Proofread**: Professional writing reflects well on you

## Conclusion

Congratulations! You now have a modern, professional portfolio site with:

### Features Implemented:
- **Clean, responsive design** using Tailwind CSS
- **Proper code highlighting** with Rouge syntax highlighter  
- **Mobile-friendly navigation** with sticky header
- **Professional typography** using Google Fonts (Roboto)
- **Blog functionality** for sharing your knowledge
- **Contact page** for networking opportunities
- **SEO optimization** with proper meta tags and sitemaps

### Perfect For:
- **Showcasing your development projects** with detailed case studies
- **Sharing tutorials and technical insights** to build your reputation
- **Building your professional brand online** with consistent design
- **Connecting with other developers** and potential employers
- **Demonstrating your web development skills** through the site itself

The best part? It's completely free, loads fast, and you have full control over the content and design. Plus, it's hosted on GitHub's reliable infrastructure.

Have questions about setting up your own modern GitHub Pages site? Feel free to [reach out](/contact/)!

## Complete Source Code

All the code examples from this tutorial are available in the complete GitHub repository:

**🔗 [View Complete Repository](https://github.com/marcospaterson/marcospaterson.github.io)**

### Key Files to Reference:

- **[_config.yml](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/_config.yml)** - Site configuration
- **[Gemfile](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/Gemfile)** - Ruby dependencies
- **[assets/main.scss](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/assets/main.scss)** - Complete styling with syntax highlighting
- **[_layouts/](https://github.com/marcospaterson/marcospaterson.github.io/tree/master/_layouts)** - All page layouts
- **[_includes/](https://github.com/marcospaterson/marcospaterson.github.io/tree/master/_includes)** - Header, footer, and reusable components
- **[index.md](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/index.md)** - Homepage implementation
- **[blog.md](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/blog.md)** - Blog page implementation
- **[contact.md](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/contact.md)** - Contact page implementation

### Quick Start Template:

Want to get started quickly? Fork the repository and customize it with your own content:

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git
cd YOURUSERNAME.github.io

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

> 💡 **Pro Tip**: Don't forget to update `_config.yml` with your own information and customize the content to match your personal brand!

---

*This post was written as I built this very site, so you're seeing the result of following this tutorial. Pretty meta, right?*