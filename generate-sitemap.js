#!/usr/bin/env node

/**
 * Sitemap Generator for Resume Builder
 * Generates sitemap.xml for all pages
 */

const fs = require('fs');
const path = require('path');

// Base URL - UPDATE THIS WITH YOUR ACTUAL DOMAIN
const BASE_URL = 'https://resumebuilder.in';

// All category IDs
const CATEGORIES = [
    'software-engineer', 'web-developer', 'mobile-developer', 'data-scientist',
    'devops-engineer', 'qa-engineer', 'uiux-designer', 'cybersecurity',
    'cloud-architect', 'database-admin', 'doctor', 'nurse', 'pharmacist',
    'lab-technician', 'physiotherapist', 'digital-marketer', 'sales-manager',
    'business-analyst', 'hr-manager', 'project-manager', 'product-manager',
    'operations-manager', 'customer-success', 'graphic-designer', 'content-writer',
    'video-editor', 'photographer', '3d-animator', 'teacher', 'professor',
    'counselor', 'corporate-trainer', 'mechanical-engineer', 'civil-engineer',
    'electrical-engineer', 'chemical-engineer', 'biomedical-engineer',
    'accountant', 'financial-analyst', 'chartered-accountant', 'investment-banker',
    'hotel-manager', 'chef', 'event-manager', 'travel-consultant', 'lawyer',
    'legal-advisor', 'government-officer', 'fresher', 'intern', 'college-student',
    'architect', 'real-estate-agent', 'fashion-designer', 'journalist', 'social-worker'
];

/**
 * Generate sitemap XML
 */
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Index Page -->
  <url>
    <loc>${BASE_URL}/index.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Categories Index -->
  <url>
    <loc>${BASE_URL}/categories/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${BASE_URL}/categories/index.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Admin Dashboard -->
  <url>
    <loc>${BASE_URL}/admin.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

`;

    // Add all category pages
    CATEGORIES.forEach(categoryId => {
        xml += `  <!-- ${categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Category -->
  <url>
    <loc>${BASE_URL}/categories/${categoryId}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

`;
    });

    xml += `</urlset>`;

    return xml;
}

/**
 * Generate robots.txt
 */
function generateRobotsTxt() {
    return `# Resume Builder - robots.txt

User-agent: *
Allow: /
Allow: /categories/
Allow: /css/
Allow: /js/

# Disallow admin and private areas
Disallow: /admin.html
Disallow: /private/

# Crawl-delay for bots
Crawl-delay: 1

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;
}

/**
 * Main function
 */
function main() {
    console.log('🚀 Generating sitemap.xml and robots.txt...\n');

    // Generate sitemap.xml
    const sitemapXml = generateSitemap();
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
    console.log(`✓ Generated: sitemap.xml`);
    console.log(`  Total URLs: ${CATEGORIES.length + 5}`);

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(__dirname, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log(`✓ Generated: robots.txt`);

    console.log('\n✅ Sitemap generation complete!');
    console.log(`\n📍 Next steps:`);
    console.log(`   1. Update BASE_URL in generate-sitemap.js with your domain`);
    console.log(`   2. Upload sitemap.xml to root directory`);
    console.log(`   3. Submit to Google Search Console`);
    console.log(`   4. Verify robots.txt is accessible at ${BASE_URL}/robots.txt`);
}

// Run generator
main();
