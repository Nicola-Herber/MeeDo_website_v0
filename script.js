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
});
