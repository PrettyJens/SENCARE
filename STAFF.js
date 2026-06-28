/**
 * SENCARE — Staff Portal  |  script.js
 * [TODO: API] markers show where to wire real backend calls.
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ── DOM REFS ── */
    const loginForm        = document.getElementById('login-form');
    const loginScreen      = document.getElementById('login-screen');
    const dashboardScreen  = document.getElementById('dashboard-screen');
    const sidebarPanel     = document.getElementById('sidebar-panel');
    const hamburgerTrigger = document.getElementById('hamburger-trigger');
    const navItems         = document.querySelectorAll('.nav-item');
    const tabContents      = document.querySelectorAll('.tab-content');
    const contentScroll    = document.querySelector('.content-scroll');
    const profileTrigger   = document.getElementById('profile-trigger');
    const profileEditBtn   = document.getElementById('profile-edit-btn');
    const profileViewMode  = document.getElementById('profile-view-mode');
    const profileEditMode  = document.getElementById('profile-edit-mode');
    const editCancelBtn    = document.getElementById('edit-cancel-btn');
    const editSaveBtn      = document.getElementById('edit-save-btn');
    const logoutBtn        = document.getElementById('logout-btn');
    const changePasswordBtn     = document.getElementById('change-password-btn');
    const changePasswordBtnEdit = document.getElementById('change-password-btn-edit');
    const passwordModal         = document.getElementById('password-modal');
    const modalClose            = document.getElementById('modal-close');
    const modalCancel           = document.getElementById('modal-cancel');
    const modalSubmit           = document.getElementById('modal-submit');
    const pwModalError          = document.getElementById('pw-modal-error');
    const logoutModal   = document.getElementById('logout-modal');
    const logoutCancel  = document.getElementById('logout-cancel');
    const logoutConfirm = document.getElementById('logout-confirm');
    const saveToast     = document.getElementById('save-toast');
    const saveToastText = document.getElementById('save-toast-text');

    /* ════════════════════════════════════════════
       MOCK DATA
       [TODO: API] Replace each dataset with a real
       GET endpoint after login.
    ════════════════════════════════════════════ */

    const MOCK_STAFF = {
        fullName:'Juana dela Cruz', firstName:'Juana', initials:'JC',
        dob:'1988-03-14', dobDisplay:'March 14, 1988',
        gender:'Female', civilStatus:'Single', nationality:'Filipino',
        address:'Blk 4 Lot 12, Sampaguita St., Brgy. San Isidro, Calabarzon',
        mobile:'+63 917 234 5678', email:'j.cruz@osca.gov.ph',
        officePhone:'(049) 502-3344', emergencyName:'Maria Cruz',
        emergencyPhone:'+63 918 876 5432',
        employeeId:'EMP-2019-0042', position:'Field Officer I',
        division:'Field Services Division', dateHired:'June 3, 2019',
        empType:'Regular / Permanent', supervisor:'Engr. Ramon Dela Rosa',
        barangays:'Brgy. San Isidro, Brgy. Maligaya, Brgy. Bagong Pook',
        oscaId:'OSCA-2026-00482', role:'Staff',
        accessLevel:'Field Operations', lastLogin:'Today, 8:12 AM', status:'Active'
    };

    /* [TODO: API] GET /api/requests */
    const MOCK_REQUESTS = [
        {id:'REQ-2026-044',type:'Equipment',status:'Approved', item:'Wheelchair',  date:'April 8, 2026', senior:'Juan Dela Cruz',   priority:'High'},
        {id:'REQ-2026-045',type:'Equipment',status:'Pending',  item:'Walker',      date:'April 8, 2026', senior:'Maria Santos',     priority:'Medium'},
        {id:'REQ-2026-041',type:'Equipment',status:'Rejected', item:'Cane',        date:'April 8, 2026', senior:'Ana Lopez',        priority:'Low'},
        {id:'REQ-2026-042',type:'Equipment',status:'Pending',  item:'Cane',        date:'April 6, 2026', senior:'Jose Perez',       priority:'Low'},
        {id:'REQ-2026-043',type:'Equipment',status:'Pending',  item:'Hearing Aid', date:'April 6, 2026', senior:'Pedro Reyes',      priority:'Low'},
        {id:'REQ-2026-046',type:'Equipment',status:'Pending',  item:'Walker',      date:'April 6, 2026', senior:'Carlos Ramos',     priority:'Medium'},
        {id:'REQ-2026-049',type:'Equipment',status:'Approved', item:'Wheelchair',  date:'April 8, 2026', senior:'Peter Dela Cruz',  priority:'High'},
        {id:'REQ-2026-047',type:'Equipment',status:'Approved', item:'Wheelchair',  date:'April 8, 2026', senior:'Juan Arinola',     priority:'High'},
        {id:'REQ-2026-048',type:'Equipment',status:'Pending',  item:'Walker',      date:'April 7, 2026', senior:'Maria Jose',       priority:'Medium'},
        {id:'REQ-2026-050',type:'Equipment',status:'Pending',  item:'Walker',      date:'April 7, 2026', senior:'Josefa Santos',    priority:'Medium'},
    ];

    /* [TODO: API] GET /api/seniors */
    const MOCK_SENIORS = [
        {initials:'MA', name:'Aquino, Manuel',   id:'SC-2024-001', age:77, sex:'Male',   barangay:'Manahita',         civil:'Widowed',   living:'With Family',   health:'Hypertension',           mobility:'Limited Mobility',      priority:'Low',    vulnScore:5,  vulnMax:12, status:'Active'},
        {initials:'EA', name:'Aquino, Ramon',    id:'SC-2024-002', age:81, sex:'Male',   barangay:'Manahita',         civil:'Widowed',   living:'Lives Alone',   health:'Dementia, Hypertension', mobility:'Uses Aid (Cane/Walker)', priority:'High',   vulnScore:11, vulnMax:12, status:'Active'},
        {initials:'LB', name:'Bautista, Luz',    id:'SC-2024-003', age:70, sex:'Female', barangay:'San Rafael',       civil:'Separated', living:'With Family',   health:'Osteoporosis',           mobility:'Limited Mobility',      priority:'Low',    vulnScore:4,  vulnMax:12, status:'Active'},
        {initials:'MB', name:'Bautista, Marie',  id:'SC-2024-004', age:62, sex:'Female', barangay:'Sta. Cruz',        civil:'Single',    living:'Care Facility', health:'Arthritis, Diabetes',    mobility:'Fully Independent',     priority:'Low',    vulnScore:3,  vulnMax:12, status:'Inactive'},
        {initials:'MB', name:'Bautista, Miguel', id:'SC-2024-005', age:60, sex:'Male',   barangay:'San Rafael',       civil:'Widowed',   living:'With Spouse',   health:'Diabetes',               mobility:'Limited Mobility',      priority:'Low',    vulnScore:3,  vulnMax:12, status:'Active'},
        {initials:'FC', name:'Castro, Fernando', id:'SC-2024-006', age:86, sex:'Male',   barangay:'San Rafael',       civil:'Married',   living:'Lives Alone',   health:'Arthritis, Diabetes',    mobility:'Limited Mobility',      priority:'Medium', vulnScore:8,  vulnMax:12, status:'Active'},
        {initials:'LC', name:'Castro, Luz',      id:'SC-2024-007', age:71, sex:'Female', barangay:'Nalatao',          civil:'Single',    living:'With Family',   health:'Hypertension',           mobility:'Fully Independent',     priority:'Low',    vulnScore:3,  vulnMax:12, status:'Active'},
        {initials:'MC', name:'Cruz, Maria',      id:'SC-2024-008', age:88, sex:'Female', barangay:'Manahita',         civil:'Married',   living:'With Family',   health:'Stroke, Hypertension',   mobility:'Fully Independent',     priority:'Medium', vulnScore:7,  vulnMax:12, status:'Active'},
        {initials:'RC', name:'Cruz, Ricardo',    id:'SC-2024-009', age:80, sex:'Male',   barangay:'Banderos',         civil:'Widowed',   living:'With Spouse',   health:'Hypertension',           mobility:'Fully Independent',     priority:'Low',    vulnScore:4,  vulnMax:12, status:'Active'},
        {initials:'RC', name:'Cruz, Ricardo',    id:'SC-2024-010', age:60, sex:'Male',   barangay:'Sto. Tomas Proper',civil:'Widowed',   living:'With Spouse',   health:'Arthritis, Diabetes',    mobility:'Fully Independent',     priority:'Low',    vulnScore:3,  vulnMax:12, status:'Inactive'},
    ];

    /* [TODO: API] GET /api/priority-cases */
    const MOCK_PRIORITY = [
        {
            id:'SC-2024-001', name:'Rosario M. Dela Cruz', barangay:'Sto. Tomas Proper', age:84,
            lastVisit:'May 15, 2026', priorityLabel:'High priority', score:12, maxScore:12,
            age_score:3, age_max:3, age_detail:'84 years old\n80 and above — highest age risk tier',
            health_score:3, health_max:3, health_detail:'Multiple chronic conditions\nHypertension, diabetes, and heart disease requiring daily medication',
            mobility_score:3, mobility_max:3, mobility_detail:'Bedridden / wheelchair-bound\nCannot ambulate independently; fully dependent on caregiver',
            living_score:3, living_max:3, living_detail:'Lives alone, low income\nNo caregiver present; relies on OSCA for daily essentials',
            rationale:'Rosario scores the maximum vulnerability rating across all four criteria. Her advanced age, severe multi-morbidity, complete mobility dependency, and isolation without a caregiver place her in the most critical risk tier. Immediate home visit and caregiver coordination are recommended.',
            actions:['Urgent home visit','Caregiver referral','Medical priority release']
        },
        {
            id:'SC-2024-015', name:'Lourdes A. Reyes', barangay:'Sta. Cruz', age:73,
            lastVisit:'April 28, 2026', priorityLabel:'Medium priority', score:9, maxScore:12,
            age_score:2, age_max:3, age_detail:'73 years old\nMid-senior age range',
            health_score:2, health_max:3, health_detail:'Hypertension, mild arthritis',
            mobility_score:2, mobility_max:3, mobility_detail:'Walks with assistance',
            living_score:3, living_max:3, living_detail:'Lives alone\nLimited family support',
            rationale:'Lourdes presents moderate vulnerability. Living alone with limited support and mobility challenges require monitoring and periodic follow-up.',
            actions:['Schedule home visit','Wellness check']
        },
        {
            id:'SC-2024-031', name:'Natividad C. Bautista', barangay:'San Pedro', age:65,
            lastVisit:'April 19, 2026', priorityLabel:'Low priority', score:6, maxScore:12,
            age_score:1, age_max:3, age_detail:'65 years old\nYounger senior range',
            health_score:2, health_max:3, health_detail:'Mild hypertension',
            mobility_score:1, mobility_max:3, mobility_detail:'Fully independent',
            living_score:2, living_max:3, living_detail:'Lives with family',
            rationale:'Natividad is stable with minimal risk factors. Routine monitoring is sufficient.',
            actions:['Routine check-in']
        },
    ];

    /* [TODO: API] GET /api/home-visits */
    const MOCK_HV = [
        {id:'HV-2028-060',name:'Juan Dela Cruz', addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'High',   status:'Scheduled'},
        {id:'HV-2028-061',name:'Merle Santos',   addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Medium', status:'Scheduled'},
        {id:'HV-2028-062',name:'Ana Lopez',      addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Low',    status:'Scheduled'},
        {id:'HV-2028-063',name:'Jesse Penny',    addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Low',    status:'Scheduled'},
        {id:'HV-2028-064',name:'Pedro Reyes',    addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Medium', status:'Scheduled'},
        {id:'HV-2028-065',name:'Carlos Ramos',   addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'High',   status:'Scheduled'},
        {id:'HV-2028-067',name:'Peter Dela Cruz',addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'High',   status:'Scheduled'},
        {id:'HV-2028-067',name:'Juan Arinole',   addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'High',   status:'Scheduled'},
        {id:'HV-2028-068',name:'Maria Jose',     addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Medium', status:'Scheduled'},
        {id:'HV-2028-069',name:'Josefa Santos',  addr:'123 Main St. Brgy. San Jose', dt:'April 8, 2026\n10:00 AM', staff:'Ms. Rosa Martinez', purpose:'Welfare Check', priority:'Medium', status:'Scheduled'},
    ];

    /* [TODO: API] GET /api/photo-verifications */
    const MOCK_PHOTOS = [
        {id:'SC-2026-0001', name:'Maria Santos',    age:72, barangay:'Poblacion', submitted:'May 29, 2026\n10:04 AM', score:92, decision:'Auto-Approve',    status:'Auto-Approved'},
        {id:'SC-2026-0002', name:'Jose Reyes',      age:68, barangay:'San Miguel', submitted:'May 29, 2026\n9:15 AM', score:78, decision:'Review Required', status:'Pending Review'},
        {id:'SC-2026-0003', name:'Teresa Garcia',   age:75, barangay:'Santiago',   submitted:'May 29, 2026\n2:40 PM', score:45, decision:'Auto-Reject',     status:'Auto-Rejected'},
        {id:'SC-2026-0004', name:'Ramon Dela Cruz', age:80, barangay:'San Isidro', submitted:'May 21, 2024\n10:00 AM',score:89, decision:'Review Required', status:'Pending Review'},
        {id:'SC-2026-0005', name:'Lourdes Bautista',age:71, barangay:'Poblacion',  submitted:'May 21, 2024\n10:00 AM',score:90, decision:'Auto-Approve',    status:'Auto-Approved'},
        {id:'SC-2026-0006', name:'Pedro Mendoza',   age:66, barangay:'San Miguel', submitted:'May 21, 2024\n10:00 AM',score:62, decision:'Review Required', status:'Pending Review'},
        {id:'SC-2026-0007', name:'Gloria Villanueva',age:73,barangay:'San Miguel', submitted:'May 29, 2026\n1:42 PM', score:88, decision:'Auto-Approve',    status:'Auto-Approved'},
    ];

    /* ════════════════════════════════════════════
       1. LOGIN
    ════════════════════════════════════════════ */
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            /* [TODO: API] POST /api/auth/login { osca_id, password } → { token, staff } */
            populateProfile(MOCK_STAFF);
            showDashboard();
            renderAllSections();
        });
    }

    function showDashboard() {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        document.body.style.display   = 'block';
        document.body.style.minHeight = '100vh';
        document.body.style.overflow  = 'hidden';
        startClock();
    }

    function startClock() {
        function tick() {
            const now  = new Date();
            const h    = now.getHours();
            const greet= h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
            const timeStr = now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true});
            const dayStr  = now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
            const nameEl  = document.getElementById('dash-greeting');
            const subEl   = document.getElementById('dash-subtitle');
            const timeEl  = document.getElementById('dash-time');
            if (nameEl)  nameEl.textContent  = greet + ', ' + (MOCK_STAFF.firstName || 'Staff');
            if (subEl)   subEl.textContent   = "Here\'s what\'s happening today, " + dayStr + '.';
            if (timeEl)  timeEl.textContent  = '🕒 ' + timeStr;
        }
        tick();
        setInterval(tick, 1000);
    }

    /* ════════════════════════════════════════════
       2. SIDEBAR COLLAPSE
    ════════════════════════════════════════════ */
    if (hamburgerTrigger && sidebarPanel) {
        hamburgerTrigger.addEventListener('click', function () {
            const isCollapsed = sidebarPanel.classList.toggle('collapsed');
            hamburgerTrigger.setAttribute('aria-expanded', String(!isCollapsed));
        });
    }

    /* ════════════════════════════════════════════
       3. TAB NAVIGATION
    ════════════════════════════════════════════ */
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            switchTab(this.getAttribute('data-target'));
        });
    });

    if (profileTrigger) {
        profileTrigger.addEventListener('click', openProfileTab);
        profileTrigger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProfileTab(); }
        });
    }

    function openProfileTab() {
        navItems.forEach(n => n.classList.remove('active'));
        switchTab('profile-content');
    }

    function switchTab(targetId) {
        if (targetId === 'profile-content') exitEditMode(true);
        tabContents.forEach(c => { c.classList.add('hidden'); c.style.animation = 'none'; });
        const target = document.getElementById(targetId);
        if (target) {
            target.classList.remove('hidden');
            void target.offsetWidth;
            target.style.animation = '';
        }
        if (contentScroll) contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ════════════════════════════════════════════
       4. RENDER ALL SECTIONS (called after login)
    ════════════════════════════════════════════ */
    function renderAllSections() {
        // Senior data
        recalcAllVulnScores();          // ensure all seniors have correct scores
        updateSeniorStats();
        refreshBarangayDropdown();
        renderSeniors(MOCK_SENIORS);
        setupSeniorFilters();
        // Priority (derived from seniors)
        setTimeout(() => { renderPriority(buildPriorityFromSeniors()); updatePriorityStats(); }, 0);
        // Request
        renderRequests(MOCK_REQUESTS);
        updateRequestStats();
        // Home visits
        renderHomeVisits(MOCK_HV);
        updateHomeVisitStats();
        setupHomeVisitFilters();
        // Photos
        renderPhotos(MOCK_PHOTOS);
        setupPhotoFilters();
        // Notifications
        setupNotifications();
        // Dashboard KPIs
        updateDashboardKPIs();
    }

    /* Recalculate vuln score for ALL seniors using the scoring engine data */
    function recalcAllVulnScores() {
        MOCK_SENIORS.forEach(s => {
            const h = (s.health   || '').toLowerCase();
            const m = (s.mobility || '').toLowerCase();
            const l = (s.living   || '').toLowerCase();
            const aS = s.age >= 80 ? 3 : s.age >= 70 ? 2 : s.age >= 60 ? 1 : 0;
            const severe = ['stroke','dementia','cancer','heart','renal','alzheimer'];
            const mod    = ['diabetes','copd','asthma','parkinson','hypertension','osteoporosis','arthritis'];
            const condCount = h.trim() ? (h.match(/,/g)||[]).length + 1 : 0;
            const hS = severe.some(c => h.includes(c)) ? 3 : condCount >= 2 || mod.some(c => h.includes(c)) ? 2 : condCount >= 1 ? 1 : 0;
            const mS = m.includes('bedridden')||m.includes('wheelchair') ? 3 : m.includes('limited')||m.includes('assistance')||m.includes('uses aid') ? 2 : m&&!m.includes('fully independent') ? 1 : 0;
            const lS = l.includes('alone') ? 3 : l.includes('care') ? 2 : l.includes('caregiver') ? 1 : 0;
            s.vulnScore = aS + hS + mS + lS;
            s.vulnMax   = 12;
            s.priority  = s.vulnScore >= 10 ? 'High' : s.vulnScore >= 7 ? 'Medium' : 'Low';
        });
    }

    /* Update dashboard KPI cards from live data */
    function updateDashboardKPIs() {
        setText('dash-total-req', MOCK_REQUESTS.length.toString());
        setText('dash-seniors',   MOCK_SENIORS.length.toString());
        const highCount = MOCK_SENIORS.filter(s => s.priority === 'High').length;
        setText('dash-priority', highCount.toString());
        const todayVisits = MOCK_HV.filter(v => v.status !== 'Missed');
        const completed   = MOCK_HV.filter(v => v.status === 'Completed');
        setText('dash-hv',       todayVisits.length.toString());
        setText('dash-hv-trend', completed.length + ' completed');

        // Recent requests list (last 4)
        const reqList = document.getElementById('dash-recent-req');
        if (reqList) {
            const last4 = [...MOCK_REQUESTS].slice(-4).reverse();
            reqList.innerHTML = last4.map(r => {
                const cls = r.status === 'Approved' ? 'dot-green' : 'dot-amber';
                return '<li><span class="dot ' + cls + '"></span> ' + r.item + ' — ' + r.senior + '<span class="time">' + r.date + '</span></li>';
            }).join('') || '<li><span style="color:var(--ink-faint);font-size:0.85rem;">No requests yet.</span></li>';
        }

        // Today's home visits list (last 3)
        const hvList = document.getElementById('dash-hv-list');
        if (hvList) {
            const last3 = [...MOCK_HV].slice(0, 3);
            hvList.innerHTML = last3.map(v =>
                '<li><span class="dot dot-blue"></span> ' + (v.addr || 'N/A') + '<span class="time">' + (v.dt||'').split('\n')[1] + '</span></li>'
            ).join('') || '<li><span style="color:var(--ink-faint);font-size:0.85rem;">No visits scheduled yet.</span></li>';
        }
    }

    /* Request stats */
    function updateRequestStats() {
        const total    = MOCK_REQUESTS.length;
        const pending  = MOCK_REQUESTS.filter(r => r.status === 'Pending').length;
        const approved = MOCK_REQUESTS.filter(r => r.status === 'Approved').length;
        const rejected = MOCK_REQUESTS.filter(r => r.status === 'Rejected').length;
        setText('rm-total',    total.toString());
        setText('rm-pending',  pending.toString());
        setText('rm-approved', approved.toString());
        setText('rm-rejected', rejected.toString());
    }

    /* Home visit stats */
    function updateHomeVisitStats() {
        setText('hv-total',     MOCK_HV.length.toString());
        setText('hv-completed', MOCK_HV.filter(v => v.status === 'Completed').length.toString());
        setText('hv-missed',    MOCK_HV.filter(v => v.status === 'Missed').length.toString());
        setText('hv-ongoing',   MOCK_HV.filter(v => v.status === 'Ongoing').length.toString());
    }

    /* ════════════════════════════════════════════
       5. REQUEST MANAGEMENT
    ════════════════════════════════════════════ */
    function renderRequests(data) {
        const tbody = document.getElementById('request-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(r => {
            const statusCls = r.status === 'Approved' ? 'badge-approved' : r.status === 'Rejected' ? 'badge-rejected' : 'badge-pending';
            const priCls    = r.priority === 'High' ? 'badge-high' : r.priority === 'Medium' ? 'badge-medium' : 'badge-low';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${r.id}</td>
                <td>${r.type}</td>
                <td><span class="badge ${statusCls}">${r.status}</span></td>
                <td>${r.item}</td>
                <td>${r.date}</td>
                <td>${r.senior}</td>
                <td><span class="badge ${priCls}">${r.priority} Priority</span></td>`;
            tbody.appendChild(tr);
        });
        // Always update KPIs from the full dataset (not just filtered view)
        updateRequestStats();
        updateDashboardKPIs();
    }

    // Search + filter for requests
    ['req-search','req-status-filter','req-type-filter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', filterRequests);
    });
    function filterRequests() {
        const q  = (document.getElementById('req-search')?.value || '').toLowerCase();
        const st = (document.getElementById('req-status-filter')?.value || '').toLowerCase();
        const ty = (document.getElementById('req-type-filter')?.value || '').toLowerCase();
        const filtered = MOCK_REQUESTS.filter(r => {
            return (!q  || r.id.toLowerCase().includes(q) || r.senior.toLowerCase().includes(q) || r.item.toLowerCase().includes(q))
                && (!st || r.status.toLowerCase() === st)
                && (!ty || r.type.toLowerCase().includes(ty));
        });
        renderRequests(filtered);
    }

    /* ════════════════════════════════════════════
       6. SENIOR CITIZEN INFO
    ════════════════════════════════════════════ */

    /* ── Stat card updater ─────────────────── */
    function updateSeniorStats() {
        const total  = MOCK_SENIORS.length;
        const male   = MOCK_SENIORS.filter(s => s.sex === 'Male').length;
        const female = MOCK_SENIORS.filter(s => s.sex === 'Female').length;
        const active = MOCK_SENIORS.filter(s => s.status === 'Active').length;
        setText('sc-total',         total.toLocaleString());
        setText('sc-male',          male.toLocaleString());
        setText('sc-female',        female.toLocaleString());
        setText('sc-beneficiaries', active.toLocaleString());
    }

    /* ── Populate barangay dropdown dynamically ─ */
    function refreshBarangayDropdown() {
        const sel = document.getElementById('sf-barangay');
        if (!sel) return;
        const unique = [...new Set(MOCK_SENIORS.map(s => s.barangay).filter(Boolean))].sort();
        // Keep first option "All Barangays"
        while (sel.options.length > 1) sel.remove(1);
        unique.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; sel.appendChild(o); });
    }

    /* ── Sort state ───────────────────────── */
    let sortKey = null, sortAsc = true;

    function setupSortDropdown() {
        const btn      = document.getElementById('senior-sort-btn');
        const dropdown = document.getElementById('sort-dropdown');
        if (!btn || !dropdown) return;

        btn.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => dropdown.classList.remove('open'));

        dropdown.querySelectorAll('.sort-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const key = opt.dataset.sort;
                if (sortKey === key) {
                    sortAsc = !sortAsc;
                    opt.classList.toggle('desc', !sortAsc);
                } else {
                    sortKey = key; sortAsc = true;
                    dropdown.querySelectorAll('.sort-option').forEach(o => { o.classList.remove('active','desc'); });
                    opt.classList.add('active');
                }
                dropdown.classList.remove('open');
                applyFilterAndSort();
            });
        });
    }

    function sortSeniors(data) {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            let va, vb;
            switch (sortKey) {
                case 'id':       va = a.id;        vb = b.id;        break;
                case 'age':      va = a.age;        vb = b.age;        break;
                case 'barangay': va = a.barangay;   vb = b.barangay;   break;
                case 'civil':    va = a.civil;       vb = b.civil;      break;
                case 'living':   va = a.living;      vb = b.living;     break;
                case 'health':   va = a.health;      vb = b.health;     break;
                case 'mobility': va = a.mobility;    vb = b.mobility;   break;
                case 'vuln':     va = a.vulnScore;   vb = b.vulnScore;  break;
                case 'status':   va = a.status;      vb = b.status;     break;
                default:         return 0;
            }
            if (va == null) va = '';
            if (vb == null) vb = '';
            const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
            return sortAsc ? cmp : -cmp;
        });
    }

    /* ── Render ───────────────────────────── */
    function renderSeniors(data) {
        const tbody   = document.getElementById('senior-tbody');
        const emptyEl = document.getElementById('senior-empty-msg');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (data.length === 0) {
            emptyEl?.classList.remove('hidden');
            return;
        }
        emptyEl?.classList.add('hidden');

        data.forEach(s => {
            const priCls  = s.priority === 'High' ? 'badge-high' : s.priority === 'Medium' ? 'badge-medium' : 'badge-low';
            const statCls = s.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const vulnCls = s.priority === 'High' ? 'high'         : s.priority === 'Medium' ? 'medium' : 'low';
            const avatarBg = avatarColor(s.initials);
            const pct = Math.round(((s.vulnScore || 0) / (s.vulnMax || 12)) * 100);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="display:flex;align-items:center;gap:8px">
                        <div class="senior-avatar" style="background:${avatarBg}">${s.initials}</div>
                        <div>
                            <div style="font-weight:700;font-size:0.82rem">${s.name}</div>
                            <div style="font-size:0.72rem;color:var(--ink-faint)">${s.id}</div>
                        </div>
                    </div>
                </td>
                <td>${s.age} yo</td>
                <td>${s.barangay || '—'}</td>
                <td>${s.civil || '—'}</td>
                <td>${s.living || '—'}</td>
                <td>${s.health || '—'}</td>
                <td>${s.mobility || '—'}</td>
                <td><span class="badge ${priCls}">${s.priority || 'Low'}</span></td>
                <td>
                    <div class="vuln-bar-wrap">
                        <div class="vuln-bar"><div class="vuln-fill ${vulnCls}" style="width:${pct}%"></div></div>
                        <span class="vuln-score-txt">${s.vulnScore || 0}/${s.vulnMax || 12}</span>
                    </div>
                </td>
                <td><span class="badge ${statCls}">${s.status}</span></td>
                <td style="white-space:nowrap;">
                    <button class="tbl-icon-btn" title="View profile" data-view-id="${s.id}">
                        <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="2.8" stroke="currentColor" stroke-width="1.5"/><path d="M3 16C3 12.7 5.7 10.5 9 10.5C12.3 10.5 15 12.7 15 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </button>
                    <button class="tbl-icon-btn" title="Edit" data-edit-id="${s.id}">
                        <svg viewBox="0 0 18 18" fill="none"><path d="M11 3.5L14.5 7L6 15.5H2.5V12L11 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                    </button>
                </td>`;
            tbody.appendChild(tr);
        });

        // View button
        tbody.querySelectorAll('[data-view-id]').forEach(btn =>
            btn.addEventListener('click', () => openSeniorProfile(btn.dataset.viewId, false))
        );
        // Edit button — open profile in edit mode immediately
        tbody.querySelectorAll('[data-edit-id]').forEach(btn =>
            btn.addEventListener('click', () => openSeniorProfile(btn.dataset.editId, true))
        );
    }

    /* ── Filter state ─────────────────────── */
    // Stores last applied filter values (set on APPLY, cleared on CLEAR ALL)
    let activeFilters = {};

    function setupSeniorFilters() {
        // Collapse/expand
        document.getElementById('senior-filter-toggle')?.addEventListener('click', function() {
            const body      = document.getElementById('senior-filter-body');
            const collapsed = body.style.display === 'none';
            body.style.display = collapsed ? '' : 'none';
            this.textContent   = collapsed ? 'Collapse' : 'Expand';
        });

        // Live search (not Apply-gated)
        document.getElementById('senior-search')?.addEventListener('input', applyFilterAndSort);

        // APPLY FILTERS — snapshot current dropdown values into activeFilters
        document.getElementById('senior-filter-apply')?.addEventListener('click', () => {
            activeFilters = {
                barangay : document.getElementById('sf-barangay')?.value  || '',
                age      : document.getElementById('sf-age')?.value       || '',
                sex      : document.getElementById('sf-sex')?.value       || '',
                civil    : document.getElementById('sf-civil')?.value     || '',
                living   : document.getElementById('sf-living')?.value    || '',
                health   : (document.getElementById('sf-health')?.value   || '').toLowerCase(),
                mobility : document.getElementById('sf-mobility')?.value  || '',
                priority : document.getElementById('sf-priority')?.value  || '',
                status   : document.getElementById('sf-status')?.value    || '',
            };
            // Highlight active filter fields
            highlightActiveFilters();
            applyFilterAndSort();
        });

        // CLEAR ALL — reset both the UI dropdowns and activeFilters
        document.getElementById('senior-filter-clear')?.addEventListener('click', () => {
            activeFilters = {};
            ['sf-barangay','sf-age','sf-sex','sf-civil','sf-living','sf-health','sf-mobility','sf-priority','sf-status']
                .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
            document.getElementById('senior-search').value = '';
            // Remove highlight
            document.querySelectorAll('.filter-field.has-filter').forEach(el => el.classList.remove('has-filter'));
            applyFilterAndSort();
        });

        // ADD RECORD
        document.getElementById('senior-add-btn')?.addEventListener('click', () => openSeniorProfile(null, true));

        setupSortDropdown();
    }

    function highlightActiveFilters() {
        const fieldMap = {
            'sf-barangay': 'barangay', 'sf-age': 'age', 'sf-sex': 'sex',
            'sf-civil': 'civil', 'sf-living': 'living', 'sf-health': 'health',
            'sf-mobility': 'mobility', 'sf-priority': 'priority', 'sf-status': 'status'
        };
        Object.entries(fieldMap).forEach(([elId, key]) => {
            const el = document.getElementById(elId);
            if (!el) return;
            const wrap = el.closest('.filter-field');
            if (wrap) wrap.classList.toggle('has-filter', !!(activeFilters[key]));
        });
    }

    function applyFilterAndSort() {
        const q = (document.getElementById('senior-search')?.value || '').toLowerCase().trim();

        const filtered = MOCK_SENIORS.filter(s => {
            // Live search — always applied
            if (q && !s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false;

            // Applied filters (only active after clicking APPLY)
            const f = activeFilters;
            if (f.barangay && s.barangay !== f.barangay)                                         return false;
            if (f.sex      && s.sex      !== f.sex)                                               return false;
            if (f.civil    && s.civil    !== f.civil)                                             return false;
            if (f.living   && s.living   !== f.living)                                            return false;
            if (f.mobility && s.mobility !== f.mobility)                                          return false;
            if (f.priority && s.priority !== f.priority)                                          return false;
            if (f.status   && s.status   !== f.status)                                            return false;
            if (f.health   && !(s.health || '').toLowerCase().includes(f.health))                 return false;
            if (f.age) {
                const age = s.age || 0;
                if (f.age === '60-69'  && !(age >= 60 && age <= 69)) return false;
                if (f.age === '70-79'  && !(age >= 70 && age <= 79)) return false;
                if (f.age === '80+'    && age < 80)                   return false;
            }
            return true;
        });

        renderSeniors(sortSeniors(filtered));
    }

        /* Open senior profile sub-page */
    /* ── VULNERABILITY SCORING ENGINE ──────────────────────────
       Scores each domain 0-3, totals to 0-12.
       Priority: High (10-12), Medium (7-9), Low (0-6)
    ─────────────────────────────────────────────────────────── */
    function calcVulnerability() {
        // 1. Age score
        let ageScore = 0, ageNum = 0;
        const dobVal = document.getElementById('sp-dob')?.value;
        if (dobVal) {
            const birth = new Date(dobVal);
            const today = new Date();
            ageNum = today.getFullYear() - birth.getFullYear() -
                     (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
        } else {
            ageNum = parseInt(document.getElementById('sp-age')?.value) || 0;
        }
        if (ageNum >= 80)      ageScore = 3;
        else if (ageNum >= 70) ageScore = 2;
        else if (ageNum >= 60) ageScore = 1;

        // 2. Health score
        const health = (document.getElementById('sp-health')?.value || '').toLowerCase();
        const severe   = ['stroke','dementia','cancer','heart','renal','alzheimer'];
        const moderate = ['diabetes','copd','asthma','parkinson','hypertension'];
        let healthScore = 0;
        const condCount = health.trim() ? (health.match(/,/g) || []).length + 1 : 0;
        if (severe.some(c => health.includes(c)))                        healthScore = 3;
        else if (condCount >= 2 || moderate.some(c => health.includes(c))) healthScore = 2;
        else if (condCount >= 1)                                           healthScore = 1;

        // 3. Mobility score
        const mobility = (document.getElementById('sp-mobility')?.value || '').toLowerCase();
        let mobilityScore = 0;
        if (mobility.includes('bedridden') || mobility.includes('wheelchair')) mobilityScore = 3;
        else if (mobility.includes('limited') || mobility.includes('assistance') || mobility.includes('uses aid')) mobilityScore = 2;
        else if (mobility !== '' && !mobility.includes('fully independent')) mobilityScore = 1;

        // 4. Living situation score
        const living = (document.getElementById('sp-living')?.value || '').toLowerCase();
        let livingScore = 0;
        if (living.includes('alone'))         livingScore = 3;
        else if (living.includes('care'))     livingScore = 2;
        else if (living.includes('caregiver'))livingScore = 1;

        const total = ageScore + healthScore + mobilityScore + livingScore;

        // Update breakdown
        setText('sp-v-age',      ageScore      + '/3');
        setText('sp-v-health',   healthScore   + '/3');
        setText('sp-v-mobility', mobilityScore + '/3');
        setText('sp-v-living',   livingScore   + '/3');

        const scoreDisplay = document.getElementById('sp-vulnscore-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = total;
            scoreDisplay.style.color = total >= 10 ? '#C0392B' : total >= 7 ? '#C77F37' : '#5F8B5A';
        }

        const priorityLabel = total >= 10 ? 'High' : total >= 7 ? 'Medium' : 'Low';
        const vsEl = document.getElementById('sp-vulnscore');
        if (vsEl) vsEl.value = total + '/12';
        const plEl = document.getElementById('sp-prioritylevel');
        if (plEl) {
            plEl.value = priorityLabel + ' Priority';
            plEl.style.color = total >= 10 ? '#C0392B' : total >= 7 ? '#C77F37' : '#5F8B5A';
        }
        return { total, ageScore, healthScore, mobilityScore, livingScore, priorityLabel };
    }

    // Auto-recalculate when key fields change
    ['sp-dob','sp-health','sp-mobility','sp-living'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calcVulnerability);
        document.getElementById(id)?.addEventListener('input',  calcVulnerability);
    });

    // Auto-calc age from DOB
    document.getElementById('sp-dob')?.addEventListener('change', function() {
        if (!this.value) return;
        const birth = new Date(this.value);
        const today = new Date();
        const age   = today.getFullYear() - birth.getFullYear() -
                     (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
        const ageEl = document.getElementById('sp-age');
        if (ageEl) ageEl.value = age + ' years old';
        calcVulnerability();
    });

    /* ── OPEN SENIOR PROFILE ─────────────────────────────── */
    // openSeniorProfile(seniorId, editMode)
    // seniorId = null  → new record (edit mode forced on)
    // editMode = true  → open in edit mode immediately (from Edit button)
    // editMode = false → open in view mode (from View button)
    function openSeniorProfile(seniorId, editMode) {
        const s = seniorId ? MOCK_SENIORS.find(x => x.id === seniorId) : null;
        // Always start in view mode, then enter edit if requested
        spExitEditMode(true);
        ['senior','govid','oscaid','repid'].forEach(k => spClearPhoto(k));

        // Text inputs
        setValue('sp-fullname',  s ? s.name      : '');
        setValue('sp-age',       s ? (s.age + ' years old') : '');
        setValue('sp-contact',   s ? (s.contact || '+63 917 000 0000') : '');
        setValue('sp-seniorid',  s ? s.id        : '');
        setValue('sp-barangay',  s ? s.barangay  : '');
        setValue('sp-address',   s ? (s.address || '123 Main St., ' + s.barangay) : '');
        setValue('sp-rep',       s ? (s.rep || 'N/A') : '');
        setValue('sp-health',    s ? s.health    : '');

        // Date inputs
        setValue('sp-dob',        s ? (s.dob || '1985-03-14') : '');
        setValue('sp-registered', s ? (s.registered || '2022-03-15') : '');
        setValue('sp-lasthv',     s ? (s.lasthv || '') : '');

        // Select dropdowns
        setSelectValue('sp-sex',       s ? (s.sex || '') : '');
        setSelectValue('sp-civil',     s ? s.civil    : '');
        setSelectValue('sp-living',    s ? s.living   : '');
        setSelectValue('sp-mobility',  s ? mapMobility(s.mobility) : '');
        setSelectValue('sp-equipment', s ? (s.equipment || 'Wheelchair') : 'None');
        setSelectValue('sp-accstatus', s ? s.status   : 'Active');
        setSelectValue('sp-govid',     s ? (s.govIdType || 'PhilSys (National ID)') : '');

        calcVulnerability();
        switchTab('senior-profile-content');

        // Enter edit mode if requested (new record or edit button)
        if (editMode || !seniorId) {
            spEnterEditMode();
        }
    }

    function mapMobility(raw) {
        if (!raw) return '';
        raw = raw.toLowerCase();
        if (raw.includes('bedridden'))  return 'Bedridden';
        if (raw.includes('wheelchair')) return 'Wheelchair-Bound';
        if (raw.includes('uses aid') || raw.includes('cane') || raw.includes('walker')) return 'Uses Aid (Cane/Walker)';
        if (raw.includes('limited'))    return 'Limited Mobility';
        if (raw.includes('assistance')) return 'Needs Assistance';
        return 'Fully Independent';
    }

    function setValue(id, val) {
        const el = document.getElementById(id);
        if (el) el.value = val;
    }

    function setSelectValue(id, val) {
        const el = document.getElementById(id);
        if (!el) return;
        for (let i = 0; i < el.options.length; i++) {
            if (el.options[i].value === val || el.options[i].text === val) {
                el.selectedIndex = i; return;
            }
        }
    }

    /* ── EDIT / SAVE / CANCEL ────────────────────────────── */
    let spIsEditing = false;

    function spEnterEditMode() {
        spIsEditing = true;
        const profileEl = document.getElementById('senior-profile-content');
        profileEl?.classList.add('sp-editing');
        profileEl?.querySelectorAll('.sp-input:not(.sp-readonly-always)').forEach(el => {
            if (el.type !== 'file') el.removeAttribute('readonly');
        });
        profileEl?.querySelectorAll('.sp-select').forEach(el => el.removeAttribute('disabled'));
        ['senior','govid','oscaid','repid'].forEach(k =>
            document.getElementById('sp-photo-actions-' + k)?.classList.remove('hidden')
        );
        // Show cancel edit button, update edit btn label
        document.getElementById('sp-cancel-edit-wrap')?.classList.remove('hidden');
        const editBtn = document.getElementById('senior-profile-edit-btn');
        if (editBtn) {
            editBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg> Editing…`;
            editBtn.classList.add('sp-editing-label');
            editBtn.disabled = true;
        }
        // Focus first editable field
        setTimeout(() => document.getElementById('sp-fullname')?.focus({ preventScroll: true }), 50);
    }

    function spExitEditMode(silent) {
        spIsEditing = false;
        const profileEl = document.getElementById('senior-profile-content');
        profileEl?.classList.remove('sp-editing');
        profileEl?.querySelectorAll('.sp-input:not(.sp-readonly-always)').forEach(el => {
            if (el.type !== 'file') el.setAttribute('readonly', true);
        });
        profileEl?.querySelectorAll('.sp-select').forEach(el => el.setAttribute('disabled', true));
        ['senior','govid','oscaid','repid'].forEach(k =>
            document.getElementById('sp-photo-actions-' + k)?.classList.add('hidden')
        );
        // Hide cancel button, restore edit button
        document.getElementById('sp-cancel-edit-wrap')?.classList.add('hidden');
        const editBtn = document.getElementById('senior-profile-edit-btn');
        if (editBtn) {
            editBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg> EDIT`;
            editBtn.classList.remove('sp-editing-label');
            editBtn.disabled = false;
        }
    }

    document.getElementById('senior-profile-edit-btn')?.addEventListener('click', spEnterEditMode);
    document.getElementById('sp-cancel-edit-btn')?.addEventListener('click', () => {
        spExitEditMode(true);
        // Re-populate the last saved data (discard unsaved edits)
        const sidEl = document.getElementById('sp-seniorid');
        if (sidEl?.value) {
            const s = MOCK_SENIORS.find(x => x.id === sidEl.value);
            if (s) openSeniorProfile(s.id, false);
        }
    });
    document.getElementById('sp-back-btn')?.addEventListener('click', () => { spExitEditMode(true); switchTab('senior-content'); });
    document.getElementById('sp-save-btn')?.addEventListener('click', () => {
        // Collect all field values
        const vuln     = calcVulnerability();
        const fullname = document.getElementById('sp-fullname')?.value?.trim() || '';
        const seniorid = document.getElementById('sp-seniorid')?.value?.trim() || '';
        const ageText  = document.getElementById('sp-age')?.value || '';
        const ageNum   = parseInt(ageText) || 0;
        const sex      = document.getElementById('sp-sex')?.value      || '';
        const civil    = document.getElementById('sp-civil')?.value    || '';
        const barangay = document.getElementById('sp-barangay')?.value?.trim() || '';
        const living   = document.getElementById('sp-living')?.value   || '';
        const health   = document.getElementById('sp-health')?.value?.trim() || '';
        const mobility = document.getElementById('sp-mobility')?.value || '';
        const equipment= document.getElementById('sp-equipment')?.value|| '';
        const accstatus= document.getElementById('sp-accstatus')?.value|| 'Active';
        const contact  = document.getElementById('sp-contact')?.value?.trim() || '';
        const address  = document.getElementById('sp-address')?.value?.trim() || '';
        const rep      = document.getElementById('sp-rep')?.value?.trim() || '';
        const govIdType= document.getElementById('sp-govid')?.value    || '';
        const dob      = document.getElementById('sp-dob')?.value       || '';
        const registered= document.getElementById('sp-registered')?.value || '';
        const lasthv   = document.getElementById('sp-lasthv')?.value   || '';

        if (!fullname) { showToast('Full name is required.'); return; }
        if (!seniorid) { showToast('Senior ID is required.'); return; }

        // Build initials from name
        const parts    = fullname.trim().split(/[\s,]+/).filter(Boolean);
        const lastName = parts[0] || '';
        const firstName= parts[1] || '';
        const initials = ((lastName[0] || '') + (firstName[0] || '')).toUpperCase();

        // Surname, First format for display
        const displayName = parts.length > 1
            ? lastName + ', ' + parts.slice(1).join(' ')
            : fullname;

        const existing = MOCK_SENIORS.find(x => x.id === seniorid);

        if (existing) {
            /* [TODO: API] PATCH /api/seniors/:id */
            Object.assign(existing, {
                name: displayName, initials, age: ageNum, sex, civil, barangay,
                living, health, mobility, equipment, status: accstatus,
                contact, address, rep, govIdType, dob, registered, lasthv,
                vulnScore: vuln.total, vulnMax: 12, priority: vuln.priorityLabel
            });
        } else {
            /* [TODO: API] POST /api/seniors */
            // Check if ID already exists (different record)
            if (MOCK_SENIORS.find(x => x.id === seniorid)) {
                showToast('Senior ID already exists. Use a unique ID.');
                return;
            }
            MOCK_SENIORS.push({
                id: seniorid, name: displayName, initials,
                age: ageNum, sex, civil, barangay, living, health, mobility,
                equipment, status: accstatus, contact, address, rep,
                govIdType, dob, registered, lasthv,
                vulnScore: vuln.total, vulnMax: 12, priority: vuln.priorityLabel
            });
        }

        // Refresh all senior-related UI
        updateSeniorStats();
        refreshBarangayDropdown();
        activeFilters = {};
        applyFilterAndSort();
        renderPriority(buildPriorityFromSeniors());
        updatePriorityStats();

        spExitEditMode(false);
        showToast(existing ? 'Senior record updated.' : 'New senior added to records.');
    });

    document.getElementById('sp-delete-btn')?.addEventListener('click', () => {
        const seniorid = document.getElementById('sp-seniorid')?.value?.trim();
        if (!seniorid) { showToast('No record to delete.'); return; }
        if (confirm('Delete this senior record? This cannot be undone.')) {
            /* [TODO: API] DELETE /api/seniors/:id */
            const idx = MOCK_SENIORS.findIndex(x => x.id === seniorid);
            if (idx > -1) MOCK_SENIORS.splice(idx, 1);
            updateSeniorStats();
            refreshBarangayDropdown();
            applyFilterAndSort();
            renderPriority(buildPriorityFromSeniors());
            updatePriorityStats();
            spExitEditMode(true);
            switchTab('senior-content');
            showToast('Senior record deleted.');
        }
    });

    /* ── AUTO-POPULATE PRIORITY MONITORING from seniors ──── */

    function updatePriorityStats() {
        const total  = MOCK_SENIORS.length;
        const high   = MOCK_SENIORS.filter(s => s.priority === 'High').length;
        const medium = MOCK_SENIORS.filter(s => s.priority === 'Medium').length;
        const low    = MOCK_SENIORS.filter(s => s.priority === 'Low' || !s.priority).length;
        setText('pm-total',  total.toLocaleString());
        setText('pm-high',   high.toLocaleString());
        setText('pm-medium', medium.toLocaleString());
        setText('pm-low',    low.toLocaleString());
    }

    function buildPriorityFromSeniors() {
        return [...MOCK_SENIORS]
            .sort((a, b) => (b.vulnScore || 0) - (a.vulnScore || 0))
            .map(s => {
                const sc       = s.vulnScore || 0;
                const priLabel = sc >= 10 ? 'High priority' : sc >= 7 ? 'Medium priority' : 'Low priority';
                const h        = (s.health || '').toLowerCase();
                const m        = (s.mobility || '').toLowerCase();
                const l        = (s.living  || '').toLowerCase();
                const aS = s.age >= 80 ? 3 : s.age >= 70 ? 2 : s.age >= 60 ? 1 : 0;
                const hS = ['stroke','dementia','cancer','heart','renal','alzheimer'].some(c => h.includes(c)) ? 3
                         : (h.match(/,/g)||[]).length >= 1 ? 2 : h ? 1 : 0;
                const mS = m.includes('bedridden') || m.includes('wheelchair') ? 3
                         : m.includes('limited') || m.includes('assistance') || m.includes('uses aid') ? 2
                         : m && !m.includes('fully independent') ? 1 : 0;
                const lS = l.includes('alone') ? 3 : l.includes('care') ? 2 : l.includes('caregiver') ? 1 : 0;
                return {
                    id: s.id, name: s.name, barangay: s.barangay || '—', age: s.age,
                    lastVisit: s.lasthv ? new Date(s.lasthv).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : 'No record',
                    priorityLabel: priLabel,
                    score: sc, maxScore: 12,
                    age_score: aS, age_max: 3,
                    age_detail: (s.age || '—') + ' years old\nAge-based risk classification',
                    health_score: hS, health_max: 3,
                    health_detail: s.health || 'No condition recorded',
                    mobility_score: mS, mobility_max: 3,
                    mobility_detail: s.mobility || 'Not assessed',
                    living_score: lS, living_max: 3,
                    living_detail: s.living || 'Not specified',
                    rationale: `${s.name} has a vulnerability score of ${sc}/12, indicating ${priLabel.replace(' priority','')} risk. ` +
                               (sc >= 10 ? 'Immediate intervention is recommended.' :
                                sc >= 7  ? 'Regular monitoring and follow-up needed.' :
                                           'Routine wellness check is sufficient.'),
                    actions: sc >= 10 ? ['Urgent home visit', 'Caregiver referral', 'Medical priority release']
                           : sc >= 7  ? ['Schedule home visit', 'Wellness check']
                           :            ['Routine check-in']
                };
            });
    }

    /* ── PHOTO UPLOAD ────────────────────────────────────── */
    ['senior','govid','oscaid','repid'].forEach(key => {
        document.getElementById('sp-file-' + key)?.addEventListener('change', function() {
            const file = this.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = e => spSetPhoto(key, e.target.result);
            reader.readAsDataURL(file);
            this.value = '';
        });
    });

    function spSetPhoto(key, dataUrl) {
        const img   = document.getElementById('sp-img-' + key);
        const empty = document.getElementById('sp-empty-' + key);
        if (img)   { img.src = dataUrl; img.style.display = 'block'; }
        if (empty) empty.style.display = 'none';
    }
    function spClearPhoto(key) {
        const img   = document.getElementById('sp-img-' + key);
        const empty = document.getElementById('sp-empty-' + key);
        if (img)   { img.src = ''; img.style.display = 'none'; }
        if (empty) empty.style.display = '';
    }

    /* ── CAMERA CAPTURE ──────────────────────────────────── */
    let cameraStream = null, cameraTargetKey = null;

    document.querySelectorAll('.sp-capture-btn').forEach(btn =>
        btn.addEventListener('click', () => openCameraModal(btn.dataset.target))
    );

    function openCameraModal(targetKey) {
        cameraTargetKey = targetKey;
        const errEl = document.getElementById('camera-error');
        if (errEl) errEl.textContent = '';
        document.getElementById('camera-modal')?.classList.remove('hidden');
        navigator.mediaDevices?.getUserMedia({ video: { facingMode:'user' }, audio:false })
            .then(stream => {
                cameraStream = stream;
                const video = document.getElementById('camera-video');
                if (video) { video.srcObject = stream; video.play(); }
            })
            .catch(err => { if (errEl) errEl.textContent = 'Camera unavailable: ' + (err.message||'permission denied'); });
    }

    function closeCameraModal() {
        if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
        document.getElementById('camera-modal')?.classList.add('hidden');
        const video = document.getElementById('camera-video');
        if (video) video.srcObject = null;
    }

    document.getElementById('camera-modal-close')?.addEventListener('click', closeCameraModal);
    document.getElementById('camera-cancel')?.addEventListener('click', closeCameraModal);
    document.getElementById('camera-modal')?.addEventListener('click', e => { if (e.target === document.getElementById('camera-modal')) closeCameraModal(); });

    document.getElementById('camera-capture-btn')?.addEventListener('click', () => {
        const video = document.getElementById('camera-video');
        const canvas = document.getElementById('camera-canvas');
        if (!video || !canvas || !cameraTargetKey) return;
        canvas.width = video.videoWidth || 640; canvas.height = video.videoHeight || 480;
        canvas.getContext('2d').drawImage(video, 0, 0);
        spSetPhoto(cameraTargetKey, canvas.toDataURL('image/jpeg', 0.85));
        closeCameraModal();
        showToast('Photo captured successfully.');
    });

    /* ════════════════════════════════════════════
       7. PRIORITY MONITORING
    ════════════════════════════════════════════ */
    function renderPriority(data) {
        const list = document.getElementById('priority-list');
        if (!list) return;
        list.innerHTML = '';
        data.forEach((p, i) => {
            const priCls = p.score >= 10 ? 'high' : p.score >= 7 ? 'medium' : 'low';
            const card = document.createElement('div');
            card.className = 'priority-card';
            card.innerHTML = `
                <div class="priority-card-header" data-idx="${i}">
                    <div>
                        <div class="priority-card-name">${p.name}</div>
                        <div class="priority-card-meta">${p.id} · ${p.barangay} · Age ${p.age} · Last visit: ${p.lastVisit}</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span class="badge badge-${priCls}">${p.priorityLabel}</span>
                        <div>
                            <div class="priority-card-score">${p.score} / ${p.maxScore}</div>
                        </div>
                        <svg class="priority-card-chevron" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                </div>
                <div class="priority-card-detail">
                    <div class="priority-detail-box">
                        <div class="priority-detail-box-header"><span class="priority-detail-box-title">Age</span><span class="priority-detail-score">${p.age_score}/${p.age_max}</span></div>
                        ${p.age_detail.split('\n').map((l,j) => j===0?`<div class="priority-detail-body">${l}</div>`:`<div class="priority-detail-sub">${l}</div>`).join('')}
                    </div>
                    <div class="priority-detail-box">
                        <div class="priority-detail-box-header"><span class="priority-detail-box-title">Health condition</span><span class="priority-detail-score">${p.health_score}/${p.health_max}</span></div>
                        ${p.health_detail.split('\n').map((l,j) => j===0?`<div class="priority-detail-body">${l}</div>`:`<div class="priority-detail-sub">${l}</div>`).join('')}
                    </div>
                    <div class="priority-detail-box">
                        <div class="priority-detail-box-header"><span class="priority-detail-box-title">Mobility status</span><span class="priority-detail-score">${p.mobility_score}/${p.mobility_max}</span></div>
                        ${p.mobility_detail.split('\n').map((l,j) => j===0?`<div class="priority-detail-body">${l}</div>`:`<div class="priority-detail-sub">${l}</div>`).join('')}
                    </div>
                    <div class="priority-detail-box">
                        <div class="priority-detail-box-header"><span class="priority-detail-box-title">Living condition</span><span class="priority-detail-score">${p.living_score}/${p.living_max}</span></div>
                        ${p.living_detail.split('\n').map((l,j) => j===0?`<div class="priority-detail-body">${l}</div>`:`<div class="priority-detail-sub">${l}</div>`).join('')}
                    </div>
                    <div class="priority-rationale">
                        <strong>Classification rationale</strong>
                        ${p.rationale}
                        <div style="margin-top:10px"><strong>Recommended actions:</strong>${p.actions.map(a=>`<div>• ${a}</div>`).join('')}</div>
                    </div>
                    <div class="priority-actions-row">
                        <button class="priority-action-link">Schedule visit ↗</button>
                        <button class="priority-action-link">Full profile ↗</button>
                        <button class="priority-action-link">Notify ↗</button>
                    </div>
                </div>`;

            card.querySelector('[data-idx]').addEventListener('click', () => {
                card.classList.toggle('open');
            });
            list.appendChild(card);
        });
    }

    document.getElementById('priority-search')?.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        const filtered = buildPriorityFromSeniors().filter(p =>
            p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.barangay.toLowerCase().includes(q)
        );
        renderPriority(filtered);
    });

    /* ════════════════════════════════════════════
       8. HOME VISIT
    ════════════════════════════════════════════ */
    function renderHomeVisits(data) {
        const tbody = document.getElementById('hv-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(v => {
            const priCls  = v.priority === 'High' ? 'badge-high' : v.priority === 'Medium' ? 'badge-medium' : 'badge-low';
            const statCls = v.status === 'Completed' ? 'badge-approved' : v.status === 'Missed' ? 'badge-rejected' : v.status === 'Ongoing' ? 'badge-review' : 'badge-scheduled';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-size:0.78rem;color:var(--ink-soft)">${v.id}</td>
                <td style="font-weight:700">${v.name}</td>
                <td style="font-size:0.8rem">${v.addr}</td>
                <td style="font-size:0.8rem;white-space:pre-line">${v.dt}</td>
                <td style="font-size:0.8rem">${v.staff}</td>
                <td>${v.purpose}</td>
                <td><span class="badge ${priCls}">${v.priority} Priority</span></td>
                <td><span class="badge ${statCls}">${v.status}</span></td>`;
            tbody.appendChild(tr);
        });
        // Update KPIs from full dataset
        updateHomeVisitStats();
    }

    let hvActiveFilters = {};

    function setupHomeVisitFilters() {
        // Collapse/expand
        document.getElementById('hv-filter-toggle')?.addEventListener('click', function() {
            const body = document.getElementById('hv-filter-body');
            const collapsed = body.style.display === 'none';
            body.style.display = collapsed ? '' : 'none';
            this.textContent = collapsed ? 'Collapse' : 'Expand';
        });

        // Live search
        document.getElementById('hv-search')?.addEventListener('input', applyHVFilter);

        // APPLY
        document.getElementById('hv-filter-apply')?.addEventListener('click', () => {
            hvActiveFilters = {
                barangay: document.getElementById('hv-barangay')?.value || '',
                priority: document.getElementById('hv-priority')?.value || '',
                status  : document.getElementById('hv-status')?.value   || '',
            };
            applyHVFilter();
        });

        // CLEAR ALL
        document.getElementById('hv-filter-clear')?.addEventListener('click', () => {
            hvActiveFilters = {};
            ['hv-barangay','hv-priority','hv-status'].forEach(id => {
                const el = document.getElementById(id); if (el) el.value = '';
            });
            document.getElementById('hv-search').value = '';
            applyHVFilter();
        });
    }

    function applyHVFilter() {
        const q = (document.getElementById('hv-search')?.value || '').toLowerCase();
        const f = hvActiveFilters;
        const filtered = MOCK_HV.filter(v => {
            if (q && !v.name.toLowerCase().includes(q) && !v.id.toLowerCase().includes(q)) return false;
            if (f.barangay && !v.addr.includes(f.barangay)) return false;
            if (f.priority && v.priority !== f.priority)    return false;
            if (f.status   && v.status   !== f.status)      return false;
            return true;
        });
        renderHomeVisits(filtered);
    }

    // Keep old name as alias so nothing breaks
    function filterHV() { applyHVFilter(); }

    /* ════════════════════════════════════════════
       9. UPDATES & NOTIFICATIONS
    ════════════════════════════════════════════ */
    function setupNotifications() {
        // Template chips
        document.querySelectorAll('.template-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                document.querySelectorAll('.template-chip').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const msg = document.getElementById('notif-message');
                if (msg) msg.value = this.dataset.msg || '';
            });
        });

        // Send notification
        document.getElementById('notif-send-btn')?.addEventListener('click', () => {
            const recipient = document.getElementById('notif-recipient')?.value?.trim();
            const message   = document.getElementById('notif-message')?.value?.trim();
            if (!recipient) { alert('Please enter a recipient.'); return; }
            if (!message)   { alert('Please enter a message.'); return; }
            /* [TODO: API] POST /api/notifications { recipient, message } */
            showToast('Notification sent to ' + recipient + '.');
            document.getElementById('notif-recipient').value = '';
        });

        // Live announcement preview
        ['announce-date','announce-time','announce-loc'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', updateAnnouncePreview);
        });
        function updateAnnouncePreview() {
            const d = document.getElementById('announce-date')?.value;
            const t = document.getElementById('announce-time')?.value;
            const l = document.getElementById('announce-loc')?.value;
            if (d) { const dt = new Date(d + 'T00:00:00'); setText('announce-preview-date', 'Date: ' + dt.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})); }
            if (t) setText('announce-preview-time', 'Time: ' + t);
            if (l) setText('announce-preview-loc', 'Location: ' + l);
        }

        // Add announcement
        document.getElementById('announce-add-btn')?.addEventListener('click', () => {
            const title = document.getElementById('announce-title')?.value?.trim();
            if (!title) { alert('Please enter a program title.'); return; }
            /* [TODO: API] POST /api/announcements { title, details, date, time, location } */
            showToast('Announcement "' + title + '" added.');
        });
    }

    /* ════════════════════════════════════════════
       10. PHOTO VERIFICATION
    ════════════════════════════════════════════ */
    function renderPhotos(data) {
        const tbody = document.getElementById('photo-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(p => {
            const pct      = p.score;
            const scoreCls = pct >= 80 ? 'high' : pct >= 60 ? 'medium' : 'low';
            const decCls   = p.decision === 'Auto-Approve' ? 'badge-autoapprove' : p.decision === 'Auto-Reject' ? 'badge-autoreject' : 'badge-review';
            const statCls  = p.status === 'Auto-Approved' ? 'badge-autoapprove' : p.status === 'Auto-Rejected' ? 'badge-autoreject' : 'badge-review';
            const initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2);
            const avatarBg = avatarColor(initials);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="display:flex;align-items:center;gap:8px">
                        <div class="senior-avatar" style="background:${avatarBg}">${initials}</div>
                        <div><div style="font-weight:700;font-size:0.82rem">${p.name}</div><div style="font-size:0.72rem;color:var(--ink-faint)">${p.age} years old</div></div>
                    </div>
                </td>
                <td style="font-size:0.78rem;color:var(--ink-soft)">${p.id}</td>
                <td>${p.barangay}</td>
                <td style="font-size:0.78rem;white-space:pre-line">${p.submitted}</td>
                <td>
                    <div class="score-bar-wrap">
                        <div class="score-bar"><div class="score-fill ${scoreCls}" style="width:${pct}%"></div></div>
                        <span class="score-pct">${pct}%</span>
                    </div>
                </td>
                <td><span class="badge ${decCls}">${p.decision}</span></td>
                <td><span class="badge ${statCls}">${p.status}</span></td>
                <td><button class="tbl-view-btn" data-photo-id="${p.id}">View</button></td>`;
            tbody.appendChild(tr);
        });

        // View detail click
        tbody.querySelectorAll('[data-photo-id]').forEach(btn => {
            btn.addEventListener('click', () => openPhotoDetail(btn.dataset.photoId));
        });
    }

    function setupPhotoFilters() {
        document.getElementById('photo-search')?.addEventListener('input', filterPhotos);
        document.getElementById('photo-status')?.addEventListener('change', filterPhotos);
        document.getElementById('photo-barangay')?.addEventListener('change', filterPhotos);
    }
    function filterPhotos() {
        const q    = (document.getElementById('photo-search')?.value || '').toLowerCase();
        const stat = (document.getElementById('photo-status')?.value || '');
        const brgy = (document.getElementById('photo-barangay')?.value || '');
        const filtered = MOCK_PHOTOS.filter(p =>
            (!q    || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
         && (!stat || stat === 'All Status'    || p.status === stat)
         && (!brgy || brgy === 'All Barangay' || p.barangay === brgy)
        );
        renderPhotos(filtered);
    }

    /* Open photo verification detail */
    function openPhotoDetail(photoId) {
        const p = MOCK_PHOTOS.find(x => x.id === photoId);
        if (!p) return;
        setText('vd-name',       p.name);
        setText('vd-oscaid',     p.id);
        setText('vd-age',        p.age + ' years old');
        setText('vd-barangay',   p.barangay);
        setText('vd-registered', 'March 15, 2022');

        const pct      = p.score;
        const fill     = document.getElementById('vd-score-fill');
        const pctEl    = document.getElementById('vd-score-pct');
        const labelEl  = document.getElementById('vd-score-label');
        const decEl    = document.getElementById('vd-decision');
        if (fill)    { fill.style.width = pct + '%'; fill.className = 'vd-score-fill ' + (pct>=80?'high':pct>=60?'medium':'low'); }
        if (pctEl)   pctEl.textContent  = pct + '%';
        if (labelEl) labelEl.textContent = pct >= 80 ? 'High Confidence Match' : pct >= 60 ? 'Moderate Confidence' : 'Low Confidence Match';
        if (decEl)   decEl.textContent  = p.decision === 'Auto-Approve' ? 'Auto-Approved' : p.decision === 'Auto-Reject' ? 'Auto-Rejected' : 'Pending';

        // Verification history (mock)
        const histTbody = document.getElementById('vd-history-tbody');
        if (histTbody) {
            const history = [
                {date:'May 15, 2026', time:'10:12 AM', action:'Approved', score:'95%'},
                {date:'Feb 15, 2026', time:'09:12 AM', action:'Approved', score:'85%'},
                {date:'Nov 15, 2025', time:'11:32 AM', action:'Approved', score:'91%'},
                {date:'Aug 15, 2025', time:'10:20 AM', action:'Approved', score:'92%'},
            ];
            histTbody.innerHTML = history.map(h =>
                `<tr><td>${h.date}</td><td>${h.time}</td><td style="font-weight:700;color:var(--green-ok)">${h.action}</td><td style="font-weight:700;text-align:right">${h.score}</td></tr>`
            ).join('');
        }

        switchTab('photo-detail-content');
    }

    // Photo detail action buttons
    document.getElementById('vd-approve')?.addEventListener('click', () => {
        /* [TODO: API] POST /api/photo-verifications/:id/approve */
        showToast('Photo approved successfully.');
        setTimeout(() => switchTab('photo-content'), 800);
    });
    document.getElementById('vd-reject')?.addEventListener('click', () => {
        /* [TODO: API] POST /api/photo-verifications/:id/reject */
        showToast('Photo rejected.');
        setTimeout(() => switchTab('photo-content'), 800);
    });
    document.getElementById('vd-recapture')?.addEventListener('click', () => {
        /* [TODO: API] POST /api/photo-verifications/:id/recapture */
        showToast('Recapture requested.');
        setTimeout(() => switchTab('photo-content'), 800);
    });
    document.getElementById('vd-back-btn')?.addEventListener('click', () => switchTab('photo-content'));

    /* ════════════════════════════════════════════
       11. PROFILE — populate / edit / save
    ════════════════════════════════════════════ */
    function populateProfile(s) {
        // Sidebar
        setText('sidebar-avatar', s.initials);
        setText('sidebar-name',   s.firstName || s.fullName.split(' ')[0]);
        setText('sidebar-role',   `Staff · ${s.position}`);
        // Dashboard greeting (live name update)
        const greetEl = document.getElementById('dash-greeting');
        if (greetEl) {
            const h = new Date().getHours();
            const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
            greetEl.textContent = greet + ', ' + (s.firstName || s.fullName.split(' ')[0]);
        }
        setText('profile-hero-avatar', s.initials);
        setText('profile-hero-name',   s.fullName);
        setText('profile-hero-role',   `Staff · ${s.position}`);
        setChipText('profile-hero-id',   s.oscaId);
        setChipText('profile-hero-dept', s.division);
        const badge = document.getElementById('profile-status-badge');
        if (badge) { badge.textContent = `● ${s.status}`; badge.className = `profile-status-badge ${s.status==='Active'?'active':'inactive'}`; }
        setText('pi-fullname',    s.fullName);
        setText('pi-dob',         s.dobDisplay || s.dob);
        setText('pi-gender',      s.gender);
        setText('pi-civil',       s.civilStatus);
        setText('pi-nationality', s.nationality);
        setText('pi-address',     s.address);
        setText('cd-mobile',    s.mobile);
        setText('cd-email',     s.email);
        setText('cd-office',    s.officePhone);
        setText('cd-emergency', `${s.emergencyName} — ${s.emergencyPhone}`);
        setText('ed-empid',      s.employeeId);
        setText('ed-position',   s.position);
        setText('ed-division',   s.division);
        setText('ed-hired',      s.dateHired);
        setText('ed-type',       s.empType);
        setText('ed-supervisor', s.supervisor);
        setText('ed-barangays',  s.barangays);
        setText('aa-oscaid',    s.oscaId);
        setText('aa-role',      s.role);
        setText('aa-access',    s.accessLevel);
        setText('aa-lastlogin', s.lastLogin);
        const chip = document.getElementById('aa-status');
        if (chip) { chip.textContent = s.status; chip.className = `status-chip ${s.status==='Active'?'active':'inactive'}`; }
        setVal('ef-fullname',        s.fullName);
        setVal('ef-dob',             s.dob);
        setVal('ef-gender',          s.gender);
        setVal('ef-civil',           s.civilStatus);
        setVal('ef-nationality',     s.nationality);
        setVal('ef-address',         s.address);
        setVal('ef-mobile',          s.mobile);
        setVal('ef-email',           s.email);
        setVal('ef-office',          s.officePhone);
        setVal('ef-emergency-name',  s.emergencyName);
        setVal('ef-emergency-phone', s.emergencyPhone);
        setText('ro-empid',      s.employeeId);
        setText('ro-position',   s.position);
        setText('ro-division',   s.division);
        setText('ro-hired',      s.dateHired);
        setText('ro-type',       s.empType);
        setText('ro-supervisor', s.supervisor);
        setText('ro-oscaid',     s.oscaId);
        setText('ro-role',       s.role);
        setText('ro-access',     s.accessLevel);
        const roStatus = document.getElementById('ro-status');
        if (roStatus) { roStatus.textContent = s.status; roStatus.className = `status-chip ${s.status==='Active'?'active':'inactive'}`; }
    }

    if (profileEditBtn) profileEditBtn.addEventListener('click', enterEditMode);
    if (editCancelBtn)  editCancelBtn.addEventListener('click', () => exitEditMode(false));
    if (editSaveBtn)    editSaveBtn.addEventListener('click', saveProfile);

    function enterEditMode() {
        clearAllFieldErrors();
        profileViewMode.classList.add('hidden');
        profileEditMode.classList.remove('hidden');
        profileEditBtn.style.display = 'none';
        contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('ef-fullname')?.focus({ preventScroll: true });
    }

    function exitEditMode(silent) {
        if (profileEditMode && profileEditMode.classList.contains('hidden')) return;
        clearAllFieldErrors();
        populateProfile(MOCK_STAFF);
        profileEditMode?.classList.add('hidden');
        profileViewMode?.classList.remove('hidden');
        if (profileEditBtn) profileEditBtn.style.display = '';
        if (!silent && contentScroll) contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function saveProfile() {
        clearAllFieldErrors();
        const updated = {
            fullName: getVal('ef-fullname'), dob: getVal('ef-dob'),
            gender: getVal('ef-gender'), civilStatus: getVal('ef-civil'),
            nationality: getVal('ef-nationality'), address: getVal('ef-address'),
            mobile: getVal('ef-mobile'), email: getVal('ef-email'),
            officePhone: getVal('ef-office'), emergencyName: getVal('ef-emergency-name'),
            emergencyPhone: getVal('ef-emergency-phone'),
        };
        let hasError = false, firstInvalidId = null;
        if (!updated.fullName) { setFieldError('ef-fullname', true); hasError = true; firstInvalidId = firstInvalidId || 'ef-fullname'; }
        if (!updated.mobile)   { setFieldError('ef-mobile', true);   hasError = true; firstInvalidId = firstInvalidId || 'ef-mobile'; }
        if (!updated.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updated.email)) { setFieldError('ef-email', true); hasError = true; firstInvalidId = firstInvalidId || 'ef-email'; }
        if (hasError) { document.getElementById(firstInvalidId)?.focus(); return; }
        /* [TODO: API] PATCH /api/staff/me { ...updated } */
        Object.assign(MOCK_STAFF, updated);
        if (updated.dob) {
            const d = new Date(updated.dob + 'T00:00:00');
            MOCK_STAFF.dobDisplay = d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
        }
        const parts = updated.fullName.trim().split(/\s+/);
        MOCK_STAFF.firstName = parts[0];
        MOCK_STAFF.initials  = parts.map(p=>p[0]).slice(0,2).join('').toUpperCase();
        populateProfile(MOCK_STAFF);
        profileEditMode.classList.add('hidden');
        profileViewMode.classList.remove('hidden');
        if (profileEditBtn) profileEditBtn.style.display = '';
        contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        // Refresh dashboard greeting with new name
        updateDashboardKPIs();
        showToast('Profile updated successfully.');
    }

    function setFieldError(id, has) {
        const w = document.getElementById(id + '-field');
        if (w) w.classList.toggle('has-error', has);
    }
    function clearFieldError(id) { setFieldError(id, false); }
    function clearAllFieldErrors() { ['ef-fullname','ef-mobile','ef-email'].forEach(clearFieldError); }
    ['ef-fullname','ef-mobile','ef-email'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => clearFieldError(id));
    });

    /* ════════════════════════════════════════════
       12. LOGOUT MODAL
    ════════════════════════════════════════════ */
    logoutBtn?.addEventListener('click', () => logoutModal.classList.remove('hidden'));
    logoutCancel?.addEventListener('click', () => logoutModal.classList.add('hidden'));
    logoutModal?.addEventListener('click', e => { if (e.target === logoutModal) logoutModal.classList.add('hidden'); });
    logoutConfirm?.addEventListener('click', () => {
        /* [TODO: API] POST /api/auth/logout */
        sessionStorage.removeItem('sencare_token');
        dashboardScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        document.body.style.display        = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems     = 'center';
        document.body.style.overflow       = '';
        document.body.style.minHeight      = '100vh';
        loginForm?.reset();
        sidebarPanel.classList.remove('collapsed');
        navItems.forEach(n => n.classList.remove('active'));
        document.querySelector('[data-target="dashboard-content"]')?.classList.add('active');
        tabContents.forEach(c => c.classList.add('hidden'));
        document.getElementById('dashboard-content')?.classList.remove('hidden');
        exitEditMode(true);
        logoutModal.classList.add('hidden');
    });

    /* ════════════════════════════════════════════
       13. CHANGE PASSWORD MODAL
    ════════════════════════════════════════════ */
    function openPwModal()  { setPwErr(''); passwordModal.classList.remove('hidden'); document.getElementById('curr-password')?.focus({preventScroll:true}); }
    function closePwModal() {
        passwordModal.classList.add('hidden'); setPwErr('');
        ['curr-password','new-password','confirm-password'].forEach(id => setVal(id,''));
    }
    function setPwErr(msg) {
        if (!pwModalError) return;
        pwModalError.textContent = msg;
        pwModalError.classList.toggle('visible', !!msg);
    }
    changePasswordBtn?.addEventListener('click', openPwModal);
    changePasswordBtnEdit?.addEventListener('click', openPwModal);
    modalClose?.addEventListener('click', closePwModal);
    modalCancel?.addEventListener('click', closePwModal);
    passwordModal?.addEventListener('click', e => { if (e.target === passwordModal) closePwModal(); });
    modalSubmit?.addEventListener('click', () => {
        const curr = getVal('curr-password'), newPw = getVal('new-password'), conf = getVal('confirm-password');
        if (!curr || !newPw || !conf) { setPwErr('Please fill in all fields.'); return; }
        if (newPw.length < 8)         { setPwErr('Password must be at least 8 characters.'); return; }
        if (newPw !== conf)            { setPwErr('New passwords do not match.'); return; }
        /* [TODO: API] POST /api/auth/change-password */
        closePwModal(); showToast('Password updated successfully.');
    });

    /* ════════════════════════════════════════════
       CALENDAR MODAL ENGINE
       openCalendar(inputId, title)
    ════════════════════════════════════════════ */
    let calTargetId    = null;
    let calYear        = new Date().getFullYear();
    let calMonth       = new Date().getMonth();
    let calSelectedISO = null;
    const MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

    function openCalendar(inputId, title) {
        calTargetId = inputId;
        const el  = document.getElementById(inputId);
        const val = el ? el.value : '';
        if (val) {
            const d = new Date(val + 'T00:00:00');
            calYear  = d.getFullYear(); calMonth = d.getMonth(); calSelectedISO = val;
        } else {
            const now = new Date(); calYear = now.getFullYear(); calMonth = now.getMonth(); calSelectedISO = null;
        }
        const titleEl = document.getElementById('calendar-modal-title');
        if (titleEl) titleEl.textContent = title || 'Select Date';
        renderCalDays();
        document.getElementById('calendar-modal')?.classList.remove('hidden');
    }

    function renderCalDays() {
        const label = document.getElementById('cal-month-label');
        if (label) label.textContent = MONTHS[calMonth] + ' ' + calYear;
        const daysEl = document.getElementById('cal-days');
        if (!daysEl) return;
        daysEl.innerHTML = '';
        const today     = new Date();
        const firstDay  = new Date(calYear, calMonth, 1).getDay();
        const daysInMon = new Date(calYear, calMonth + 1, 0).getDate();
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div'); blank.className = 'cal-day empty'; daysEl.appendChild(blank);
        }
        for (let d = 1; d <= daysInMon; d++) {
            const isoStr = calYear + '-' + String(calMonth+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
            const btn = document.createElement('div');
            btn.className = 'cal-day'; btn.textContent = d; btn.dataset.iso = isoStr;
            if (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()) btn.classList.add('today');
            if (isoStr === calSelectedISO) btn.classList.add('selected');
            btn.addEventListener('click', () => {
                daysEl.querySelectorAll('.cal-day').forEach(x => x.classList.remove('selected'));
                btn.classList.add('selected'); calSelectedISO = isoStr;
            });
            daysEl.appendChild(btn);
        }
    }

    document.getElementById('cal-prev')?.addEventListener('click', () => {
        calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalDays();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
        calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalDays();
    });
    document.getElementById('calendar-modal-close')?.addEventListener('click', () =>
        document.getElementById('calendar-modal')?.classList.add('hidden'));
    document.getElementById('calendar-modal-cancel')?.addEventListener('click', () =>
        document.getElementById('calendar-modal')?.classList.add('hidden'));
    document.getElementById('calendar-modal')?.addEventListener('click', e => {
        if (e.target === document.getElementById('calendar-modal'))
            document.getElementById('calendar-modal')?.classList.add('hidden');
    });
    document.getElementById('calendar-modal-confirm')?.addEventListener('click', () => {
        if (calSelectedISO && calTargetId) {
            const target = document.getElementById(calTargetId);
            if (target) { target.value = calSelectedISO; target.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        document.getElementById('calendar-modal')?.classList.add('hidden');
    });

    // Wire all calendar buttons
    document.querySelectorAll('.sp-cal-btn').forEach(btn => {
        btn.removeAttribute('onclick');
        const input   = btn.closest('.sp-date-wrap')?.querySelector('.sp-date-input');
        const inputId = input?.id;
        const labelTxt= btn.closest('.sp-field')?.querySelector('label')?.textContent?.replace(':','').trim() || 'Select Date';
        if (!inputId) return;
        btn.addEventListener('click', () => {
            const inEditMode = document.getElementById('senior-profile-content')?.classList.contains('sp-editing');
            if (!inEditMode) return;
            openCalendar(inputId, labelTxt);
        });
    });

    /* ════════════════════════════════════════════
       14. ESCAPE KEY
    ════════════════════════════════════════════ */
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (!passwordModal?.classList.contains('hidden'))                                    closePwModal();
        if (!logoutModal?.classList.contains('hidden'))                                      logoutModal.classList.add('hidden');
        if (!document.getElementById('calendar-modal')?.classList.contains('hidden'))       document.getElementById('calendar-modal')?.classList.add('hidden');
        if (!document.getElementById('camera-modal')?.classList.contains('hidden'))         closeCameraModal();
        document.getElementById('sort-dropdown')?.classList.remove('open');
    });

    /* ════════════════════════════════════════════
       15. TOAST
    ════════════════════════════════════════════ */
    let toastTimer = null;
    function showToast(msg) {
        if (!saveToast) return;
        if (saveToastText) saveToastText.textContent = msg || 'Saved.';
        saveToast.classList.remove('hidden');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => saveToast.classList.add('hidden'), 3000);
    }

    /* ════════════════════════════════════════════
       HELPERS
    ════════════════════════════════════════════ */
    function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }
    function setVal(id, value)  { const el = document.getElementById(id); if (el) el.value = value || ''; }
    function getVal(id)         { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
    function setChipText(id, value) {
        const el = document.getElementById(id); if (!el) return;
        const nodes = el.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeType === Node.TEXT_NODE) { nodes[i].textContent = value; return; }
        }
        el.appendChild(document.createTextNode(value));
    }
    const AVATAR_COLORS = ['#C7D2BA','#ABB99D','#D4C5A9','#B5C4A1','#C9BFA8','#A8B89A','#D2C2A0','#BFC9AF'];
    function avatarColor(initials) {
        let hash = 0;
        for (let i = 0; i < initials.length; i++) hash = initials.charCodeAt(i) + ((hash << 5) - hash);
        return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
    }

});
