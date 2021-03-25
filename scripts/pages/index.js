import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {initialCards, validationSettings, btnAdd, btnEdit,
  popupProfileForm, popupCardForm} from '../utils/constants.js';

//Работа по созданию экземпляров классов валидации попапов и включение валидации
const popupProfileFormValidator = new FormValidator(validationSettings, popupProfileForm);
const popupCardFormValidator = new FormValidator(validationSettings, popupCardForm);
popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_img');

//Заполняем карточки
function createCard(item, templateSelector) {
  const newCard = new Card(item, templateSelector, popupImage.handleCardClick.bind(popupImage));

  return newCard.generateCard();
}

//Отображаем изначальные карточки
const cardsList = new Section({
  data: initialCards,
  renderer: item => {
    const generatedCard = createCard(item, '.card-template');
    cardsList.setItem(generatedCard, true);
  }
},'.cards');

cardsList.renderItems();

//Работа по созданию экземпляров классов
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about'
});

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo({name: formValues.name, about: formValues.about});
    popupProfile.closePopup();
  }
});

const popupCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (formValues) => {
    const generatedCard = createCard({name:formValues.title, link:formValues.link}, '.card-template');
    cardsList.setItem(generatedCard);
    popupCard.closePopup();
  }
})



function handleEditProfile() {
  popupProfileFormValidator.clearErrors();
  popupProfileFormValidator.setPopupSubmitToInitial();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.setEventListeners();
  popupProfile.openPopup();
}

function handleAddCard() {
  popupCardFormValidator.clearErrors();
  popupCardFormValidator.setPopupSubmitToInitial();
  popupCard.setEventListeners();
  popupCard.openPopup();
}


  //Обработчики событий
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
