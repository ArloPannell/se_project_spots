const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];
// Profile Modal Controls
const modalEditProfile = document.querySelector("#edit-profile-modal");
const btnEditProfile = document.querySelector(".user-info__edit");
const btnEditProfileClose = modalEditProfile.querySelector(
  ".modal__close-btn_type_form"
);
const frmProfileSubmit = modalEditProfile.querySelector(".modal__form");
// Profile Text Controls
const modalProfileName = document.querySelector("#profile-name-input");
const txtProfileName = document.querySelector(".user-info__username");
const modalProfileDesc = document.querySelector("#profile-description-input");
const txtUserDescription = document.querySelector(".user-info__description");
// New Post Modal Controls
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const btnNewPostClose = modalNewPost.querySelector(
  ".modal__close-btn_type_form"
);
const frmNewPost = modalNewPost.querySelector(".modal__form");
// New Post Form Fields
const modalPicLink = modalNewPost.querySelector("#new-post_link-input");
const modalCaption = modalNewPost.querySelector("#new-post_caption-input");
// Preview Selectors
const modalPreview = document.querySelector("#preview-modal");
const btnPreviewClose = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);
// Gallery Selectors
const galleryContainer = document.querySelector(".gallery");
const galleryTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
// Functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function getCardElement(data) {
  const cardElement = galleryTemplate.cloneNode(true);
  // Set values from object
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__text").textContent = data.name;
  // Event listeners
  // Like
  cardElement
    .querySelector(".card__like-default")
    .addEventListener("click", function () {
      cardElement
        .querySelector(".card__like-default")
        .classList.toggle("card__like-liked");
    });
  // Delete
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  // Preview
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openModal(modalPreview);
      modalPreview.querySelector(".modal__image").src = data.link;
      modalPreview.querySelector(".modal__image").alt = data.name;
      modalPreview.querySelector(".modal__caption").textContent = data.name;
    });

  return cardElement;
}

initialCards.forEach(function (item) {
  galleryContainer.append(getCardElement(item));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  txtProfileName.textContent = modalProfileName.value;
  txtUserDescription.textContent = modalProfileDesc.value;
  closeModal(modalEditProfile);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  cardObject = { name: modalCaption.value, link: modalPicLink.value };
  galleryContainer.prepend(getCardElement(cardObject));
  //Clear form
  modalCaption.value = "";
  modalPicLink.value = "";
  modalNewPost.classList.remove("modal_is-opened");
}

// Profile Events
btnEditProfile.addEventListener("click", function () {
  openModal(modalEditProfile);
  modalProfileName.value = txtProfileName.textContent;
  modalProfileDesc.value = txtUserDescription.textContent;
});

btnEditProfileClose.addEventListener("click", function () {
  closeModal(modalEditProfile);
});

frmProfileSubmit.addEventListener("submit", handleProfileFormSubmit);

// New Post Events
btnNewPost.addEventListener("click", function () {
  openModal(modalNewPost);
});

btnNewPostClose.addEventListener("click", function () {
  closeModal(modalNewPost);
});

frmNewPost.addEventListener("submit", handleNewPostSubmit);

// Preview Events
btnPreviewClose.addEventListener("click", function () {
  closeModal(modalPreview);
});
