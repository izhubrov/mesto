import './index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {apiSettings, validationSettings, btnAdd, btnEdit, avatarEdit,
  popupProfileForm, popupCardForm, popupAvatarForm, 
  popupProfileInputName as inputName, popupProfileInputAbout as inputAbout}
  from '../scripts/utils/constants.js';


//Работа по созданию экземпляров классов валидации попапов и включение валидации
const popupProfileFormValidator = new FormValidator(validationSettings, popupProfileForm);
const popupCardFormValidator = new FormValidator(validationSettings, popupCardForm);
const popupAvatarFormValidator = new FormValidator(validationSettings, popupAvatarForm);
popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_img');

let cardToRemove = null;


//Создание экземпляра класса API
const api = new Api(apiSettings);


//Работа с экземпляром класса Info пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
});


api.getUser()
  .then((UserInfoObject) => {
    userInfo.setUserInfo(UserInfoObject);
    userInfo.setUserAvatar(UserInfoObject);
  })
  .catch((err) => alert(err));


//Работа с экземплярами Карточек (начальных) и их отрисовке на странице
function createCard(item, templateSelector) {
  const newCard = new Card(
    item,
    templateSelector,
    popupImage.handleCardClick.bind(popupImage),

    {handleRemoveClick: () => {
      popupRemove.openPopup();
      cardToRemove = newCard;
    }},

    {id: userInfo.id},

    {handleCardLike: () => {
      api.likeCard(newCard)
        .then((res) => newCard.setCounterOfLikes(res.likes.length))
        .catch((err) => alert(err))
    }},

    {handleCardDislike: () => {
      api.dislikeCard(newCard)
        .then((res) => newCard.setCounterOfLikes(res.likes.length))
        .catch((err) => alert(err))
    }}
    );

  return newCard.generateCard();
}

function getCardsFromApiAndRender() {
  const cardsList = new Section({
    renderer: item => {
      const generatedCard = createCard(item, '.card-template');
      cardsList.setItem(generatedCard, true);
    }
  },'.cards');
  
  api.getCards()
  .then((cardsArr) => cardsList.renderItems(cardsArr))
  .catch((err) => alert(err));
}

getCardsFromApiAndRender();



//Работа с экземплярами классов Popup редактирования профиля//
//Popup заполнения карточки, Popup удаления карточки, Popup редактирования Аватара пользователя

//Функция проверки есть ли изображение по введенному адресу
function checkImage(link) {
  return new Promise((resolve,reject) => {
    const img = document.createElement('img');
    img.src = link;
    img.onload = resolve;
    img.onerror = reject;
  })
}

//Работа с API добавления карточки и создание попапа добавления карточки
function addCardApi(formValues) {
  api.postCard({name:formValues.title, link:formValues.link})
  .then((newCard)=> {
    const generatedCard = createCard(newCard, '.card-template');
    cardsList.setItem(generatedCard);
    popupCard.closePopup();
  })
  .catch((err) => alert(err));
}

const popupCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (formValues) => {
    checkImage(formValues.link)
    .then(()=> {
      popupCardFormValidator.changeStatusOfSubmitButton();
      addCardApi(formValues);
    })
    .catch(() => alert('Изображение не найдено. Введите корректный адрес!'));
  }
});


//Работа с API смены Аватара пользователя и создание попапа смены аватара пользователя
function changeAvatarApi(formValues) {
  api.changeAvatar(formValues.link)
  .then(() => {
    api.getUser()
      .then((UserInfoObject) => {
        userInfo.setUserAvatar(UserInfoObject);
      });
    popupAvatar.closePopup();
  })
  .catch((err) => alert(err));
}

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formValues) => {
    checkImage(formValues.link)
    .then(()=> {
      popupAvatarFormValidator.changeStatusOfSubmitButton();
      changeAvatarApi(formValues);
    })
    .catch(() => alert('Изображение не найдено. Введите корректный адрес!'));
  }
})


const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formValues) => {
    popupProfileFormValidator.changeStatusOfSubmitButton();
    api.patchUserInfo(formValues)
      .then((updatedUser) => {
        userInfo.setUserInfo(updatedUser);
        popupProfile.closePopup();
      })
      .catch((err) => alert(err));
  }
});

const popupRemove = new PopupWithForm({
  popupSelector: '.popup_type_remove',
  handleFormSubmit: () => {
    api.deleteCard(cardToRemove)
      .then(() => cardToRemove.removeCard())
      .catch((err) => alert(err));
    popupRemove.closePopup();
  }
});


popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupRemove.setEventListeners();
popupAvatar.setEventListeners();


//Работа по обработке событий нажатия на кнопки редактирования профиля, аватара и добавления карточки
function setPopupProfileInputs() {
  inputName.value = userInfo.getUserInfo().userName;
  inputAbout.value = userInfo.getUserInfo().userAbout;
}

function handleEditAvatar() {
  popupAvatarFormValidator.setPopupToInitialState();
  popupAvatar.openPopup();
}

function handleEditProfile() {
  popupProfileFormValidator.setPopupToInitialState();
  setPopupProfileInputs();
  popupProfile.openPopup();
}

function handleAddCard() {
  popupCardFormValidator.setPopupToInitialState();
  popupCard.openPopup();
}

avatarEdit.addEventListener('click', handleEditAvatar);
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
