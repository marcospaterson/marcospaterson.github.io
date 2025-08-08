---
layout: post
title: "GitHub Actions vs Standard GitHub Pages: Complete Setup Guide for Jekyll Sites"
date: 2025-08-07 16:00:00 -0000
categories: [tutorial, github-actions, jekyll, deployment]
tags: [github-actions, github-pages, jekyll, ci-cd, deployment, tutorial]
excerpt: "Learn how to set up GitHub Actions for Jekyll deployment and discover when you should choose GitHub Actions over standard GitHub Pages. Complete with step-by-step setup, pros/cons analysis, and troubleshooting guide."
---

When deploying Jeky## Real-World Examplel sites to GitHub Pages, you have two main options: **Standard GitHub Pages** deployment and **GitHub Actions** deployment. While standard deployment works great for basic sites, GitHub Actions offers more control and flexibility - but with added complexity.

In this comprehensive guide, I'll walk you through both approaches, explain when to use each, and provide step-by-step instructions for setting up GitHub Actions deployment.

## Understanding Your Deployment Options

### Standard GitHub Pages Deployment
GitHub's built-in Jekyll processing that automatically builds and deploys your site when you push to your repository.

### GitHub Actions Deployment  
A custom workflow that gives you full control over the build environment and process, then deploys to GitHub Pages.

Let's dive into when and why you'd choose each approach.

## Standard GitHub Pages vs GitHub Actions: Detailed Comparison

### Standard GitHub Pages Deployment

#### **Pros:**
- **Zero configuration** - Works immediately after enabling
- **Automatic builds** - Triggers on every push to main/master
- **Simple workflow** - Perfect for beginners
- **Fast setup** - Enable in repository settings and you're done
- **Reliable hosting** - Battle-tested GitHub infrastructure
- **Free tier generous** - 100GB bandwidth, 1GB storage

#### **Cons:**
- **Limited Jekyll plugins** - Only whitelisted plugins allowed
- **Ruby version locked** - Can't control Ruby/Jekyll versions
- **Build environment restrictions** - Limited customization options
- **External dependencies issues** - Problems with @import url() in SCSS
- **No custom build steps** - Can't run additional processes
- **Limited debugging** - Hard to troubleshoot build failures

### GitHub Actions Deployment

#### **Pros:**
- **Full plugin support** - Use any Jekyll plugin
- **Complete environment control** - Choose Ruby/Jekyll versions
- **Custom build steps** - Add preprocessing, optimization, testing
- **Better SCSS support** - Handle external imports properly
- **Advanced workflows** - Conditional builds, multiple environments
- **Detailed logging** - Full visibility into build process
- **Flexibility** - Can deploy to custom domains, CDNs, etc.
- **Modern approach** - Industry standard CI/CD practices

#### **Cons:**
- **More complex setup** - Requires YAML configuration
- **Steeper learning curve** - Need to understand GitHub Actions
- **Longer build times** - More overhead than direct processing
- **Action minutes usage** - Consumes GitHub Actions quota
- **More moving parts** - Additional potential failure points
- **Maintenance overhead** - Need to keep workflow updated

## When to Choose Each Approach

### Choose **Standard GitHub Pages** when:
- You're new to Jekyll and want simplicity
- Using only whitelisted plugins
- Your site has basic styling (no external CSS imports)
- You want zero maintenance overhead
- Building a simple blog or documentation site

### Choose **GitHub Actions** when:
- You need custom Jekyll plugins
- Using external CSS imports (Tailwind, Google Fonts via SCSS)
- You want custom build steps (optimization, testing)
- You need specific Ruby/Jekyll versions
- Building a complex site with advanced features
- You want CI/CD best practices

## Step-by-Step: Setting Up GitHub Actions

Let's walk through setting up GitHub Actions for your Jekyll site.

## Step 1: Create the Workflow Directory

In your repository root, create the GitHub Actions directory structure:

```bash
# Create the directories
mkdir -p .github/workflows

# Navigate to the workflows directory
cd .github/workflows
```

## Step 2: Create the Deployment Workflow

Create a file named `deploy.yml` in the `.github/workflows/` directory:

