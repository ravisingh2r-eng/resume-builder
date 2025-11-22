/* ============================================
   GOOGLE ANALYTICS 4 - EVENT TRACKING
   Complete analytics implementation
   ============================================ */

/**
 * Initialize Google Analytics
 * Make sure GA4 script is loaded in <head>
 */

// Check if gtag is available
const isGtagAvailable = () => {
    return typeof gtag !== 'undefined';
};

/**
 * Track page view
 * Automatically called on page load
 */
function trackPageView(pageTitle, pagePath) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Page view -', pageTitle);
        return;
    }

    gtag('event', 'page_view', {
        page_title: pageTitle || document.title,
        page_location: window.location.href,
        page_path: pagePath || window.location.pathname
    });
}

/**
 * Track template selection
 * Called when user selects a template
 */
function trackTemplateSelection(categoryId, templateId) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Template selected -', categoryId, templateId);
        return;
    }

    gtag('event', 'template_selected', {
        event_category: 'User Interaction',
        event_label: `${categoryId} - ${templateId}`,
        category_id: categoryId,
        template_id: templateId,
        value: 1
    });

    // Also track as conversion
    gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION-ID/CONVERSION-LABEL', // Replace with your conversion ID
        event_category: 'Template Selection',
        template: templateId
    });
}

/**
 * Track resume download
 * Called when user downloads resume
 */
function trackResumeDownload(format, templateId, quality) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Download -', format, templateId, quality);
        return;
    }

    gtag('event', 'resume_downloaded', {
        event_category: 'Download',
        event_label: `${format} - ${templateId}`,
        format: format,
        template_id: templateId,
        quality: quality || 'default',
        value: 1
    });

    // Track as conversion (high-value action)
    gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION-ID/DOWNLOAD-LABEL', // Replace with your conversion ID
        event_category: 'Resume Download',
        format: format
    });
}

/**
 * Track category view
 * Called when user visits a category page
 */
function trackCategoryView(categoryName, categoryId) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Category viewed -', categoryName);
        return;
    }

    gtag('event', 'category_viewed', {
        event_category: 'Category',
        event_label: categoryName,
        category_id: categoryId,
        category_name: categoryName,
        value: 1
    });
}

/**
 * Track button clicks
 * Generic function for tracking CTA buttons
 */
function trackButtonClick(buttonName, buttonLocation) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Button clicked -', buttonName, buttonLocation);
        return;
    }

    gtag('event', 'button_click', {
        event_category: 'Button',
        event_label: buttonName,
        button_name: buttonName,
        button_location: buttonLocation || 'unknown',
        value: 1
    });
}

/**
 * Track form submission
 * Called when user fills out editor
 */
function trackFormCompletion(formSection) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Form section completed -', formSection);
        return;
    }

    gtag('event', 'form_section_completed', {
        event_category: 'Form',
        event_label: formSection,
        section: formSection,
        value: 1
    });
}

/**
 * Track time spent on page
 * Called when user leaves page
 */
function trackTimeOnPage() {
    if (!isGtagAvailable() || !window.pageLoadTime) {
        return;
    }

    const timeSpent = Math.floor((Date.now() - window.pageLoadTime) / 1000); // in seconds

    gtag('event', 'time_on_page', {
        event_category: 'Engagement',
        event_label: document.title,
        value: timeSpent,
        time_spent_seconds: timeSpent
    });
}

/**
 * Track editor interactions
 * Called when user edits resume fields
 */
function trackEditorInteraction(fieldType) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Editor interaction -', fieldType);
        return;
    }

    gtag('event', 'editor_interaction', {
        event_category: 'Editor',
        event_label: fieldType,
        field_type: fieldType,
        value: 1
    });
}

/**
 * Track social share
 * Called when user shares on social media
 */
function trackSocialShare(platform) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Social share -', platform);
        return;
    }

    gtag('event', 'share', {
        event_category: 'Social',
        event_label: platform,
        method: platform,
        content_type: 'resume_builder',
        value: 1
    });
}

/**
 * Track ad clicks
 * Called when user clicks on ads
 */
function trackAdClick(adPosition) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Ad clicked -', adPosition);
        return;
    }

    gtag('event', 'ad_click', {
        event_category: 'Advertisement',
        event_label: adPosition,
        position: adPosition,
        value: 1
    });
}

/**
 * Track errors
 * Called when errors occur
 */
function trackError(errorType, errorMessage) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Error -', errorType, errorMessage);
        return;
    }

    gtag('event', 'exception', {
        description: `${errorType}: ${errorMessage}`,
        fatal: false
    });
}

/**
 * Track search
 * Called when user searches categories
 */
function trackSearch(searchTerm, resultsCount) {
    if (!isGtagAvailable()) {
        console.log('Analytics: Search -', searchTerm, resultsCount);
        return;
    }

    gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount || 0
    });
}

/**
 * Track scroll depth
 * Called when user scrolls through content
 */
function trackScrollDepth(depth) {
    if (!isGtagAvailable()) {
        return;
    }

    gtag('event', 'scroll', {
        event_category: 'Engagement',
        event_label: `${depth}% scrolled`,
        value: depth
    });
}

// ============================================
// AUTO-TRACKING SETUP
// ============================================

// Track page load time
window.pageLoadTime = Date.now();

// Track time on page when user leaves
window.addEventListener('beforeunload', () => {
    trackTimeOnPage();
});

// Track scroll depth at 25%, 50%, 75%, 100%
let scrollTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const scrollPercentage = Math.floor(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    // Track milestones
    [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollTracked[milestone]) {
            trackScrollDepth(milestone);
            scrollTracked[milestone] = true;
        }
    });
});

// Track outbound links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        if (isGtagAvailable()) {
            gtag('event', 'click', {
                event_category: 'Outbound Link',
                event_label: link.href,
                transport_type: 'beacon'
            });
        }
    }
});

// ============================================
// EXPORT FUNCTIONS
// ============================================

// Make functions available globally
window.trackPageView = trackPageView;
window.trackTemplateSelection = trackTemplateSelection;
window.trackResumeDownload = trackResumeDownload;
window.trackCategoryView = trackCategoryView;
window.trackButtonClick = trackButtonClick;
window.trackFormCompletion = trackFormCompletion;
window.trackEditorInteraction = trackEditorInteraction;
window.trackSocialShare = trackSocialShare;
window.trackAdClick = trackAdClick;
window.trackError = trackError;
window.trackSearch = trackSearch;
window.trackScrollDepth = trackScrollDepth;

// Log initialization
console.log('📊 Google Analytics 4 tracking initialized');
