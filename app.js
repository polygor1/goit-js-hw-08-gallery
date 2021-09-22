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
galleryList.addEventListener("click", onOpenModal);
const allImg = galleryList.querySelectorAll(".gallery__image");
const lightBoxModal = document.querySelector(".js-lightbox");
const closeModalBtn = lightBoxModal.querySelector('[data-action="close-lightbox"]');
closeModalBtn.addEventListener('click', onCloseModal);
let countTarget = 0;

function lightBoxImg(original, description) {
  const imgView = document.querySelector(".lightbox__image");
  imgView.setAttribute('src', original);
  imgView.setAttribute('alt', description);
};

function lightBoxImgView(arrayImg, number) {
  lightBoxImg(arrayImg[number].dataset.source, arrayImg[number].alt);
};

function onOpenModal(event) {
  event.preventDefault();
  const target = event.target;
  const numberTarget = [...galleryList.childNodes].indexOf(target.parentNode.parentNode, 0);
  countTarget = numberTarget;
  if (target.nodeName !== "IMG") return;
  window.addEventListener('keydown', onKeyPress);
  lightBoxModal.addEventListener('click', onOverlayClick);
  lightBoxModal.classList.add('is-open');
  lightBoxImgView(allImg, numberTarget);
};

function onCloseModal() {
  lightBoxImg("", "")
  window.removeEventListener('keydown', onKeyPress);
  lightBoxModal.removeEventListener('click', onOverlayClick);
  lightBoxModal.classList.remove('is-open');
};

function onOverlayClick(event) {
  const target = event.target;
  if (target.nodeName !== "DIV") return;
    onCloseModal();
};

function onKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const ARROWLEFT_KEY_CODE = 'ArrowLeft';
  const ARROWRIGHT_KEY_CODE = 'ArrowRight';
  if (event.code === ESC_KEY_CODE){
    onCloseModal();
  };
  if (event.code === ARROWLEFT_KEY_CODE) {
    if (countTarget <= 0) return;
    countTarget -= 1;
    lightBoxImgView(allImg, countTarget)
  };
  if (event.code === ARROWRIGHT_KEY_CODE) {
    if (countTarget >= allImg.length - 1) return;
    countTarget += 1;
    lightBoxImgView(allImg, countTarget)
  };
};