```yaml
name: Build and Deploy Jekyll Site

# Trigger the workflow on pushes to main/master and pull requests
on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

# Required permissions for GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Ensure only one deployment runs at a time
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'  # Use a recent stable Ruby version
          bundler-cache: true   # Automatically install gems

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build Jekyll site
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production

      - name: Upload site artifact
        uses: actions/upload-pages-artifact@v3

  # Deploy job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    # Only deploy on pushes to main/master (not pull requests)
    if: github.ref == 'refs/heads/master' || github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 3: Configure Repository Settings

1. **Go to your repository** on GitHub
2. **Navigate to Settings** → **Pages**
3. **Under "Source"**, select **"GitHub Actions"**
4. **Save the settings**

That's it! Your GitHub Actions deployment is now configured.

## Step 4: Understanding the Workflow

Let's break down what this workflow does:

#### **Trigger Configuration:**
```yaml
on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]
```
- Runs on pushes to master/main branches
- Runs on pull requests for testing
- You can customize branches as needed

#### **Permissions:**
```yaml
permissions:
  contents: read    # Read repository contents
  pages: write      # Deploy to GitHub Pages  
  id-token: write   # OIDC token for secure deployment
```

#### **Build Job Steps:**

1. **Checkout**: Downloads your repository code
2. **Setup Ruby**: Installs Ruby and caches gems
3. **Setup Pages**: Configures GitHub Pages settings
4. **Build Jekyll**: Runs `bundle exec jekyll build`
5. **Upload Artifact**: Packages the built site

#### **Deploy Job Steps:**

1. **Deploy**: Takes the built site and deploys to Pages
2. **Only runs on main/master**: Skips deployment for PRs

## Advanced Workflow Customizations

### Custom Ruby Version
```yaml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.1'  # Specify exact version
    bundler-cache: true
```

### Multiple Jekyll Environments
```yaml
- name: Build for staging
  run: bundle exec jekyll build --config _config.yml,_config.staging.yml
  if: github.ref == 'refs/heads/develop'

- name: Build for production  
  run: bundle exec jekyll build --config _config.yml,_config.production.yml
  if: github.ref == 'refs/heads/main'
```

### Add Testing Steps
```yaml
- name: Run tests
  run: |
    bundle exec htmlproofer ./_site --check-html --check-opengraph
    bundle exec jekyll doctor

- name: Check links
  run: bundle exec htmlproofer ./_site --check-external-links
