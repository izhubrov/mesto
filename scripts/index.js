// Переменные элементов page
const page = document.querySelector('.page');
const cardsList = page.querySelector('.cards');
const cardTemplate = page.querySelector('.card-template').content;
const cardItem = cardTemplate.querySelector('.cards__item')
const profile = page.querySelector('.profile');

// Переменные кнопок
export const btnAdd = profile.querySelector('.profile__btn-add');
export const btnEdit = profile.querySelector('.profile__btn-edit');

// Переменные Popup
const popupProfile = page.querySelector('.popup_type_profile');
const popupCard = page.querySelector('.popup_type_card');
export const popupImg = document.querySelector('.popup_type_img');
export const imgItem = popupImg.querySelector('.popup__image');
export const imgPopupCaption = popupImg.querySelector('.popup__caption');

// Переменные полей Profile
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

// Переменные формы Popup редактирования профиля пользователя
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfile.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_type_about');

// Переменные формы Popup добавления карточки
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardName = popupCard.querySelector('.popup__input_type_name');
const popupCardAbout = popupCard.querySelector('.popup__input_type_about');


// Работа с открытием, закрытием Popup

function findOpenedPopup() {
  const popupElement = page.querySelector('.popup__opened');
  return popupElement;
}

function closePopupWithEscape(evt) {
  const openedPopup = findOpenedPopup();

  if ( (evt.key === 'Escape') && openedPopup ) {
    closePopup(openedPopup)
  }
}

function closePopupWithClick(evt) {
  if (evt.target.classList.contains('popup__btn-close') ||
      evt.target.classList.contains('popup')) {
      const popupItem = evt.target.closest('.popup');
      closePopup(popupItem)
  }
}

import FormValidator from './FormValidator.js';
import {validationSettings} from './validationSettings.js';

export function openPopup(modalWindowForm) {

  const formValidator = new FormValidator(validationSettings, modalWindowForm);
  formValidator.enableValidation();

  modalWindowForm.classList.add('popup__opened');
  page.addEventListener('keyup', closePopupWithEscape);//закрытие по нажатию Escape
  modalWindowForm.addEventListener('mousedown', closePopupWithClick);//закрытие с close button или overlay
}

function closePopup(modalWindowForm) {
  modalWindowForm.classList.remove('popup__opened');
  page.removeEventListener('keyup', closePopupWithEscape);
  modalWindowForm.removeEventListener('mousedown', closePopupWithClick);
}


// Работа с формой Popup редактирования профиля пользователя

function setPopupProfilefields() {
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
}

setPopupProfilefields()

function handleEditProfile() {
  setPopupProfilefields()
  openPopup(popupProfile);
}

function submitPopupProfile(evt) {
  evt.preventDefault();
  if (popupProfileName.value.trim()) {
    profileName.textContent =  popupProfileName.value.trim();
    profileAbout.textContent =  popupProfileAbout.value.trim();
    closePopup(popupProfile);
  }
  else {
    closePopup(popupProfile);
  }
}


// Работа с отображением карточек

import Card from './Card.js';
import {initialCards} from './initial-cards.js';
//Отображаем изначальные карточки
function renderCards() {

  const cardsArr = initialCards.map((item) => {
    const newCard = new Card(item, '.card-template');
    return newCard.generateCard();
  });
  cardsList.append(...cardsArr);
}

renderCards();


// Работа с формой Popup добавления карточки

function handleAddCard() {
  openPopup(popupCard);
  popupCardForm.reset();
}

function submitPopupCard(evt) {

  evt.preventDefault();
  if (popupCardName.value.trim()) {
    const newCard = new Card({name:popupCardName.value, link:popupCardAbout.value},'.card-template');
    cardsList.prepend(newCard.generateCard());
    closePopup(popupCard);
    popupCardForm.reset();
  }
  else {
    closePopup(popupCard);
    popupCardForm.reset();
  }
}


//Обработчики событий
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
popupProfileForm.addEventListener('submit', submitPopupProfile);
popupCardForm.addEventListener('submit', submitPopupCard);
