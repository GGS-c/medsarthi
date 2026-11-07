/**
 * MEDSARTHI EDUCATIONAL CONSULTANCY
 * "Your Trust, Our Commitment" (Est. 2022)
 * Client-Side Application Engine & Interactive Controls
 * Optimized for Fast Loading + Zero Lag
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  initIcons();

  // 2. Navigation & Sticky Header
  initHeader();

  // 3. First-Scroll Quick Enquiry Popup (Triggers after ~100px scroll)
  initFirstScrollPopup();

  // 4. Global Counselling & Callback Modals
  initCounsellingModal();

  // 5. WhatsApp Selector & Direct Connect
  initWhatsAppControls();

  // 6. Interactive FAQ Accordion
  initFaqAccordion();

  // 7. University Directory Search & Course Filter
  initUniversityDirectory();

  // 8. Gallery Category Filter
  initGalleryFilter();

  // 9. Lead Enquiry Management System (Client Ready)
  initLeadManagementSystem();

  // 10. Form Submissions
  initFormHandlers();
});

/**
 * Initialize Lucide Icons safely
 */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * Lightweight Sticky Header & Mobile Drawer
 */
function initHeader() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileBtn = document.getElementById('close-mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (header) {
          if (window.scrollY > 20) {
            header.classList.add('glass-header-scrolled');
          } else {
            header.classList.remove('glass-header-scrolled');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function openDrawer() {
    if (!mobileDrawer || !mobileBackdrop) return;
    mobileDrawer.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer || !mobileBackdrop) return;
    mobileDrawer.classList.add('translate-x-full');
    mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  const drawerLinks = document.querySelectorAll('#mobile-drawer a');
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Automatically ensure active navigation link is highlighted
  highlightActiveNav();
}

/**
 * Automatically highlight active link across desktop navbar and mobile drawer
 */
function highlightActiveNav() {
  const path = window.location.pathname.toLowerCase();
  
  let currentKey = 'home';
  if (path.includes('about')) currentKey = 'about';
  else if (path.includes('services')) currentKey = 'services';
  else if (path.includes('universities')) currentKey = 'universities';
  else if (path.includes('admission')) currentKey = 'admission';
  else if (path.includes('gallery')) currentKey = 'gallery';
  else if (path.includes('faq')) currentKey = 'faq';
  else if (path.includes('contact')) currentKey = 'contact';
  else if (path.endsWith('index.html') || path.endsWith('/') || path === '') currentKey = 'home';

  // Desktop links
  const desktopNav = document.querySelector('#main-header .hidden.lg\\:flex');
  if (desktopNav) {
    const desktopLinks = desktopNav.querySelectorAll('a');
    desktopLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const isMatch = (currentKey === 'home' && (href.endsWith('index.html') || href === './' || href === '../index.html' || href === 'index.html')) ||
                      (currentKey !== 'home' && href.includes(currentKey));
      
      if (isMatch) {
        link.className = 'text-xs font-bold uppercase tracking-wider text-brown-900 border-b-2 border-brown-900 pb-0.5';
      } else {
        link.className = 'text-xs font-semibold uppercase tracking-wider text-brown-700 hover:text-brown-900 transition-colors';
      }
    });
  }

  // Mobile drawer links
  const drawerNav = document.querySelector('#mobile-drawer nav');
  if (drawerNav) {
    const drawerLinks = drawerNav.querySelectorAll('a');
    drawerLinks.forEach((link, idx) => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const isMatch = (currentKey === 'home' && (href.endsWith('index.html') || href === './' || href === '../index.html' || href === 'index.html')) ||
                      (currentKey !== 'home' && href.includes(currentKey));
      const isLast = (idx === drawerLinks.length - 1);
      const border = isLast ? '' : ' border-b border-surface-border';
      const icon = link.querySelector('i, svg');

      if (isMatch) {
        link.className = `flex items-center justify-between py-1.5 text-brown-900 font-bold${border}`;
        if (icon) {
          icon.setAttribute('class', 'w-4 h-4 text-gold-600');
        }
      } else {
        link.className = `flex items-center justify-between py-1.5 text-brown-700 hover:text-brown-900 font-medium${border}`;
        if (icon) {
          icon.setAttribute('class', 'w-4 h-4 text-surface-muted');
        }
      }
    });
  }
}

