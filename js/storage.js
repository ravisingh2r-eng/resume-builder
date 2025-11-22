/* ============================================
   LOCAL STORAGE MANAGEMENT
   Handle data persistence and imports/exports
   ============================================ */

// ============================================
// STORAGE MANAGER
// ============================================
const StorageManager = {
    // Keys
    KEYS: {
        RESUME_DATA: 'resumeData',
        APP_STATE: 'appState',
        USER_STATS: 'userStats',
        ACHIEVEMENTS: 'achievements',
        SETTINGS: 'settings',
        THEME: 'theme',
        HAS_VISITED: 'hasVisited',
        LAST_BACKUP: 'lastBackup',
        RESUMES_LIBRARY: 'resumesLibrary'
    },

    // ========================================
    // SAVE METHODS
    // ========================================
    saveResumeData(data) {
        try {
            localStorage.setItem(this.KEYS.RESUME_DATA, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving resume data:', error);
            this.handleStorageError(error);
            return false;
        }
    },

    saveAppState(state) {
        try {
            localStorage.setItem(this.KEYS.APP_STATE, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error('Error saving app state:', error);
            return false;
        }
    },

    saveUserStats(stats) {
        try {
            localStorage.setItem(this.KEYS.USER_STATS, JSON.stringify(stats));
            return true;
        } catch (error) {
            console.error('Error saving user stats:', error);
            return false;
        }
    },

    // ========================================
    // LOAD METHODS
    // ========================================
    loadResumeData() {
        try {
            const data = localStorage.getItem(this.KEYS.RESUME_DATA);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading resume data:', error);
            return null;
        }
    },

    loadAppState() {
        try {
            const state = localStorage.getItem(this.KEYS.APP_STATE);
            return state ? JSON.parse(state) : null;
        } catch (error) {
            console.error('Error loading app state:', error);
            return null;
        }
    },

    loadUserStats() {
        try {
            const stats = localStorage.getItem(this.KEYS.USER_STATS);
            return stats ? JSON.parse(stats) : this.getDefaultStats();
        } catch (error) {
            console.error('Error loading user stats:', error);
            return this.getDefaultStats();
        }
    },

    // ========================================
    // RESUME LIBRARY MANAGEMENT
    // ========================================
    saveToLibrary(resumeName) {
        try {
            let library = this.getResumesLibrary();

            const resumeEntry = {
                id: Date.now(),
                name: resumeName || `Resume ${library.length + 1}`,
                data: APP_STATE.resumeData,
                template: APP_STATE.currentTemplate,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            library.push(resumeEntry);
            localStorage.setItem(this.KEYS.RESUMES_LIBRARY, JSON.stringify(library));

            return resumeEntry;
        } catch (error) {
            console.error('Error saving to library:', error);
            return null;
        }
    },

    getResumesLibrary() {
        try {
            const library = localStorage.getItem(this.KEYS.RESUMES_LIBRARY);
            return library ? JSON.parse(library) : [];
        } catch (error) {
            console.error('Error loading resumes library:', error);
            return [];
        }
    },

    loadResumeFromLibrary(resumeId) {
        try {
            const library = this.getResumesLibrary();
            const resume = library.find(r => r.id === resumeId);

            if (resume) {
                APP_STATE.resumeData = resume.data;
                APP_STATE.currentTemplate = resume.template;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading resume from library:', error);
            return false;
        }
    },

    deleteResumeFromLibrary(resumeId) {
        try {
            let library = this.getResumesLibrary();
            library = library.filter(r => r.id !== resumeId);
            localStorage.setItem(this.KEYS.RESUMES_LIBRARY, JSON.stringify(library));
            return true;
        } catch (error) {
            console.error('Error deleting resume from library:', error);
            return false;
        }
    },

    // ========================================
    // IMPORT/EXPORT
    // ========================================
    exportAllData() {
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            resumeData: this.loadResumeData(),
            appState: this.loadAppState(),
            userStats: this.loadUserStats(),
            library: this.getResumesLibrary()
        };

        return JSON.stringify(exportData, null, 2);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            // Validate data structure
            if (!data.version || !data.resumeData) {
                throw new Error('Invalid import data format');
            }

            // Import data
            if (data.resumeData) {
                this.saveResumeData(data.resumeData);
                APP_STATE.resumeData = data.resumeData;
            }

            if (data.appState) {
                this.saveAppState(data.appState);
            }

            if (data.userStats) {
                this.saveUserStats(data.userStats);
            }

            if (data.library) {
                localStorage.setItem(this.KEYS.RESUMES_LIBRARY, JSON.stringify(data.library));
            }

            return { success: true, message: 'Data imported successfully' };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, message: error.message };
        }
    },

    // ========================================
    // BACKUP & RESTORE
    // ========================================
    createBackup() {
        const backup = {
            timestamp: Date.now(),
            data: this.exportAllData()
        };

        localStorage.setItem(this.KEYS.LAST_BACKUP, JSON.stringify(backup));
        return backup;
    },

    restoreBackup() {
        try {
            const backup = localStorage.getItem(this.KEYS.LAST_BACKUP);
            if (backup) {
                const { data } = JSON.parse(backup);
                return this.importData(data);
            }
            return { success: false, message: 'No backup found' };
        } catch (error) {
            console.error('Error restoring backup:', error);
            return { success: false, message: error.message };
        }
    },

    // ========================================
    // STORAGE INFO
    // ========================================
    getStorageInfo() {
        let totalSize = 0;
        const details = {};

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const size = localStorage[key].length + key.length;
                totalSize += size;
                details[key] = size;
            }
        }

        // Estimate available space (5MB typical limit)
        const estimatedLimit = 5 * 1024 * 1024; // 5MB in bytes
        const percentUsed = ((totalSize / estimatedLimit) * 100).toFixed(2);

        return {
            totalSize,
            totalSizeKB: (totalSize / 1024).toFixed(2),
            totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
            percentUsed,
            details
        };
    },

    // ========================================
    // CLEAR & RESET
    // ========================================
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    },

    clearResume() {
        localStorage.removeItem(this.KEYS.RESUME_DATA);
        APP_STATE.resumeData = this.getDefaultResumeData();
    },

    // ========================================
    // DEFAULTS
    // ========================================
    getDefaultResumeData() {
        return {
            personal: {
                fullName: '',
                jobTitle: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                linkedin: '',
                github: '',
                photo: null
            },
            summary: '',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            interests: ''
        };
    },

    getDefaultStats() {
        return {
            downloadsCount: 0,
            resumesCreated: 0,
            lastEdited: null,
            totalEdits: 0,
            timeSpent: 0
        };
    },

    // ========================================
    // ERROR HANDLING
    // ========================================
    handleStorageError(error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please delete some data or export your resume.');

            // Show storage info
            const info = this.getStorageInfo();
            console.warn('Storage Info:', info);
        }
    },

    // ========================================
    // AUTO-SAVE
    // ========================================
    enableAutoSave(intervalMs = 30000) {
        setInterval(() => {
            this.saveResumeData(APP_STATE.resumeData);
            this.saveAppState({
                currentTemplate: APP_STATE.currentTemplate,
                accentColor: APP_STATE.accentColor,
                fontFamily: APP_STATE.fontFamily,
                fontSize: APP_STATE.fontSize,
                spacing: APP_STATE.spacing,
                visibleSections: APP_STATE.visibleSections
            });

            console.log('Auto-save completed');
        }, intervalMs);
    }
};

// ============================================
// FILE UPLOAD HANDLER
// ============================================
function setupImportHandler() {
    // Create file input for import
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.style.display = 'none';

    importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = StorageManager.importData(event.target.result);
                if (result.success) {
                    alert('Resume imported successfully!');
                    location.reload();
                } else {
                    alert('Error importing resume: ' + result.message);
                }
            };
            reader.readAsText(file);
        }
    });

    document.body.appendChild(importInput);

    // Export global function
    window.importResumeFile = () => {
        importInput.click();
    };
}

// Initialize import handler
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImportHandler);
} else {
    setupImportHandler();
}

console.log('Storage Manager Loaded Successfully');
