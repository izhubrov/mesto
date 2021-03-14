import FormValidator from './FormValidator.js';
import {validationSettings} from './validationSettings.js';
import Card from './Card.js';
import {initialCards} from './initial-cards.js';

// Переменные элементов page
const page = document.querySelector('.page');
const cardsList = page.querySelector('.cards');
const profile = page.querySelector('.profile');

// Переменные кнопок
const btnAdd = profile.querySelector('.profile__btn-add');
const btnEdit = profile.querySelector('.profile__btn-edit');

// Переменные Popup
const popupProfile = page.querySelector('.popup_type_profile');
const popupCard = page.querySelector('.popup_type_card');
const popupImg = document.querySelector('.popup_type_img');
const imgItem = popupImg.querySelector('.popup__image');
const imgPopupCaption = popupImg.querySelector('.popup__caption');

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


//Работа по созданию экземпляров классов валидации попапов и включение валидации
const popupProfileFormValidator = new FormValidator(validationSettings, popupProfileForm);
const popupCardFormValidator = new FormValidator(validationSettings, popupCardForm);
popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();

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

function openPopup(modalWindowForm) {
  modalWindowForm.classList.add('popup__opened');
  page.addEventListener('keyup', closePopupWithEscape);//закрытие по нажатию Escape
  modalWindowForm.addEventListener('mousedown', closePopupWithClick);//закрытие с close button или overlay
}

function openPopupImage(name, link) {
  imgItem.src = link;
  imgItem.alt = `Изображение ${name}`;
  imgPopupCaption.textContent = name;
  openPopup(popupImg);
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
  popupProfileFormValidator.clearErrors();
  setPopupProfilefields()
  openPopup(popupProfile);
}

function submitPopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent =  popupProfileName.value.trim();
  profileAbout.textContent =  popupProfileAbout.value.trim();
  closePopup(popupProfile);
}


//Отображаем изначальные карточки
function renderCards() {

  const cardsArr = initialCards.map((item) => {
    const newCard = new Card(item, '.card-template', openPopupImage);

    return newCard.generateCard();
  });
  cardsList.append(...cardsArr);
}

renderCards();


// Работа с формой Popup добавления карточки

function handleAddCard() {
  popupCardFormValidator.clearErrors();
  popupCardFormValidator.setPopupCardSubmitToInitial();
  openPopup(popupCard);
  popupCardForm.reset();
}

function submitPopupCard(evt) {

  evt.preventDefault();
  const newCard = new Card({name:popupCardName.value, link:popupCardAbout.value},'.card-template', openPopupImage);
  cardsList.prepend(newCard.generateCard());
  closePopup(popupCard);
}


//Обработчики событий
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
popupProfileForm.addEventListener('submit', submitPopupProfile);
popupCardForm.addEventListener('submit', submitPopupCard);
