class Footer {
    constructor() {
        this.init();
    }

    getTemplate() {
        return `
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h5>ERGİNEER RESTORAN</h5>
                        <p>Lezzetin ve kalitenin buluşma noktası. 20 yıldır sizlere hizmet vermekten gurur duyuyoruz.</p>
                    </div>
                    <div class="col-md-4">
                        <h5>Hızlı Linkler</h5>
                        <ul class="footer-links">
                            <li><a href="index.html">Ana Sayfa</a></li>
                            <li><a href="menu.html">Menü</a></li>
                            <li><a href="reservation.html">Rezervasyon</a></li>
                            <li><a href="contact.html">İletişim</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h5>Bizi Takip Edin</h5>
                        <div class="social-icons">
                            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <hr class="footer-divider">
                <div class="row">
                    <div class="col-12 text-center">
                        <p class="copyright">&copy; ${new Date().getFullYear()} ERGİNEER RESTORAN. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </div>
        </footer>`;
    }

    init() {
        // Footer'ı sayfaya yerleştir
        const footerContainer = document.getElementById('footer-component');
        if (footerContainer) {
            footerContainer.innerHTML = this.getTemplate();
        }
    }
}

// Footer'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
}); 