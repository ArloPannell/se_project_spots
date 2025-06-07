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

// Profile Events
btnEditProfile.addEventListener("click", function () {
  modalEditProfile.classList.add("modal_is-opened");
  modalProfileName.value = txtProfileName.textContent;
  modalProfileDesc.value = txtUserDescription.textContent;
});

btnEditProfileClose.addEventListener("click", function () {
  modalEditProfile.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  txtProfileName.textContent = modalProfileName.value;
  txtUserDescription.textContent = modalProfileDesc.value;
  modalEditProfile.classList.remove("modal_is-opened");
}

frmProfileSubmit.addEventListener("submit", handleProfileFormSubmit);

// New Post Modal Controls
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const btnNewPostClose = modalNewPost.querySelector(".modal__close-btn");
const frmNewPost = modalNewPost.querySelector(".modal__form");
// New Post Form Fields
const modalPicLink = modalNewPost.querySelector("#new-post_link-input");
const modalCaption = modalNewPost.querySelector("#new-post_caption-input");

// New Post Events
btnNewPost.addEventListener("click", function () {
  modalNewPost.classList.add("modal_is-opened");
});

btnNewPostClose.addEventListener("click", function () {
  modalNewPost.classList.remove("modal_is-opened");
});

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(modalPicLink.value);
  console.log(modalCaption.value);
  modalNewPost.classList.remove("modal_is-opened");
}

frmNewPost.addEventListener("submit", handleNewPostSubmit);