/**
 * First-Scroll Enquiry Popup (#14)
 * Triggers after ~100px of scrolling.
 * Asks only: Student Name, Mobile Number, NEET Score.
 * Shown once per browser using localStorage.
 */
function initFirstScrollPopup() {
  const popup = document.getElementById('scroll-enquiry-popup');
  if (!popup) return;

  const STORAGE_KEY = 'medsarthi_first_scroll_enquiry_dismissed';
  if (localStorage.getItem(STORAGE_KEY)) return;

  const closeBtn = document.getElementById('close-scroll-popup');
  const form = document.getElementById('scroll-enquiry-form');

  let popupShown = false;

  function showPopup() {
    if (popupShown) return;
    popupShown = true;
    popup.classList.add('active');
    initIcons();
  }

  function hidePopup() {
    popup.classList.remove('active');
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  // Scroll listener for ~100px
  const onScroll = () => {
    if (window.scrollY >= 100 && !popupShown) {
      showPopup();
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  if (closeBtn) closeBtn.addEventListener('click', hidePopup);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) hidePopup();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('popup-student-name')?.value.trim();
      const phone = document.getElementById('popup-student-phone')?.value.trim();
      const neet = document.getElementById('popup-student-neet')?.value.trim();

      if (!name || !phone) {
        showToast('Please enter your full name and mobile number.', 'warning');
        return;
      }

      saveEnquiry({
        name,
        phone,
        neet: neet || 'N/A',
        course: 'General Medical Counselling',
        source: 'First Scroll Quick Lead Popup'
      });

      showToast(`Thank you, ${name}! Dr. Prasad Wani & MedSarthi team will call you back shortly.`, 'success');
      hidePopup();
    });
  }
}

/**
 * Global Free Counselling & Callback Modal
 */
function initCounsellingModal() {
  const modal = document.getElementById('counselling-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="counselling"], .btn-counselling');
  const closeBtn = document.getElementById('close-counselling-modal');
  const form = document.getElementById('global-counselling-form');

  if (!modal) return;

  function openModal(defaultCourse = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initIcons();

    if (defaultCourse && form) {
      const courseSelect = form.querySelector('[name="course_interest"]');
      if (courseSelect) courseSelect.value = defaultCourse;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course-target') || '';
      openModal(course);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="student_name"]')?.value || 'Student';
      const phone = form.querySelector('[name="student_phone"]')?.value || '';
      const neet = form.querySelector('[name="neet_score"]')?.value || 'N/A';
      const course = form.querySelector('[name="course_interest"]')?.value || 'Medical Course';
      const location = form.querySelector('[name="preferred_location"]')?.value || 'Not Specified';

      saveEnquiry({
        name,
        phone,
        neet,
        course,
        location,
        source: 'Comprehensive Counselling Form'
      });

      showToast(`Thank you, ${name}! Your counselling request for ${course} has been registered with MedSarthi.`, 'success');
      form.reset();
      closeModal();
    });
  }
}

/**
 * WhatsApp Integration (#15)
 * Primary: +91 7414974584 | Secondary: +91 9203969292
 */
function initWhatsAppControls() {
  const modal = document.getElementById('whatsapp-selector-modal');
  const openBtns = document.querySelectorAll('[data-open-whatsapp]');
  const closeBtn = document.getElementById('close-whatsapp-modal');

  if (!modal) {
    // Fallback: directly connect to Dr. Prasad Wani's official WhatsApp if modal isn't embedded on page
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openMedSarthiWhatsApp('917414974584', 'general');
      });
    });
    return;
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      initIcons();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/**
 * Helper to open pre-filled WhatsApp chat
 */
window.openMedSarthiWhatsApp = function(number, topic = 'general') {
  let message = 'Hello Dr. Prasad Wani / MedSarthi Educational Consultancy, I would like to get admission guidance for medical courses.';
  if (topic === 'mbbs') {
    message = 'Hello MedSarthi team, I need guidance regarding MBBS admission and college selection.';
  } else if (topic === 'ayush') {
    message = 'Hello MedSarthi team, I am interested in BAMS / BHMS / BDS course admission guidance.';
  } else if (topic === 'callback') {
    message = 'Hello Dr. Prasad Wani, please arrange a callback for my NEET counselling.';
  }

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  const modal = document.getElementById('whatsapp-selector-modal');
  if (modal) modal.classList.remove('active');
};

