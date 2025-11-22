#!/bin/bash

# Script to add Google AdSense ad units to all category pages
# Usage: bash add-adsense-to-categories.sh

echo "🚀 Adding Google AdSense to all category pages..."
echo ""

CATEGORY_DIR="/home/user/resume-builder/categories"
TOTAL=0
SUCCESS=0

# ============================================
# AD UNIT 1: AdSense Script in <head>
# ============================================
cat > /tmp/adsense-head.txt << 'ENDOFHEAD'

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossorigin="anonymous"></script>
ENDOFHEAD

# ============================================
# AD UNIT 2: Header Banner (after header)
# ============================================
cat > /tmp/ad-header-banner.txt << 'ENDOFAD1'

    <!-- AdSense: Header Banner -->
    <div class="ad-container ad-header" style="text-align: center; margin: 20px 0; background: #f5f5f5; padding: 10px; border-radius: 8px;">
        <div style="font-size: 10px; color: #999; margin-bottom: 5px;">Advertisement</div>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1234567890"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
ENDOFAD1

# ============================================
# AD UNIT 3: Native In-Feed (after hero section)
# ============================================
cat > /tmp/ad-native-hero.txt << 'ENDOFAD2'

    <!-- AdSense: Native In-Feed Ad -->
    <div class="ad-container ad-native" style="max-width: 1200px; margin: 30px auto; padding: 20px; background: #fafafa; border-radius: 8px;">
        <div style="font-size: 10px; color: #999; margin-bottom: 10px; text-align: center;">Advertisement</div>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="fluid"
             data-ad-layout-key="-fb+5w+4e-db+86"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="9876543210"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
ENDOFAD2

# ============================================
# AD UNIT 4: Sidebar Rectangle (in templates grid)
# ============================================
cat > /tmp/ad-sidebar.txt << 'ENDOFAD3'

                <!-- AdSense: Sidebar Rectangle -->
                <div class="category-template-card ad-sidebar-card" style="background: #f9f9f9; border: 2px dashed #ddd; display: flex; align-items: center; justify-content: center; min-height: 300px;">
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 10px; color: #999; margin-bottom: 10px;">Advertisement</div>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                             data-ad-slot="1111111111"
                             data-ad-format="rectangle"
                             data-full-width-responsive="true"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
ENDOFAD3

# ============================================
# AD UNIT 5: In-Feed (between templates)
# ============================================
cat > /tmp/ad-between-templates.txt << 'ENDOFAD4'

                <!-- AdSense: In-Feed Between Templates -->
                <div class="category-template-card ad-infeed-card" style="grid-column: span 3; background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 100%); border: 1px solid #e0e0e0; border-radius: 12px; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 250px;">
                    <div style="text-align: center; width: 100%;">
                        <div style="font-size: 11px; color: #666; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Advertisement</div>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-format="fluid"
                             data-ad-layout-key="-6t+ed+2i-1n-4w"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                             data-ad-slot="2222222222"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
ENDOFAD4

# ============================================
# AD UNIT 6: Multiplex (before footer)
# ============================================
cat > /tmp/ad-multiplex.txt << 'ENDOFAD5'

    <!-- AdSense: Multiplex Ad Grid -->
    <section class="ad-multiplex-section" style="background: #fff; padding: 40px 0; margin: 40px 0;">
        <div class="container">
            <div style="font-size: 11px; color: #999; margin-bottom: 20px; text-align: center;">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="autorelaxed"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="3333333333"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    </section>
ENDOFAD5

# ============================================
# Process all category HTML files
# ============================================

