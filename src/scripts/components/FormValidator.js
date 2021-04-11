export default class FormValidator {

  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._submitText = this._formElement.getAttribute('name');
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.activeErrorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationSettings.activeErrorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError (inputElement)
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !(inputElement.validity.valid && inputElement.value.trim());
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled',true);
    } else {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled',true);
    }
  }

  _setEventListeners () {
    this._toggleButtonState()

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._validationSettings.inputErrorClass)
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      });
    });

  };

  _setPopupSubmitTextToInitialState() {
    this._buttonElement.textContent = this._validationSettings.initialSubmitButtonsTexts[`${this._submitText}`];
  }

  changeStatusOfSubmitButton() {
    this._buttonElement.textContent = this._validationSettings.changedSubmitButtonsTexts[`${this._submitText}`];
  }

  setPopupToInitialState() {
    this._inputList.forEach(inputErrorElement => this._hideInputError(inputErrorElement));
    
    this._setPopupSubmitTextToInitialState();
    
    this._buttonElement.setAttribute('disabled',true);
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
  }

  enableValidation() {

    const fieldSetList = Array.from(this._formElement.querySelectorAll(this._validationSettings.fieldSetSelector));

    fieldSetList.forEach(() => this._setEventListeners());
  }
}
