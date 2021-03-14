const popupImg = document.querySelector('.popup_type_img');
const imgItem = popupImg.querySelector('.popup__image');
const imgPopupCaption = popupImg.querySelector('.popup__caption');

function closePopupCardWithEscape(evt) {
  if (evt.key === 'Escape') {
    closePopupCard(popupImg);
  }
}

function closePopupCardWithClick(evt) {
  if (evt.target.classList.contains('popup__btn-close') ||
  evt.target.classList.contains('popup')) {
    closePopupCard(popupImg)
  }
}

function closePopupCard(modalWindowForm) {
  modalWindowForm.classList.remove('popup__opened');
  document.removeEventListener('keyup', closePopupCardWithEscape);
  modalWindowForm.removeEventListener('mousedown', closePopupCardWithClick);
}

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

  _handleLike() {
    this._elementsOfCard.btnLike.classList.toggle('cards__btn-like_active');
  }

  _handleRemove() {
    this._element.remove();
    this._element = null;
  }

   // Popup увеличения изображения 
  _handlePreviewCard() {
    imgItem.src = this._link;
    imgItem.alt = `Изображение ${this._name}`;
    imgPopupCaption.textContent = this._name;

    popupImg.classList.add('popup__opened');
    document.addEventListener('keyup', closePopupCardWithEscape);//закрытие по нажатию Escape
    popupImg.addEventListener('mousedown', closePopupCardWithClick);//закрытие с close button или overlay
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
