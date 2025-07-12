// Configuration Object
const objConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
}


const showInputError = (formEl, inputEl, errorMessage) => {
    const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(objConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formEl, inputEl) => {
const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(objConfig.inputErrorClass);
  errorElement.textContent = "";    
};

const resetValidation = (formEl, inputList) => {
inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
});
};

const disableSubmitButton = (buttonEl) => {
  buttonEl.classList.add(objConfig.inactiveButtonClass);
    buttonEl.disabled = true;
};

const enableSubmitButton = (buttonEl) => {
 buttonEl.classList.remove(objConfig.inactiveButtonClass);
    buttonEl.disabled = false;
}

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonEl);
  } else {
    enableSubmitButton(buttonEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const checkInputValidity = (formEl, inputEl) => {
 if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
 } else {
    hideInputError(formEl, inputEl);
 }
};

const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(objConfig.inputSelector));
    const buttonElement = formEl.querySelector(objConfig.submitButtonSelector);

      toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {

 const formList = document.querySelectorAll(objConfig.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl);
});
    
};

enableValidation();

