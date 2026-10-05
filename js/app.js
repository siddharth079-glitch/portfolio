/**
 * Siddharth Neelakantam - Portfolio Interactive Engine
 * Handling dynamic renders, case study modal, video playback, and responsive interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeroRotatingTitle();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderAchievements();
  initProjectFiltering();
  initCaseStudyModal();
  initScrollSpyAndNav();
  initContactInteractions();
  initBackToTop();
  renderCertifications();
  initCertificateModal();
  handleUrlHashRouting();
});

/* --------------------------------------------------------------------------
   1. HERO ROTATING TITLE
   -------------------------------------------------------------------------- */
function initHeroRotatingTitle() {
  const rotatingElement = document.getElementById('heroRotatingText');
  if (!rotatingElement || !PORTFOLIO_DATA.profile.rotatingTitles.length) return;

  const titles = PORTFOLIO_DATA.profile.rotatingTitles;
  let currentIndex = 0;

  setInterval(() => {
    rotatingElement.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      rotatingElement.textContent = titles[currentIndex];
      rotatingElement.style.opacity = '1';
    }, 280);
  }, 2600);
}

/* --------------------------------------------------------------------------
   2. RENDER SKILLS
   -------------------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
    <div class="skill-category-card">
      <div class="skill-category-header">
        <div class="skill-category-icon">
          ${getCategoryIconSvg(cat.icon)}
        </div>
        <h4 class="skill-category-title">${cat.category}</h4>
      </div>
      <p class="skill-category-desc">${cat.description}</p>
      <div class="skill-chips-list">
        ${cat.items.map(item => `
          <div class="skill-chip ${item.highlight ? 'highlight' : ''}">
            <span class="skill-chip-name">${item.name}</span>
            <span class="skill-chip-note">${item.note}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. RENDER PROJECTS (Cards with Looping Video Previews)
   -------------------------------------------------------------------------- */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const filteredProjects = filter === 'all' 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => {
        if (filter === 'ai') return p.category.toLowerCase().includes('ai') || p.category.toLowerCase().includes('llm');
        if (filter === 'backend') return p.techStack.includes('FastAPI') || p.techStack.includes('PostgreSQL');
        if (filter === 'web') return p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('productivity');
        return true;
      });

  container.innerHTML = filteredProjects.map(p => `
    <article class="project-card" data-slug="${p.slug}" id="card-${p.slug}">
      <div class="project-media-wrapper">
        <div class="project-badge-top ${p.featured ? 'highlight' : ''}">
          ${p.badge}
        </div>
        <video 
          class="project-preview-video" 
          src="${p.previewVideo}" 
          poster="${p.poster}" 
          muted 
          loop 
          playsinline 
          preload="metadata"
          aria-label="${p.title} video preview">
        </video>
        <div class="project-media-overlay"></div>
      </div>
      
      <div class="project-card-body">
        <div class="project-card-header">
          <div class="project-role-badge">${p.role}</div>
          <h3 class="project-card-title">${p.title}</h3>
        </div>
        
        <p class="project-card-summary">${p.summary}</p>
        
        <div class="project-tech-tags">
          ${p.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <div class="project-card-footer">
          <button class="btn-case-study" onclick="openCaseStudy('${p.slug}')" aria-label="Explore case study for ${p.title}">
            <span>Explore Case Study</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Setup video hover play behaviors
  setupProjectVideoHover();
}

function setupProjectVideoHover() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    // Touch device support: play when in viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.6 });
      observer.observe(card);
    }
  });
}

/* --------------------------------------------------------------------------
   4. PROJECT FILTERING
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/* --------------------------------------------------------------------------
   5. TIMELINE (Education & Experience)
   -------------------------------------------------------------------------- */
function renderTimeline() {
  const expContainer = document.getElementById('experienceTimeline');
  if (expContainer) {
    expContainer.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <h4 class="timeline-role">${exp.role}</h4>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <div class="timeline-org">${exp.organization} • ${exp.location}</div>
          <ul class="timeline-bullets">
            ${exp.bullets.map(b => `<li class="timeline-bullet-item">${b}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  const eduContainer = document.getElementById('educationTimeline');
  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <h4 class="timeline-role">${edu.degree}</h4>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <div class="timeline-org">${edu.institution}</div>
          ${edu.status ? `<span class="timeline-metric">${edu.status}</span>` : ''}
          <p class="timeline-details">${edu.details}</p>
        </div>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   6. ACHIEVEMENTS
   -------------------------------------------------------------------------- */
function renderAchievements() {
  const achContainer = document.getElementById('achievementsGrid');
  if (achContainer) {
    achContainer.innerHTML = PORTFOLIO_DATA.achievements.map(ach => `
      <div class="achievement-card">
        <div class="achievement-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">${ach.title}</h4>
          <div class="achievement-issuer">${ach.issuer} • ${ach.date}</div>
          <p class="achievement-summary">${ach.summary}</p>
        </div>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   6B. RENDER CERTIFICATIONS (Data-Driven Dynamic Architecture)
   -------------------------------------------------------------------------- */
function renderCertifications() {
  const container = document.getElementById('certificationsGrid');
  if (!container || !PORTFOLIO_DATA.certifications) return;

  container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => {
    const hasImage = Boolean(cert.image);
    
    return `
      <article class="certificate-card" id="cert-card-${cert.id}" data-id="${cert.id}">
        <div class="cert-card-preview ${!hasImage ? 'cert-card-preview-placeholder' : ''}" onclick="openCertificateModal('${cert.id}')" role="button" tabindex="0" aria-label="View ${cert.title}">
          ${hasImage ? `
            <img src="${cert.image}" alt="${cert.title} preview" class="cert-card-img" loading="lazy">
            <div class="cert-card-lens-overlay">
              <span class="cert-inspect-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>Click to View Full Size</span>
              </span>
            </div>
          ` : `
            <div class="cert-placeholder-visual">
              <div class="cert-placeholder-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <span class="cert-placeholder-label">Official Credential</span>
              <span class="cert-inspect-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Verified Completion</span>
              </span>
            </div>
          `}
        </div>

        <div class="cert-card-body">
          <div class="cert-card-header">
            <div class="cert-header-meta">
              ${cert.type ? `<span class="cert-status-pill">${cert.type}</span>` : (cert.status ? `<span class="cert-status-pill">${cert.status}</span>` : '')}
              ${cert.date ? `<span class="cert-date-text">${cert.date}</span>` : ''}
            </div>
            <h4 class="cert-card-title">${cert.title}</h4>
            ${cert.organization ? `<div class="cert-card-org">${cert.organization}</div>` : ''}
            ${cert.location ? `<div class="cert-card-loc"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>${cert.location}</span></div>` : ''}
          </div>

          <p class="cert-card-desc">${cert.description}</p>

          <div class="cert-card-actions">
            <button type="button" class="btn-cert-view" onclick="openCertificateModal('${cert.id}')" aria-label="View ${cert.title}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View Certificate</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   6C. CERTIFICATE LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initCertificateModal() {
  const modal = document.getElementById('certificateModal');
  const closeBtn = document.getElementById('certModalCloseBtn');
  const backdrop = document.getElementById('certModalBackdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeCertificateModal);
  if (backdrop) backdrop.addEventListener('click', closeCertificateModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeCertificateModal();
    }
  });
}

function openCertificateModal(certId) {
  const cert = PORTFOLIO_DATA.certifications.find(c => c.id === certId);
  if (!cert) return;

  const modal = document.getElementById('certificateModal');
  const content = document.getElementById('certModalDynamicContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="cert-modal-header">
      <div class="cert-header-meta">
        ${cert.type ? `<span class="cert-status-pill">${cert.type}</span>` : (cert.status ? `<span class="cert-status-pill">${cert.status}</span>` : '')}
        ${cert.date ? `<span class="cert-date-text">${cert.date}</span>` : ''}
      </div>
      <h3 id="certModalTitle" class="cert-modal-title">${cert.title}</h3>
      ${cert.organization ? `<p class="cert-modal-org">${cert.organization}</p>` : ''}
      ${cert.location ? `<p class="cert-modal-loc">📍 ${cert.location}</p>` : ''}
    </div>

    <div class="cert-modal-viewport">
      ${cert.image ? `
        <img src="${cert.image}" alt="${cert.title}" class="cert-modal-full-img">
      ` : `
        <div class="cert-modal-notice-card">
          <div class="cert-placeholder-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
          <h4>${cert.title}</h4>
          <p class="cert-modal-verified-text">
            Official Coursework Completion Verified on Candidate Resume.
          </p>
        </div>
      `}
    </div>

    <div class="cert-modal-footer">
      <p class="cert-modal-desc">${cert.description}</p>
      ${cert.certificateUrl ? `
        <a href="${cert.certificateUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-left: auto;">
          <span>Open Full Resolution Document</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      ` : ''}
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

/* --------------------------------------------------------------------------
   7. CASE STUDY MODAL ENGINE
   -------------------------------------------------------------------------- */
let activeProjectSlug = null;

function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudy);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeCaseStudy);
  }

  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeCaseStudy();
    }
  });
}

