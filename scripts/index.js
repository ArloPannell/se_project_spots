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
// Profile Modal Selectors
const modalEditProfile = document.querySelector("#edit-profile-modal");
const btnEditProfile = document.querySelector(".user-info__edit");
const frmProfileSubmit = modalEditProfile.querySelector(".modal__form");
// Profile Field Selectors
const modalProfileName = document.querySelector("#profile-name-input");
const txtProfileName = document.querySelector(".user-info__username");
const modalProfileDesc = document.querySelector("#profile-description-input");
const txtUserDescription = document.querySelector(".user-info__description");
// New Post Modal Selectors
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const frmNewPost = modalNewPost.querySelector(".modal__form");
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
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
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
  closeModal(modalEditProfile);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  cardObject = { name: modalCaption.value, link: modalPicLink.value };
  galleryContainer.prepend(getCardElement(cardObject));
  evt.target.reset();
  closeModal(modalNewPost);
}
// Evemt Listeners
// Profile
btnEditProfile.addEventListener("click", function () {
  openModal(modalEditProfile);
  modalProfileName.value = txtProfileName.textContent;
  modalProfileDesc.value = txtUserDescription.textContent;
});

frmProfileSubmit.addEventListener("submit", handleProfileFormSubmit);

// New Post
btnNewPost.addEventListener("click", function () {
  openModal(modalNewPost);
});
frmNewPost.addEventListener("submit", handleNewPostSubmit);

// Close
setCloseButtons.forEach((button) => {
  const popUp = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popUp));
});
