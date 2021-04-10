import './index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {apiSettings, validationSettings, btnAdd, btnEdit, popupProfileForm, popupCardForm,
  popupProfileInputName as inputName, popupProfileInputAbout as inputAbout} from '../scripts/utils/constants.js';


//Работа по созданию экземпляров классов валидации попапов и включение валидации
const popupProfileFormValidator = new FormValidator(validationSettings, popupProfileForm);
const popupCardFormValidator = new FormValidator(validationSettings, popupCardForm);
popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();


const popupImage = new PopupWithImage('.popup_type_img');

let cardToRemove = null;

//Работа c API
const api = new Api(apiSettings);

//Работа по созданию экземпляров Карточек (начальных) и их отрисовке на странице
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
        .catch((err) => console.log(err))
    }},

    {handleCardDislike: () => {
      api.dislikeCard(newCard)
        .then((res) => newCard.setCounterOfLikes(res.likes.length))
        .catch((err) => console.log(err))
    }}
    );

  return newCard.generateCard();
}

//Работа по созданию экземпляров классов Info пользователя, Popup редактирования профиля и Popup заполнения карточки
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
});

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formValues) => {
    api.patchUserInfo(formValues)
      .then((updatedUser) => userInfo.setUserInfo(updatedUser))
      .catch((err) => console.log(err));
    popupProfile.closePopup();
  }
});

const popupCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (formValues) => {
    api.postCard({name:formValues.title, link:formValues.link})
    .then((newCard)=> {
      const generatedCard = createCard(newCard, '.card-template');
      cardsList.setItem(generatedCard);
    })
    .catch((err) => console.log(err));
    popupCard.closePopup();
  }
});

const popupRemove = new PopupWithForm({
  popupSelector: '.popup_type_remove',
  handleFormSubmit: () => {
    api.deleteCard(cardToRemove)
      .then(() => cardToRemove.removeCard())
      .catch((err) => console.log(err));
    popupRemove.closePopup();
  }
});

const cardsList = new Section({
  renderer: item => {
    const generatedCard = createCard(item, '.card-template');
    cardsList.setItem(generatedCard, true);
  }
},'.cards');



api.getUser()
  .then((UserInfoObject) => {
    userInfo.setUserInfo(UserInfoObject);
    userInfo.setUserAvatar(UserInfoObject);
  })
  .catch((err) => console.log(err));

api.getCards()
  .then((cardsArr) => cardsList.renderItems(cardsArr))
  .catch((err) => console.log(err));



popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupRemove.setEventListeners();

//Работа по обработке событий нажатия на кнопки редактирования профиля и добавления карточки

function setPopupProfileInputs() {
  inputName.value = userInfo.getUserInfo().userName;
  inputAbout.value = userInfo.getUserInfo().userAbout;
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

btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
