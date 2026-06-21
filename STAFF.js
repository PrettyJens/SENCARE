/**
 * SENCARE — Staff Portal  |  script.js
 *
 * [TODO: API] markers show exactly where to wire real backend calls.
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────
       DOM REFS
    ───────────────────────────────────────── */
    const loginForm        = document.getElementById('login-form');
    const loginScreen      = document.getElementById('login-screen');
    const dashboardScreen  = document.getElementById('dashboard-screen');
    const sidebarPanel     = document.getElementById('sidebar-panel');
    const hamburgerTrigger = document.getElementById('hamburger-trigger');
    const navItems         = document.querySelectorAll('.nav-item');
    const tabContents      = document.querySelectorAll('.tab-content');
    const contentScroll    = document.querySelector('.content-scroll');
    const profileTrigger   = document.getElementById('profile-trigger');

    // Profile page elements
    const profileEditBtn   = document.getElementById('profile-edit-btn');
    const profileViewMode  = document.getElementById('profile-view-mode');
    const profileEditMode  = document.getElementById('profile-edit-mode');
    const editCancelBtn    = document.getElementById('edit-cancel-btn');
    const editSaveBtn      = document.getElementById('edit-save-btn');
    const logoutBtn        = document.getElementById('logout-btn');

    // Password modal
    const changePasswordBtn     = document.getElementById('change-password-btn');
    const changePasswordBtnEdit = document.getElementById('change-password-btn-edit');
    const passwordModal         = document.getElementById('password-modal');
    const modalClose            = document.getElementById('modal-close');
    const modalCancel           = document.getElementById('modal-cancel');
    const modalSubmit           = document.getElementById('modal-submit');
    const pwModalError          = document.getElementById('pw-modal-error');

    // Logout confirmation modal
    const logoutModal   = document.getElementById('logout-modal');
    const logoutCancel  = document.getElementById('logout-cancel');
    const logoutConfirm = document.getElementById('logout-confirm');

    // Toast
    const saveToast = document.getElementById('save-toast');

    /* ─────────────────────────────────────────
       MOCK STAFF DATA
       [TODO: API] Replace with GET /api/staff/me
       response after login. Shape must match what
       populateProfile() reads below.
    ───────────────────────────────────────── */
    const MOCK_STAFF = {
        fullName:     'Juana dela Cruz',
        firstName:    'Juana',
        initials:     'JC',
        dob:          '1988-03-14',           // ISO for <input type="date">
        dobDisplay:   'March 14, 1988',
        gender:       'Female',
        civilStatus:  'Single',
        nationality:  'Filipino',
        address:      'Blk 4 Lot 12, Sampaguita St., Brgy. San Isidro, Calabarzon',

        mobile:       '+63 917 234 5678',
        email:        'j.cruz@osca.gov.ph',
        officePhone:  '(049) 502-3344',
        emergencyName:'Maria Cruz',
        emergencyPhone:'+63 918 876 5432',

        employeeId:   'EMP-2019-0042',
        position:     'Field Officer I',
        division:     'Field Services Division',
        dateHired:    'June 3, 2019',
        empType:      'Regular / Permanent',
        supervisor:   'Engr. Ramon Dela Rosa',
        barangays:    'Brgy. San Isidro, Brgy. Maligaya, Brgy. Bagong Pook',

        oscaId:       'OSCA-2026-00482',
        role:         'Staff',
        accessLevel:  'Field Operations',
        lastLogin:    'Today, 8:12 AM',
        status:       'Active'
    };

    /* ─────────────────────────────────────────
       1. LOGIN → DASHBOARD
       [TODO: API] POST /api/auth/login
         body: { osca_id, password }
         response: { token, staff: { ...shape above } }
    ───────────────────────────────────────── */
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            /* [TODO: API]
            const oscaId   = document.getElementById('osca-id').value.trim();
            const password = document.getElementById('password').value;
            fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ osca_id: oscaId, password })
            })
            .then(r => r.json())
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('sencare_token', data.token);
                    populateProfile(data.staff);
                    showDashboard();
                } else {
                    showLoginError(data.message);
                }
            })
            .catch(err => console.error('Login error:', err));
            */

            populateProfile(MOCK_STAFF);
            showDashboard();
        });
    }

    function showDashboard() {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        document.body.style.display   = 'block';
        document.body.style.minHeight = '100vh';
        document.body.style.overflow  = 'hidden';
    }

    /* ─────────────────────────────────────────
       2. SIDEBAR COLLAPSE
    ───────────────────────────────────────── */
    if (hamburgerTrigger && sidebarPanel) {
        hamburgerTrigger.addEventListener('click', function () {
            const isCollapsed = sidebarPanel.classList.toggle('collapsed');
            hamburgerTrigger.setAttribute('aria-expanded', String(!isCollapsed));
        });
    }

    /* ─────────────────────────────────────────
       3. TAB NAVIGATION
    ───────────────────────────────────────── */
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            switchTab(this.getAttribute('data-target'));
        });
    });

    // Sidebar profile card → profile tab
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
        // Always return profile to view mode when navigating away/into it
        if (targetId === 'profile-content') {
            exitEditMode(/* silent */ true);
        }
        tabContents.forEach(c => {
            c.classList.add('hidden');
            c.style.animation = 'none';
        });
        const target = document.getElementById(targetId);
        if (target) {
            target.classList.remove('hidden');
            void target.offsetWidth;
            target.style.animation = '';
        }
        if (contentScroll) contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        loadSectionData(targetId);
    }

    /* ─────────────────────────────────────────
       4. POPULATE PROFILE (view + edit modes)
       [TODO: API] Call populateProfile(data.staff)
       with real API response. Re-call on profile tab
       open if you want live refresh.
    ───────────────────────────────────────── */
    function populateProfile(s) {
        // ── Sidebar ──
        setText('sidebar-avatar', s.initials);
        setText('sidebar-name',   s.firstName || s.fullName.split(' ')[0]);
        setText('sidebar-role',   `Staff · ${s.position}`);

        // ── Hero ──
        setText('profile-hero-avatar', s.initials);
        setText('profile-hero-name',   s.fullName);
        setText('profile-hero-role',   `Staff · ${s.position}`);
        setChipText('profile-hero-id',   s.oscaId);
        setChipText('profile-hero-dept', s.division);
        const badge = document.getElementById('profile-status-badge');
        if (badge) {
            badge.textContent = `● ${s.status}`;
            badge.className   = `profile-status-badge ${s.status === 'Active' ? 'active' : 'inactive'}`;
        }

        // ── View mode: Personal ──
        setText('pi-fullname',    s.fullName);
        setText('pi-dob',         s.dobDisplay || s.dob);
        setText('pi-gender',      s.gender);
        setText('pi-civil',       s.civilStatus);
        setText('pi-nationality', s.nationality);
        setText('pi-address',     s.address);

        // ── View mode: Contact ──
        setText('cd-mobile',    s.mobile);
        setText('cd-email',     s.email);
        setText('cd-office',    s.officePhone);
        setText('cd-emergency', `${s.emergencyName} — ${s.emergencyPhone}`);

        // ── View mode: Employment ──
        setText('ed-empid',      s.employeeId);
        setText('ed-position',   s.position);
        setText('ed-division',   s.division);
        setText('ed-hired',      s.dateHired);
        setText('ed-type',       s.empType);
        setText('ed-supervisor', s.supervisor);
        setText('ed-barangays',  s.barangays);

        // ── View mode: Account ──
        setText('aa-oscaid',    s.oscaId);
        setText('aa-role',      s.role);
        setText('aa-access',    s.accessLevel);
        setText('aa-lastlogin', s.lastLogin);
        const chip = document.getElementById('aa-status');
        if (chip) {
            chip.textContent = s.status;
            chip.className   = `status-chip ${s.status === 'Active' ? 'active' : 'inactive'}`;
        }

        // ── Edit mode: pre-fill editable fields ──
        setVal('ef-fullname',       s.fullName);
        setVal('ef-dob',            s.dob);        // ISO date
        setVal('ef-gender',         s.gender);
        setVal('ef-civil',          s.civilStatus);
        setVal('ef-nationality',    s.nationality);
        setVal('ef-address',        s.address);
        setVal('ef-mobile',         s.mobile);
        setVal('ef-email',          s.email);
        setVal('ef-office',         s.officePhone);
        setVal('ef-emergency-name', s.emergencyName);
        setVal('ef-emergency-phone',s.emergencyPhone);

        // ── Edit mode: read-only employment/account mirrors ──
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
        if (roStatus) {
            roStatus.textContent = s.status;
            roStatus.className   = `status-chip ${s.status === 'Active' ? 'active' : 'inactive'}`;
        }
    }

    // Helpers
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
    function setVal(id, value) {
        const el = document.getElementById(id);
        if (el) el.value = value || '';
    }
    function getVal(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }
    // For chips that contain an SVG icon + text node at the end
    function setChipText(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const nodes = el.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeType === Node.TEXT_NODE) {
                nodes[i].textContent = value;
                return;
            }
        }
        el.appendChild(document.createTextNode(value));
    }

    /* ─────────────────────────────────────────
       5. EDIT / SAVE / CANCEL
       [TODO: API] PATCH /api/staff/me
         body: { fullName, dob, gender, civilStatus,
                 nationality, address, mobile, email,
                 officePhone, emergencyName, emergencyPhone }
    ───────────────────────────────────────── */
    const EDITABLE_FIELD_IDS = [
        'ef-fullname', 'ef-dob', 'ef-gender', 'ef-civil', 'ef-nationality',
        'ef-address', 'ef-mobile', 'ef-email', 'ef-office',
        'ef-emergency-name', 'ef-emergency-phone'
    ];

    if (profileEditBtn) {
        profileEditBtn.addEventListener('click', enterEditMode);
    }
    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', function () { exitEditMode(false); });
    }
    if (editSaveBtn) {
        editSaveBtn.addEventListener('click', saveProfile);
    }

    // Clear a field's error state as soon as the person edits it
    EDITABLE_FIELD_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => clearFieldError(id));
        el.addEventListener('change', () => clearFieldError(id));
    });

    function enterEditMode() {
        clearAllFieldErrors();
        profileViewMode.classList.add('hidden');
        profileEditMode.classList.remove('hidden');
        profileEditBtn.style.display = 'none';
        contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        const firstField = document.getElementById('ef-fullname');
        if (firstField) firstField.focus({ preventScroll: true });
    }

    function exitEditMode(silent) {
        if (profileEditMode.classList.contains('hidden')) return; // already in view mode
        clearAllFieldErrors();
        // Re-fill fields from the last saved state, discarding any
        // unsaved edits so Cancel truly cancels.
        populateProfile(MOCK_STAFF);
        profileEditMode.classList.add('hidden');
        profileViewMode.classList.remove('hidden');
        profileEditBtn.style.display = '';
        if (!silent && contentScroll) {
            contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function setFieldError(id, hasError) {
        const wrap = document.getElementById(id + '-field');
        if (wrap) wrap.classList.toggle('has-error', hasError);
    }
    function clearFieldError(id) { setFieldError(id, false); }
    function clearAllFieldErrors() {
        ['ef-fullname', 'ef-mobile', 'ef-email'].forEach(clearFieldError);
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function saveProfile() {
        clearAllFieldErrors();

        const updated = {
            fullName:      getVal('ef-fullname'),
            dob:           getVal('ef-dob'),
            gender:        getVal('ef-gender'),
            civilStatus:   getVal('ef-civil'),
            nationality:   getVal('ef-nationality'),
            address:       getVal('ef-address'),
            mobile:        getVal('ef-mobile'),
            email:         getVal('ef-email'),
            officePhone:   getVal('ef-office'),
            emergencyName: getVal('ef-emergency-name'),
            emergencyPhone:getVal('ef-emergency-phone'),
        };

        // Inline validation — highlight every invalid field at once
        // rather than blocking on the first alert().
        let hasError = false;
        let firstInvalidId = null;

        if (!updated.fullName) {
            setFieldError('ef-fullname', true);
            hasError = true;
            firstInvalidId = firstInvalidId || 'ef-fullname';
        }
        if (!updated.mobile) {
            setFieldError('ef-mobile', true);
            hasError = true;
            firstInvalidId = firstInvalidId || 'ef-mobile';
        }
        if (!updated.email || !isValidEmail(updated.email)) {
            setFieldError('ef-email', true);
            hasError = true;
            firstInvalidId = firstInvalidId || 'ef-email';
        }

        if (hasError) {
            const el = document.getElementById(firstInvalidId);
            if (el) el.focus({ preventScroll: false });
            return;
        }

        /* [TODO: API]
        fetch('/api/staff/me', {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify(updated)
        })
        .then(r => r.json())
        .then(data => {
            if (data.staff) {
                populateProfile(data.staff);
                exitEditMode(true);
                showToast('Profile updated successfully.');
            } else {
                // surface server-side validation errors per field here
            }
        })
        .catch(err => { console.error(err); showToast('Network error. Please try again.'); });
        */

        // Static mock: merge updates into MOCK_STAFF & repopulate
        Object.assign(MOCK_STAFF, updated);
        // Convert ISO date back to display format for view mode
        if (updated.dob) {
            const d = new Date(updated.dob + 'T00:00:00');
            MOCK_STAFF.dobDisplay = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        // Reflect first name change in initials/sidebar
        const parts = updated.fullName.trim().split(/\s+/);
        MOCK_STAFF.firstName = parts[0];
        MOCK_STAFF.initials  = parts.map(p => p[0]).slice(0, 2).join('').toUpperCase();

        populateProfile(MOCK_STAFF);
        profileEditMode.classList.add('hidden');
        profileViewMode.classList.remove('hidden');
        profileEditBtn.style.display = '';
        contentScroll.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Profile updated successfully.');
    }

    /* ─────────────────────────────────────────
       6. LOGOUT — with confirmation modal
       Clicking "Log Out" never logs the person out
       immediately; it always opens a confirmation
       dialog first. Only "Yes, Log Out" ends the
       session — "Stay Logged In", the backdrop, the
       close (×), or Escape all cancel safely.
    ───────────────────────────────────────── */
    if (logoutBtn)     logoutBtn.addEventListener('click', openLogoutModal);
    if (logoutCancel)  logoutCancel.addEventListener('click', closeLogoutModal);
    if (logoutConfirm) logoutConfirm.addEventListener('click', confirmLogout);

    function openLogoutModal()  { logoutModal.classList.remove('hidden'); }
    function closeLogoutModal() { logoutModal.classList.add('hidden'); }

    function confirmLogout() {
        /* [TODO: API]
        fetch('/api/auth/logout', { method: 'POST', headers: authHeaders() })
        .finally(() => {
            sessionStorage.removeItem('sencare_token');
            doLogout();
        });
        */
        doLogout();
    }

    function doLogout() {
        sessionStorage.removeItem('sencare_token');

        // Hide dashboard, show login, reset body styles
        dashboardScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        document.body.style.display        = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems     = 'center';
        document.body.style.overflow       = '';
        document.body.style.minHeight      = '100vh';

        // Reset login form
        const lf = document.getElementById('login-form');
        if (lf) lf.reset();

        // Reset sidebar & tab state
        sidebarPanel.classList.remove('collapsed');
        navItems.forEach(n => n.classList.remove('active'));
        document.querySelector('[data-target="dashboard-content"]')?.classList.add('active');
        tabContents.forEach(c => c.classList.add('hidden'));
        document.getElementById('dashboard-content')?.classList.remove('hidden');

        // Always leave profile in view mode for next login
        exitEditMode(true);

        // Close modal
        closeLogoutModal();
    }

    // Close logout modal on backdrop click
    if (logoutModal) {
        logoutModal.addEventListener('click', e => { if (e.target === logoutModal) closeLogoutModal(); });
    }

    /* ─────────────────────────────────────────
       7. CHANGE PASSWORD MODAL
       [TODO: API] POST /api/auth/change-password
         body: { current_password, new_password }
    ───────────────────────────────────────── */
    function openPasswordModal()  {
        setPwModalError('');
        passwordModal.classList.remove('hidden');
        const first = document.getElementById('curr-password');
        if (first) first.focus({ preventScroll: true });
    }
    function closePasswordModal() {
        passwordModal.classList.add('hidden');
        setPwModalError('');
        ['curr-password','new-password','confirm-password'].forEach(id => setVal(id, ''));
    }
    function setPwModalError(msg) {
        if (!pwModalError) return;
        pwModalError.textContent = msg || '';
        pwModalError.classList.toggle('visible', !!msg);
    }

    if (changePasswordBtn)     changePasswordBtn.addEventListener('click', openPasswordModal);
    if (changePasswordBtnEdit) changePasswordBtnEdit.addEventListener('click', openPasswordModal);
    if (modalClose)  modalClose.addEventListener('click', closePasswordModal);
    if (modalCancel) modalCancel.addEventListener('click', closePasswordModal);
    if (passwordModal) {
        passwordModal.addEventListener('click', e => { if (e.target === passwordModal) closePasswordModal(); });
    }

    if (modalSubmit) {
        modalSubmit.addEventListener('click', function () {
            const curr    = getVal('curr-password');
            const newPw   = getVal('new-password');
            const confirm = getVal('confirm-password');

            if (!curr || !newPw || !confirm) { setPwModalError('Please fill in all fields.'); return; }
            if (newPw.length < 8)            { setPwModalError('Password must be at least 8 characters.'); return; }
            if (newPw !== confirm)           { setPwModalError('New passwords do not match.'); return; }

            /* [TODO: API]
            fetch('/api/auth/change-password', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ current_password: curr, new_password: newPw })
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) { closePasswordModal(); showToast('Password updated successfully.'); }
                else { setPwModalError(data.message || 'Failed to update password.'); }
            });
            */

            closePasswordModal();
            showToast('Password updated successfully.');
        });
    }

    /* ─────────────────────────────────────────
       8. GLOBAL ESCAPE KEY
    ───────────────────────────────────────── */
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (!passwordModal.classList.contains('hidden')) closePasswordModal();
        if (!logoutModal.classList.contains('hidden'))   closeLogoutModal();
    });

    /* ─────────────────────────────────────────
       9. SUCCESS TOAST
    ───────────────────────────────────────── */
    let toastTimer = null;
    const saveToastText = document.getElementById('save-toast-text');
    function showToast(msg) {
        if (!saveToast) return;
        if (saveToastText) {
            saveToastText.textContent = msg || 'Profile updated successfully.';
        }
        saveToast.classList.remove('hidden');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => saveToast.classList.add('hidden'), 3000);
    }

    /* ─────────────────────────────────────────
       10. SECTION DATA LOADERS (stubs)
       [TODO: API] Uncomment & wire each case.
    ───────────────────────────────────────── */
    const loadedSections = new Set();

    function loadSectionData(id) {
        if (loadedSections.has(id)) return;
        loadedSections.add(id);
        switch (id) {
            case 'request-content':
                /* [TODO: API] fetch('/api/requests?status=pending', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderRequestQueue(d.requests)); */
                break;
            case 'senior-content':
                /* [TODO: API] fetch('/api/seniors?page=1&limit=20', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderSeniorDirectory(d.seniors)); */
                break;
            case 'priority-content':
                /* [TODO: API] fetch('/api/priority-cases', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderPriorityCases(d.cases)); */
                break;
            case 'home-content':
                /* [TODO: API] fetch('/api/home-visits?date=today', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderVisitSchedule(d.visits)); */
                break;
            case 'updates-content':
                /* [TODO: API] fetch('/api/notifications?unread=true', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderNotifications(d.notifications)); */
                break;
            case 'photo-content':
                /* [TODO: API] fetch('/api/photo-verifications?status=pending', { headers: authHeaders() })
                   .then(r => r.json()).then(d => renderPhotoQueue(d.photos)); */
                break;
            case 'profile-content':
                /* [TODO: API] Refresh on every profile visit:
                fetch('/api/staff/me', { headers: authHeaders() })
                   .then(r => r.json()).then(d => populateProfile(d.staff)); */
                break;
        }
    }

    function authHeaders() {
        const token = sessionStorage.getItem('sencare_token') || '';
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    }

});
