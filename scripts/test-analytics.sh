#!/bin/bash

echo "🔍 Testing Google Analytics Implementation..."

# Check if GA ID is set in config
if grep -q "google_analytics:" _config.production.yml; then
    GA_ID=$(grep "google_analytics:" _config.production.yml | cut -d':' -f2 | tr -d ' ')
    echo "✅ Google Analytics ID found: $GA_ID"
else
    echo "❌ Google Analytics ID not found in _config.production.yml"
    exit 1
fi

# Build site locally
echo "🏗️  Building site..."
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.production.yml

# Check if analytics script is included
if grep -r "gtag" _site/ > /dev/null; then
    echo "✅ Google Analytics script found in built site"
else
    echo "❌ Google Analytics script not found in built site"
    exit 1
fi

# Check for privacy settings
if grep -r "anonymize_ip.*true" _site/ > /dev/null; then
    echo "✅ Privacy settings (anonymize_ip) enabled"
else
    echo "⚠️  Privacy settings not found - consider enabling anonymize_ip"
fi

echo "🎉 Google Analytics implementation looks good!"
