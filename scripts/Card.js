export default class Card {

  constructor(data, templateSelector, openPopupImg) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
    this._openPopupImg = openPopupImg;
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
    this._elementsOfCard.cardImg.addEventListener('click', () => this._openPopupImg(this._name, this._link))
    this._elementsOfCard.cardImg.addEventListener('error', () => this._handleRemove());
  }

  _handleLike() {
    this._elementsOfCard.btnLike.classList.toggle('cards__btn-like_active');
  }

  _handleRemove() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementsOfCard = this._getElementsOfCard();

    this._elementsOfCard.cardImg.src = this._link;
    this._elementsOfCard.cardImg.alt = this._name;
    this._elementsOfCard.cardTitle.textContent = this._name;
    
    this._setEventListeners();

    this._delay = 1/6;
    this._element.style.animationDelay = `${this._delay}s`;

    return this._element;
  }
}
