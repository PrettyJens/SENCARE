document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    const sidebarPanel = document.getElementById('sidebar-panel');
    const hamburgerTrigger = document.getElementById('hamburger-trigger');
    
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // 1. Login Function Trigger
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            loginScreen.style.display = 'none';
            dashboardScreen.classList.remove('hidden');
            document.body.style.alignItems = 'stretch';
            document.body.style.padding = '0';
        });
    }

    // 🌟 2. Collapse/Minimize Sidebar Functionality (3 Lines Hamburger Button Click)
    if (hamburgerTrigger && sidebarPanel) {
        hamburgerTrigger.addEventListener('click', function() {
            sidebarPanel.classList.toggle('collapsed');
        });
    }

    // 3. Navigation Click States with Dark Indicator
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Alisin ang active class at indicator sa lahat
            navItems.forEach(nav => nav.classList.remove('active'));
            // Ilagay ang dark background selector sa piniling menu
            this.classList.add('active');

            // Palitan ang content views sa screen area
            tabContents.forEach(content => content.classList.add('hidden'));
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
});
