/* =======================================================
   THE GRAND IVORY — HOTEL BOOKING SYSTEM
   Main JavaScript: Validation, Pricing, Progress, Toasts
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 0. SHARED FEATURES (Preloader, Cursor, Menu)
  // =============================================

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    // Fallback: hide after 3 seconds regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // --- Cursor Glow ---
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });
  }

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Navbar Scroll ---
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // --- Scroll Reveal (Intersection Observer) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  // --- Back to Top ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =============================================
  // 1. TOAST NOTIFICATION SYSTEM
  // =============================================
  const toastContainer = document.getElementById('toast-container');

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {'success'|'error'|'info'} type - Type of toast
   * @param {number} duration - Duration in ms
   */
  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || icons.info}</span>
      <span class="toast__msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto-dismiss
    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }


  // =============================================
  // 2. BAIL OUT IF NOT ON BOOKING PAGE
  // =============================================
  const form = document.getElementById('booking-form');
  if (!form) return;


  // =============================================
  // 3. DOM REFERENCES
  // =============================================
  const fullNameInput = document.getElementById('fullName');
  const emailInput    = document.getElementById('email');
  const phoneInput    = document.getElementById('phone');
  const guestsInput   = document.getElementById('guests');
  const addressInput  = document.getElementById('address');
  const checkinInput  = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const dayCountDiv   = document.getElementById('day-count');
  const dayCountText  = document.getElementById('day-count-text');
  const roomRadios    = document.querySelectorAll('input[name="roomType"]');
  const amenityChecks = document.querySelectorAll('.amenity-item input[type="checkbox"]');

  // Price summary
  const priceSummarySection = document.getElementById('price-summary-section');
  const summaryRoom         = document.getElementById('summary-room');
  const summaryNights       = document.getElementById('summary-nights');
  const summaryRoomTotal    = document.getElementById('summary-room-total');
  const summaryAmenities    = document.getElementById('summary-amenities');
  const summaryTotal        = document.getElementById('summary-total');

  // Progress steps
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
  ];
  const lines = [
    document.getElementById('line-1'),
    document.getElementById('line-2'),
    document.getElementById('line-3'),
  ];


  // =============================================
  // 4. SET MINIMUM DATES
  // =============================================
  const today = new Date().toISOString().split('T')[0];
  checkinInput.setAttribute('min', today);
  checkoutInput.setAttribute('min', today);


  // =============================================
  // 5. UTILITY FUNCTIONS
  // =============================================

  function showError(fieldId, message) {
    const input   = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (input) { input.classList.add('error'); input.classList.remove('valid'); }
    if (errorEl) {
      if (message) errorEl.textContent = '⚠ ' + message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(fieldId) {
    const input   = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  function markValid(fieldId) {
    const input = document.getElementById(fieldId);
    if (input) { input.classList.remove('error'); input.classList.add('valid'); }
    clearError(fieldId);
  }

  function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  function calculateDays(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate) - new Date(startDate);
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }


  // =============================================
  // 6. PROGRESS STEPS TRACKER
  // =============================================

  function updateProgressSteps() {
    // Step 1: Guest details filled
    const guestFilled = fullNameInput.value.trim() &&
                        emailInput.value.trim() &&
                        phoneInput.value.trim() &&
                        guestsInput.value;

    // Step 2: Dates filled
    const datesFilled = checkinInput.value && checkoutInput.value &&
                        calculateDays(checkinInput.value, checkoutInput.value) > 0;

    // Step 3: Room selected
    let roomSelected = false;
    roomRadios.forEach(r => { if (r.checked) roomSelected = true; });

    // Update step states
    const completions = [guestFilled, datesFilled, roomSelected];

    steps.forEach((step, i) => {
      if (i === 0) {
        // First step is always active
        step.classList.add('active');
        if (completions[0]) {
          step.classList.add('completed');
          step.querySelector('.progress-step__circle').textContent = '✓';
        } else {
          step.classList.remove('completed');
          step.querySelector('.progress-step__circle').textContent = '1';
        }
        return;
      }

      if (i <= 3) {
        const prevDone = completions.slice(0, i).every(Boolean);

        if (i < 3 && completions[i]) {
          step.classList.add('completed', 'active');
          step.querySelector('.progress-step__circle').textContent = '✓';
        } else if (prevDone) {
          step.classList.add('active');
          step.classList.remove('completed');
          step.querySelector('.progress-step__circle').textContent = (i + 1).toString();
        } else {
          step.classList.remove('active', 'completed');
          step.querySelector('.progress-step__circle').textContent = (i + 1).toString();
        }
      }
    });

    // Update connecting lines
    lines.forEach((line, i) => {
      if (completions[i]) {
        line.classList.add('completed');
        line.classList.remove('active');
      } else if (i === 0 || completions.slice(0, i).every(Boolean)) {
        line.classList.add('active');
        line.classList.remove('completed');
      } else {
        line.classList.remove('active', 'completed');
      }
    });
  }


  // =============================================
  // 7. LIVE PRICE CALCULATION
  // =============================================

  function updatePriceSummary() {
    const days = calculateDays(checkinInput.value, checkoutInput.value);

    let roomPrice = 0, roomSelected = false;
    roomRadios.forEach(radio => {
      if (radio.checked) {
        roomPrice = parseInt(radio.dataset.price, 10);
        roomSelected = true;
      }
    });

    let amenityTotal = 0;
    amenityChecks.forEach(cb => {
      if (cb.checked) amenityTotal += parseInt(cb.dataset.price, 10);
    });

    const roomSubtotal = roomPrice * days;
    const grandTotal   = roomSubtotal + amenityTotal;

    if (roomSelected && days > 0) {
      priceSummarySection.style.display = 'block';
      // Animate the section in
      priceSummarySection.style.animation = 'fadeInUp 0.5s var(--ease-out)';
      summaryRoom.textContent       = formatCurrency(roomPrice) + '/night';
      summaryNights.textContent     = days + (days === 1 ? ' night' : ' nights');
      summaryRoomTotal.textContent  = formatCurrency(roomSubtotal);
      summaryAmenities.textContent  = formatCurrency(amenityTotal);
      summaryTotal.textContent      = formatCurrency(grandTotal);
    } else {
      priceSummarySection.style.display = 'none';
    }

    return { roomPrice, days, amenityTotal, grandTotal };
  }


  // =============================================
  // 8. LIVE DAY COUNT
  // =============================================

  function updateDayCount() {
    const days = calculateDays(checkinInput.value, checkoutInput.value);
    if (days > 0) {
      dayCountDiv.style.display = 'block';
      dayCountText.textContent  = `Your stay: ${days} night${days > 1 ? 's' : ''}`;
    } else {
      dayCountDiv.style.display = 'none';
    }
  }


  // =============================================
  // 9. EVENT LISTENERS
  // =============================================

  // Check-in date
  checkinInput.addEventListener('change', () => {
    if (checkinInput.value) {
      checkoutInput.setAttribute('min', checkinInput.value);
      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = '';
      }
      markValid('checkin');
    }
    clearError('checkin');
    updateDayCount();
    updatePriceSummary();
    updateProgressSteps();
  });

  // Check-out date
  checkoutInput.addEventListener('change', () => {
    if (checkoutInput.value && checkinInput.value && checkoutInput.value > checkinInput.value) {
      markValid('checkout');
    }
    clearError('checkout');
    updateDayCount();
    updatePriceSummary();
    updateProgressSteps();
  });

  // Room radios
  roomRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const roomError = document.getElementById('room-error');
      if (roomError) roomError.classList.remove('visible');
      updatePriceSummary();
      updateProgressSteps();
      showToast(`${radio.value.charAt(0).toUpperCase() + radio.value.slice(1)} Room selected!`, 'success', 2000);
    });
  });

  // Amenity checkboxes
  amenityChecks.forEach(cb => {
    cb.addEventListener('change', () => {
      updatePriceSummary();
      if (cb.checked) {
        showToast(`${cb.value} added to your stay`, 'info', 2000);
      }
    });
  });

  // Real-time validation on blur for text fields
  fullNameInput.addEventListener('blur', () => {
    if (fullNameInput.value.trim()) markValid('fullName');
    else showError('fullName', 'Full name is required');
    updateProgressSteps();
  });

  emailInput.addEventListener('blur', () => {
    const v = emailInput.value.trim();
    if (v && v.includes('@') && v.includes('.')) markValid('email');
    else if (v) showError('email', 'Enter a valid email address');
    updateProgressSteps();
  });

  phoneInput.addEventListener('blur', () => {
    if (/^\d{10}$/.test(phoneInput.value.trim())) markValid('phone');
    else if (phoneInput.value.trim()) showError('phone', 'Enter a valid 10-digit phone number');
    updateProgressSteps();
  });

  guestsInput.addEventListener('blur', () => {
    const v = parseInt(guestsInput.value, 10);
    if (v >= 1 && v <= 10) markValid('guests');
    else if (guestsInput.value) showError('guests', 'Enter a valid number of guests (1–10)');
    updateProgressSteps();
  });

  // Clear errors on input focus
  ['fullName', 'email', 'phone', 'guests'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  // Restrict phone to digits
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  });

  // Restrict guests to numbers
  guestsInput.addEventListener('input', () => {
    guestsInput.value = guestsInput.value.replace(/\D/g, '');
  });


  // =============================================
  // 10. FORM VALIDATION
  // =============================================

  function validateForm() {
    let isValid = true;
    let errorCount = 0;

    // Full Name
    if (!fullNameInput.value.trim()) {
      showError('fullName', 'Full name is required');
      isValid = false; errorCount++;
    } else { markValid('fullName'); }

    // Email
    const email = emailInput.value.trim();
    if (!email || !email.includes('@') || !email.includes('.')) {
      showError('email', 'Enter a valid email address');
      isValid = false; errorCount++;
    } else { markValid('email'); }

    // Phone
    const phone = phoneInput.value.trim();
    if (!phone || !/^\d{10}$/.test(phone)) {
      showError('phone', 'Enter a valid 10-digit phone number');
      isValid = false; errorCount++;
    } else { markValid('phone'); }

    // Guests
    const guestsVal = parseInt(guestsInput.value, 10);
    if (!guestsInput.value || isNaN(guestsVal) || guestsVal < 1 || guestsVal > 10) {
      showError('guests', 'Enter a valid number of guests (1–10)');
      isValid = false; errorCount++;
    } else { markValid('guests'); }

    // Check-in
    if (!checkinInput.value) {
      showError('checkin', 'Check-in date is required');
      isValid = false; errorCount++;
    } else if (checkinInput.value < today) {
      showError('checkin', 'Check-in date cannot be in the past');
      isValid = false; errorCount++;
    } else { markValid('checkin'); }

    // Check-out
    if (!checkoutInput.value) {
      showError('checkout', 'Check-out date is required');
      isValid = false; errorCount++;
    } else if (checkinInput.value && checkoutInput.value <= checkinInput.value) {
      showError('checkout', 'Check-out must be after check-in date');
      isValid = false; errorCount++;
    } else { markValid('checkout'); }

    // Room
    let roomSelected = false;
    roomRadios.forEach(r => { if (r.checked) roomSelected = true; });
    const roomError = document.getElementById('room-error');
    if (!roomSelected) {
      if (roomError) roomError.classList.add('visible');
      isValid = false; errorCount++;
    } else {
      if (roomError) roomError.classList.remove('visible');
    }

    // Show toast with error count
    if (!isValid) {
      showToast(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} before submitting`, 'error');
    }

    return isValid;
  }


  // =============================================
  // 11. FORM SUBMISSION
  // =============================================

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('.form-input.error, .error-msg.visible');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Calculate pricing
    const pricing = updatePriceSummary();

    // Room type
    let roomType = '';
    roomRadios.forEach(r => { if (r.checked) roomType = r.value; });

    // Selected amenities
    const selectedAmenities = [];
    amenityChecks.forEach(cb => { if (cb.checked) selectedAmenities.push(cb.value); });

    // Build data object
    const bookingData = {
      fullName:     fullNameInput.value.trim(),
      email:        emailInput.value.trim(),
      phone:        phoneInput.value.trim(),
      guests:       parseInt(guestsInput.value, 10),
      address:      addressInput.value.trim(),
      checkin:      checkinInput.value,
      checkout:     checkoutInput.value,
      days:         pricing.days,
      roomType:     roomType,
      roomPrice:    pricing.roomPrice,
      amenities:    selectedAmenities,
      amenityTotal: pricing.amenityTotal,
      totalPrice:   pricing.grandTotal,
      bookedAt:     new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Show success toast, then redirect
    showToast('Booking confirmed! Redirecting...', 'success', 2000);

    // Add a brief delay so the toast is visible
    setTimeout(() => {
      window.location.href = 'confirm.html';
    }, 1200);
  });

  // Initial progress update
  updateProgressSteps();
});
