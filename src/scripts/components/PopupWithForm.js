import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({ popupSelector, submitButtonsTexts, handleFormSubmit }) {
    super(popupSelector);
    this._submitButtonsTexts = submitButtonsTexts;
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submit = this._submitForm.bind(this);
    this._submitButton = this._popupForm.querySelector('.popup__btn-submit');
    this._submitText = this._popupForm.getAttribute('name');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setPopupSubmitTextToInitialState() {
    this._submitButton.textContent = this._submitButtonsTexts.initial[`${this._submitText}`];
  }

  changeStatusOfSubmitButton() {
    this._submitButton.textContent = this._submitButtonsTexts.changed[`${this._submitText}`];
  }

  _submitForm(evt){
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submit);
  }

  openPopup() {
    super.openPopup();
    this._setPopupSubmitTextToInitialState();
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
