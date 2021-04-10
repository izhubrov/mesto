export default class Card {

  constructor({name, link, likes, owner, _id},
    templateSelector, handleCardClick, {handleRemoveClick}, {id},
    {handleCardLike}, {handleCardDislike}) {
      this._name = name;
      this._link = link;
      this._arrUsersWhoLikes = likes;
      this._owner = owner;
      this._id = _id;
      this._selector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleRemoveClick = handleRemoveClick;
      this._mineId = id;
      this._handleCardLike = handleCardLike;
      this._handleCardDislike = handleCardDislike;
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
     likesCounter: this._element.querySelector('.cards__likes-counter'),
     btnRemove: this._element.querySelector('.cards__btn-remove'),
    }

    return elementsOfCard;
  }

  _setEventListeners() {
    this._elementsOfCard.btnLike.addEventListener('click', () => this._handlelike());
    this._elementsOfCard.btnRemove.addEventListener('click', () => this._handleRemoveClick());
    this._elementsOfCard.cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link))
    this._elementsOfCard.cardImg.addEventListener('error', () => this.removeCard());
  }

  _handlelike() {
    if (!this._elementsOfCard.btnLike.classList.contains('cards__btn-like_active')) {
      this._elementsOfCard.btnLike.classList.add('cards__btn-like_active')
      this._handleCardLike();
    } else {
      this._elementsOfCard.btnLike.classList.remove('cards__btn-like_active')
      this._handleCardDislike();
    }
  }

  setCounterOfLikes(num){
    this._elementsOfCard.likesCounter.textContent = num;
  }

  _setBtnRemoveVisible() {
    if (this._owner._id === this._mineId) {
      this._elementsOfCard.btnRemove.classList.add('cards__btn-remove_active');
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _isCardAlreadyLike() {
    if (this._arrUsersWhoLikes.some(user => user._id === this._mineId)) {
      this._elementsOfCard.btnLike.classList.add('cards__btn-like_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementsOfCard = this._getElementsOfCard();

    this._elementsOfCard.cardImg.src = this._link;
    this._elementsOfCard.cardImg.alt = this._name;
    this._elementsOfCard.cardTitle.textContent = this._name;
    this._elementsOfCard.likesCounter.textContent = this._arrUsersWhoLikes.length;

    this._isCardAlreadyLike();
    this._setBtnRemoveVisible();
    this._setEventListeners();

    this._delay = 1/6;
    this._element.style.animationDelay = `${this._delay}s`;

    return this._element;
  }
}
