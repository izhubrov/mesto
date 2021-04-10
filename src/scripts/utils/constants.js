const apiSettings = {
  groupId: 'cohort-22',
  token: 'a835ebe3-157b-4140-922b-a5f49168fcac'
}

const validationSettings = {
  inputSelector: '.popup__input',
  fieldSetSelector: '.popup__set',
  errorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  activeErrorClass: 'popup__input-error_active'
};

const profile = document.querySelector('.profile');

// Переменные кнопок
const btnAdd = profile.querySelector('.profile__btn-add');
const btnEdit = profile.querySelector('.profile__btn-edit');

// Переменные Popup
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');

// // Переменные формы Popup редактирования профиля пользователя
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileInputName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileInputAbout = popupProfileForm.querySelector('.popup__input_type_about');

// // Переменные формы Popup добавления карточки
const popupCardForm = popupCard.querySelector('.popup__form');



export {apiSettings, validationSettings, btnAdd, btnEdit,popupProfileForm,
  popupCardForm, popupProfileInputName,popupProfileInputAbout}
