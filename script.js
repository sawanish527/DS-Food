/* =====================================
   DS FOODS — SCRIPT.JS
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ======== MOBILE NAV TOGGLE ========
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // Close nav when clicking a link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });

  // ======== MODAL CONTACT FORM ========
  const modal = document.getElementById("contactModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const cancelModalBtn = document.getElementById("cancelModal");

  // Open modal
  if (openModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
    });
  }

  // Close modal
  [closeModalBtn, cancelModalBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }
  });

  // Click outside closes modal
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // ======== FORM SUBMISSION HANDLING ========
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      feedback.textContent = "⚠️ Please fill out all fields.";
      feedback.style.color = "red";
      return;
    }

    // Simulate success
    feedback.textContent = "✅ Thank you for contacting us! We’ll get back soon.";
    feedback.style.color = "green";
    form.reset();

    // Close modal after 2 seconds
    setTimeout(() => modal.classList.remove("active"), 2000);
  });

  // ======== SMOOTH SCROLL (optional if not native) ========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // ======== FOOTER YEAR AUTO-UPDATE ========
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
