import {popupImg, imgItem, imgPopupCaption, openPopup} from './index.js';

export default class Card {

  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.cards__item').cloneNode(true);

    return cardElement;
  }

  _getElementsOfCard() {
    const elementsOfCard = {
     cardImg: this._element.querySelector('.cards__image'),
     cardTitle: this._element.querySelector('.cards__title'),
     btnLike: this._element.querySelector('.cards__btn-like'),
     btnRemove: this._element.querySelector('.cards__btn-remove'),
    }

    return elementsOfCard;
  }

  _setEventListeners() {
    this._elementsOfCard.btnLike.addEventListener('click', () => this._handleLike());
    this._elementsOfCard.btnRemove.addEventListener('click', () => this._handleRemove());
    this._elementsOfCard.cardImg.addEventListener('click', () => this._handlePreviewCard());
    this._elementsOfCard.cardImg.addEventListener('error', () => this._handleRemove());
  }

  _handleLike(evt) {
    this._elementsOfCard.btnLike.classList.toggle('cards__btn-like_active');
  }

  _handleRemove() {
    this._element.remove();
    this._element = null;
  }

  //Popup увеличения изображения
  _handlePreviewCard() {
    imgItem.src = this._link;
    imgItem.alt = `Изображение ${this._name}`;
    imgPopupCaption.textContent = this._name;
    openPopup(popupImg);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementsOfCard = this._getElementsOfCard();
    this._delay = 1/2;
    this._element.style.animationDelay = `${this._delay}s`;
    this._elementsOfCard.cardImg.src = this._link;
    this._elementsOfCard.cardImg.alt = this._name;
    this._elementsOfCard.cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
