#!/bin/bash

# Script to add Google Analytics 4 tracking to all category pages
# Usage: bash update-ga-tracking.sh

echo "🚀 Adding Google Analytics 4 to all category pages..."
echo ""

CATEGORY_DIR="/home/user/resume-builder/categories"
TOTAL=0
SUCCESS=0

# Create temporary files for the code blocks
cat > /tmp/ga-head-code.txt << 'ENDOFHEAD'

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-XXXXXXXXXX', {
            'page_title': document.title,
            'page_path': window.location.pathname,
            'send_page_view': true,
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
        });

        gtag('set', 'user_properties', {
            'visitor_type': 'organic'
        });
    </script>
ENDOFHEAD

cat > /tmp/analytics-script.txt << 'ENDOFSCRIPT'

    <!-- Analytics Tracking -->
    <script src="../js/analytics.js"></script>

    <!-- Page tracking -->
    <script>
        // Track category page view on load
        window.addEventListener('DOMContentLoaded', () => {
            const categoryName = document.title.split(' - ')[0];
            const categoryId = window.location.pathname.split('/').pop().replace('.html', '');
            if (typeof trackCategoryView === 'function') {
                trackCategoryView(categoryName, categoryId);
            }
        });
    </script>

ENDOFSCRIPT

# Process all HTML files in categories directory
for file in "$CATEGORY_DIR"/*.html; do
    if [ -f "$file" ]; then
        TOTAL=$((TOTAL + 1))
        filename=$(basename "$file")

        # Check if GA4 code already exists
        if grep -q "googletagmanager.com/gtag/js" "$file"; then
            echo "⏭️  Skipping $filename (GA4 already present)"
            SUCCESS=$((SUCCESS + 1))
            continue
        fi

        # Create backup
        cp "$file" "$file.bak"

        # Add GA4 code before </head>
        sed -i '/<\/head>/r /tmp/ga-head-code.txt' "$file"

        # Add analytics.js and page tracking before closing </body>
        if ! grep -q "analytics.js" "$file"; then
            sed -i '/<\/body>/i\' "$file"
            sed -i '/<\/body>/r /tmp/analytics-script.txt' "$file"
        fi

        # Remove backup if successful
        if [ $? -eq 0 ]; then
            rm "$file.bak"
            echo "✅ Updated: $filename"
            SUCCESS=$((SUCCESS + 1))
        else
            # Restore from backup if failed
            mv "$file.bak" "$file"
            echo "❌ Failed: $filename"
        fi
    fi
done

# Cleanup temp files
rm -f /tmp/ga-head-code.txt /tmp/analytics-script.txt

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GA4 Update Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total files processed: $TOTAL"
echo "Successfully updated: $SUCCESS"
echo ""
echo "📋 Next Steps:"
echo "1. Get your GA4 Measurement ID from https://analytics.google.com"
echo "2. Replace 'G-XXXXXXXXXX' with your actual Measurement ID in all files"
echo "3. Run: find categories/ -name '*.html' -exec sed -i 's/G-XXXXXXXXXX/G-YOUR-ID/g' {} +"
echo "4. Test tracking in browser console"
echo "5. Verify in GA4 Real-time reports"
echo ""
