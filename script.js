// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after selecting a link on small screens
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal animation using IntersectionObserver
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Experience image modal
const imageModal = document.querySelector('#experience-image-modal');
const modalPreview = imageModal?.querySelector('.image-modal-preview');
const modalCloseButton = imageModal?.querySelector('.image-modal-close');
const imageButtons = document.querySelectorAll('.experience-image-button');

const closeImageModal = () => {
  if (!imageModal || !modalPreview) {
    return;
  }

  imageModal.classList.remove('is-open');
  imageModal.setAttribute('aria-hidden', 'true');
  modalPreview.setAttribute('src', '');
  modalPreview.setAttribute('alt', '');
  document.body.style.overflow = '';
};

if (imageModal && modalPreview && imageButtons.length > 0) {
  imageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const imageSrc = button.dataset.modalImage;
      const imageAlt = button.dataset.modalAlt || button.querySelector('img')?.alt || '';

      if (!imageSrc) {
        return;
      }

      modalPreview.setAttribute('src', imageSrc);
      modalPreview.setAttribute('alt', imageAlt);
      imageModal.classList.add('is-open');
      imageModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseButton?.addEventListener('click', closeImageModal);

  imageModal.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
      closeImageModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageModal.classList.contains('is-open')) {
      closeImageModal();
    }
  });
}
