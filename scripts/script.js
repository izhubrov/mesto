// Переменные элементов страницы
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const popupTemplate = page.querySelector('.popup-template').content;
const profile = page.querySelector('.profile');
// Шаблон профиля
const profileTemplate = page.querySelector('.profile-template').content;
const profileAvatar = profileTemplate.querySelector('.profile__avatar').cloneNode(true);
const profileInfo = profileTemplate.querySelector('.profile__info').cloneNode(true);
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
profile.prepend(profileAvatar,profileInfo);

function profileOnLoad() {
  profileAvatar.src = './images/Avatar.png';
  profileAvatar.alt = 'Аватар пользователя';
  profileName.textContent = 'Жак-Ив Кусто';
  profileAbout.textContent = 'Исследователь океана';
}

profileOnLoad();
//

// Шаблон формы


// const profilePopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
// const profileFormName = profilePopup.querySelector('.popup__input_type_name');
// const profileFormAbout = profilePopup.querySelector('.popup__input_type_about');

function editProfileForm() {

  const profilePopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
  const profileFormName = profilePopup.querySelector('.popup__input_type_name');
  const profileFormAbout = profilePopup.querySelector('.popup__input_type_about');
  popup.append(profilePopup);

  profilePopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  profilePopup.querySelector('.popup__btn-submit').textContent = 'Сохранить';

  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  popup.classList.add('popup__opened');

  function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent =  profileFormName.value;
    profileAbout.textContent =  profileFormAbout.value;
    popup.querySelector('.popup__container').remove();
    closeForm();
  }

  const profileForm = popup.querySelector('.popup__form');
  const btnClose = page.querySelector('.popup__btn-close');
  profileForm.addEventListener('submit', submitProfileForm);
  btnClose.addEventListener('click', closeForm);
}

const btnEdit = profileInfo.querySelector('.profile__btn-edit');
btnEdit.addEventListener('click', editProfileForm);



function editCardForm() {
  const cardPopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
  const cardName = cardPopup.querySelector('.popup__input_type_name');
  const cardLink = cardPopup.querySelector('.popup__input_type_about');
  popup.append(cardPopup);
  cardPopup.querySelector('.popup__title').textContent = 'Новое место';
  cardPopup.querySelector('.popup__btn-submit').textContent = 'Создать';
  cardName.placeholder = 'Название';
  cardLink.placeholder = 'Ссылка на картинку';
  popup.classList.add('popup__opened');
  const btnClose = page.querySelector('.popup__btn-close');
  btnClose.addEventListener('click', closeForm);
}

const btnAdd = profile.querySelector('.profile__btn-add');
btnAdd.addEventListener('click', editCardForm);


function closeForm() {
  popup.classList.remove('popup__opened');
  console.log(popup);

  if (popup.querySelector('.popup__container')){
  popup.querySelector('.popup__container').remove();
}
}












