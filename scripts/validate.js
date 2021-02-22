
const showInputError = function(validationSettings, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`${validationSettings.errorSelector}_type_${inputElement.name}`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.activeErrorClass);
};

const hideInputError = function(validationSettings, formElement, inputElement) {
  const errorElement = formElement.querySelector(`${validationSettings.errorSelector}_type_${inputElement.name}`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.activeErrorClass);
}

const checkInputValidity = function(validationSettings, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(validationSettings, formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(validationSettings, formElement, inputElement)
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = function(validationSettings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled',true);
  }
}

const setEventListeners = function(validationSettings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(validationSettings, inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationSettings.inputErrorClass)
    inputElement.addEventListener('input', () => {
      checkInputValidity(validationSettings, formElement, inputElement)
      toggleButtonState(validationSettings, inputList, buttonElement)
    });
  });

};


function enableValidation(validationSettings) {
  // Очистим ошибки в Popup
  btnAdd.addEventListener('click', (evt) => clearErrors(evt, validationSettings));
  btnEdit.addEventListener('click', (evt) => clearErrors(evt, validationSettings));

  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((formElement) => {
    const fieldSetList = Array.from(formElement.querySelectorAll(validationSettings.fieldSetSelector));
    fieldSetList.forEach((fieldSet) => {
      setEventListeners(validationSettings, fieldSet)
    });
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldSetSelector: '.popup__set',
  errorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  activeErrorClass: 'popup__input-error_active'
})

function setPopupCardSubmitToInitial(evt, validationSettings) {
  if (evt.target.classList.value === btnAdd.classList.value) {
    popupCard.querySelector(validationSettings.submitButtonSelector).setAttribute('disabled',true);
    popupCard.querySelector(validationSettings.submitButtonSelector).classList.add(validationSettings.inactiveButtonClass)
  }
}

// Функция очистки ошибок в Popup
function clearErrors(evt, validationSettings) {

  const errorList = Array.from(document.querySelectorAll(`.${validationSettings.activeErrorClass}`));
  const inputErrorList = Array.from(document.querySelectorAll(`.${validationSettings.inputErrorClass}`));

  setPopupCardSubmitToInitial(evt, validationSettings)

  if (errorList !== []) {
    errorList.forEach((errorElement) => {
    errorElement.textContent='';
    errorElement.classList.remove(validationSettings.activeErrorClass);
    })
  }

  if (inputErrorList !== []) {
    inputErrorList.forEach((inputErrorElement) => {
      inputErrorElement.classList.remove(validationSettings.inputErrorClass);
    })
  }
}