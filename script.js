// ===== GLOBAL VARIABLES =====
const CONFIG = {
    FORMSPREE_ENDPOINT: "https://formspree.io/f/myzdgllv",
    PACKAGES: {
        digital: { price: 1500, name: 'Digital Package' },
        shipped: { price: 4500, name: 'Printed Book (Shipped)' },
        pickup: { price: 3500, name: 'Printed Book (Pickup)' }
    }
};

let selectedPackage = null;
let paymentCompleted = false;
let adminLoggedIn = false;

// Initialize form handlers
const contactForm = new FormHandler('contact-form', {
    endpoint: CONFIG.FORMSPREE_ENDPOINT,
    successCallback: () => {
        showNotification('Thank you for your message! We\'ll respond within 24 hours.', 'success');
    }
});

// Initialize payment handler
const paymentHandler = new PaymentHandler();

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to container
    container.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-in-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Site content that can be edited by admin
let siteContent = {
    heroTitle: "Turn Your Kid's Art Into Real Coloring Books",
    heroSubtitle: "Upload the masterpieces, we'll handle the magic—print or digital. Create lasting memories from your child's creativity.",
    contactEmail: "hello@foreverscribbles.com",
    facebookUrl: "https://facebook.com/foreverscribbles"
};

// ===== DOM CONTENT LOADED =====
// Load site content function
function loadSiteContent() {
    // Update site content from the siteContent object
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) heroTitle.innerHTML = siteContent.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = siteContent.heroSubtitle;
    
    // Update contact information
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${siteContent.contactEmail}`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFAQ();
    initializeAnimations();
    initializeButtons();
    loadSiteContent();
    
    // Check if returning from payment (simulate payment success)
    checkPaymentStatus();

    initCuteBeforeAfter();
});

// Initialize button event listeners
function initializeButtons() {
    // Package selection buttons
    document.querySelectorAll('[data-package]').forEach(button => {
        button.addEventListener('click', (e) => {
            const packageType = e.target.dataset.package;
            window.location.href = '#order-forms';
        });
    });

    // Admin actions
    document.querySelector('.admin-link a')?.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminLogin();
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            if (tab) showTab(tab);
        });
    });

    // Update buttons
    const updateButtons = {
        'update-hero-title': updateHeroTitle,
        'update-hero-subtitle': updateHeroSubtitle,
        'update-contact-email': updateContactEmail,
        'update-facebook-url': updateFacebookUrl
    };

    Object.entries(updateButtons).forEach(([id, handler]) => {
        document.getElementById(id)?.addEventListener('click', handler);
    });

    // Footer links
    const footerActions = {
        'privacy-policy': showPrivacyPolicy,
        'terms': showTerms,
        'shipping': showShipping
    };

    Object.entries(footerActions).forEach(([id, handler]) => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.preventDefault();
            handler();
        });
    });
}

// Logo tap/click animation trigger
(function () {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  const fire = () => {
    // add class briefly to trigger CSS animation
    logo.classList.add('tap-animate');
    setTimeout(() => logo.classList.remove('tap-animate'), 700);
  };

  // Click or touch = animate
  logo.addEventListener('click', fire);
  logo.addEventListener('touchstart', fire, { passive: true });

  // Keyboard accessibility (Enter/Space on the link)
  logo.parentElement?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') fire();
  });
})();


// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// --- Navbar Mobile Toggle ---
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// --- Before/After Gallery Lightbox ---
document.addEventListener('DOMContentLoaded', () => {
    // Set before/after labels
    document.querySelectorAll('.ba-label-before').forEach(el => el.textContent = 'Before');
    document.querySelectorAll('.ba-label-after').forEach(el => el.textContent = 'After');

    // Lightbox logic
    const baCards = document.querySelectorAll('.ba-card');
    const baLightbox = document.getElementById('baLightbox');
    const baLightboxClose = document.getElementById('baLightboxClose');
    const baLightboxBefore = document.getElementById('baLightboxBefore');
    const baLightboxAfter = document.getElementById('baLightboxAfter');

    baCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgs = card.querySelectorAll('.ba-img-wrap img');
            if (imgs.length === 2) {
                baLightboxBefore.src = imgs[0].src;
                baLightboxAfter.src = imgs[1].src;
                baLightbox.classList.add('active');
            }
        });
    });

    if (baLightboxClose) {
        baLightboxClose.addEventListener('click', () => {
            baLightbox.classList.remove('active');
            baLightboxBefore.src = '';
            baLightboxAfter.src = '';
        });
    }

    // Close lightbox on outside click
    if (baLightbox) {
        baLightbox.addEventListener('click', (e) => {
            if (e.target === baLightbox) {
                baLightbox.classList.remove('active');
                baLightboxBefore.src = '';
                baLightboxAfter.src = '';
            }
        });
    }
});

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Animate step cards on hover
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate gallery cards
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Simple lightbox effect (placeholder)
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Floating shapes animation enhancement
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===== PACKAGE SELECTION =====
function selectPackage(packageType) {
    selectedPackage = packageType;
    
    // Update UI to show selection
    const buttons = document.querySelectorAll('.pricing-card .btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
        btn.textContent = btn.textContent.replace('Selected! ', '');
    });
    
    // Highlight selected package
    const selectedButton = event.target;
    selectedButton.classList.remove('btn-outline');
    selectedButton.classList.add('btn-primary');
    selectedButton.textContent = 'Selected! ' + selectedButton.textContent;
    
    // Show success message
    showNotification(`${packageType.charAt(0).toUpperCase() + packageType.slice(1)} package selected! Scroll down to complete your order.`, 'success');
    
    // Scroll to order forms
    setTimeout(() => {
        document.getElementById('order-forms').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1000);
}

// ===== FAQ FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => toggleFAQ(question));
    });
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.faq-question').forEach(q => {
            q.setAttribute('aria-expanded', 'false');
            q.parentElement.classList.remove('open');
        });
        if (!expanded) {
            question.setAttribute('aria-expanded', 'true');
            question.parentElement.classList.add('open');
        }
    });
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ===== FORM HANDLING =====
function checkPaymentStatus() {
    // Only check payment status if we're actually returning from a payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment')) {
        const paymentSuccess = urlParams.get('payment') === 'success';
        if (paymentSuccess) {
            paymentCompleted = true;
            showPaymentSuccess();
            // Clear the URL parameter
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (localStorage.getItem('paymentCompleted') === 'true') {
        paymentCompleted = true;
        // No need to show notification on page load for localStorage
    }
}

function showPaymentSuccess() {
    const form1Container = document.getElementById('form-1-container');
    const successMessage = document.getElementById('payment-success');
    const stepIndicator2 = document.getElementById('step-indicator-2');
    
    form1Container.classList.add('hidden');
    successMessage.classList.remove('hidden');
    stepIndicator2.classList.add('active');
    
    // Auto-scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 500);
}

function showUploadForm() {
    const successMessage = document.getElementById('payment-success');
    const form2Container = document.getElementById('form-2-container');
    
    successMessage.classList.add('hidden');
    form2Container.classList.remove('hidden');
    
    // Scroll to upload form
    setTimeout(() => {
        form2Container.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

// --- Order Form Step Logic (if needed) ---
function showUploadForm() {
    document.getElementById('form-1-container').classList.add('hidden');
    document.getElementById('payment-success').classList.add('hidden');
    document.getElementById('form-2-container').classList.remove('hidden');
    document.getElementById('step-indicator-1').classList.remove('active');
    document.getElementById('step-indicator-2').classList.add('active');
}

// ===== CONTACT FORM =====

function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"], .btn[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';
    const data = new FormData(form);
    
    if (submitButton) { 
        submitButton.disabled = true; 
        submitButton.textContent = 'Sending…'; 
    }
    
    // Add required Formspree headers
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: data
    };

    fetch(FORMSPREE_ENDPOINT, fetchOptions)
        .then(async (response) => {
            if (response.ok) {
                showNotification('Thanks! Your message was sent.', 'success');
                form.reset();
            } else {
                let errorMsg = 'Something went wrong. Please email us directly at hello@foreverscribbles.com';
                try {
                    const body = await response.json();
                    if (body?.errors?.length) {
                        errorMsg = body.errors.map(e => e.message).join('; ');
                    }
                } catch(e) {}
                showNotification(errorMsg, 'error');
            }
        })
        .catch(() => {
            showNotification('Network error. Please try again.', 'error');
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText || 'Send';
            }
        });
}

// --- Admin Modal/Dashboard Logic ---
function showAdminLogin() {
    document.getElementById('admin-modal').style.display = 'block';
}
function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}
function showAdminDashboard() {
    document.getElementById('admin-modal').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
}
function closeAdminDashboard() {
    document.getElementById('admin-dashboard').style.display = 'none';
}
function adminLogin(e) {
    e.preventDefault();
    // Simple password check (replace with real auth in production)
    const pw = document.getElementById('admin-password').value;
    if (pw === 'admin') {
        showAdminDashboard();
    } else {
        showNotification('Incorrect password.', 'error');
    }
}

// Admin dashboard tab switching
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

// Admin content editing (demo only)
function updateHeroTitle() {
    const val = document.getElementById('hero-title-edit').value;
    document.querySelector('.hero-title').innerHTML = val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function updateHeroSubtitle() {
    const val = document.getElementById('hero-subtitle-edit').value;
    document.querySelector('.hero-subtitle').innerHTML = val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function updateContactEmail() {
    const val = document.getElementById('contact-email').value;
    document.querySelectorAll('.contact-info p, .footer-section a[href^="mailto:"]').forEach(el => {
        if (el.tagName === 'A') el.href = `mailto:${val}`;
        else el.textContent = val;
    });
}
function updateFacebookUrl() {
    const val = document.getElementById('facebook-url').value;
    document.querySelectorAll('a[href*="facebook.com/foreverscribbles"]').forEach(el => {
        el.href = val;
    });
}

// --- Privacy/Terms/Shipping Modal Placeholders ---
function showPrivacyPolicy() { 
    showNotification('Privacy Policy will be displayed here.', 'info');
}

function showTerms() { 
    showNotification('Terms of Service will be displayed here.', 'info');
}

function showShipping() { 
    showNotification('Shipping & Returns information will be displayed here.', 'info');
}

// --- Utility: Hide modals on outside click ---
document.addEventListener('click', function(e) {
    // Admin modal
    const adminModal = document.getElementById('admin-modal');
    if (adminModal && adminModal.style.display === 'block' && e.target === adminModal) {
        closeAdminModal();
    }
    // Admin dashboard
    const adminDash = document.getElementById('admin-dashboard');
    if (adminDash && adminDash.style.display === 'block' && e.target === adminDash) {
        closeAdminDashboard();
    }
});

// ===== DEVELOPMENT HELPERS =====
// Simulate payment completion for testing
function simulatePaymentSuccess() {
    localStorage.setItem('paymentCompleted', 'true');
    showNotification('Payment simulation activated! Refresh the page to see the upload form.', 'success');
}

// Reset payment status for testing
function resetPaymentStatus() {
    localStorage.removeItem('paymentCompleted');
    showNotification('Payment status reset! Refresh the page.', 'info');
}

// Add development helpers to console
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%cForever Scribbles Development Mode', 'color: #FF6B9D; font-size: 16px; font-weight: bold;');
    console.log('Available functions:');
    console.log('• simulatePaymentSuccess() - Test payment flow');
    console.log('• resetPaymentStatus() - Reset payment for testing');
    console.log('• showNotification(message, type) - Show notification');
    
    // Add admin password hint
    console.log('%cAdmin password: foreverscribbles2024', 'color: #7B68EE; font-style: italic;');
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images (when we add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {


/* === FS UPGRADE: Transform existing before/after pairs into sliders + lightbox === */
(function(){
  function initPairs(){
    const pairs = document.querySelectorAll('.ba-pair, .before-after, .example-pair');
    pairs.forEach(pair => {
      if (pair.dataset.fsEnhanced) return;
      const imgs = pair.querySelectorAll('img');
      if (imgs.length < 2) return;
      const before = imgs[0].getAttribute('src');
      const after  = imgs[1].getAttribute('src');
      const slider = document.createElement('div');
      slider.className = 'fs-ba-slider';
      const imgBefore = document.createElement('img');
      imgBefore.className = 'fs-ba-img fs-before';
      imgBefore.src = before;
      imgBefore.alt = imgs[0].alt || 'Original';
      imgBefore.setAttribute('data-full', before);
      const afterWrap = document.createElement('div');
      afterWrap.className = 'fs-ba-after-wrap';
      const imgAfter = document.createElement('img');
      imgAfter.className = 'fs-ba-img fs-after';
      imgAfter.src = after;
      imgAfter.alt = imgs[1].alt || 'Outline';
      imgAfter.setAttribute('data-full', after);
      afterWrap.appendChild(imgAfter);
      const range = document.createElement('input');
      range.type='range'; range.min='0'; range.max='100'; range.value='50';
      range.className='fs-ba-range'; range.setAttribute('aria-label','Reveal slider');
      const handle = document.createElement('div');
      handle.className='fs-ba-handle'; handle.innerHTML='<span></span>';
      slider.appendChild(imgBefore);
      slider.appendChild(afterWrap);
      slider.appendChild(range);
      slider.appendChild(handle);
      pair.innerHTML='';
      pair.appendChild(slider);
      const setPos = (v)=>{v=Math.max(0,Math.min(100,parseFloat(v)));afterWrap.style.width=v+'%';handle.style.left=v+'%';};
      setPos(range.value);
      range.addEventListener('input',()=>setPos(range.value));
      slider.addEventListener('click',(e)=>{ if(e.target===range) return; openFsLightbox(before, after); });
      pair.dataset.fsEnhanced='1';
    });
  }
  const lb = document.querySelector('[data-fs-lightbox]');
  const lbImg = lb?.querySelector('.fs-lightbox-img');
  const btnBefore = lb?.querySelector('[data-fs-lb-before]');
  const btnAfter  = lb?.querySelector('[data-fs-lb-after]');
  const btnClose  = lb?.querySelector('[data-fs-lb-close]');
  let current={before:'',after:''};
  function openFsLightbox(b,a){ if(!lb) return; current.before=b; current.after=a; lbImg.src=a; lb.hidden=false; document.body.style.overflow='hidden'; }
  function closeFsLightbox(){ if(!lb) return; lb.hidden=true; lbImg.src=''; document.body.style.overflow=''; }
  btnBefore?.addEventListener('click',()=>{lbImg.src=current.before;});
  btnAfter ?.addEventListener('click',()=>{lbImg.src=current.after;});
  btnClose ?.addEventListener('click',closeFsLightbox);
  lb?.addEventListener('click',e=>{ if(e.target===lb) closeFsLightbox(); });
  window.addEventListener('keydown',e=>{ if(e.key==='Escape') closeFsLightbox(); });
  if (document.readyState==='loading') { document.addEventListener('DOMContentLoaded', initPairs); } else { initPairs(); }
})();
/* === FS BA SLIDER (non-destructive) === */
(function(){
  const SELECTORS = [
    '.before-after', '.ba-pair', '.example-pair', '.examples .card', '.examples .example', '.gallery .card', '.gallery-item'
  ];
  function toSlider(container){
    if (container.dataset.fsEnhanced) return;
    const imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length < 2) return;
    const before = imgs[0];
    const after = imgs[1];
    // Frame
    const frame = document.createElement('div');
    frame.className = 'fs-ba-slider';
    // Before image
    const imgBefore = before.cloneNode(true);
    imgBefore.classList.add('fs-ba-img','fs-ba-before');
    // After wrap + image
    const afterWrap = document.createElement('div');
    afterWrap.className = 'fs-ba-after-wrap';
    const imgAfter = after.cloneNode(true);
    imgAfter.classList.add('fs-ba-img','fs-ba-after');
    afterWrap.appendChild(imgAfter);
    // Range + handle
    const range = document.createElement('input');
    range.type = 'range'; range.min='0'; range.max='100'; range.value='50';
    range.className = 'fs-ba-range'; range.setAttribute('aria-label','Reveal slider');
    const handle = document.createElement('div'); handle.className = 'fs-ba-handle'; handle.innerHTML = '<span></span>';
    // Build
    frame.appendChild(imgBefore);
    frame.appendChild(afterWrap);
    frame.appendChild(range);
    frame.appendChild(handle);
    // Replace original two images with slider, preserve other content
    before.parentNode.insertBefore(frame, before);
    // remove original two images
    before.remove(); after.remove();
    // Behavior
    const setPos = (val)=>{
      const pct = Math.max(0, Math.min(100, parseFloat(val)));
      afterWrap.style.width = pct + '%';
      handle.style.left = pct + '%';
    };
    setPos(range.value);
    range.addEventListener('input', ()=> setPos(range.value));
    container.dataset.fsEnhanced = '1';
  }
  function init(){
    SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(toSlider);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();


/* =============================
   BEFORE/AFTER – Cute Subtle Presentation (Toggle + Crossfade + Lightbox)
   ============================= */
function ensureFsLightbox() {
  if (document.querySelector('[data-fs-lightbox]')) return;
  const lb = document.createElement('div');
  lb.setAttribute('data-fs-lightbox','');
  lb.className = 'fs-lb-overlay hidden';
  lb.innerHTML = `
    <div class="fs-lb-dialog" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="fs-lb-close" aria-label="Close">×</button>
      <img class="fs-lb-img" alt="Preview">
    </div>`;
  document.body.appendChild(lb);

  const close = () => lb.classList.add('hidden');
  lb.addEventListener('click', (e)=>{ if (e.target === lb) close(); });
  lb.querySelector('.fs-lb-close').addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') close(); });

  window.__fsOpenLightbox = (src) => {
    lb.querySelector('.fs-lb-img').src = src;
    lb.classList.remove('hidden');
  };
}

function buildCuteBeforeAfterCard(beforeSrc, afterSrc, altA, altB) {
  const wrap = document.createElement('div');
  wrap.className = 'ba-cute-card';
  wrap.innerHTML = `
    <div class="ba-cute-header">
      <div class="ba-cute-toggle" role="tablist" aria-label="Before After Toggle">
        <button class="ba-pill active" data-view="before" role="tab" aria-selected="true">Before</button>
        <button class="ba-pill" data-view="after" role="tab" aria-selected="false">After</button>
      </div>
    </div>
    <div class="ba-cute-body">
      <div class="ba-cute-frame">
        <img class="ba-img before active" src="${beforeSrc}" alt="${altA || 'Before'}" loading="lazy">
        <img class="ba-img after"  src="${afterSrc}"  alt="${altB || 'After'}"  loading="lazy">
        <div class="ba-cute-decor" aria-hidden="true">✦</div>
      </div>
      <div class="ba-cute-captions">
        <span class="cap cap-before">Before</span>
        <span class="cap cap-after">After</span>
      </div>
    </div>
  `;

  const pills = wrap.querySelectorAll('.ba-pill');
  const imgBefore = wrap.querySelector('.ba-img.before');
  const imgAfter  = wrap.querySelector('.ba-img.after');
  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
      p.classList.add('active'); p.setAttribute('aria-selected','true');
      const v = p.dataset.view;
      if (v === 'after') { imgAfter.classList.add('active'); imgBefore.classList.remove('active'); }
      else { imgBefore.classList.add('active'); imgAfter.classList.remove('active'); }
    });
  });

  [imgBefore, imgAfter].forEach(img => {
    img.addEventListener('click', () => { if (typeof window.__fsOpenLightbox === 'function') window.__fsOpenLightbox(img.src); });
  });

  return wrap;
}

function initCuteBeforeAfter() {
  ensureFsLightbox();
  document.querySelectorAll('.before-after').forEach(pair => {
    if (pair.dataset.fsUpgraded === 'cute') return;
    const imgs = pair.querySelectorAll('img');
    if (imgs.length < 2) return;
    const beforeSrc = imgs[0].getAttribute('src');
    const afterSrc  = imgs[1].getAttribute('src');
    const altA = imgs[0].getAttribute('alt') || 'Before';
    const altB = imgs[1].getAttribute('alt') || 'After';
    pair.innerHTML = '';
    pair.appendChild(buildCuteBeforeAfterCard(beforeSrc, afterSrc, altA, altB));
    pair.dataset.fsUpgraded = 'cute';
  });
}
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Apply focus trapping to modals when they open
const originalShowAdminDashboard = showAdminDashboard;
showAdminDashboard = function() {
    originalShowAdminDashboard();
    setTimeout(() => {
        const modal = document.getElementById('admin-dashboard');
        trapFocus(modal);
    }, 100);
};

// ===== ERROR HANDLING =====
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('Something went wrong. Please refresh the page and try again.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('Something went wrong. Please try again.', 'error');
    event.preventDefault();
});


/* === FS UPGRADE: Transform existing before/after pairs into sliders + lightbox === */
(function(){
  function initPairs(){
    const pairs = document.querySelectorAll('.ba-pair, .before-after, .example-pair');
    pairs.forEach(pair => {
      if (pair.dataset.fsEnhanced) return;
      const imgs = pair.querySelectorAll('img');
      if (imgs.length < 2) return;
      const before = imgs[0].getAttribute('src');
      const after  = imgs[1].getAttribute('src');
      const slider = document.createElement('div');
      slider.className = 'fs-ba-slider';
      const imgBefore = document.createElement('img');
      imgBefore.className = 'fs-ba-img fs-before';
      imgBefore.src = before;
      imgBefore.alt = imgs[0].alt || 'Original';
      imgBefore.setAttribute('data-full', before);
      const afterWrap = document.createElement('div');
      afterWrap.className = 'fs-ba-after-wrap';
      const imgAfter = document.createElement('img');
      imgAfter.className = 'fs-ba-img fs-after';
      imgAfter.src = after;
      imgAfter.alt = imgs[1].alt || 'Outline';
      imgAfter.setAttribute('data-full', after);
      afterWrap.appendChild(imgAfter);
      const range = document.createElement('input');
      range.type='range'; range.min='0'; range.max='100'; range.value='50';
      range.className='fs-ba-range'; range.setAttribute('aria-label','Reveal slider');
      const handle = document.createElement('div');
      handle.className='fs-ba-handle'; handle.innerHTML='<span></span>';
      slider.appendChild(imgBefore);
      slider.appendChild(afterWrap);
      slider.appendChild(range);
      slider.appendChild(handle);
      pair.innerHTML='';
      pair.appendChild(slider);
      const setPos = (v)=>{v=Math.max(0,Math.min(100,parseFloat(v)));afterWrap.style.width=v+'%';handle.style.left=v+'%';};
      setPos(range.value);
      range.addEventListener('input',()=>setPos(range.value));
      slider.addEventListener('click',(e)=>{ if(e.target===range) return; openFsLightbox(before, after); });
      pair.dataset.fsEnhanced='1';
    });
  }
  const lb = document.querySelector('[data-fs-lightbox]');
  const lbImg = lb?.querySelector('.fs-lightbox-img');
  const btnBefore = lb?.querySelector('[data-fs-lb-before]');
  const btnAfter  = lb?.querySelector('[data-fs-lb-after]');
  const btnClose  = lb?.querySelector('[data-fs-lb-close]');
  let current={before:'',after:''};
  function openFsLightbox(b,a){ if(!lb) return; current.before=b; current.after=a; lbImg.src=a; lb.hidden=false; document.body.style.overflow='hidden'; }
  function closeFsLightbox(){ if(!lb) return; lb.hidden=true; lbImg.src=''; document.body.style.overflow=''; }
  btnBefore?.addEventListener('click',()=>{lbImg.src=current.before;});
  btnAfter ?.addEventListener('click',()=>{lbImg.src=current.after;});
  btnClose ?.addEventListener('click',closeFsLightbox);
  lb?.addEventListener('click',e=>{ if(e.target===lb) closeFsLightbox(); });
  window.addEventListener('keydown',e=>{ if(e.key==='Escape') closeFsLightbox(); });
  if (document.readyState==='loading') { document.addEventListener('DOMContentLoaded', initPairs); } else { initPairs(); }
})();
/* === FS BA SLIDER (non-destructive) === */
(function(){
  const SELECTORS = [
    '.before-after', '.ba-pair', '.example-pair', '.examples .card', '.examples .example', '.gallery .card', '.gallery-item'
  ];
  function toSlider(container){
    if (container.dataset.fsEnhanced) return;
    const imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length < 2) return;
    const before = imgs[0];
    const after = imgs[1];
    // Frame
    const frame = document.createElement('div');
    frame.className = 'fs-ba-slider';
    // Before image
    const imgBefore = before.cloneNode(true);
    imgBefore.classList.add('fs-ba-img','fs-ba-before');
    // After wrap + image
    const afterWrap = document.createElement('div');
    afterWrap.className = 'fs-ba-after-wrap';
    const imgAfter = after.cloneNode(true);
    imgAfter.classList.add('fs-ba-img','fs-ba-after');
    afterWrap.appendChild(imgAfter);
    // Range + handle
    const range = document.createElement('input');
    range.type = 'range'; range.min='0'; range.max='100'; range.value='50';
    range.className = 'fs-ba-range'; range.setAttribute('aria-label','Reveal slider');
    const handle = document.createElement('div'); handle.className = 'fs-ba-handle'; handle.innerHTML = '<span></span>';
    // Build
    frame.appendChild(imgBefore);
    frame.appendChild(afterWrap);
    frame.appendChild(range);
    frame.appendChild(handle);
    // Replace original two images with slider, preserve other content
    before.parentNode.insertBefore(frame, before);
    // remove original two images
    before.remove(); after.remove();
    // Behavior
    const setPos = (val)=>{
      const pct = Math.max(0, Math.min(100, parseFloat(val)));
      afterWrap.style.width = pct + '%';
      handle.style.left = pct + '%';
    };
    setPos(range.value);
    range.addEventListener('input', ()=> setPos(range.value));
    container.dataset.fsEnhanced = '1';
  }
  function init(){
    SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(toSlider);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();


/* =============================
   BEFORE/AFTER – Cute Subtle Presentation (Toggle + Crossfade + Lightbox)
   ============================= */
function ensureFsLightbox() {
  if (document.querySelector('[data-fs-lightbox]')) return;
  const lb = document.createElement('div');
  lb.setAttribute('data-fs-lightbox','');
  lb.className = 'fs-lb-overlay hidden';
  lb.innerHTML = `
    <div class="fs-lb-dialog" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="fs-lb-close" aria-label="Close">×</button>
      <img class="fs-lb-img" alt="Preview">
    </div>`;
  document.body.appendChild(lb);

  const close = () => lb.classList.add('hidden');
  lb.addEventListener('click', (e)=>{ if (e.target === lb) close(); });
  lb.querySelector('.fs-lb-close').addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') close(); });

  window.__fsOpenLightbox = (src) => {
    lb.querySelector('.fs-lb-img').src = src;
    lb.classList.remove('hidden');
  };
}

function buildCuteBeforeAfterCard(beforeSrc, afterSrc, altA, altB) {
  const wrap = document.createElement('div');
  wrap.className = 'ba-cute-card';
  wrap.innerHTML = `
    <div class="ba-cute-header">
      <div class="ba-cute-toggle" role="tablist" aria-label="Before After Toggle">
        <button class="ba-pill active" data-view="before" role="tab" aria-selected="true">Before</button>
        <button class="ba-pill" data-view="after" role="tab" aria-selected="false">After</button>
      </div>
    </div>
    <div class="ba-cute-body">
      <div class="ba-cute-frame">
        <img class="ba-img before active" src="${beforeSrc}" alt="${altA || 'Before'}" loading="lazy">
        <img class="ba-img after"  src="${afterSrc}"  alt="${altB || 'After'}"  loading="lazy">
        <div class="ba-cute-decor" aria-hidden="true">✦</div>
      </div>
      <div class="ba-cute-captions">
        <span class="cap cap-before">Before</span>
        <span class="cap cap-after">After</span>
      </div>
    </div>
  `;

  const pills = wrap.querySelectorAll('.ba-pill');
  const imgBefore = wrap.querySelector('.ba-img.before');
  const imgAfter  = wrap.querySelector('.ba-img.after');
  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
      p.classList.add('active'); p.setAttribute('aria-selected','true');
      const v = p.dataset.view;
      if (v === 'after') { imgAfter.classList.add('active'); imgBefore.classList.remove('active'); }
      else { imgBefore.classList.add('active'); imgAfter.classList.remove('active'); }
    });
  });

  [imgBefore, imgAfter].forEach(img => {
    img.addEventListener('click', () => { if (typeof window.__fsOpenLightbox === 'function') window.__fsOpenLightbox(img.src); });
  });

  return wrap;
}

function initCuteBeforeAfter() {
  ensureFsLightbox();
  document.querySelectorAll('.before-after').forEach(pair => {
    if (pair.dataset.fsUpgraded === 'cute') return;
    const imgs = pair.querySelectorAll('img');
    if (imgs.length < 2) return;
    const beforeSrc = imgs[0].getAttribute('src');
    const afterSrc  = imgs[1].getAttribute('src');
    const altA = imgs[0].getAttribute('alt') || 'Before';
    const altB = imgs[1].getAttribute('alt') || 'After';
    pair.innerHTML = '';
    pair.appendChild(buildCuteBeforeAfterCard(beforeSrc, afterSrc, altA, altB));
    pair.dataset.fsUpgraded = 'cute';
  });
}
