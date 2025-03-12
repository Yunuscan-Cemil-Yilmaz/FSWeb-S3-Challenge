class Header {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.highlightCurrentPage();
        this.initMobileMenu();
    }

    highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === this.currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                }
            });
        }
    }
}

// Initialize Header
document.addEventListener('DOMContentLoaded', () => {
    new Header();
}); 