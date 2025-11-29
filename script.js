// Simple mobile menu toggle (progressive enhancement)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-nav-links]");
  
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", String(!isOpen));
    });
  }

  // Auto-scroll logic for horizontal scroll views
  const scrollContainer = document.querySelector("[data-auto-scroll]");
  if (scrollContainer) {
    // Auto scroll every 3 seconds
    let scrollInterval = setInterval(() => {
      const itemWidth = 320; // Approximate width of scroll item + gap
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll - 20) {
        // If at the end, smooth scroll back to start
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll to next
        scrollContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, 3000);

    // Pause on interaction
    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    scrollContainer.addEventListener('mousedown', stopScroll);
    scrollContainer.addEventListener('touchstart', stopScroll);
  }

  // Language switching logic
  const savedLang = localStorage.getItem("lang") || "en"; // Default to English
  changeLang(savedLang);

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const switcher = document.querySelector('.lang-switcher');
    const menu = document.getElementById('langMenu');
    if (switcher && menu && !switcher.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('show');
}

function changeLang(lang) {
  fetch(`lang-${lang}.json`)
    .then(response => response.json())
    .then(data => {
      document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (data[key]) {
          el.innerHTML = data[key];
        }
      });
      localStorage.setItem("lang", lang); 
      
      // Update dropdown button text
      const dropdownBtn = document.querySelector('.lang-dropdown-btn');
      if (dropdownBtn) {
        dropdownBtn.textContent = lang.toUpperCase();
      }

      // Update active state
      document.querySelectorAll(".lang-btn").forEach(btn => {
        if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(lang)) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
      
      // Close menu
      const menu = document.getElementById('langMenu');
      if (menu) menu.classList.remove('show');
    })
    .catch(err => console.error("Error loading language file:", err));
}
