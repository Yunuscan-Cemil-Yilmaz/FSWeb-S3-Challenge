class ReservationForm {
    constructor() {
        this.form = document.getElementById('reservationForm');
        this.inputs = {
            name: document.getElementById('name'),
            phone: document.getElementById('phone'),
            email: document.getElementById('email'),
            guests: document.getElementById('guests'),
            date: document.getElementById('date'),
            time: document.getElementById('time'),
            notes: document.getElementById('notes')
        };
        
        this.initializeValidation();
        this.initializeDateTimeConstraints();
        this.initializeLocalStorage();
        this.loadPreviousReservations();
    }

    initializeValidation() {
        // Real-time validation
        this.inputs.name.addEventListener('input', () => this.validateName());
        this.inputs.phone.addEventListener('input', () => this.validatePhone());
        this.inputs.email.addEventListener('input', () => this.validateEmail());
        
        // Form submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateName() {
        const name = this.inputs.name.value.trim();
        if (name.length < 3) {
            this.showError(this.inputs.name, 'İsim en az 3 karakter olmalıdır');
            return false;
        }
        this.showSuccess(this.inputs.name);
        return true;
    }

    validatePhone() {
        const phone = this.inputs.phone.value.replace(/\D/g, '');
        if (phone.length !== 10) {
            this.showError(this.inputs.phone, 'Geçerli bir telefon numarası giriniz');
            return false;
        }
        // Format phone number
        this.inputs.phone.value = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        this.showSuccess(this.inputs.phone);
        return true;
    }

    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.inputs.email.value)) {
            this.showError(this.inputs.email, 'Geçerli bir e-posta adresi giriniz');
            return false;
        }
        this.showSuccess(this.inputs.email);
        return true;
    }

    showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || 
                        document.createElement('div');
        
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    showSuccess(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    initializeDateTimeConstraints() {
        // Set min date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.inputs.date.min = tomorrow.toISOString().split('T')[0];
        
        // Set working hours
        this.inputs.time.addEventListener('focus', () => {
            this.inputs.time.min = '10:00';
            this.inputs.time.max = '22:00';
        });

        // Validate selected time
        this.inputs.time.addEventListener('change', () => this.validateTime());
    }

    validateTime() {
        const selectedTime = this.inputs.time.value;
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        if (timeInMinutes < 600 || timeInMinutes > 1320) { // 10:00 - 22:00
            this.showError(this.inputs.time, 'Lütfen 10:00 - 22:00 arasında bir saat seçin');
            return false;
        }
        this.showSuccess(this.inputs.time);
        return true;
    }

    initializeLocalStorage() {
        if (!localStorage.getItem('reservations')) {
            localStorage.setItem('reservations', JSON.stringify([]));
        }
    }

    loadPreviousReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        if (reservations.length > 0) {
            this.showPreviousReservations(reservations);
        }
    }

    showPreviousReservations(reservations) {
        const container = document.createElement('div');
        container.className = 'previous-reservations mt-4';
        container.innerHTML = `
            <h4 class="text-center mb-3">Önceki Rezervasyonlarınız</h4>
            <div class="list-group">
                ${reservations.map(res => `
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${res.date} - ${res.time}</h6>
                            <small>${res.guests} Kişi</small>
                        </div>
                        <p class="mb-1">${res.name}</p>
                        <small class="text-muted">${res.phone}</small>
                    </div>
                `).join('')}
            </div>
        `;
        this.form.parentElement.appendChild(container);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = this.validateName() && 
                       this.validatePhone() && 
                       this.validateEmail() &&
                       this.validateTime();

        if (isValid) {
            // Collect form data
            const formData = {
                name: this.inputs.name.value,
                phone: this.inputs.phone.value,
                email: this.inputs.email.value,
                guests: this.inputs.guests.value,
                date: this.inputs.date.value,
                time: this.inputs.time.value,
                notes: this.inputs.notes.value,
                id: Date.now()
            };

            // Save to localStorage
            const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservations.push(formData);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Show success notification
            this.showNotification('success', 'Rezervasyonunuz başarıyla kaydedildi!');
            
            // Reset form
            this.form.reset();
            Object.values(this.inputs).forEach(input => {
                input.classList.remove('is-valid');
            });

            // Reload previous reservations
            location.reload();
        }
    }

    showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        notification.style.zIndex = '1050';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    new ReservationForm();
}); 