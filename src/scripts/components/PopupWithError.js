import Popup from "./Popup.js";
export default class PopupWithError extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._errorTextElement = this._popupElement.querySelector('.error-popup__text');
  }

  openPopup(text) {
    this._popupElement.style.display = 'flex';
    this._errorTextElement.textContent = text;
    setTimeout(()=> {
      this._popupElement.classList.add('error-popup__opened');
      this._closePopup();
    },0);
  }

  _closePopup() {
    setTimeout(()=>{
      this._popupElement.classList.remove('error-popup__opened');
    }, 3500);
  }
}


