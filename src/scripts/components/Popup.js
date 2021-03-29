export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopup = {
      esc: this._closePopupWithEscape.bind(this),
      click: this._closePopupWithClick.bind(this)
    }
  }

  openPopup() {
    this._popupElement.classList.add('popup__opened');
    document.addEventListener('keyup',  this._closePopup.esc);//закрытие по нажатию Escape
  }

  closePopup() {
    this._popupElement.classList.remove('popup__opened');
    document.removeEventListener('keyup', this._closePopup.esc);
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


  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._closePopup.click);//закрытие с close button или overlay
  }


}
