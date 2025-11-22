/* ============================================
   PDF GENERATOR
   Export resume as high-quality PDF
   ============================================ */

// ============================================
// PDF GENERATION
// ============================================
function generatePDF() {
    const element = document.getElementById('resumePreview');
    if (!element) {
        console.error('Resume preview element not found');
        return;
    }

    // Show loading indicator
    showLoading('Generating PDF...');

    const opt = {
        margin:       0,
        filename:     `resume_${APP_STATE.resumeData.personal.fullName.replace(/\s+/g, '_') || 'document'}_${Date.now()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF:        {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
        hideLoading();
        console.log('PDF generated successfully');
        trackEvent('pdf_download', {
            template: APP_STATE.currentTemplate,
            timestamp: new Date().toISOString()
        });
    }).catch(error => {
        hideLoading();
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please try again.');
    });
}

// ============================================
// PNG GENERATION
// ============================================
function generatePNG() {
    const element = document.getElementById('resumePreview');
    if (!element) {
        console.error('Resume preview element not found');
        return;
    }

    showLoading('Generating PNG...');

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `resume_${APP_STATE.resumeData.personal.fullName.replace(/\s+/g, '_') || 'document'}_${Date.now()}.png`;
            link.href = url;
            link.click();

            // Cleanup
            URL.revokeObjectURL(url);
            hideLoading();

            trackEvent('png_download', {
                template: APP_STATE.currentTemplate
            });
        }, 'image/png');
    }).catch(error => {
        hideLoading();
        console.error('PNG generation error:', error);
        alert('Error generating PNG. Please try again.');
    });
}

// ============================================
// PRINT
// ============================================
function printResume() {
    window.print();
    trackEvent('print_resume', {
        template: APP_STATE.currentTemplate
    });
}

// ============================================
// LOADING INDICATOR
// ============================================
function showLoading(message = 'Loading...') {
    // Create loading overlay if it doesn't exist
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
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            font-size: 1.2rem;
            flex-direction: column;
            gap: 1rem;
        `;

        const spinner = document.createElement('div');
        spinner.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size: 3rem;"></i>';
        overlay.appendChild(spinner);

        const text = document.createElement('div');
        text.id = 'loadingText';
        text.textContent = message;
        overlay.appendChild(text);

        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
        document.getElementById('loadingText').textContent = message;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

console.log('PDF Generator Loaded Successfully');
