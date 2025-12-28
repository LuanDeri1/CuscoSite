const modal = document.getElementById("authModal");
const signInTrigger = document.getElementById("signInTrigger");
const closeModal = document.getElementById("closeModal");
const authForm = document.getElementById("authForm");
const personalizedContent = document.getElementById("personalizedContent");
const userName = document.getElementById("userName");
const themeToggle = document.getElementById("themeToggle");
const greeting = document.getElementById("greeting");

const applyUser = (name) => {
  if (!signInTrigger) return;
  if (name) {
    signInTrigger.textContent = `Sign Out`;
    signInTrigger.dataset.signedIn = "true";
    signInTrigger.setAttribute("aria-label", `Sign out ${name}`);
    if (userName) userName.textContent = name;
    if (personalizedContent) personalizedContent.hidden = false;
    if (greeting) {
      greeting.textContent = `Welcome, ${name}`;
      greeting.hidden = false;
    }
  } else {
    signInTrigger.textContent = "Sign In";
    signInTrigger.dataset.signedIn = "false";
    signInTrigger.removeAttribute("aria-label");
    if (personalizedContent) personalizedContent.hidden = true;
    if (greeting) greeting.hidden = true;
  }
};

const storedUser = localStorage.getItem("cuscoUser");
applyUser(storedUser);

const openModal = () => {
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
};

const hideModal = () => {
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};

if (signInTrigger) {
  signInTrigger.addEventListener("click", () => {
    if (signInTrigger.dataset.signedIn === "true") {
      localStorage.removeItem("cuscoUser");
      applyUser("");
    } else {
      openModal();
    }
  });
}

if (closeModal) {
  closeModal.addEventListener("click", hideModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });
}

if (authForm) {
  authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("authName").value.trim() || "Traveler";
    localStorage.setItem("cuscoUser", name);
    applyUser(name);
    hideModal();
    authForm.reset();
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    tourCards.forEach((card) => {
      if (filter === "all" || card.dataset.type === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const eventDetails = document.getElementById("eventDetails");
const eventButtons = document.querySelectorAll("#eventCalendar button");

const eventCopy = {
  "inti-raymi": {
    title: "Inti Raymi · Festival of the Sun",
    text: "Join the sunrise ceremony at Sacsayhuamán with VIP seating, cultural performances, and guided rituals.",
  },
  carnival: {
    title: "Cusco Carnival",
    text: "A week of music, parades, and culinary street parties across the historic center.",
  },
  gastronomy: {
    title: "Peruvian Gastronomy Week",
    text: "Taste curated menus, pisco tastings, and chef-led workshops celebrating Andean flavors.",
  },
  music: {
    title: "Andes Music Nights",
    text: "Live concerts with traditional instruments, dance showcases, and artisan markets.",
  },
};

if (eventDetails && eventButtons.length) {
  eventButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const info = eventCopy[button.dataset.event];
      if (!info) return;
      eventDetails.innerHTML = `<h3>${info.title}</h3><p>${info.text}</p>`;
    });
  });
}

const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.getElementById("prevTestimonial");
const nextButton = document.getElementById("nextTestimonial");
let testimonialIndex = 0;

const showTestimonial = (index) => {
  testimonials.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === index);
  });
};

if (testimonials.length) {
  showTestimonial(testimonialIndex);
  const cycle = () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  };
  const interval = setInterval(cycle, 7000);

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
  }
  window.addEventListener("beforeunload", () => clearInterval(interval));
}

if (themeToggle) {
  const storedTheme = localStorage.getItem("cuscoTheme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark");
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("cuscoTheme", mode);
  });
}

const parallax = () => {
  const slides = document.querySelectorAll(".bg-slide");
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    slides.forEach((slide) => {
      slide.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });
  });
};

parallax();
