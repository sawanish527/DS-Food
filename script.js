/* =====================================
   DS FOODS — SCRIPT.JS (Final Version)
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     MOBILE NAVIGATION TOGGLE
  =============================== */
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close nav on link click (for mobile)
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });
  }

  /* ===============================
     MODAL CONTACT FORM HANDLING
  =============================== */
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("open-contact");
  const closeModalBtn = document.getElementById("modal-close");
  const cancelModalBtn = document.getElementById("modal-cancel");

  // Open modal
  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // prevent scroll behind modal
    });
  }

  // Close modal (close, cancel, or outside click)
  [closeModalBtn, cancelModalBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    }
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  /* ===============================
     FORM SUBMISSION (Formspree Integration)
  =============================== */
  const form = document.getElementById("contact-form");
  const feedback = document.createElement("p");
  feedback.id = "form-feedback";
  feedback.style.marginTop = "10px";
  feedback.style.fontWeight = "500";
  form?.appendChild(feedback);

  if (form) {
    form.addEventListener("submit", async (e) => {
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

      feedback.textContent = "⏳ Sending...";
      feedback.style.color = "#666";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          feedback.textContent = "✅ Message sent successfully! We’ll get back soon.";
          feedback.style.color = "green";
          form.reset();

          // Close modal after 2 seconds
          setTimeout(() => {
            modal?.classList.remove("active");
            document.body.style.overflow = "auto";
            feedback.textContent = "";
          }, 2000);
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
  }

  /* ===============================
     SMOOTH SCROLL
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  /* ===============================
     FOOTER YEAR AUTO UPDATE
  =============================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
