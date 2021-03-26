import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues({userName, userAbout}) {
    const {name, about} = this._popupForm.elements;
    name.value = userName;
    about.value = userAbout;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
