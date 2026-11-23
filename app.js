// Vaibhav Balwant Singh Portfolio - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar Scroll Background Effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-[#080d1a]/90', 'backdrop-blur-md', 'border-b', 'border-slate-800/80', 'shadow-xl', 'py-3');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('bg-[#080d1a]/90', 'backdrop-blur-md', 'border-b', 'border-slate-800/80', 'shadow-xl', 'py-3');
      navbar.classList.add('py-4');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Resume Modal Handling
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');

  const openResume = () => {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      resumeModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    }
  };

  const closeResume = () => {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      resumeModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  // Close modal when clicking backdrop
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResume();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && !resumeModal.classList.contains('hidden')) {
      closeResume();
    }
  });

  // Skills Filtering
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update button active styles
      filterButtons.forEach(b => {
        b.classList.remove('bg-teal-500', 'text-slate-950', 'font-semibold');
        b.classList.add('text-slate-400', 'font-medium');
      });
      btn.classList.add('bg-teal-500', 'text-slate-950', 'font-semibold');
      btn.classList.remove('text-slate-400', 'font-medium');

      // Filter cards
      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact Form Submission & Confetti Celebration
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name')?.value || 'Friend';
      const senderEmail = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || '';
      const message = document.getElementById('sender-message')?.value || '';

      // Fire celebratory confetti!
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast(`Thanks ${senderName}! Opening your email client...`);

      // Fallback: construct mailto
      setTimeout(() => {
        const mailtoUrl = `mailto:vaibhav.122528@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 1000);
    });
  }

  // Active Section Spy for Desktop Nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-teal-300', 'bg-slate-800/60');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-teal-300', 'bg-slate-800/60');
      }
    });
  });
});

// Copy to Clipboard with Toast Notification
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textArea);
}

// Global Toast Notification Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }
}
