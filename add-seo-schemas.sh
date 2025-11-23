#!/bin/bash

# Script to add SEO schema markup to all HTML pages
# Adds: Organization schema and WebSite schema with SearchAction

echo "🚀 Adding SEO Schema Markup to all pages..."
echo ""

# ============================================
# SCHEMA 1: Organization Schema
# ============================================
cat > /tmp/organization-schema.txt << 'ENDOFSCHEMA'

    <!-- Organization Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Resume Builder",
      "alternateName": "Resume Builder Pro",
      "url": "https://yoursite.com",
      "logo": "https://yoursite.com/assets/images/logo.png",
      "description": "Free online resume builder with 560+ ATS-friendly templates across 56+ job categories. Create professional resumes in 2 minutes.",
      "foundingDate": "2025",
      "sameAs": [
        "https://facebook.com/resumebuilder",
        "https://twitter.com/resumebuilder",
        "https://linkedin.com/company/resumebuilder",
        "https://instagram.com/resumebuilder"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "Customer Service",
        "email": "support@yoursite.com",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    }
    </script>
ENDOFSCHEMA

# ============================================
# SCHEMA 2: WebSite Schema with SearchAction
# ============================================
cat > /tmp/website-schema.txt << 'ENDOFSCHEMA'

    <!-- WebSite Schema with SearchAction -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Resume Builder",
      "url": "https://yoursite.com",
      "description": "Create professional, ATS-friendly resumes in minutes. Free resume builder with 560+ templates.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://yoursite.com/categories/index.html?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Resume Builder"
      }
    }
    </script>
ENDOFSCHEMA

# ============================================
# Process index.html
# ============================================
echo "📄 Processing index.html..."

if grep -q "Organization Schema" index.html; then
    echo "   ⏭️  Skipping index.html (Organization schema already present)"
else
    # Add Organization schema before </head>
    sed -i '/<\/head>/r /tmp/organization-schema.txt' index.html
    # Add WebSite schema before </head>
    sed -i '/<\/head>/r /tmp/website-schema.txt' index.html
    echo "   ✅ Added Organization + WebSite schema to index.html"
fi

# ============================================
# Process legal pages
# ============================================
echo ""
echo "📄 Processing legal pages..."

for file in privacy-policy.html terms-of-service.html about.html contact.html faq.html; do
    if [ -f "$file" ]; then
        if grep -q "Organization Schema" "$file"; then
            echo "   ⏭️  Skipping $file (schema already present)"
        else
            sed -i '/<\/head>/r /tmp/organization-schema.txt' "$file"
            echo "   ✅ Added Organization schema to $file"
        fi
    fi
done

# ============================================
# Process category pages
# ============================================
echo ""
echo "📄 Processing category pages..."

CATEGORY_DIR="./categories"
COUNT=0
UPDATED=0

for file in "$CATEGORY_DIR"/*.html; do
    if [ -f "$file" ]; then
        COUNT=$((COUNT + 1))
        filename=$(basename "$file")

        if grep -q "Organization Schema" "$file"; then
            echo "   ⏭️  Skipping $filename (schema already present)"
        else
            # Add Organization schema before </head>
            # First find where </head> is in category pages
            if grep -q "</head>" "$file"; then
                sed -i '/<\/head>/r /tmp/organization-schema.txt' "$file"
                UPDATED=$((UPDATED + 1))

                if [ $((UPDATED % 10)) -eq 0 ]; then
                    echo "   ✅ Processed $UPDATED/$COUNT files..."
                fi
            fi
        fi
    fi
done

echo "   ✅ Updated $UPDATED category pages"

# ============================================
# Cleanup
# ============================================
rm -f /tmp/organization-schema.txt /tmp/website-schema.txt

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ SEO Schema Markup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "   • Organization Schema: Added to all pages"
echo "   • WebSite Schema: Added to homepage"
echo "   • SearchAction: Enabled for site search"
echo ""
echo "🎯 Benefits:"
echo "   • Better brand recognition in search"
echo "   • Enhanced search result display"
echo "   • Google site search box eligible"
echo "   • Improved knowledge graph appearance"
echo ""
echo "📋 Next Steps:"
echo "   1. Test schemas: https://search.google.com/test/rich-results"
echo "   2. Update social media URLs in schema"
echo "   3. Add actual logo URL"
echo "   4. Update contact information"
echo ""
