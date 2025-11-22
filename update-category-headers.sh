#!/bin/bash

# Add global-components.css to all category pages
cd /home/user/resume-builder/categories

for file in *.html; do
    if [ "$file" != "index.html" ]; then
        # Check if global-components.css is already added
        if ! grep -q "global-components.css" "$file"; then
            # Add the CSS link after themes.css
            sed -i 's|<link rel="stylesheet" href="../css/themes.css">|<link rel="stylesheet" href="../css/themes.css">\n    <link rel="stylesheet" href="../css/global-components.css">|' "$file"
            echo "✓ Updated: $file"
        fi
    fi
done

# Update index.html too
if ! grep -q "global-components.css" "index.html"; then
    sed -i 's|<link rel="stylesheet" href="../css/style.css">|<link rel="stylesheet" href="../css/style.css">\n    <link rel="stylesheet" href="../css/global-components.css">|' "index.html"
    echo "✓ Updated: index.html"
fi

echo ""
echo "✅ All category pages updated!"
