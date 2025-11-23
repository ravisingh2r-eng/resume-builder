#!/bin/bash

# Fix duplicate lines in category pages
# This script removes the duplicate section headers and content in category pages

echo "Fixing duplicate code in category pages..."

# List of all category files
categories=(
    "software-engineer" "web-developer" "mobile-developer" "data-scientist"
    "devops-engineer" "qa-engineer" "uiux-designer" "cybersecurity"
    "cloud-architect" "database-admin" "doctor" "nurse"
    "pharmacist" "lab-technician" "physiotherapist" "digital-marketer"
    "sales-manager" "business-analyst" "hr-manager" "project-manager"
    "product-manager" "operations-manager" "customer-success" "graphic-designer"
    "content-writer" "video-editor" "photographer" "3d-animator"
    "teacher" "professor" "counselor" "corporate-trainer"
    "mechanical-engineer" "civil-engineer" "electrical-engineer" "chemical-engineer"
    "biomedical-engineer" "accountant" "financial-analyst" "chartered-accountant"
    "investment-banker" "hotel-manager" "chef" "event-manager"
    "travel-consultant" "lawyer" "legal-advisor" "government-officer"
    "fresher" "intern" "college-student" "architect"
    "real-estate-agent" "fashion-designer" "journalist" "social-worker"
)

for category in "${categories[@]}"; do
    file="categories/${category}.html"

    if [ -f "$file" ]; then
        echo "Processing $file..."

        # Create a temporary file
        temp_file=$(mktemp)

        # Remove duplicate opening section tag (line 188)
        # Remove duplicate container opening (line 190)
        # Remove duplicate grid opening (line 192)
        # Remove duplicate content opening (line 194)
        # Remove duplicate h1 (line 196)
        # Remove duplicate description (line 198)
        # And other duplicates

        # Use awk to remove consecutive duplicate lines in the hero section
        awk '
        NR >= 187 && NR <= 250 {
            if ($0 != prev) {
                print
            }
            prev = $0
        }
        NR < 187 || NR > 250 {
            print
            prev = $0
        }
        ' "$file" > "$temp_file"

        # Move temp file back
        mv "$temp_file" "$file"

        echo "✓ Fixed $file"
    else
        echo "✗ File not found: $file"
    fi
done

echo ""
echo "✅ All category pages fixed!"
echo "Total files processed: ${#categories[@]}"