```

### Performance Optimization
```yaml
- name: Optimize images
  run: |
    npm install -g imagemin-cli imagemin-webp
    imagemin assets/images/*.{jpg,png} --out-dir=_site/assets/images/ --plugin=webp

- name: Minify CSS/JS
  run: |
    npm install -g clean-css-cli uglify-js
    find _site -name "*.css" -exec cleancss -o {} {} \;
    find _site -name "*.js" -exec uglifyjs {} -o {} \;
```

## Troubleshooting Common Issues

### Build Failures

#### **Ruby Version Issues:**
```yaml
# Error: incompatible Ruby version
# Solution: Match your local Ruby version
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.2'  # Match your local version
```

#### **Missing Dependencies:**
```yaml
# Error: cannot load such file -- some_gem
# Solution: Ensure Gemfile includes all dependencies
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"  
  gem "jekyll-seo-tag"  # Add missing gems
end
```

#### **Build Path Issues:**
```yaml
# Error: baseurl configuration
# Solution: Use the Pages configuration
- name: Build Jekyll site
  run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
```

### Deployment Failures

#### **Permissions Error:**
```yaml
# Error: insufficient permissions
# Solution: Ensure correct permissions in workflow
permissions:
  contents: read
  pages: write
  id-token: write
```

#### **Artifact Upload Issues:**
```yaml
# Error: no files to upload
# Solution: Verify Jekyll build output
- name: Check build output
  run: |
    ls -la _site/
    echo "Files generated: $(find _site -type f | wc -l)"
```

### GitHub Actions Quota

Monitor your usage in **Settings** → **Billing** → **Plans and usage**

```yaml
# Optimize workflow to reduce minutes usage
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: vendor/bundle
    key: {% raw %}gems-${{ hashFiles('Gemfile.lock') }}{% endraw %}

- name: Skip build on documentation changes
  if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

## Monitoring and Optimization

### Workflow Status Monitoring

Add a status badge to your README:
```markdown
![Build Status](https://github.com/username/repo/workflows/Build%20and%20Deploy%20Jekyll%20Site/badge.svg)
```

### Build Time Optimization

#### **Incremental Builds:**
```yaml
- name: Build Jekyll site (incremental)
  run: bundle exec jekyll build --incremental --baseurl "${{ steps.pages.outputs.base_path }}"
```

#### **Parallel Processing:**
```yaml
- name: Build with multiple jobs
  run: bundle exec jekyll build --jobs 4
```

#### **Exclude Unnecessary Files:**
```yaml
# In _config.yml
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .sass-cache
  - .jekyll-cache
```

## Comparing Build Times and Performance

### Standard GitHub Pages:
```
Build Time: 30-60 seconds
Reliability: Very high
Customization: Limited
Plugin Support: Restricted
```

### GitHub Actions:
```
Build Time: 60-180 seconds  
Reliability: High
Customization: Complete
Plugin Support: Unlimited
```

## Best Practices for GitHub Actions Deployment

### 1. Version Pinning
```yaml
# Pin action versions for stability
uses: actions/checkout@v4           # Specific version
uses: ruby/setup-ruby@v1           # Major version
uses: actions/checkout@main        # Avoid branch references
```

### 2. Environment Separation
```yaml
# Use different configs for different environments
- name: Build for production
  run: bundle exec jekyll build --config _config.yml,_config.prod.yml
  if: github.ref == 'refs/heads/main'
```

### 3. Secret Management
```yaml
# Use GitHub Secrets for sensitive data
- name: Deploy with API key
  env:
    API_KEY: ${{ secrets.DEPLOY_KEY }}
  run: deploy-script.sh
```

### 4. Caching Strategy
```yaml
# Cache Ruby gems
- name: Cache gems
  uses: actions/cache@v3
  with:
    path: vendor/bundle
    key: {% raw %}gems-${{ runner.os }}-${{ hashFiles('Gemfile.lock') }}{% endraw %}
```

### 5. Failure Notifications
```yaml
# Add Slack notifications on failure
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Migration from Standard to GitHub Actions

If you're currently using standard GitHub Pages and want to migrate:

### Step 1: Test in a Branch
```bash
# Create a new branch for testing
git checkout -b github-actions-deployment

# Add the workflow file
mkdir -p .github/workflows
# Add deploy.yml file (shown earlier)

# Push and test
git add .github/
git commit -m "Add GitHub Actions workflow"
git push origin github-actions-deployment
```

### Step 2: Update Repository Settings
1. Go to **Settings** → **Pages**
2. Change source from **"Deploy from a branch"** to **"GitHub Actions"**

### Step 3: Verify Everything Works
- Check that your site builds correctly
- Verify all features work as expected
- Test on different devices/browsers

### Step 4: Merge to Main
```bash
# Once verified, merge to main
git checkout main
git merge github-actions-deployment
git push origin main
```

## When Things Go Wrong

### Emergency Rollback
If GitHub Actions deployment fails and breaks your site:

1. **Go to Settings** → **Pages**
2. **Change source back** to "Deploy from a branch"
3. **Select your main/master branch**
4. **Your site will be restored** to the last working state

### Debug Build Issues
```yaml
# Add debugging steps to your workflow
- name: Debug build
  run: |
    echo "Ruby version: $(ruby -v)"
    echo "Jekyll version: $(bundle exec jekyll -v)"
    echo "Gem list:"
    bundle list
    echo "Site structure:"
    find _site -type f | head -20
```

## Cost Considerations

### GitHub Actions Minutes Usage:
- **Free tier**: 2,000 minutes/month
- **Typical Jekyll build**: 2-5 minutes
- **Monthly capacity**: 400-1,000 builds
- **Cost per additional minute**: $0.008

### Standard GitHub Pages:
- **Completely free** (within bandwidth/storage limits)
- **No build minutes** consumed

## Conclusion

GitHub Actions deployment offers significant advantages for Jekyll sites that need:

### Choose GitHub Actions When You Need:
- **Custom plugins and advanced features** beyond the whitelist
- **External CSS imports** and complex styling solutions
- **Custom build processes** and optimization workflows
- **Professional CI/CD practices** with full control
- **Specific Ruby/Jekyll versions** for compatibility

### Stick with Standard GitHub Pages For:
- **Simple blogs and documentation** without complex requirements
- **Sites using only whitelisted plugins** and basic functionality
- **Minimal maintenance overhead** with zero configuration
- **Beginner-friendly deployment** without learning curve

### My Recommendation:

**Start with standard GitHub Pages** for simplicity and immediate results, then **migrate to GitHub Actions** when you outgrow its limitations or need the advanced features.

The workflow I've shown you is production-ready and handles the most common use cases. It's the same setup I use for this very site, ensuring reliable builds and deployments.

## �🔗 Real-World Example

This blog post was deployed using the exact GitHub Actions workflow described above. You can see the complete implementation in action:

**🔗 [Live Workflow](https://github.com/marcospaterson/marcospaterson.github.io/actions)** - View actual build logs

**🔗 [Source Code](https://github.com/marcospaterson/marcospaterson.github.io/blob/master/.github/workflows/deploy.yml)** - Complete workflow file

Questions about GitHub Actions deployment? Drop me a message through the [contact form](/contact/) - it's powered by Google Forms and deployed via GitHub Actions! 🚀

---

*This comprehensive guide covers everything you need to know about GitHub Actions deployment for Jekyll sites. Whether you're just getting started or looking to optimize your existing workflow, these practices will help you build and deploy with confidence.*
