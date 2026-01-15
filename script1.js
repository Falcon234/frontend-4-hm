import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeButtonRef = document.querySelector(
  '[data-action="close-lightbox"]'
);
const overlayRef = document.querySelector('.lightbox__overlay');


const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join('');

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);


galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const largeImageURL = event.target.dataset.source;
  const imageAlt = event.target.alt;

  openLightbox(largeImageURL, imageAlt);
}

function openLightbox(src, alt) {
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = src;
  lightboxImageRef.alt = alt;
}


closeButtonRef.addEventListener('click', closeLightbox);
overlayRef.addEventListener('click', closeLightbox);

function closeLightbox() {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
}
