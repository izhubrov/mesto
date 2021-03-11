import {btnAdd, btnEdit} from './index.js';

export default class FormValidator {

  constructor(validationSettings,modalWindowForm) {
    this._validationSettings = validationSettings;
    this._modalWindowForm = modalWindowForm;
  }

  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.activeErrorClass);
  };

  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationSettings.activeErrorClass);
  }

  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      buttonElement.setAttribute('disabled',true);
    } else {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled',true);
    }
  }

  _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._validationSettings.inputErrorClass)
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement)
        this._toggleButtonState(inputList, buttonElement)
      });
    });

  };

  _setPopupCardSubmitToInitial(evt) {
    if (evt.target.classList.value === btnAdd.classList.value) {
      this._modalWindowForm.querySelector(this._validationSettings.submitButtonSelector).setAttribute('disabled',true);
      this._modalWindowForm.querySelector(this._validationSettings.submitButtonSelector).classList.add(this._validationSettings.inactiveButtonClass);
    }
  }

  // Функция очистки ошибок в Popup
  _clearErrors(evt) {
    const errorList = Array.from(this._modalWindowForm.querySelectorAll(`.${this._validationSettings.activeErrorClass}`));
    const inputErrorList = Array.from(this._modalWindowForm.querySelectorAll(`.${this._validationSettings.inputErrorClass}`));

    this._setPopupCardSubmitToInitial(evt);

    if (errorList !== []) {
      errorList.forEach((errorElement) => {
      errorElement.textContent='';
      errorElement.classList.remove(this._validationSettings.activeErrorClass);
      })
    }

    if (inputErrorList !== []) {
      inputErrorList.forEach((inputErrorElement) => {
        inputErrorElement.classList.remove(this._validationSettings.inputErrorClass);
      })
    }
  }

  enableValidation() {
    // Очистим ошибки в Popup
    btnAdd.addEventListener('click', (evt) => this._clearErrors(evt));
    btnEdit.addEventListener('click', (evt) => this._clearErrors(evt));

    const formList = Array.from(this._modalWindowForm.querySelectorAll(this._validationSettings.formSelector));

    this._formList = formList;

    this._formList.forEach((formElement) => {
      const fieldSetList = Array.from(formElement.querySelectorAll(this._validationSettings.fieldSetSelector));
      fieldSetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet)
      });
    });
  }
}
