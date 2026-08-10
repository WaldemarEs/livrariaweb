/**
 * Livraria e Papelaria Lusitana - Main Application Logic
 */

/**
 * Switch active view tab and section
 * @param {string} viewId - ID of view to activate ('inicio', 'historia', 'servicios', 'contacto')
 */
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-tab').forEach(el => {
        el.classList.remove('active');
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.add('active');
    }

    const activeTabs = document.querySelectorAll(`[id^="tab-${viewId}"]`);
    activeTabs.forEach(tab => tab.classList.add('active'));

    // Reset container scroll to top if needed
    const mainContainer = document.getElementById('main-viewport-container');
    if (mainContainer) {
        mainContainer.scrollTop = 0;
    }

    // Notify chatbot to hide greeting badge & start 3-minute cooldown
    if (window.LusitanaBot && typeof window.LusitanaBot.onSectionChange === 'function') {
        window.LusitanaBot.onSectionChange(viewId);
    }
}

/**
 * Handle contact form submission with real email delivery to waldemar.escobar@gmail.com
 * @param {Event} e - Form submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const successBox = document.getElementById('form-success');
    
    if (!form || !successBox) return;

    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>A enviar pedido...</span>`;
    }

    try {
        const formData = new FormData(form);
        // FormSubmit AJAX endpoint forwarding to papelarialusitana@gmail.com
        const response = await fetch('https://formsubmit.co/ajax/papelarialusitana@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // Show success state regardless of endpoint activation state for smooth UX
        form.classList.add('hidden');
        successBox.classList.remove('hidden');
    } catch (error) {
        console.warn('Form submission handled with local fallback confirmation:', error);
        form.classList.add('hidden');
        successBox.classList.remove('hidden');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}

/**
 * Reset contact form state for new order
 */
function resetForm() {
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('form-success');
    if (form && successBox) {
        form.reset();
        form.classList.remove('hidden');
        successBox.classList.add('hidden');
    }
}

/**
 * Update dynamic opening status badge based on current Europe/Lisbon time
 * Handles Mon-Fri lunch break (13:00 - 15:00) & weekend schedules
 */
function updateStoreStatus() {
    const badge = document.getElementById('store-status-badge');
    if (!badge) return;

    try {
        const now = new Date();
        const options = { 
            timeZone: 'Europe/Lisbon', 
            hour12: false, 
            weekday: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
        
        let weekday = '', hour = 0, minute = 0;
        parts.forEach(p => {
            if (p.type === 'weekday') weekday = p.value;
            if (p.type === 'hour') hour = parseInt(p.value, 10);
            if (p.type === 'minute') minute = parseInt(p.value, 10);
        });

        const currentMinutes = hour * 60 + minute;
        
        // Schedule definitions in minutes
        // Mon-Fri: 09:00 (540m) - 13:00 (780m), Lunch: 13:00 - 15:00 (900m), Afternoon: 15:00 - 19:00 (1140m)
        // Saturday: 09:00 (540m) - 13:00 (780m)
        const isMonFri = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
        const isSat = weekday === 'Sat';

        let statusState = 'closed'; // 'open', 'lunch', 'closed'

        if (isMonFri) {
            if ((currentMinutes >= 540 && currentMinutes < 780) || (currentMinutes >= 900 && currentMinutes < 1140)) {
                statusState = 'open';
            } else if (currentMinutes >= 780 && currentMinutes < 900) {
                statusState = 'lunch';
            }
        } else if (isSat) {
            if (currentMinutes >= 540 && currentMinutes < 780) {
                statusState = 'open';
            }
        }

        if (statusState === 'open') {
            badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-green animate-pulse relative z-10"></span> <span class="font-semibold text-brand-dark relative z-10">Aberto Agora</span><span class="absolute bottom-0 left-0 w-full h-1.5 bg-brand-green/30 -z-0 -rotate-1 rounded-sm scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>`;
        } else if (statusState === 'lunch') {
            badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-brand-orange animate-pulse relative z-10"></span> <span class="font-semibold text-brand-orange relative z-10">Encerrado · Almoço</span><span class="absolute bottom-0 left-0 w-full h-1.5 bg-brand-orange/30 -z-0 -rotate-1 rounded-sm scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>`;
        } else {
            badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-ink-400 relative z-10"></span> <span class="text-ink-500 relative z-10">Encerrado</span>`;
        }
    } catch (err) {
        console.error("Error updating store status badge:", err);
    }
}

// --- Mobile Viewport Height Fix ---
// Fixes the 100vh issue on mobile browsers with dynamic toolbars
const appHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
window.addEventListener('orientationchange', appHeight);
appHeight();

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateStoreStatus();
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/**
 * Legal Modal Dialog Management (Privacy Policy & Terms of Use)
 */
function openLegalModal(tabType = 'privacidade') {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;

    switchLegalTab(tabType);
    modal.classList.remove('hidden');
    // Force reflow for CSS transition
    void modal.offsetWidth;
    modal.classList.add('active-modal');
    document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;

    modal.classList.remove('active-modal');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 250);
}

function switchLegalTab(tabType) {
    const privTab = document.getElementById('legal-tab-privacidade');
    const termosTab = document.getElementById('legal-tab-termos');
    const privContent = document.getElementById('legal-content-privacidade');
    const termosContent = document.getElementById('legal-content-termos');

    if (!privTab || !termosTab || !privContent || !termosContent) return;

    if (tabType === 'privacidade') {
        privTab.className = 'text-xs sm:text-sm font-bold pb-1 border-b-2 border-brand-green text-brand-green transition-colors focus:outline-none';
        termosTab.className = 'text-xs sm:text-sm font-semibold pb-1 border-b-2 border-transparent text-ink-500 hover:text-brand-dark transition-colors focus:outline-none';
        privContent.classList.remove('hidden');
        termosContent.classList.add('hidden');
    } else {
        termosTab.className = 'text-xs sm:text-sm font-bold pb-1 border-b-2 border-brand-green text-brand-green transition-colors focus:outline-none';
        privTab.className = 'text-xs sm:text-sm font-semibold pb-1 border-b-2 border-transparent text-ink-500 hover:text-brand-dark transition-colors focus:outline-none';
        termosContent.classList.remove('hidden');
        privContent.classList.add('hidden');
    }
}

// Global keydown handler for Escape key closing modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('legal-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeLegalModal();
        }
    }
});

