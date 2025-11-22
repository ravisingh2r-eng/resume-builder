#!/bin/bash

cd /home/user/resume-builder/categories

MOBILE_SCRIPT='
    <!-- Mobile Menu Toggle Script -->
    <script>
    function toggleMobileMenu() {
        const nav = document.querySelector('\''.nav'\'');
        nav.classList.toggle('\''active'\'');
    }
    <\/script>'

for file in *.html; do
    # Check if the mobile menu script is already there
    if ! grep -q "Mobile Menu Toggle Script" "$file"; then
        # Add before closing </body> tag
        sed -i "s|</body>|$MOBILE_SCRIPT\n</body>|" "$file"
        echo "✓ Added mobile menu script to: $file"
    fi
done

echo ""
echo "✅ Mobile menu scripts added to all pages!"
