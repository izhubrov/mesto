import Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    this._popupElement = super(popupSelector);
    this._imageItem = this._popupElement.querySelector('.popup__image');
    this._imageItemCaption = this._popupElement.querySelector('.popup__caption');
  };

  handleCardClick(name, link) {
    super.openPopup();
    this._popupImage.src = link;
    this._popupImage.alt = `Изображение ${name}`;
    this._imageItemCaption.textContent = name;
  }
}