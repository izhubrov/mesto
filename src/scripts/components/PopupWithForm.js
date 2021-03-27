import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submit = this._submitForm.bind(this);
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }


  _submitForm(evt){
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submit);
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._submit);
  }
}
