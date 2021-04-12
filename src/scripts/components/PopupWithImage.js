import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);
    this._imageItem = this._popupElement.querySelector('.popup__image');
    this._imageItemCaption = this._popupElement.querySelector('.popup__caption');
  };

  openPopup(name, link) {
    super.openPopup();
    this._imageItem.src = link;
    this._imageItem.alt = `Изображение ${name}`;
    this._imageItemCaption.textContent = name;
  }
}
