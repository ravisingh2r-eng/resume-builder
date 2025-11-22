/* ============================================
   ENHANCED PDF GENERATOR
   High-quality PDF export with optimizations
   ============================================ */

// ============================================
// PDF GENERATION - IMPROVED VERSION
// ============================================
async function generatePDF(quality = 'high') {
    const element = document.getElementById('resumePreview');
    if (!element) {
        console.error('Resume preview element not found');
        showError('Resume preview not found. Please try again.');
        return;
    }

    // Validation check
    if (!APP_STATE.resumeData.personal.fullName) {
        if (!confirm('Your resume is empty. Do you still want to download?')) {
            return;
        }
    }

    try {
        // Show enhanced loading with progress
        showEnhancedLoading('Preparing your resume...');

        // Clone the element to avoid modifying the original
        const clonedElement = element.cloneNode(true);

        // Prepare element for PDF
        await preparePDFElement(clonedElement);

        // Update progress
        updateLoadingProgress(30, 'Generating PDF...');

        // Configure PDF options based on quality
        const opt = getPDFOptions(quality);

        // Generate filename
        const filename = generateFilename('pdf');

        // Update progress
        updateLoadingProgress(50, 'Rendering pages...');

        // Generate PDF using html2pdf
        await html2pdf()
            .set(opt)
            .from(clonedElement)
            .save(filename)
            .then(() => {
                updateLoadingProgress(100, 'Complete!');
                setTimeout(() => {
                    hideLoading();
                    showSuccessMessage('PDF downloaded successfully!');
                }, 500);
            });

        // Track event
        trackEvent('pdf_download', {
            template: APP_STATE.currentTemplate,
            quality: quality,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('PDF generation error:', error);
        hideLoading();
        showError('Failed to generate PDF. Please try again or choose a different template.');
    }
}

// ============================================
// PREPARE ELEMENT FOR PDF
// ============================================
async function preparePDFElement(element) {
    // Set fixed width for consistency
    element.style.width = '210mm';
    element.style.minHeight = '297mm';
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.backgroundColor = 'white';
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';

    // Ensure all fonts are loaded
    await ensureFontsLoaded();

    // Handle images - convert to base64 if needed
    const images = element.querySelectorAll('img');
    for (let img of images) {
        if (img.src && !img.src.startsWith('data:')) {
            try {
                const base64 = await imageToBase64(img.src);
                img.src = base64;
            } catch (e) {
                console.warn('Failed to convert image:', e);
            }
        }
    }

    // Remove any interactive elements
    const buttons = element.querySelectorAll('button, input[type="file"]');
    buttons.forEach(btn => btn.remove());

    // Fix color issues for print
    element.style.WebkitPrintColorAdjust = 'exact';
    element.style.colorAdjust = 'exact';
    element.style.printColorAdjust = 'exact';

    return element;
}

// ============================================
// PDF OPTIONS CONFIGURATION
// ============================================
function getPDFOptions(quality = 'high') {
    const qualitySettings = {
        'high': {
            scale: 3,
            quality: 0.99,
            dpi: 300
        },
        'medium': {
            scale: 2,
            quality: 0.95,
            dpi: 200
        },
        'low': {
            scale: 1.5,
            quality: 0.90,
            dpi: 150
        }
    };

    const settings = qualitySettings[quality] || qualitySettings['high'];

    return {
        margin: [10, 10, 10, 10], // top, right, bottom, left in mm
        filename: generateFilename('pdf'),
        image: {
            type: 'jpeg',
            quality: settings.quality
        },
        html2canvas: {
            scale: settings.scale,
            useCORS: true,
            logging: false,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            imageTimeout: 15000,
            removeContainer: true,
            // Better text rendering
            width: 794,  // A4 width in pixels at 96 DPI
            height: 1123, // A4 height in pixels at 96 DPI
            windowWidth: 794,
            windowHeight: 1123,
            scrollX: 0,
            scrollY: 0,
            // Font settings
            fontEmbedding: true,
            // Image settings
            imageQuality: settings.quality,
            dpi: settings.dpi
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true,
            precision: 16,
            putOnlyUsedFonts: true,
            floatPrecision: 16
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: ['.avoid-break', '.experience-item', '.education-item', '.project-item']
        }
    };
}

// ============================================
// ENHANCED PNG GENERATION
// ============================================
async function generatePNG(quality = 'high') {
    const element = document.getElementById('resumePreview');
    if (!element) {
        console.error('Resume preview element not found');
        showError('Resume preview not found. Please try again.');
        return;
    }

    try {
        showEnhancedLoading('Generating PNG image...');

        const scale = quality === 'high' ? 3 : quality === 'medium' ? 2 : 1.5;

        updateLoadingProgress(30, 'Capturing resume...');

        const canvas = await html2canvas(element, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
            imageTimeout: 15000,
            removeContainer: true,
            width: 794,
            height: 1123,
            windowWidth: 794,
            windowHeight: 1123,
            scrollX: 0,
            scrollY: 0
        });

        updateLoadingProgress(70, 'Converting to image...');

        // Convert canvas to blob
        canvas.toBlob(blob => {
            if (!blob) {
                throw new Error('Failed to create image');
            }

            updateLoadingProgress(90, 'Downloading...');

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = generateFilename('png');
            link.href = url;
            link.click();

            // Cleanup
            setTimeout(() => {
                URL.revokeObjectURL(url);
                hideLoading();
                showSuccessMessage('PNG image downloaded successfully!');
            }, 500);

        }, 'image/png', quality === 'high' ? 1.0 : quality === 'medium' ? 0.95 : 0.9);

        trackEvent('png_download', {
            template: APP_STATE.currentTemplate,
            quality: quality
        });

    } catch (error) {
        console.error('PNG generation error:', error);
        hideLoading();
        showError('Failed to generate PNG. Please try again.');
    }
}

// ============================================
// QUALITY SELECTOR MODAL
// ============================================
function showQualitySelector(format = 'pdf') {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3><i class="fas fa-cog"></i> Select Quality</h3>
                <button class="btn-icon" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    Choose the export quality. Higher quality produces better results but larger file sizes.
                </p>

                <div class="quality-options">
                    <div class="quality-option" onclick="selectQuality('${format}', 'high', this.closest('.modal'))">
                        <div class="quality-icon" style="background: #2ecc71;">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="quality-info">
                            <h4>High Quality</h4>
                            <p>Best for printing (300 DPI)</p>
                            <small>File size: ~500KB - 1MB</small>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>

                    <div class="quality-option" onclick="selectQuality('${format}', 'medium', this.closest('.modal'))">
                        <div class="quality-icon" style="background: #3498db;">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="quality-info">
                            <h4>Medium Quality</h4>
                            <p>Balanced quality & size (200 DPI)</p>
                            <small>File size: ~300KB - 600KB</small>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>

                    <div class="quality-option" onclick="selectQuality('${format}', 'low', this.closest('.modal'))">
                        <div class="quality-icon" style="background: #95a5a6;">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="quality-info">
                            <h4>Fast Quality</h4>
                            <p>Quick download (150 DPI)</p>
                            <small>File size: ~200KB - 400KB</small>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>

                <style>
                    .quality-options {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .quality-option {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1.25rem;
                        background: var(--bg-secondary);
                        border: 2px solid var(--border-color);
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    .quality-option:hover {
                        border-color: var(--primary-color);
                        background: var(--bg-primary);
                        transform: translateX(5px);
                    }

                    .quality-icon {
                        width: 50px;
                        height: 50px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.5rem;
                    }

                    .quality-info {
                        flex: 1;
                    }

                    .quality-info h4 {
                        margin: 0 0 0.25rem 0;
                        font-size: 1.1rem;
                    }

                    .quality-info p {
                        margin: 0 0 0.25rem 0;
                        color: var(--text-secondary);
                        font-size: 0.9rem;
                    }

                    .quality-info small {
                        color: var(--text-light);
                        font-size: 0.85rem;
                    }

                    .quality-option > i {
                        color: var(--text-light);
                    }
                </style>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

window.selectQuality = function(format, quality, modal) {
    modal.remove();

    if (format === 'pdf') {
        generatePDF(quality);
    } else if (format === 'png') {
        generatePNG(quality);
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate filename
function generateFilename(extension) {
    const name = APP_STATE.resumeData.personal.fullName || 'Resume';
    const cleanName = name.replace(/[^a-z0-9]/gi, '_');
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `${cleanName}_Resume_${timestamp}.${extension}`;
}

// Ensure fonts are loaded
async function ensureFontsLoaded() {
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }
    // Wait a bit more to ensure fonts are rendered
    return new Promise(resolve => setTimeout(resolve, 500));
}

// Convert image to base64
function imageToBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            try {
                const base64 = canvas.toDataURL('image/jpeg', 0.95);
                resolve(base64);
            } catch (e) {
                reject(e);
            }
        };

        img.onerror = reject;
        img.src = url;
    });
}

// ============================================
// ENHANCED LOADING INDICATOR
// ============================================
function showEnhancedLoading(message = 'Loading...') {
    let overlay = document.getElementById('loadingOverlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            font-size: 1.2rem;
            flex-direction: column;
            gap: 1.5rem;
        `;

        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div id="loadingText" style="font-weight: 500;">${message}</div>
            <div id="loadingProgress" style="width: 300px; background: rgba(255,255,255,0.2); height: 6px; border-radius: 10px; overflow: hidden;">
                <div id="loadingProgressBar" style="width: 0%; height: 100%; background: #3498db; transition: width 0.3s ease; border-radius: 10px;"></div>
            </div>
            <div id="loadingPercentage" style="font-size: 0.9rem; opacity: 0.8;">0%</div>

            <style>
                .loading-spinner {
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .spinner-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 4px solid transparent;
                    border-top-color: #3498db;
                    border-radius: 50%;
                    animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }

                .spinner-ring:nth-child(1) {
                    animation-delay: -0.45s;
                }

                .spinner-ring:nth-child(2) {
                    animation-delay: -0.3s;
                }

                .spinner-ring:nth-child(3) {
                    animation-delay: -0.15s;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
        document.getElementById('loadingText').textContent = message;
        updateLoadingProgress(0, message);
    }
}

function updateLoadingProgress(percentage, message = null) {
    const progressBar = document.getElementById('loadingProgressBar');
    const percentageText = document.getElementById('loadingPercentage');
    const loadingText = document.getElementById('loadingText');

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    if (percentageText) {
        percentageText.textContent = `${Math.round(percentage)}%`;
    }

    if (message && loadingText) {
        loadingText.textContent = message;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function showLoading(message) {
    showEnhancedLoading(message);
}

// ============================================
// SUCCESS/ERROR MESSAGES
// ============================================
function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10001;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideIn 0.3s ease;
    `;

    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <style>
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        </style>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================
function printResume() {
    // Prepare for print
    const originalTitle = document.title;
    document.title = generateFilename('pdf').replace('.pdf', '');

    // Trigger print
    window.print();

    // Restore title
    setTimeout(() => {
        document.title = originalTitle;
    }, 100);

    trackEvent('print_resume', {
        template: APP_STATE.currentTemplate
    });
}

// ============================================
// BATCH DOWNLOAD (Multiple Formats)
// ============================================
async function downloadAll() {
    if (!confirm('Download resume in all formats? (PDF, PNG, JSON)')) {
        return;
    }

    showEnhancedLoading('Preparing downloads...');

    try {
        // PDF
        updateLoadingProgress(20, 'Generating PDF...');
        await generatePDF('high');

        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000));

        // PNG
        updateLoadingProgress(50, 'Generating PNG...');
        await generatePNG('high');

        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000));

        // JSON
        updateLoadingProgress(80, 'Generating JSON...');
        downloadJSON();

        updateLoadingProgress(100, 'Complete!');

        setTimeout(() => {
            hideLoading();
            showSuccessMessage('All formats downloaded successfully!');
        }, 500);

    } catch (error) {
        console.error('Batch download error:', error);
        hideLoading();
        showError('Some downloads may have failed. Please try individually.');
    }
}

// Make functions globally accessible
window.generatePDF = generatePDF;
window.generatePNG = generatePNG;
window.printResume = printResume;
window.showQualitySelector = showQualitySelector;
window.downloadAll = downloadAll;

console.log('Enhanced PDF Generator Loaded Successfully');
