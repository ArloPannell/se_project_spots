// Configuration Object
export const objConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
};

const showInputError = (formEl, inputEl, errorMessage, objConfig) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(objConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formEl, inputEl, objConfig) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(objConfig.inputErrorClass);
  errorElement.textContent = "";
};

export const resetValidation = (formEl, inputList, objConfig) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, objConfig);
  });
};

export const disableSubmitButton = (buttonEl, objConfig) => {
  buttonEl.classList.add(objConfig.inactiveButtonClass);
  buttonEl.disabled = true;
};

const enableSubmitButton = (buttonEl, objConfig) => {
  buttonEl.classList.remove(objConfig.inactiveButtonClass);
  buttonEl.disabled = false;
};

export const toggleButtonState = (inputList, buttonEl, objConfig) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonEl, objConfig);
  } else {
    enableSubmitButton(buttonEl, objConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const checkInputValidity = (formEl, inputEl, objConfig) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, objConfig);
  } else {
    hideInputError(formEl, inputEl, objConfig);
  }
};

const setEventListeners = (formEl, objConfig) => {
  const inputList = Array.from(
    formEl.querySelectorAll(objConfig.inputSelector)
  );
  const buttonElement = formEl.querySelector(objConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, objConfig);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, objConfig);
      toggleButtonState(inputList, buttonElement, objConfig);
    });
  });
};

export const enableValidation = (objConfig) => {
  const formList = document.querySelectorAll(objConfig.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, objConfig);
  });
};
