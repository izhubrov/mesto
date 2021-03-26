export default class Popup {
  constructor(popupSelector) {
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
      this.closePopup();
    }
  }

  _closePopupWithClick(evt) {
    if (evt.target.classList.contains('popup__btn-close') ||
        evt.target.classList.contains('popup')) {
        this.closePopup();
    }
  }

  _removeEventListeners() {
    document.removeEventListener('keyup', this._closePopupWithEscape.bind(this));
    this._popupElement.removeEventListener('mousedown', this._closePopupWithClick.bind(this));
  }

  setEventListeners() {
    document.addEventListener('keyup', this._closePopupWithEscape.bind(this));//закрытие по нажатию Escape
    this._popupElement.addEventListener('mousedown', this._closePopupWithClick.bind(this));//закрытие с close button или overlay
  }


}
