# GitHub Pages Deployment Guide

This guide will help you deploy your Jekyll site to GitHub Pages step by step.

## Prerequisites

- Your Jekyll site is ready and committed to your repository
- You have a GitHub account
- Your repository is named `yourusername.github.io`

## Deployment Steps

### Step 1: Push Your Code to GitHub

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Final site ready for deployment"
git push origin master
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click on the **Settings** tab
3. Scroll down to the **Pages** section in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `master` (or `main`)
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 3: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 2-10 minutes
- You can check the progress in the **Actions** tab of your repository
- Once complete, your site will be available at `https://yourusername.github.io`

### Step 4: Verify Your Site

Visit your site at `https://yourusername.github.io` and check:
- [ ] Homepage loads correctly
- [ ] Navigation works (Blog, Projects, Contact)
- [ ] Blog post displays properly
- [ ] Projects page shows your portfolio
- [ ] Contact page has your information
- [ ] Styling looks correct

## Next Steps

### Customize Your Content

1. **Update Personal Information**:
   - Edit `_config.yml` with your actual name and email
   - Update `contact.md` with your real contact information
   - Add your actual resume to `/assets/resume.pdf`

2. **Write More Blog Posts**:
   - Create new files in `_posts/` following the naming convention
   - Use the existing post as a template

3. **Add Real Projects**:
   - Update `projects.md` with your actual projects
   - Add project images to `/assets/images/`
   - Link to your real GitHub repositories

### Advanced Improvements

1. **Custom Domain** (Optional):
   - Add a `CNAME` file with your domain name
   - Configure DNS settings with your domain provider

2. **Analytics**:
   - Add Google Analytics to track visitors
   - Update `_config.yml` with your tracking ID

3. **SEO Enhancements**:
   - Add meta descriptions to pages
   - Create an XML sitemap (already included with jekyll-sitemap)
   - Add social media preview images

4. **Comments System**:
   - Integrate Disqus for blog comments
   - Add the configuration to `_config.yml`

## Troubleshooting

### Common Issues

1. **Site Not Loading**:
   - Check that repository name is exactly `yourusername.github.io`
   - Verify GitHub Pages is enabled in repository settings
   - Wait a few more minutes for build to complete

2. **Styling Issues**:
   - Check that `assets/main.scss` is properly formatted
   - Verify Jekyll build completed successfully in Actions tab

3. **Blog Posts Not Showing**:
   - Ensure post files follow naming convention: `YYYY-MM-DD-title.md`
   - Check that posts are in `_posts/` directory
   - Verify frontmatter is correctly formatted

4. **Navigation Not Working**:
   - Check that `_includes/header.html` exists
   - Verify page permalinks in frontmatter

### Build Errors

If GitHub Pages build fails:
1. Check the **Actions** tab for error details
2. Test locally with `bundle exec jekyll serve`
3. Fix any errors and commit again
4. GitHub will automatically retry the build

## Maintenance

### Regular Updates

1. **Content Updates**:
   - Write new blog posts regularly
   - Add new projects as you complete them
   - Keep contact information current

2. **Dependencies**:
   - Occasionally run `bundle update` locally
   - Test that everything still works
   - Commit any Gemfile.lock changes

3. **Backups**:
   - Your site is automatically backed up in Git
   - Consider downloading a local backup occasionally

## Success!

Congratulations! You now have a professional portfolio site with:
- ✅ A welcoming homepage
- ✅ Blog functionality for sharing knowledge
- ✅ Projects showcase for your portfolio
- ✅ Professional contact page
- ✅ Mobile-responsive design
- ✅ SEO optimization
- ✅ Fast, reliable hosting

Your site is ready to help you share your projects, demonstrate your skills, and connect with potential employers or collaborators!

---

**Need Help?**
- Check the [Jekyll documentation](https://jekyllrb.com/docs/)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Feel free to reach out if you have questions!
