export default class FormValidator {

  constructor(validationSettings,formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  _showInputError (fieldSet, inputElement, errorMessage) {
    const errorElement = fieldSet.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.activeErrorClass);
  };

  _hideInputError (fieldSet, inputElement) {
    const errorElement = fieldSet.querySelector(`${this._validationSettings.errorSelector}_type_${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationSettings.activeErrorClass);
  }

  _checkInputValidity (fieldSet, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldSet, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(fieldSet, inputElement)
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !(inputElement.validity.valid && inputElement.value.trim());
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

  _setEventListeners (fieldSet) {
    //Насколько я понимаю, inputList и buttonElement нельзя вынести в поле класса, потому что это fieldset, и по идее, таких
    //наборов полей может быть несколько...И если привязывать здесь поиск к this._formElement, то
    //тогда эти два набора полей станут зависимыми...А в форме может быть не один inputList и не одна кнопка...
    //Если их вынести в свойства в конструктор, тогда если добавить новый fieldset в разметку, в этот this._formElement,
    //тогда вторая кнопка не будет реагировать на валидацию ее inputList...
    const inputList = Array.from(fieldSet.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = fieldSet.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._validationSettings.inputErrorClass)
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldSet, inputElement)
        this._toggleButtonState(inputList, buttonElement)
      });
    });

  };

  setPopupCardSubmitToInitial() {
    this._formElement.querySelector(this._validationSettings.submitButtonSelector).setAttribute('disabled',true);
    this._formElement.querySelector(this._validationSettings.submitButtonSelector).classList.add(this._validationSettings.inactiveButtonClass);
  }

  // Функция очистки ошибок в Popup
  clearErrors() {
    const errorList = Array.from(this._formElement.querySelectorAll(`.${this._validationSettings.activeErrorClass}`));
    const inputErrorList = Array.from(this._formElement.querySelectorAll(`.${this._validationSettings.inputErrorClass}`));

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

    const fieldSetList = Array.from(this._formElement.querySelectorAll(this._validationSettings.fieldSetSelector));
    
    fieldSetList.forEach((fieldSet) => this._setEventListeners(fieldSet));
  }
}