for file in "$CATEGORY_DIR"/*.html; do
    if [ -f "$file" ]; then
        TOTAL=$((TOTAL + 1))
        filename=$(basename "$file")

        # Skip if AdSense already exists
        if grep -q "data-ad-client=\"ca-pub-" "$file"; then
            echo "⏭️  Skipping $filename (AdSense already present)"
            SUCCESS=$((SUCCESS + 1))
            continue
        fi

        echo "📄 Processing: $filename"

        # Create backup
        cp "$file" "$file.bak"

        # 1. Add AdSense script to <head> (before GA4 script)
        if ! grep -q "pagead2.googlesyndication.com" "$file"; then
            sed -i '/<!-- Google Analytics 4 -->/r /tmp/adsense-head.txt' "$file"
            echo "   ✅ Added AdSense script to head"
        fi

        # 2. Add Header Banner after </header>
        if grep -q "</header>" "$file"; then
            sed -i '/<\/header>/r /tmp/ad-header-banner.txt' "$file"
            echo "   ✅ Added header banner ad"
        fi

        # 3. Add Native Ad after hero section (after </section> with class category-hero-section)
        if grep -q "category-hero-section" "$file"; then
            # Find the line with </section> after category-hero-section and add ad after it
            awk '/category-hero-section/,/<\/section>/ {print; if (/<\/section>/) {system("cat /tmp/ad-native-hero.txt"); next}} {print}' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
            echo "   ✅ Added native in-feed ad after hero"
        fi

        # 4. Add Sidebar Ad (after 3rd template card in grid)
        # Find the 3rd occurrence of </div> that closes category-template-card
        awk '
        BEGIN {count=0; found=0}
        /category-template-card/ && !/<\/div>/ {found=1}
        found && /<\/div>/ && /category-template-card/ {
            count++
            print
            if (count == 3) {
                system("cat /tmp/ad-sidebar.txt")
                found=0
            }
            next
        }
        {print}
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
        echo "   ✅ Added sidebar rectangle ad"

        # 5. Add In-Feed Ad (after 6th template card)
        awk '
        BEGIN {count=0; found=0}
        /category-template-card/ && !/<\/div>/ {found=1}
        found && /<\/div>/ && /category-template-card/ {
            count++
            print
            if (count == 6) {
                system("cat /tmp/ad-between-templates.txt")
                found=0
            }
            next
        }
        {print}
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
        echo "   ✅ Added in-feed ad between templates"

        # 6. Add Multiplex Ad before footer
        if grep -q "class=\"global-footer\"" "$file"; then
            sed -i '/class="global-footer"/r /tmp/ad-multiplex.txt' "$file"
            echo "   ✅ Added multiplex ad before footer"
        fi

        # Check if all operations succeeded
        if [ $? -eq 0 ]; then
            rm "$file.bak"
            echo "   ✅ Successfully updated: $filename"
            SUCCESS=$((SUCCESS + 1))
            echo ""
        else
            # Restore from backup if failed
            mv "$file.bak" "$file"
            echo "   ❌ Failed to update: $filename (restored from backup)"
            echo ""
        fi
    fi
done

# Cleanup temp files
rm -f /tmp/adsense-head.txt /tmp/ad-header-banner.txt /tmp/ad-native-hero.txt /tmp/ad-sidebar.txt /tmp/ad-between-templates.txt /tmp/ad-multiplex.txt

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ AdSense Integration Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total files processed: $TOTAL"
echo "Successfully updated: $SUCCESS"
echo ""
echo "📊 Ad Units Added Per Page:"
echo "   1. AdSense script in <head>"
echo "   2. Header Banner (728x90 / responsive)"
echo "   3. Native In-Feed Ad (after hero)"
echo "   4. Sidebar Rectangle (300x250 in template grid)"
echo "   5. In-Feed Ad (between templates)"
echo "   6. Multiplex Ad Grid (before footer)"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  GET YOUR ADSENSE PUBLISHER ID:"
echo "   - Go to: https://adsense.google.com"
echo "   - Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)"
echo ""
echo "2️⃣  REPLACE PLACEHOLDER ID IN ALL FILES:"
echo "   Run: find . -name '*.html' -exec sed -i 's/ca-pub-XXXXXXXXXXXXXXXX/ca-pub-YOUR-ACTUAL-ID/g' {} +"
echo "   Run: sed -i 's/ca-pub-XXXXXXXXXXXXXXXX/ca-pub-YOUR-ACTUAL-ID/g' js/ads.js"
echo ""
echo "3️⃣  CREATE AD UNITS IN ADSENSE:"
echo "   - Header Banner: 728x90 / responsive"
echo "   - Native In-Feed: Fluid layout"
echo "   - Sidebar: 300x250 rectangle"
echo "   - In-Feed: Fluid layout"
echo "   - Multiplex: Auto-relaxed"
echo ""
echo "4️⃣  REPLACE AD SLOT IDS:"
echo "   Replace these placeholders with actual slot IDs:"
echo "   - 1234567890 (Header Banner)"
echo "   - 9876543210 (Native In-Feed)"
echo "   - 1111111111 (Sidebar)"
echo "   - 2222222222 (In-Feed Between)"
echo "   - 3333333333 (Multiplex)"
echo ""
echo "5️⃣  TEST IMPLEMENTATION:"
echo "   - Open website in browser"
echo "   - Check console for AdSense loading"
echo "   - Verify ad spaces appear"
echo "   - Test on mobile devices"
echo ""
echo "6️⃣  READ SETUP GUIDE:"
echo "   - Open ADSENSE-SETUP.md for complete instructions"
echo "   - Follow policy compliance guidelines"
echo "   - Set up Privacy Policy page"
echo ""
echo "💰 Expected Revenue: ₹12,000-24,000/month @ 10k visitors"
echo ""
echo "Good luck with monetization! 🚀"
echo ""
