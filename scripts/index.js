// Profile Modal Controls
const modalEditProfile = document.querySelector("#edit-profile-modal");
const btnEditProfile = document.querySelector(".user-info__edit");
const btnEditProfileClose = modalEditProfile.querySelector(".modal__close-btn");

btnEditProfile.addEventListener("click", function () {
  modalEditProfile.classList.add("modal_is-opened");
});

btnEditProfileClose.addEventListener("click", function () {
  modalEditProfile.classList.remove("modal_is-opened");
});

// New Post Modal Controls
const modalNewPost = document.querySelector("#new-post-modal");
const btnNewPost = document.querySelector(".user-info__newpost");
const btnNewPostClose = modalNewPost.querySelector(".modal__close-btn");

btnNewPost.addEventListener("click", function () {
  modalNewPost.classList.add("modal_is-opened");
});

btnNewPostClose.addEventListener("click", function () {
  modalNewPost.classList.remove("modal_is-opened");
});
