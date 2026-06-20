/**
 * SENCARE — Staff Portal  |  script.js
 *
 * Handles:
 *   1. Login → Dashboard transition
 *   2. Sidebar collapse / expand (hamburger)
 *   3. Tab navigation with smooth scroll reset
 *
 * NOTE: Data in this file uses static mock values.
 * In production, replace the mock data blocks marked
 * [TODO: API] with real fetch() calls to your backend endpoints.
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ── DOM references ── */
    const loginForm        = document.getElementById('login-form');
    const loginScreen      = document.getElementById('login-screen');
    const dashboardScreen  = document.getElementById('dashboard-screen');
    const sidebarPanel     = document.getElementById('sidebar-panel');
    const hamburgerTrigger = document.getElementById('hamburger-trigger');
    const navItems         = document.querySelectorAll('.nav-item');
    const tabContents      = document.querySelectorAll('.tab-content');
    const contentScroll    = document.querySelector('.content-scroll');

    /* ──────────────────────────────────────────────────────────
       1. LOGIN → DASHBOARD
       [TODO: API] Replace this block with a real POST to
       /api/auth/login, validate the JWT/session token returned,
       then reveal the dashboard only on 200 OK.
    ────────────────────────────────────────────────────────── */
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            /* [TODO: API]
            const id       = document.getElementById('osca-id').value;
            const password = document.getElementById('password').value;

            fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ osca_id: id, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('sencare_token', data.token);
                    showDashboard();
                } else {
                    showLoginError(data.message);
                }
            })
            .catch(err => console.error('Login error:', err));
            */

            // ── Static mock: remove when API is wired up ──
            showDashboard();
        });
    }

    function showDashboard() {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        document.body.style.display   = 'block';
        document.body.style.minHeight = '100vh';
        document.body.style.overflow  = 'hidden';

        /* [TODO: API] After login, load dashboard data:
        loadMetrics();
        loadRecentRequests();
        loadHomeVisits();
        */
    }

    /* ──────────────────────────────────────────────────────────
       2. SIDEBAR COLLAPSE / EXPAND
    ────────────────────────────────────────────────────────── */
    if (hamburgerTrigger && sidebarPanel) {
        hamburgerTrigger.addEventListener('click', function () {
            const isCollapsed = sidebarPanel.classList.toggle('collapsed');
            hamburgerTrigger.setAttribute('aria-expanded', String(!isCollapsed));
        });
    }

    /* ──────────────────────────────────────────────────────────
       3. TAB NAVIGATION
       [TODO: API] Each tab switch is a good place to lazy-load
       section data. See the per-section comments below.
    ────────────────────────────────────────────────────────── */
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Swap visible tab panel
            const targetId      = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            tabContents.forEach(content => {
                content.classList.add('hidden');
                content.style.animation = 'none';
            });

            if (targetContent) {
                targetContent.classList.remove('hidden');
                void targetContent.offsetWidth; // force reflow → re-triggers CSS animation
                targetContent.style.animation = '';
            }

            // Scroll content pane back to top
            if (contentScroll) {
                contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // [TODO: API] Lazy-load section data on first visit
            loadSectionData(targetId);
        });
    });

    /* ──────────────────────────────────────────────────────────
       SECTION DATA LOADERS
       Each function below is a stub. Replace the comment blocks
       with real fetch() calls to your REST / GraphQL backend.
    ────────────────────────────────────────────────────────── */

    const loadedSections = new Set(); // track what's already been fetched

    function loadSectionData(sectionId) {
        if (loadedSections.has(sectionId)) return; // already loaded
        loadedSections.add(sectionId);

        switch (sectionId) {

            case 'dashboard-content':
                /* [TODO: API]
                loadMetrics();
                loadRecentRequests();
                loadHomeVisits();
                */
                break;

            case 'request-content':
                /* [TODO: API]
                fetch('/api/requests?status=pending', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderRequestQueue(data.requests));
                */
                break;

            case 'senior-content':
                /* [TODO: API]
                fetch('/api/seniors?page=1&limit=20', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderSeniorDirectory(data.seniors));
                */
                break;

            case 'priority-content':
                /* [TODO: API]
                fetch('/api/priority-cases', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderPriorityCases(data.cases));
                */
                break;

            case 'home-content':
                /* [TODO: API]
                fetch('/api/home-visits?date=today', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderVisitSchedule(data.visits));
                */
                break;

            case 'updates-content':
                /* [TODO: API]
                fetch('/api/notifications?unread=true', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderNotifications(data.notifications));
                */
                break;

            case 'photo-content':
                /* [TODO: API]
                fetch('/api/photo-verifications?status=pending', {
                    headers: authHeaders()
                })
                .then(r => r.json())
                .then(data => renderPhotoQueue(data.photos));
                */
                break;
                
        }
    }

    /* ──────────────────────────────────────────────────────────
       HELPER: attach auth token to every request
       [TODO: API] Swap sessionStorage key for whatever your
       auth middleware expects (e.g. Authorization: Bearer …)
    ────────────────────────────────────────────────────────── */
    function authHeaders() {
        const token = sessionStorage.getItem('sencare_token') || '';
        return {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    /* ──────────────────────────────────────────────────────────
       DASHBOARD DATA LOADERS (stubs)
       [TODO: API] Wire these to real endpoints.
    ────────────────────────────────────────────────────────── */

    // function loadMetrics() {
    //     fetch('/api/dashboard/metrics', { headers: authHeaders() })
    //         .then(r => r.json())
    //         .then(data => {
    //             document.querySelector('#active-requests .count').textContent = data.activeRequests;
    //             document.querySelector('#registered-seniors .count').textContent = data.registeredSeniors.toLocaleString();
    //             document.querySelector('#priority-cases .count').textContent = data.priorityCases;
    //             document.querySelector('#home-visits .count').textContent = data.homeVisitsToday;
    //         });
    // }

    // function loadRecentRequests() {
    //     fetch('/api/requests?limit=4&sort=recent', { headers: authHeaders() })
    //         .then(r => r.json())
    //         .then(data => renderList('recent-requests-list', data.requests));
    // }

    // function loadHomeVisits() {
    //     fetch('/api/home-visits?date=today', { headers: authHeaders() })
    //         .then(r => r.json())
    //         .then(data => renderList('home-visits-list', data.visits));
    // }

});
