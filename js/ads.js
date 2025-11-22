/* ============================================
   AD MANAGEMENT SYSTEM
   Handles ad initialization, refresh, and tracking
   ============================================ */

// ============================================
// AD MANAGER
// ============================================
const AdManager = {
    // Configuration
    config: {
        refreshInterval: 30000, // 30 seconds
        minActiveTime: 5000, // Minimum time user must be active before refresh
        adSenseClientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with actual AdSense ID
        enabled: true
    },

    // State
    state: {
        lastActivity: Date.now(),
        adsLoaded: false,
        refreshCount: 0,
        impressions: {
            header: 0,
            sidebar: 0,
            native: 0,
            interstitial: 0,
            mobile: 0,
            multiplex: 0
        },
        clicks: 0,
        revenue: 0
    },

    // ========================================
    // INITIALIZATION
    // ========================================
    init() {
        if (!this.config.enabled) {
            console.log('Ads are disabled');
            return;
        }

        console.log('Initializing Ad Manager...');

        // Load AdSense script
        this.loadAdSenseScript();

        // Setup activity tracking
        this.setupActivityTracking();

        // Setup auto-refresh
        this.setupAutoRefresh();

        // Setup ad event listeners
        this.setupEventListeners();

        // Check for ad blocker
        this.checkAdBlocker();

        // Track initial page impressions
        this.trackImpressions();
    },

    // ========================================
    // ADSENSE SCRIPT LOADING
    // ========================================
    loadAdSenseScript() {
        // Check if script is already loaded
        if (document.querySelector(`script[src*="adsbygoogle"]`)) {
            console.log('AdSense script already loaded');
            return;
        }

        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.config.adSenseClientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            console.log('AdSense script loaded successfully');
            this.state.adsLoaded = true;
            this.initializeAds();
        };

        script.onerror = () => {
            console.error('Failed to load AdSense script');
        };

        document.head.appendChild(script);
    },

    // ========================================
    // AD INITIALIZATION
    // ========================================
    initializeAds() {
        try {
            // Initialize all ad slots
            const adSlots = document.querySelectorAll('.adsbygoogle');

            adSlots.forEach((adSlot, index) => {
                if (!adSlot.dataset.adsbygoogleStatus) {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    console.log(`Ad slot ${index + 1} initialized`);
                }
            });
        } catch (error) {
            console.error('Error initializing ads:', error);
        }
    },

    // ========================================
    // ACTIVITY TRACKING
    // ========================================
    setupActivityTracking() {
        // Track mouse movement
        document.addEventListener('mousemove', () => {
            this.state.lastActivity = Date.now();
        });

        // Track scroll
        document.addEventListener('scroll', () => {
            this.state.lastActivity = Date.now();
        });

        // Track clicks
        document.addEventListener('click', () => {
            this.state.lastActivity = Date.now();
        });

        // Track keyboard
        document.addEventListener('keydown', () => {
            this.state.lastActivity = Date.now();
        });
    },

    // ========================================
    // AUTO-REFRESH
    // ========================================
    setupAutoRefresh() {
        setInterval(() => {
            const timeSinceActivity = Date.now() - this.state.lastActivity;

            // Only refresh if user is active
            if (timeSinceActivity < this.config.minActiveTime) {
                this.refreshAds();
            }
        }, this.config.refreshInterval);
    },

    refreshAds() {
        if (!this.state.adsLoaded) return;

        try {
            // Note: AdSense doesn't officially support programmatic refresh
            // This is a placeholder for ad refresh logic
            // In production, consider using ad networks that support refresh

            this.state.refreshCount++;
            console.log(`Ads refreshed (count: ${this.state.refreshCount})`);

            // Track refresh event
            this.trackEvent('ad_refresh', {
                count: this.state.refreshCount,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error refreshing ads:', error);
        }
    },

    // ========================================
    // EVENT LISTENERS
    // ========================================
    setupEventListeners() {
        // Listen for ad impressions
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            // Use Intersection Observer to track viewability
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.onAdImpression(ad);
                    }
                });
            }, {
                threshold: 0.5 // Ad must be 50% visible
            });

            observer.observe(ad);
        });
    },

    // ========================================
    // AD BLOCKING DETECTION
    // ========================================
    checkAdBlocker() {
        // Create test ad element
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox ad-test';
        testAd.style.position = 'absolute';
        testAd.style.top = '-1px';
        testAd.style.left = '-1px';
        testAd.style.width = '1px';
        testAd.style.height = '1px';

        document.body.appendChild(testAd);

        setTimeout(() => {
            const isBlocked = testAd.offsetHeight === 0;

            if (isBlocked) {
                this.onAdBlockerDetected();
            }

            testAd.remove();
        }, 100);
    },

    onAdBlockerDetected() {
        console.warn('Ad blocker detected');

        // Show polite message
        const notice = document.getElementById('ad-blocker-notice');
        if (notice) {
            notice.style.display = 'flex';
        }

        // Track event
        this.trackEvent('ad_blocker_detected', {
            timestamp: new Date().toISOString()
        });

        // Update stats
        this.saveStats();
    },

    // ========================================
    // TRACKING & ANALYTICS
    // ========================================
    onAdImpression(adElement) {
        // Determine ad type
        const adType = this.getAdType(adElement);

        // Increment impression count
        if (this.state.impressions[adType] !== undefined) {
            this.state.impressions[adType]++;
        }

        // Track event
        this.trackEvent('ad_impression', {
            type: adType,
            timestamp: new Date().toISOString()
        });

        // Save stats
        this.saveStats();
    },

    onAdClick(adType) {
        this.state.clicks++;

        // Track event
        this.trackEvent('ad_click', {
            type: adType,
            timestamp: new Date().toISOString()
        });

        // Estimate revenue (example CPM calculation)
        this.estimateRevenue();

        // Save stats
        this.saveStats();
    },

    getAdType(adElement) {
        if (adElement.closest('.ad-header')) return 'header';
        if (adElement.closest('.ad-sidebar')) return 'sidebar';
        if (adElement.closest('.ad-native')) return 'native';
        if (adElement.closest('.ad-interstitial')) return 'interstitial';
        if (adElement.closest('.ad-mobile-anchor')) return 'mobile';
        if (adElement.closest('.ad-multiplex')) return 'multiplex';
        return 'unknown';
    },

    // ========================================
    // REVENUE ESTIMATION
    // ========================================
    estimateRevenue() {
        // Example CPM rates (₹ per 1000 impressions) for Indian traffic
        const cpmRates = {
            header: 100,      // ₹100 per 1000 impressions
            sidebar: 140,     // ₹140 per 1000 impressions
            native: 105,      // ₹105 per 1000 impressions
            interstitial: 200, // ₹200 per 1000 impressions
            mobile: 70,       // ₹70 per 1000 impressions
            multiplex: 55     // ₹55 per 1000 impressions
        };

        let totalRevenue = 0;

        for (let adType in this.state.impressions) {
            const impressions = this.state.impressions[adType];
            const cpm = cpmRates[adType] || 50;
            totalRevenue += (impressions / 1000) * cpm;
        }

        this.state.revenue = totalRevenue;
        return totalRevenue;
    },

    getRevenueReport() {
        const revenue = this.estimateRevenue();

        return {
            totalImpressions: Object.values(this.state.impressions).reduce((a, b) => a + b, 0),
            impressionsByType: this.state.impressions,
            totalClicks: this.state.clicks,
            estimatedRevenue: revenue.toFixed(2),
            ctr: this.calculateCTR(),
            refreshCount: this.state.refreshCount
        };
    },

    calculateCTR() {
        const totalImpressions = Object.values(this.state.impressions).reduce((a, b) => a + b, 0);
        if (totalImpressions === 0) return 0;
        return ((this.state.clicks / totalImpressions) * 100).toFixed(2);
    },

    // ========================================
    // STATS PERSISTENCE
    // ========================================
    saveStats() {
        try {
            localStorage.setItem('adStats', JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving ad stats:', error);
        }
    },

    loadStats() {
        try {
            const saved = localStorage.getItem('adStats');
            if (saved) {
                this.state = { ...this.state, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Error loading ad stats:', error);
        }
    },

    resetStats() {
        this.state = {
            lastActivity: Date.now(),
            adsLoaded: false,
            refreshCount: 0,
            impressions: {
                header: 0,
                sidebar: 0,
                native: 0,
                interstitial: 0,
                mobile: 0,
                multiplex: 0
            },
            clicks: 0,
            revenue: 0
        };
        this.saveStats();
    },

    // ========================================
    // ANALYTICS INTEGRATION
    // ========================================
    trackEvent(eventName, parameters = {}) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Console log for debugging
        console.log(`[Ad Event] ${eventName}:`, parameters);
    },

    // ========================================
    // A/B TESTING SUPPORT
    // ========================================
    setupABTest() {
        // Randomly assign user to test group
        const testGroup = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('adTestGroup', testGroup);

        return testGroup;
    },

    getTestGroup() {
        return localStorage.getItem('adTestGroup') || this.setupABTest();
    },

    // ========================================
    // UTILITIES
    // ========================================
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    },

    getDailyProjection() {
        const avgImpressions = Object.values(this.state.impressions).reduce((a, b) => a + b, 0);
        const dailyRevenue = this.estimateRevenue();

        // Project to 10,000 monthly visitors
        const monthlyVisitors = 10000;
        const currentVisitors = parseInt(localStorage.getItem('totalVisitors') || '1');
        const scaleFactor = monthlyVisitors / currentVisitors;

        return {
            currentDaily: dailyRevenue.toFixed(2),
            projectedMonthly: (dailyRevenue * scaleFactor * 30).toFixed(2),
            currentImpressions: avgImpressions,
            projectedImpressions: Math.round(avgImpressions * scaleFactor)
        };
    }
};

// ============================================
// INITIALIZE ON LOAD
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AdManager.init();
        AdManager.loadStats();
    });
} else {
    AdManager.init();
    AdManager.loadStats();
}

// Make AdManager globally accessible
window.AdManager = AdManager;

console.log('Ad Manager Loaded Successfully');
