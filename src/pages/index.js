import "./index.css";
import {
  enableValidation,
  objConfig,
  resetValidation,
  toggleButtonState,
  disableSubmitButton,
} from "../scripts/validation.js";

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
// Modal Selector
const modalBackround = document.querySelector(".modal");
// Profile Modal Selectors
const modalEditProfile = document.querySelector("#edit-profile-modal");
const btnEditProfile = document.querySelector(".user-info__edit");
const frmProfileSubmit = modalEditProfile.querySelector(".modal__form");
const btnProfileSubmit = modalEditProfile.querySelector(".modal__submit-btn");
// Profile Field Selectors
const modalProfileName = document.querySelector("#profile-name-input");
const txtProfileName = document.querySelector(".user-info__username");
const modalProfileDesc = document.querySelector("#profile-description-input");
const txtUserDescription = document.querySelector(".user-info__description");
// New Post Modal Selectors
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const frmNewPost = modalNewPost.querySelector(".modal__form");
const btnNewPostSubmit = modalNewPost.querySelector(".modal__submit-btn");
// New Post Form Field Selectors
const modalPicLink = modalNewPost.querySelector("#new-post_link-input");
const modalCaption = modalNewPost.querySelector("#new-post_caption-input");
// Preview Selectors
const modalPreview = document.querySelector("#preview-modal");
const modalPreviewImage = modalPreview.querySelector(".modal__image");
const modalPreviewText = modalPreview.querySelector(".modal__caption");
// Gallery Selectors
const galleryContainer = document.querySelector(".gallery");
const galleryTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
// Modal Close Button Selector
const setCloseButtons = document.querySelectorAll(".modal__close-btn");

// Functions
// Escape Key Exit
function escapePressed(evt) {
  if (evt.key === "Escape") {
    document.removeEventListener("keydown", escapePressed, true);
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

// Click to Exit
function exitClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  modal.addEventListener("click", exitClick, true);
  document.addEventListener("keydown", escapePressed, true);
}

function closeModal(modal) {
  document.removeEventListener("keydown", escapePressed, true);
  modal.removeEventListener("click", exitClick, true);
  modal.classList.remove("modal_is-opened");
}

function getCardElement(data) {
  const cardElement = galleryTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const cardLikeBtn = cardElement.querySelector(".card__like-default");
  // Set values from object
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;
  // Set Event listeners
  // Like
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-liked");
  });
  // Delete
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  // Preview
  cardImage.addEventListener("click", function () {
    openModal(modalPreview);
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;
    modalPreviewText.textContent = data.name;
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
  disableSubmitButton(btnProfileSubmit, objConfig);
  closeModal(modalEditProfile);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const cardObject = { name: modalCaption.value, link: modalPicLink.value };
  galleryContainer.prepend(getCardElement(cardObject));
  evt.target.reset();
  disableSubmitButton(btnNewPostSubmit, objConfig);
  closeModal(modalNewPost);
}
// Evemt Listeners
// Profile
btnEditProfile.addEventListener("click", function () {
  modalProfileName.value = txtProfileName.textContent;
  modalProfileDesc.value = txtUserDescription.textContent;
  openModal(modalEditProfile);
  resetValidation(
    frmProfileSubmit,
    [modalProfileName, modalProfileDesc],
    objConfig
  );
  toggleButtonState(
    [modalProfileName, modalProfileDesc],
    btnProfileSubmit,
    objConfig
  );
});

frmProfileSubmit.addEventListener("submit", handleProfileFormSubmit);

// New Post
btnNewPost.addEventListener("click", function () {
  enableValidation(objConfig);
  openModal(modalNewPost);
});

frmNewPost.addEventListener("submit", handleNewPostSubmit);

// Close
setCloseButtons.forEach((button) => {
  const popUp = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popUp));
});

enableValidation(objConfig);
