/* ==========================================
   IEEE EMBS VCE - GLOBAL SHARED JAVASCRIPT
   Preloader, Dark Mode, Search, Navbar, Animations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Progress & Hide
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.preloader-progress');
    
    if (preloader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            if (progressBar) progressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => preloader.style.display = 'none', 500);
                }, 200);
            }
        }, 100);
    }

    // 2. Dark Mode Management
    const themeBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('ieee_theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ieee_theme', newTheme);
            themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });
    }

    // 3. Navbar Scroll Shrink & Shadow
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Scroll Observer for Animations (.animate-fade-up)
    const fadeElements = document.querySelectorAll('.animate-fade-up');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        fadeElements.forEach(el => observer.observe(el));
    }

    // 5. Site-Wide Search Modal
    const searchBtn = document.getElementById('searchToggleBtn');
    let searchModal = document.getElementById('siteSearchModal');
    
    if (!searchModal) {
        const searchHTML = `
            <div class="search-modal" id="siteSearchModal">
                <div class="search-modal-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <h3 style="font-size:1.1rem;"><i class="fas fa-search" style="color:var(--accent); margin-right:8px;"></i> Search IEEE EMBS</h3>
                        <button onclick="document.getElementById('siteSearchModal').classList.remove('open')" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
                    </div>
                    <div class="search-input-wrap">
                        <i class="fas fa-search" style="color:var(--text-muted);"></i>
                        <input type="text" id="siteSearchInput" placeholder="Search events, team, resources, gallery..." oninput="handleSiteSearch(this.value)">
                    </div>
                    <div class="search-results-list" id="searchResultsContainer">
                        <p style="text-align:center; color:var(--text-muted); padding:20px;">Type above to search across website...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', searchHTML);
        searchModal = document.getElementById('siteSearchModal');
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('open');
            const input = document.getElementById('siteSearchInput');
            if (input) input.focus();
        });
    }

    // 6. Global Register Link Click Handler (Ensures Register links work everywhere!)
    document.body.addEventListener('click', (e) => {
        const regBtn = e.target.closest('.register-trigger-btn, .btn-register, [href*="register"]');
        if (regBtn) {
            const googleFormUrl = regBtn.getAttribute('data-google-form') || regBtn.getAttribute('href');
            if (googleFormUrl && googleFormUrl.startsWith('http')) {
                e.preventDefault();
                window.open(googleFormUrl, '_blank');
            }
        }
    });
});

// Site Search Index Data & Handler
const siteSearchData = [
    { title: 'Expert Talk on Digital Health & Telemedicine', type: 'Event', link: 'events/digital-health-talk/' },
    { title: 'Biomedical Signal Processing Workshop', type: 'Event', link: 'events.html' },
    { title: 'Vuggidi Sai Varshith (Secretary)', type: 'Team', link: 'team.html' },
    { title: 'Maruthi Sai Teja (Chairperson)', type: 'Team', link: 'team.html' },
    { title: 'Pollishetty Swetha (Faculty Co-ordinator)', type: 'Team', link: 'team.html' },
    { title: 'IEEE Xplore Digital Library', type: 'Resource', link: 'resources.html' },
    { title: 'EMBS Student Paper Contests & Grants', type: 'Resource', link: 'resources.html' },
    { title: 'Certificate Verification Portal', type: 'Tool', link: 'verify.html' },
    { title: 'Chapter Awards & Recognized Accomplishments', type: 'Achievement', link: 'achievements.html' },
    { title: 'Event Photo Gallery & Memories', type: 'Gallery', link: 'gallery.html' }
];

function handleSiteSearch(query) {
    const container = document.getElementById('searchResultsContainer');
    if (!container) return;
    const q = query.toLowerCase().trim();
    if (!q) {
        container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">Type above to search across website...</p>';
        return;
    }
    
    const results = siteSearchData.filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
    if (results.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">No results found for "${query}"</p>`;
        return;
    }
    
    container.innerHTML = results.map(item => `
        <a href="${item.link}" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:var(--bg); border-radius:8px; border:1px solid var(--border);">
            <span style="font-weight:600; color:var(--text-main);">${item.title}</span>
            <span class="status-pill status-live">${item.type}</span>
        </a>
    `).join('');
}
