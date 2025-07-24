document.addEventListener('DOMContentLoaded', function () {
  // Navbar toggle logic
  const toggleBtn = document.getElementById('toggleBtn');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');
  const navbar = document.querySelector('.navbar');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  if (toggleBtn && navLinks && menuIcon) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Toggle icon from hamburger to X and back
      if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  }

  // Video playback speed (if present)
  const video = document.getElementById('loginVideo');
  if (video) {
    video.playbackRate = 2.0;
  }

  // Project filter logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-item');
  if (filterButtons.length && projects.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const filter = button.dataset.filter;
        projects.forEach(project => {
          const category = project.dataset.category;
          project.style.display = (filter === 'all' || filter === category) ? '' : 'none';
        });
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  // Navbar hide/show logic
  if (navbar) {
    let lastScrollY = window.scrollY;
    let hoverTimeout;

    // Hide navbar 6 seconds after page load, but only if not hovered
    let isHovering = false;
    setTimeout(() => {
      if (!isHovering) {
        navbar.classList.add('hidden');
      }
    }, 6000);

    // Track hover state
    navbar.addEventListener('mouseenter', () => {
      isHovering = true;
      navbar.classList.remove('hidden');
      clearTimeout(hoverTimeout);
    });

    navbar.addEventListener('mouseleave', () => {
      isHovering = false;
      // Optionally hide after delay when mouse leaves
      hoverTimeout = setTimeout(() => {
        if (!isHovering) {
          navbar.classList.add('hidden');
        }
      }, 2000);
    });

    // Show/hide navbar on scroll
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        // scrolling up
        navbar.classList.remove('hidden');
      } else if (currentScrollY > lastScrollY) {
        // scrolling down
        navbar.classList.add('hidden');
      }
      lastScrollY = currentScrollY;
    });
  }

  // Theme toggle logic
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-theme');
      // Optionally save preference
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.title = 'Switch to Light Mode';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.title = 'Switch to Dark Mode';
      }
    });
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }
});

// Moon icon theme toggle logic
// Place this button in your HTML:
// <button id="themeToggleBtn"><i class="fa fa-moon"></i></button>

// Only one theme toggle logic needed
// Already handled in DOMContentLoaded above

const text = "A passionate Web Developer and Graphic Designer";
const typewriter = document.getElementById('typewriter');
let index = 0;
let isDeleting = false;

function typeLoop() {
  // Typing
  if (!isDeleting) {
    typewriter.textContent = text.substring(0, index + 1);
    index++;

    if (index === text.length) {
      isDeleting = true;
      setTimeout(typeLoop, 3000); // pause before deleting
      return;
    }
  }
  // Deleting
  else {
    typewriter.textContent = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeLoop, isDeleting ? 50 : 100); // speed
}

window.onload = typeLoop;