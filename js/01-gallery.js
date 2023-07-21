import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryCards(galleryItems);
galleryContainer.insertAdjacentHTML("afterbegin", galleryMarkup);

galleryContainer.addEventListener("click", getImgUrl);

function createGalleryCards(galleryItems) {
  return galleryItems
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
</li>`;
    })
    .join("");
}

function getImgUrl(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  const onEscPressed = (e) => {
    if (e.code === "Escape") {
      modal.close();
    }
  };

  const modal = basicLightbox.create(
    `
    <div class="modal">
        <img src='${e.target.dataset.source}' width="800" height="600"/>
    </div>
`,
    {
      onShow: () => document.addEventListener("keydown", onEscPressed),
      onClose: () => document.removeEventListener("keydown", onEscPressed),
    }
  );

  modal.show();

  // function onEscPressed(e) {
  //   if (e.code === "Escape") {
  //     modal.close();
  //   }
  // }
}
