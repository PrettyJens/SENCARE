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
        {initials:'MA', name:'Aquino, Manuel',  id:'SC-2024-001', age:77, barangay:'Manahita',  civil:'Widowed',   living:'With Family',  health:'Hypertension',            mobility:'Limited Mobility', priority:'Low',    vulnScore:20, vulnMax:100, status:'Active'},
        {initials:'EA', name:'Aquino, Ramon',   id:'SC-2024-002', age:81, barangay:'Manahita',  civil:'Widowed',   living:'Lives Alone',  health:'Dementia, Hypertension',  mobility:'# Uses Aid',       priority:'High',   vulnScore:37, vulnMax:100, status:'Active'},
        {initials:'LB', name:'Bautista, Luz',   id:'SC-2024-003', age:70, barangay:'San Rafael',civil:'Separated', living:'With Family',  health:'Osteoporosis',            mobility:'Limited Mobility', priority:'Low',    vulnScore:30, vulnMax:100, status:'Active'},
        {initials:'MB', name:'Bautista, Marie', id:'SC-2024-004', age:62, barangay:'Sta. Cruz', civil:'Single',    living:'Care Facility',health:'Arthritis, Diabetes',      mobility:'# Independent',    priority:'Low',    vulnScore:23, vulnMax:100, status:'Inactive'},
        {initials:'MB', name:'Bautista, Miguel',id:'SC-2024-005', age:60, barangay:'San Rafael',civil:'Widowed',   living:'With Spouse',  health:'Diabetes',                mobility:'Limited Mobility', priority:'Low',    vulnScore:30, vulnMax:100, status:'Active'},
        {initials:'FC', name:'Castro, Fernando',id:'SC-2024-006', age:86, barangay:'San Rafael',civil:'Married',   living:'Lives Alone',  health:'Arthritis, Diabetes',      mobility:'Limited Mobility', priority:'Medium', vulnScore:37, vulnMax:100, status:'Active'},
        {initials:'LC', name:'Castro, Luz',     id:'SC-2024-007', age:71, barangay:'Nalatao',   civil:'Single',    living:'With Family',  health:'Hypertension',            mobility:'# Independent',    priority:'Low',    vulnScore:30, vulnMax:100, status:'Active'},
        {initials:'MC', name:'Cruz, Maria',     id:'SC-2024-008', age:88, barangay:'Manahita',  civil:'Married',   living:'With Family',  health:'Stroke, Hypertension',    mobility:'# Independent',    priority:'Medium', vulnScore:45, vulnMax:100, status:'Active'},
        {initials:'RC', name:'Cruz, Ricardo',   id:'SC-2024-009', age:80, barangay:'Banderos',  civil:'Widowed',   living:'With Spouse',  health:'Hypertension',            mobility:'# Independent',    priority:'Low',    vulnScore:30, vulnMax:100, status:'Active'},
        {initials:'RC', name:'Cruz, Ricardo',   id:'SC-2024-010', age:60, barangay:'Sto. Tomas Proper',civil:'Widowed',living:'With Spouse',health:'Arthritis, Diabetes', mobility:'# Independent',    priority:'Low',    vulnScore:32, vulnMax:100, status:'Inactive'},
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
        renderRequests(MOCK_REQUESTS);
        renderSeniors(MOCK_SENIORS);
        renderPriority(MOCK_PRIORITY);
        renderHomeVisits(MOCK_HV);
        renderPhotos(MOCK_PHOTOS);
        setupNotifications();
        setupSeniorFilters();
        setupHomeVisitFilters();
        setupPhotoFilters();
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
    function renderSeniors(data) {
        const tbody = document.getElementById('senior-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(s => {
            const priCls   = s.priority === 'High' ? 'badge-high' : s.priority === 'Medium' ? 'badge-medium' : 'badge-low';
            const statCls  = s.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const vulnCls  = s.priority === 'High' ? 'high' : s.priority === 'Medium' ? 'medium' : 'low';
            const avatarBg = avatarColor(s.initials);
            const pct      = Math.round((s.vulnScore / s.vulnMax) * 100);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="display:flex;align-items:center;gap:8px">
                        <div class="senior-avatar" style="background:${avatarBg}">${s.initials}</div>
                        <div><div style="font-weight:700;font-size:0.82rem">${s.name}</div><div style="font-size:0.72rem;color:var(--ink-faint)">${s.id}</div></div>
                    </div>
                </td>
                <td>${s.age} yo</td>
                <td>${s.barangay}</td>
                <td>${s.civil}</td>
                <td>${s.living}</td>
                <td>${s.health}</td>
                <td>${s.mobility}</td>
                <td><span class="badge ${priCls}">${s.priority}</span></td>
                <td>
                    <div class="vuln-bar-wrap">
                        <div class="vuln-bar"><div class="vuln-fill ${vulnCls}" style="width:${pct}%"></div></div>
                        <span class="vuln-score-txt">${s.vulnScore}/${s.vulnMax}</span>
                    </div>
                </td>
                <td><span class="badge ${statCls}">${s.status}</span></td>
                <td>
                    <button class="tbl-icon-btn" title="View profile" data-senior-id="${s.id}">
                        <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="2.8" stroke="currentColor" stroke-width="1.5"/><path d="M3 16C3 12.7 5.7 10.5 9 10.5C12.3 10.5 15 12.7 15 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </button>
                    <button class="tbl-icon-btn" title="Edit" data-edit-id="${s.id}">
                        <svg viewBox="0 0 18 18" fill="none"><path d="M11 3.5L14.5 7L6 15.5H2.5V12L11 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                    </button>
                </td>`;
            tbody.appendChild(tr);
        });

        // View profile click
        tbody.querySelectorAll('[data-senior-id]').forEach(btn => {
            btn.addEventListener('click', () => openSeniorProfile(btn.dataset.seniorId));
        });
    }

    function setupSeniorFilters() {
        document.getElementById('senior-search')?.addEventListener('input', filterSeniors);
        document.getElementById('senior-filter-apply')?.addEventListener('click', filterSeniors);
        document.getElementById('senior-filter-clear')?.addEventListener('click', () => {
            ['sf-barangay','sf-age','sf-sex','sf-civil','sf-living','sf-health','sf-mobility','sf-priority','sf-status','senior-search']
                .forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
            renderSeniors(MOCK_SENIORS);
        });
        document.getElementById('senior-filter-toggle')?.addEventListener('click', function() {
            const body = document.getElementById('senior-filter-body');
            const collapsed = body.style.display === 'none';
            body.style.display = collapsed ? '' : 'none';
            this.textContent  = collapsed ? 'Collapse' : 'Expand';
        });
        // Add record
        document.getElementById('senior-add-btn')?.addEventListener('click', () => {
            openSeniorProfile(null); // null = new record
        });
    }

    function filterSeniors() {
        const q = (document.getElementById('senior-search')?.value || '').toLowerCase();
        const brgy = (document.getElementById('sf-barangay')?.value || '').toLowerCase();
        const prio = (document.getElementById('sf-priority')?.value || '').toLowerCase();
        const stat = (document.getElementById('sf-status')?.value || '').toLowerCase();
        const filtered = MOCK_SENIORS.filter(s =>
            (!q    || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
         && (!brgy || s.barangay.toLowerCase().includes(brgy))
         && (!prio || s.priority.toLowerCase().includes(prio))
         && (!stat || s.status.toLowerCase().includes(stat))
        );
        renderSeniors(filtered);
    }

    /* Open senior profile sub-page */
    function openSeniorProfile(seniorId) {
        const s = seniorId ? MOCK_SENIORS.find(x => x.id === seniorId) : null;
        // Populate fields
        setValue('sp-fullname',    s ? s.name    : '');
        setValue('sp-dob',         s ? 'March 14, 1985' : '');
        setValue('sp-age',         s ? s.age + ' years old' : '');
        setValue('sp-sex',         s ? (s.initials[0] === 'M' ? 'Male' : 'Female') : '');
        setValue('sp-civil',       s ? s.civil   : '');
        setValue('sp-contact',     s ? '+63 917 000 0000' : '');
        setValue('sp-seniorid',    s ? s.id      : '');
        setValue('sp-govid',       s ? 'PSN-000000' : '');
        setValue('sp-barangay',    s ? s.barangay : '');
        setValue('sp-living',      s ? s.living  : '');
        setValue('sp-address',     s ? '123 Main St., ' + s.barangay : '');
        setValue('sp-rep',         s ? 'N/A' : '');
        setValue('sp-health',      s ? s.health  : '');
        setValue('sp-mobility',    s ? s.mobility : '');
        setValue('sp-lasthv',      s ? 'May 1, 2026' : '');
        setValue('sp-equipment',   s ? 'Wheelchair' : '');
        setValue('sp-accstatus',   s ? s.status  : '');
        setValue('sp-vulnscore',   s ? s.vulnScore + '/' + s.vulnMax : '');
        setValue('sp-prioritylevel', s ? s.priority + ' Priority' : '');
        switchTab('senior-profile-content');
    }

    function setValue(id, val) {
        const el = document.getElementById(id);
        if (el) el.value = val;
    }

    document.getElementById('sp-back-btn')?.addEventListener('click', () => switchTab('senior-content'));
    document.getElementById('senior-profile-edit-btn')?.addEventListener('click', function() {
        document.querySelectorAll('.sp-input').forEach(el => el.removeAttribute('readonly'));
        this.textContent = 'EDITING…';
        this.disabled = true;
    });
    document.getElementById('sp-save-btn')?.addEventListener('click', () => {
        /* [TODO: API] PATCH /api/seniors/:id */
        document.querySelectorAll('.sp-input').forEach(el => el.setAttribute('readonly', true));
        const editBtn = document.getElementById('senior-profile-edit-btn');
        if (editBtn) { editBtn.innerHTML = '<svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>EDIT'; editBtn.disabled = false; }
        showToast('Senior record saved.');
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
        const filtered = MOCK_PRIORITY.filter(p =>
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
            const statCls = 'badge-scheduled';
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
    }

    function setupHomeVisitFilters() {
        document.getElementById('hv-search')?.addEventListener('input', filterHV);
        document.querySelectorAll('.filter-apply-btn').forEach(btn => {
            if (btn.closest('#home-content')) btn.addEventListener('click', filterHV);
        });
    }
    function filterHV() {
        const q = (document.getElementById('hv-search')?.value || '').toLowerCase();
        const filtered = MOCK_HV.filter(v =>
            !q || v.name.toLowerCase().includes(q) || v.id.toLowerCase().includes(q)
        );
        renderHomeVisits(filtered);
    }

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
        setText('sidebar-avatar', s.initials);
        setText('sidebar-name',   s.firstName || s.fullName.split(' ')[0]);
        setText('sidebar-role',   `Staff · ${s.position}`);
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
       14. ESCAPE KEY
    ════════════════════════════════════════════ */
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (!passwordModal?.classList.contains('hidden')) closePwModal();
        if (!logoutModal?.classList.contains('hidden'))  logoutModal.classList.add('hidden');
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