/**
 * Interactive FAQ Accordion (#12)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');

      // Close siblings
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.accordion-content');
        const otherIcon = otherItem.querySelector('.accordion-icon');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherContent && otherContent !== content) {
          otherContent.classList.remove('open');
          if (otherIcon) otherIcon.classList.remove('open');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        content.classList.remove('open');
        if (icon) icon.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.add('open');
        if (icon) icon.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * University & College Directory Filter & Search (#7)
 * Clear label: Reference Information Area for guidance, NOT official exclusive partnerships.
 */
const SAMPLE_COLLEGES_DATA = [
  {
    name: 'All India Institute of Medical Sciences (AIIMS)',
    category: 'MBBS',
    location: 'Bhopal, Madhya Pradesh',
    affiliation: 'Statutory Institute of National Importance',
    intake: '125 Seats (NEET-UG)',
    courses: ['MBBS', 'MD / MS', 'B.Sc Nursing'],
    info: 'Premier national apex medical institute known for tertiary medical healthcare and research.'
  },
  {
    name: 'Gandhi Medical College (GMC)',
    category: 'MBBS',
    location: 'Bhopal, Madhya Pradesh',
    affiliation: 'MPMSU Jabalpur',
    intake: '250 Seats (NEET-UG)',
    courses: ['MBBS', 'Postgraduate Medical'],
    info: 'One of central India’s oldest government medical institutions affiliated with Hamidia Hospital.'
  },
  {
    name: 'Government Medical College (GMC)',
    category: 'MBBS',
    location: 'Baramati, Maharashtra',
    affiliation: 'MUHS Nashik',
    intake: '100 Seats (NEET-UG)',
    courses: ['MBBS'],
    info: 'Modern state government medical college with well-equipped clinical departments in Pune district.'
  },
  {
    name: 'Government Medical College (GMC)',
    category: 'MBBS',
    location: 'Chandrapur (Near Warora), Maharashtra',
    affiliation: 'MUHS Nashik',
    intake: '150 Seats (NEET-UG)',
    courses: ['MBBS'],
    info: 'Key government healthcare and medical education institution serving Vidarbha region.'
  },
  {
    name: 'Government Medical College (GMC)',
    category: 'MBBS',
    location: 'Jalgaon (Near Jamner), Maharashtra',
    affiliation: 'MUHS Nashik',
    intake: '150 Seats (NEET-UG)',
    courses: ['MBBS'],
    info: 'Prominent public medical college serving northern Maharashtra with extensive patient flow.'
  },
  {
    name: 'Pt. Khushilal Sharma Govt. Ayurveda College',
    category: 'BAMS',
    location: 'Bhopal, Madhya Pradesh',
    affiliation: 'MPMSU Jabalpur',
    intake: '75 Seats (NEET-UG)',
    courses: ['BAMS (Ayurvedacharya)', 'MD (Ayurveda)'],
    info: 'Renowned autonomous government Ayurvedic institute with dedicated herbal gardens and hospital.'
  },
  {
    name: 'Government Dental College & Hospital',
    category: 'BDS',
    location: 'Nagpur / Mumbai, Maharashtra',
    affiliation: 'MUHS Nashik',
    intake: '100 Seats (NEET-UG)',
    courses: ['BDS', 'MDS'],
    info: 'Top tier government dental surgery institution providing comprehensive oral healthcare education.'
  },
  {
    name: 'Government Homeopathic Medical College',
    category: 'BHMS',
    location: 'Bhopal, Madhya Pradesh',
    affiliation: 'MPMSU Jabalpur',
    intake: '100 Seats (NEET-UG)',
    courses: ['BHMS', 'MD (Homoeopathy)'],
    info: 'Established government college offering quality homeopathic medicine and clinical practice.'
  },
  {
    name: 'College of Veterinary Science & Animal Husbandry',
    category: 'BVSc',
    location: 'Mhow / Jabalpur, Madhya Pradesh',
    affiliation: 'NDVSU Jabalpur',
    intake: '80 Seats (NEET / State Test)',
    courses: ['B.V.Sc. & A.H.'],
    info: 'Specialized college for animal health, veterinary surgery, and livestock production.'
  },
  {
    name: 'Government Physiotherapy College',
    category: 'Physiotherapy',
    location: 'Nagpur, Maharashtra',
    affiliation: 'MUHS Nashik',
    intake: '50 Seats (NEET / State Quota)',
    courses: ['B. Physiotherapy (BPT)'],
    info: 'Leading rehabilitation sciences faculty training physical therapists for clinical practice.'
  }
];

