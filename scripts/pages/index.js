import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

import {initialCards, validationSettings, page, cardsList, btnAdd, btnEdit,
  popupProfile, popupCard, popupImg, imgItem, imgPopupCaption, profileName,
  profileAbout, popupProfileForm, popupProfileName, popupProfileAbout, popupCardForm,
  popupCardName, popupCardAbout} from '../utils/constants.js';

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



//Заполняем карточки

function createCard(item, templateSelector) {
  const newCard = new Card(item, templateSelector, openPopupImage);

  return newCard.generateCard();
}


//Отображаем изначальные карточки

  const cardsArr = new Section({
    data: initialCards,
    renderer: item => {
      const generatedCard = createCard(item, '.card-template');
      cardsArr.setItem(generatedCard);
    }
  },'.cards');

  cardsArr.renderItems();



// Работа с формой Popup добавления карточки

function handleAddCard() {
  popupCardFormValidator.clearErrors();
  popupCardFormValidator.setPopupCardSubmitToInitial();
  openPopup(popupCard);
  popupCardForm.reset();
}

function submitPopupCard(evt) {
  evt.preventDefault();
  const generatedCard = createCard({name:popupCardName.value, link:popupCardAbout.value}, '.card-template');

  cardsList.prepend(generatedCard);
  closePopup(popupCard);
}


//Обработчики событий
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
popupProfileForm.addEventListener('submit', submitPopupProfile);
popupCardForm.addEventListener('submit', submitPopupCard);
