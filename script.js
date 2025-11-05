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
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-contact");
const closeModalBtn = document.getElementById("modal-close");
const cancelModalBtn = document.getElementById("modal-cancel");

// Open modal
if (openModalBtn) {
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });
}

// Close modal
[closeModalBtn, cancelModalBtn].forEach((btn) => {
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
 // ======== FORM SUBMISSION HANDLING (Formspree Integration) ========
const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const modal = document.getElementById("modal");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const message = formData.get("message")?.trim();

  if (!name || !email || !message) {
    feedback.textContent = "⚠️ Please fill out all fields.";
    feedback.style.color = "red";
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      feedback.textContent = "✅ Thank you! Your message has been sent successfully.";
      feedback.style.color = "green";
      form.reset();

      // Optional: Close modal after 2 seconds
      setTimeout(() => modal?.classList.remove("active"), 2000);
    } else {
      feedback.textContent = "❌ Something went wrong. Please try again later.";
      feedback.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    feedback.textContent = "❌ Network error. Please check your connection.";
    feedback.style.color = "red";
  }
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