function initUniversityDirectory() {
  const container = document.getElementById('college-directory-grid');
  const searchInput = document.getElementById('college-search-input');
  const filterBtns = document.querySelectorAll('.college-filter-btn');
  const emptyState = document.getElementById('college-empty-state');

  if (!container) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderColleges() {
    const filtered = SAMPLE_COLLEGES_DATA.filter(c => {
      const matchesCategory = (currentCategory === 'all') || (c.category.toLowerCase() === currentCategory.toLowerCase());
      const matchesSearch = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.courses.some(crs => crs.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    filtered.forEach(college => {
      const card = document.createElement('div');
      card.className = 'card-academic rounded-xl p-5 flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="badge-academic">${college.category} Course</span>
            <span class="text-[11px] font-semibold text-brown-700 bg-beige-200 px-2 py-0.5 rounded">
              ${college.intake}
            </span>
          </div>

          <h3 class="text-base font-bold text-brown-900 mb-1 leading-snug font-heading">
            ${college.name}
          </h3>

          <p class="text-xs text-brown-600 flex items-center gap-1 mb-3">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-gold-600"></i>
            <span>${college.location}</span>
          </p>

          <p class="text-xs text-surface-muted leading-relaxed mb-4">
            ${college.info}
          </p>

          <div class="pt-3 border-t border-surface-border text-xs space-y-1 mb-4">
            <div class="text-[11px] text-surface-muted">
              <strong>Affiliation:</strong> ${college.affiliation}
            </div>
            <div class="text-[11px] text-surface-muted">
              <strong>Key Courses:</strong> ${college.courses.join(', ')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center gap-2">
          <button type="button" data-open-modal="counselling" data-course-target="${college.category}" class="btn-counselling flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-brown-700 hover:bg-brown-900 transition-colors text-center shadow-sm">
            Enquire for Admission
          </button>
          <button type="button" onclick="openMedSarthiWhatsApp('917414974584', '${college.category.toLowerCase()}')" class="p-2 rounded-lg text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors" title="Chat about this college on WhatsApp">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    initIcons();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderColleges();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brown-900', 'text-white');
        b.classList.add('bg-white', 'text-brown-900');
      });
      btn.classList.add('bg-brown-900', 'text-white');
      btn.classList.remove('bg-white', 'text-brown-900');

      currentCategory = btn.getAttribute('data-filter-category') || 'all';
      renderColleges();
    });
  });

  renderColleges();
}

/**
 * Gallery Category Filtering (#10)
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-gallery-category');

      filterBtns.forEach(b => {
        b.classList.remove('bg-brown-900', 'text-white');
        b.classList.add('bg-white', 'text-brown-900');
      });
      btn.classList.add('bg-brown-900', 'text-white');
      btn.classList.remove('bg-white', 'text-brown-900');

      items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-item-category') === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Student Enquiry Management System (#16)
 * Stores leads in localStorage for client demonstration with export capability
 */
function saveEnquiry(leadData) {
  try {
    const list = JSON.parse(localStorage.getItem('medsarthi_leads_db') || '[]');
    const newEntry = {
      id: 'MS-' + Date.now().toString().slice(-6),
      name: leadData.name || 'Anonymous',
      phone: leadData.phone || '',
      neet: leadData.neet || 'N/A',
      course: leadData.course || 'Medical',
      location: leadData.location || 'Bhopal / Maharashtra',
      source: leadData.source || 'Website Form',
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New Lead'
    };
    list.unshift(newEntry);
    localStorage.setItem('medsarthi_leads_db', JSON.stringify(list));
    renderLeadsTable();
  } catch (err) {
    console.error('Storage error:', err);
  }
}

function initLeadManagementSystem() {
  const viewerModal = document.getElementById('admin-leads-modal');
  const openViewerBtns = document.querySelectorAll('[data-open-leads-viewer]');
  const closeViewerBtn = document.getElementById('close-leads-modal');
  const exportBtn = document.getElementById('export-leads-csv');
  const clearBtn = document.getElementById('clear-leads-data');

  if (!viewerModal) return;

  openViewerBtns.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      viewerModal.classList.add('active');
      renderLeadsTable();
    });
  });

  if (closeViewerBtn) {
    closeViewerBtn.addEventListener('click', () => viewerModal.classList.remove('active'));
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear local student enquiry demo records?')) {
        localStorage.removeItem('medsarthi_leads_db');
        renderLeadsTable();
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const list = JSON.parse(localStorage.getItem('medsarthi_leads_db') || '[]');
      if (list.length === 0) {
        alert('No enquiries recorded yet.');
        return;
      }
      let csv = 'ID,Name,Phone,NEET Score,Course,Date,Status\n';
      list.forEach(item => {
        csv += `"${item.id}","${item.name}","${item.phone}","${item.neet}","${item.course}","${item.date}","${item.status}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MedSarthi_Student_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    });
  }
}

function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  const countBadge = document.getElementById('leads-count-badge');
  if (!tbody) return;

  const list = JSON.parse(localStorage.getItem('medsarthi_leads_db') || '[]');
  if (countBadge) countBadge.textContent = `${list.length} Enquiries`;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-8 text-xs text-surface-muted">
          No enquiries logged yet. Fill out any form or popup on the website to see live lead capture here.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr class="border-b border-surface-border hover:bg-beige-50/50">
      <td class="p-3 text-xs font-bold text-brown-900">${item.name}</td>
      <td class="p-3 text-xs text-brown-700">${item.phone}</td>
      <td class="p-3 text-xs font-semibold text-gold-700">${item.neet}</td>
      <td class="p-3 text-xs text-surface-muted">${item.course}</td>
      <td class="p-3 text-[11px] text-surface-muted">${item.date}</td>
      <td class="p-3 text-xs">
        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
          ${item.status}
        </span>
      </td>
    </tr>
  `).join('');
}

/**
 * Generic Contact & Enquiry Form Handlers
 */
function initFormHandlers() {
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || 'Student';
      const phone = contactForm.querySelector('[name="phone"]')?.value || '';
      const email = contactForm.querySelector('[name="email"]')?.value || '';
      const course = contactForm.querySelector('[name="course"]')?.value || 'Medical Course';
      const message = contactForm.querySelector('[name="message"]')?.value || '';

      saveEnquiry({
        name,
        phone,
        course,
        location: email,
        source: 'Contact Page Direct Message'
      });

      showToast(`Thank you, ${name}! Your message has been sent to Dr. Prasad Wani & MedSarthi team.`, 'success');
      contactForm.reset();
    });
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-box');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-box';
    container.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-[#38291F] text-white border-l-4 border-[#B79562]' :
             type === 'warning' ? 'bg-amber-900 text-white border-l-4 border-amber-400' :
             'bg-[#4D3627] text-white border-l-4 border-[#D9C3A5]';

  toast.className = `${bg} rounded-lg p-3.5 shadow-md pointer-events-auto transition-all duration-200 transform translate-y-[-8px] opacity-0 text-xs flex items-start justify-between gap-3 border border-beige-300`;
  toast.innerHTML = `
    <div class="flex items-start gap-2.5">
      <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5"></i>
      <div>
        <p class="font-bold text-beige-300">MedSarthi Notification</p>
        <p class="text-white mt-0.5 leading-relaxed">${message}</p>
      </div>
    </div>
    <button class="text-beige-300 hover:text-white" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-3.5 h-3.5"></i>
    </button>
  `;

  container.appendChild(toast);
  initIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-[-8px]', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-8px]');
    setTimeout(() => toast.remove(), 250);
  }, 4500);
}
