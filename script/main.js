window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero_section");

  let downCount = 0;

  window.addEventListener("wheel", (event) => {
    if (!header) return;

    if (event.deltaY > 0) {
      downCount++;

      if (downCount >= 3) {
        header.classList.add("header_hide");
      }
    } else {
      downCount = 0;
      header.classList.remove("header_hide");
    }
  });

  setTimeout(() => {
    heroSection?.classList.add("is_active");
  }, 100);

  const animationSections = document.querySelectorAll(
    ".section_2, .section_3, .section_4, .section_5, .section_6",
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is_active");

        if (entry.target.classList.contains("section_5")) {
          startCounters(entry.target);
        }

        sectionObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
    },
  );

  animationSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  function startCounters(section) {
    const counters = section.querySelectorAll(".con_5 h2");

    counters.forEach((counter) => {
      const originalText = counter.textContent.trim();
      const targetNumber = parseFloat(originalText.replace(/[^0-9.]/g, ""));
      const suffix = originalText.replace(/[0-9.]/g, "");

      if (Number.isNaN(targetNumber)) return;

      let startTime = null;
      const duration = 1200;

      function count(currentTime) {
        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = targetNumber * easedProgress;

        if (Number.isInteger(targetNumber)) {
          counter.textContent = `${Math.floor(currentNumber)}${suffix}`;
        } else {
          counter.textContent = `${currentNumber.toFixed(1)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(count);
        } else {
          counter.textContent = originalText;
        }
      }

      counter.textContent = `0${suffix}`;
      requestAnimationFrame(count);
    });
  }
});

const family = document.querySelector(".f_site");
const familySite = document.querySelector(".f_site_list");
const familyHandler = (e) => {
  familySite.classList.toggle("f_active");
};

family.addEventListener("click", familyHandler);

// swiper

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 2.4,
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
