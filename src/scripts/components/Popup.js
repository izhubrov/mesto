export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupObject = {
      esc: this._closePopupWithEscape.bind(this),
      click: this._closePopupWithClick.bind(this)
    }
  }

  openPopup() {
    //Такая конструкция отображения именно в функции openPopup исключает мигание попапов при перезагрузке страницы или сбросе кеша
    //Если включить popup__flexed класс в index.html сразу, тогда они мигают.
    this._popupElement.classList.add('popup__flexed');
    setTimeout(()=> this._popupElement.classList.add('popup__opened'),0);
    document.addEventListener('keyup',  this._closePopupObject.esc);//закрытие по нажатию Escape
  }

  closePopup() {
    this._popupElement.classList.remove('popup__opened');
    document.removeEventListener('keyup', this._closePopupObject.esc);
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
    this._popupElement.addEventListener('mousedown', this._closePopupObject.click);//закрытие с close button или overlay
  }


}
