export default class Popup {
  constructor() {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupElement.classList.add('popup__opened');
  }

  closePopup() {
    this._popupElement.classList.remove('popup__opened');
    this._removeEventListeners();
  }

  _closePopupWithEscape(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }

  _closePopupWithClick(evt) {
    if (evt.target.classList.contains('popup__btn-close') ||
        evt.target.classList.contains('popup')) {
        this._closePopup();
    }
  }

  _removeEventListeners() {
    document.removeEventListener('keyup', this._closePopupWithEscape);
    this._popupElement.removeEventListener('mousedown', this._closePopupWithClick);
  }

  setEventListeners() {
    document.addEventListener('keyup', this._closePopupWithEscape);//закрытие по нажатию Escape
    this._popupElement.addEventListener('mousedown', this._closePopupWithClick);//закрытие с close button или overlay
  }


}