function openCaseStudy(slug) {
  const project = PORTFOLIO_DATA.projects.find(p => p.slug === slug);
  if (!project) return;

  activeProjectSlug = slug;
  const modal = document.getElementById('caseStudyModal');
  const container = document.getElementById('caseStudyDynamicContent');
  if (!modal || !container) return;

  // Find next and previous projects for navigation
  const currentIndex = PORTFOLIO_DATA.projects.findIndex(p => p.slug === slug);
  const prevProject = PORTFOLIO_DATA.projects[(currentIndex - 1 + PORTFOLIO_DATA.projects.length) % PORTFOLIO_DATA.projects.length];
  const nextProject = PORTFOLIO_DATA.projects[(currentIndex + 1) % PORTFOLIO_DATA.projects.length];

  const cs = project.caseStudy;

  container.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-badge-row">
        <span class="project-badge-top highlight">${project.badge}</span>
        <span class="tech-tag">${project.category}</span>
      </div>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-subtitle">${cs.tagline}</p>
      
      <div class="modal-meta-strip">
        <div class="modal-meta-block">
          <span class="modal-meta-label">My Role</span>
          <span class="modal-meta-value">${project.role}</span>
        </div>
        <div class="modal-meta-block">
          <span class="modal-meta-label">Timeline</span>
          <span class="modal-meta-value">${project.timeline}</span>
        </div>
        <div class="modal-meta-block">
          <span class="modal-meta-label">Key Stack</span>
          <span class="modal-meta-value">${project.techStack.slice(0, 3).join(', ')}</span>
        </div>
      </div>
    </div>

    <!-- Video Showcase Frame -->
    <div class="modal-video-frame">
      <video src="${project.previewVideo}" poster="${project.poster}" autoplay loop muted playsinline></video>
    </div>

    <!-- 01. The Problem -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        The Problem
      </h4>
      <p>${cs.problem}</p>
    </section>

    <!-- 02. Project Objectives & Goals -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Objectives & Goals
      </h4>
      <ul class="timeline-bullets">
        ${cs.goals.map(g => `<li class="timeline-bullet-item">${g}</li>`).join('')}
      </ul>
    </section>

    <!-- 03. Architecture & Technical Design -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        Architecture & Data Flow
      </h4>
      <div class="architecture-diagram-card">
┌─────────────────────────────────────────────────────────────┐
│ Client UI: ${cs.architecture.client}
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ API Backend: ${cs.architecture.api}
└──────────────────────────────┬──────────────────────────────┘
              ┌────────────────┴────────────────┐
              ▼                                 ▼
┌───────────────────────────┐     ┌───────────────────────────┐
│ Storage:                  │     │ Processing:               │
│ ${cs.architecture.database || cs.architecture.storage}
└───────────────────────────┘     └───────────────────────────┘
      </div>
    </section>

    <!-- 04. Key Features -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Key Features
      </h4>
      <div class="study-grid-features">
        ${cs.features.map(f => `
          <div class="feature-box">
            <h5>${f.title}</h5>
            <p>${f.description}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 05. My Role & Personal Contributions -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        My Role & Personal Contributions
      </h4>
      <ul class="timeline-bullets">
        ${cs.myRole.map(r => `<li class="timeline-bullet-item">${r}</li>`).join('')}
      </ul>
    </section>

    <!-- 06. Challenges & Solutions -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        Challenges & Engineering Solutions
      </h4>
      ${cs.challenges.map(c => `
        <div class="feature-box" style="margin-bottom: 0.85rem;">
          <h5 style="color: var(--color-orange);">Challenge: ${c.challenge}</h5>
          <p><strong>Resolution:</strong> ${c.resolution}</p>
        </div>
      `).join('')}
    </section>

    <!-- 07. Key Outcomes -->
    <section class="study-section">
      <h4 class="study-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Outcomes & Key Learnings
      </h4>
      <ul class="timeline-bullets">
        ${cs.outcomes.map(o => `<li class="timeline-bullet-item">${o}</li>`).join('')}
      </ul>
    </section>

    <!-- Modal Footer Controls -->
    <div class="modal-footer-nav">
      <button class="btn-secondary" onclick="openCaseStudy('${prevProject.slug}')">
        ← Previous: ${prevProject.title}
      </button>
      <button class="btn-primary" onclick="openCaseStudy('${nextProject.slug}')">
        Next: ${nextProject.title} →
      </button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', `#project-${slug}`);
}

function closeCaseStudy() {
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.remove('open');
  }
  document.body.style.overflow = '';
  history.replaceState(null, '', window.location.pathname);
}

function handleUrlHashRouting() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#project-')) {
    const slug = hash.replace('#project-', '');
    setTimeout(() => {
      openCaseStudy(slug);
    }, 200);
  }
}

/* --------------------------------------------------------------------------
   8. SCROLL SPY & NAVIGATION
   -------------------------------------------------------------------------- */
function initScrollSpyAndNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navLinksMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. CONTACT & CLIPBOARD TOAST
   -------------------------------------------------------------------------- */
function initContactInteractions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(PORTFOLIO_DATA.profile.email);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.phone).then(() => {
        showToast('Phone number copied to clipboard: ' + PORTFOLIO_DATA.profile.phone);
      }).catch(() => {
        showToast(PORTFOLIO_DATA.profile.phone);
      });
    });
  }

  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   HELPERS & SVGS
   -------------------------------------------------------------------------- */
function getCategoryIconSvg(icon) {
  const icons = {
    code: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    server: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    database: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
    sparkles: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>',
    layout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
    tool: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>'
  };
  return icons[icon] || icons.code;
}


