import "./index.css";
import {
  enableValidation,
  objConfig,
  resetValidation,
  toggleButtonState,
  disableSubmitButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

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
const imgUserAvatar = document.querySelector(".user-info__avatar");
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
// Delete Modal Selector
const modalDeletePost = document.querySelector("#delete-warning-modal");
const btnCancelDelete = document.querySelector("#btnDelCancel");
const btnDeletPost = document.querySelector("#btnDelete");
let selectedCard;
let selectedCardId;
// Edit Avatar Selectors
const btnEditAvatar = document.querySelector(".user-info__avatar-btn");
const modalEditAvatar = document.querySelector("#edit-avatar-modal");
const frmAvatarSubmit = document.querySelector("#edit-avatar-form");
const lnkAvatarFile = document.querySelector("#avatar_link-input");

btnEditAvatar.addEventListener("click", () => {
  openModal(modalEditAvatar);
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "74fa9fd3-2033-427a-bf30-5d3e82a85e0b",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then((data) => {
    data[0].forEach((item) => {
      galleryContainer.append(getCardElement(item));
    });
    refreshProfile(data[1]);
  })
  .catch(console.error);

// Functions

function refreshProfile(data) {
  txtProfileName.textContent = data.name;
  txtUserDescription.textContent = data.about;
  imgUserAvatar.src = data.avatar;
}

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

function handleCardDelete(cardEl, id) {
  selectedCard = cardEl;
  selectedCardId = id;
  openModal(modalDeletePost);
}

function handleDeleteSubmit(evt) {
  const submitButton = evt.target;
  submitButton.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
    })
    .catch(console.error)
    .finally(() => {
      closeModal(modalDeletePost);
      submitButton.textContent = "Delete";
    });
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
  cardImage.id = data._id;

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-liked");
  }

  // Set Event listeners
  // Like
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-liked");
    const isLiked = cardLikeBtn.classList.contains("card__like-liked");
    api.toggleLike(isLiked, data._id);
  });
  // Delete
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", function () {
      handleCardDelete(cardElement, data._id);
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

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .addProfileAvatar(lnkAvatarFile.value)
    .then(() => {
      const profile = {
        name: txtProfileName.textContent,
        about: txtUserDescription.textContent,
        avatar: lnkAvatarFile.value,
      };
      refreshProfile(profile);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
      closeModal(modalEditAvatar);
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .editUserInfo({
      name: modalProfileName.value,
      about: modalProfileDesc.value,
    })
    .then((res) => {
      refreshProfile({
        name: modalProfileName.value,
        about: modalProfileDesc.value,
        avatar: res.avatar,
      });
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
      disableSubmitButton(btnProfileSubmit, objConfig);
      closeModal(modalEditProfile);
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  const cardObject = { name: modalCaption.value, link: modalPicLink.value };
  api
    .addNewCard(cardObject)
    .then((card) => {
      galleryContainer.prepend(getCardElement(card));
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
      evt.target.reset();
      disableSubmitButton(btnNewPostSubmit, objConfig);
      closeModal(modalNewPost);
      this.reset();
    });
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

frmAvatarSubmit.addEventListener("submit", handleAvatarSubmit);

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

// Delete Modal
btnCancelDelete.addEventListener("click", () => {
  closeModal(modalDeletePost);
});

btnDeletPost.addEventListener("click", handleDeleteSubmit);

enableValidation(objConfig);
