const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// ---------- gallary ---------------

const galleryList = document.querySelector(".js-gallery");

const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
    <a class="gallery__link"
      href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
    </a>
  </li>`;
const galleryMarkup = galleryItems.reduce((acc, item) =>
  acc + createGalleryItem(item), "");
galleryList.insertAdjacentHTML("afterbegin", galleryMarkup);

const lightBoxModal = document.querySelector(".js-lightbox");

const lightBoxImg = lightBoxModal.querySelector(".lightbox__image");

// ------ Bubbling phase click on preview image --------

galleryList.addEventListener("click", onOpenModal);

function onOpenModal(event) {
  event.preventDefault(); // отменяет обработку событий браузера по умолчанию 

  const target = event.target;

  if (target.nodeName !== "IMG") return;
  lightBoxImg.src = target.dataset.source;
  lightBoxImg.alt = target.alt;
  // lightBoxImg.setAttribute('src', target.dataset.source);
  // lightBoxImg.setAttribute('alt', target.alt);

  window.addEventListener('keydown', onEscKeyPress);
  lightBoxModal.addEventListener('click', onOverlayClick);
  lightBoxModal.classList.add('is-open');
};

const closeModalBtn = lightBoxModal.querySelector('[data-action="close-lightbox"]');

closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal() {

  lightBoxImg.src = '';
  lightBoxImg.alt = '';
  // lightBoxImg.setAttribute('src', '');
  // lightBoxImg.setAttribute('alt', '');

  window.removeEventListener('keydown', onEscKeyPress);
  lightBoxModal.removeEventListener('click', onOverlayClick);
  lightBoxModal.classList.remove('is-open');
};

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE){
    onCloseModal();
  };
};

function onOverlayClick(event) {
  const target = event.target;
  if (target.nodeName !== "DIV") return;
    onCloseModal();
};

// setActiveLink(target);

// function setActiveLink(nextActiveLink) {
//   const currentActiveLink = galleryList.querySelector(".gallery__item");
//   console.log(currentActiveLink);
  
//   if (currentActiveLink) {
//     currentActiveLink.classList.remove("is-open");
//   }

//   nextActiveLink.classList.add("is-open");
// }

// ------ modal windov -------

// const refs = {
  // openModalBtn: document.querySelector('[js-lightbox]'),
  // closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  // backdrop: document.querySelector('.js-lightbox')
// };

// refs.openModalBtn.addEventListener('click', onOpenModal);
// refs.backdrop.addEventListener('click', onBackdropClick);

// function onOpenModal() {
//   window.addEventListener('keydown', onEscKeyPress);
  
//   console.log(lightBoxModal.classList);

//   lightBoxModal.classList.add('is-open');
// };



// function onBackdropClick(event) {

//   console.log('Click on backdrop');

//   console.log(event.currentTarget); // <div class = "backdrop js-backdrop">...</div></div> 
//   console.log(event.target); // element on Click

//   if (event.currentTarget === event.target) {
//     onCloseModal();
//   }
// };
  

