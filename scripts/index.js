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
];

// Profile Modal Controls
const modalEditProfile = document.querySelector("#edit-profile-modal");
const btnEditProfile = document.querySelector(".user-info__edit");
const btnEditProfileClose = modalEditProfile.querySelector(".modal__close-btn");
const frmProfileSubmit = modalEditProfile.querySelector(".modal__form");
// Profile Text Controls
const modalProfileName = document.querySelector("#profile-name-input");
const txtProfileName = document.querySelector(".user-info__username");
const modalProfileDesc = document.querySelector("#profile-description-input");
const txtUserDescription = document.querySelector(".user-info__description");

// New Post Modal Controls
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const btnNewPostClose = modalNewPost.querySelector(".modal__close-btn");
const frmNewPost = modalNewPost.querySelector(".modal__form");
// New Post Form Fields
const modalPicLink = modalNewPost.querySelector("#new-post_link-input");
const modalCaption = modalNewPost.querySelector("#new-post_caption-input");

// Functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  txtProfileName.textContent = modalProfileName.value;
  txtUserDescription.textContent = modalProfileDesc.value;
  closeModal(modalEditProfile);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(modalPicLink.value);
  console.log(modalCaption.value);
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

initialCards.forEach(function (card) {
  console.log(card.name);
});
