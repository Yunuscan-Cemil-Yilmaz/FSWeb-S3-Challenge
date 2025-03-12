class Header {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    getTemplate() {
        return `
        <div class="header-area">
            <div class="bg-gradient bg-secondary w-100">
                <header>
                    <nav class="navbar navbar-expand-lg navbar-custom">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="index.html">ERGİNEER RESTORAN</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link ${this.currentPage === 'index.html' ? 'active' : ''}" href="index.html">Ana Sayfa</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${this.currentPage === 'menu.html' ? 'active' : ''}" href="menu.html">Menü</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${this.currentPage === 'reservation.html' ? 'active' : ''}" href="reservation.html">Rezervasyon</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${this.currentPage === 'contact.html' ? 'active' : ''}" href="contact.html">İletişim</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>`;
    }

    init() {
        // Header'ı sayfaya yerleştir
        const headerContainer = document.getElementById('header-component');
        if (headerContainer) {
            headerContainer.innerHTML = this.getTemplate();
        }

        this.initMobileMenu();
    }

    initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
            });

            // Dışarı tıklandığında menüyü kapat
            document.addEventListener('click', (e) => {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                }
            });
        }
    }
}

// Header'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    new Header();
}); 