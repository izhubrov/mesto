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
  activeErrorClass: 'popup__input-error_active',
  initialSubmitButtonsTexts: {
    'form-edit-avatar': 'Сохранить',
    'form-add-card': 'Добавить',
    'form-edit-profile': 'Сохранить'
  },
  changedSubmitButtonsTexts: {
    'form-edit-avatar': 'Сохранение...',
    'form-add-card': 'Добавление...',
    'form-edit-profile': 'Сохранение...'
  }
}


const profile = document.querySelector('.profile');

// Переменные кнопок
const btnAdd = profile.querySelector('.profile__btn-add');
const btnEdit = profile.querySelector('.profile__btn-edit');
const avatarEdit = profile.querySelector('.profile__avatar');

// Переменные Popup
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupAvatar = document.querySelector('.popup_type_avatar');

// // Переменные форм Popup
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileInputName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileInputAbout = popupProfileForm.querySelector('.popup__input_type_about');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');



export {apiSettings, validationSettings, btnAdd, btnEdit, avatarEdit, popupProfileForm,
  popupCardForm, popupAvatarForm, popupProfileInputName, popupProfileInputAbout}
