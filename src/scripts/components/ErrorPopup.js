export default class ErrorPopup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._errorTextElement = this._popupElement.querySelector('.error-popup__text');
  }

  openErrorPopup(text) {
    this._popupElement.style.display = 'flex';
    this._errorTextElement.textContent = text;
    setTimeout(()=> this._popupElement.classList.add('error-popup__opened'),0);
    setTimeout(()=>{
      this._popupElement.classList.remove('error-popup__opened');
    }, 3500);
  }
}
