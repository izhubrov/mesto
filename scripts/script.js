// Переменные элементов страницы
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const profile = page.querySelector('.profile');
const btnAdd = profile.querySelector('.profile__btn-add');

// Шаблон профиля
const profileTemplate = page.querySelector('.profile-template').content;
const profileAvatar = profileTemplate.querySelector('.profile__avatar').cloneNode(true);
const profileInfo = profileTemplate.querySelector('.profile__info').cloneNode(true);
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
const btnEdit = profileInfo.querySelector('.profile__btn-edit');
profile.prepend(profileAvatar,profileInfo);

function profileOnLoad() {
  profileAvatar.src = './images/Avatar.png';
  profileAvatar.alt = 'Аватар пользователя';
  profileName.textContent = 'Жак-Ив Кусто';
  profileAbout.textContent = 'Исследователь океана';
}

profileOnLoad();
//

function closeForm() {

  popup.classList.remove('popup__opened');

  if (popup.querySelector('.popup__container'))
  popup.querySelector('.popup__container').remove();
}

// Шаблон формы
const popupTemplate = page.querySelector('.popup-template').content;

// Редактирование Профиля пользователя
function editProfileForm() {

  const profilePopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
  const profileFormName = profilePopup.querySelector('.popup__input_type_name');
  const profileFormAbout = profilePopup.querySelector('.popup__input_type_about');
  popup.append(profilePopup);
  const profileForm = popup.querySelector('.popup__form');

  function showProfileForm() {
    profilePopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    profilePopup.querySelector('.popup__btn-submit').textContent = 'Сохранить';
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
    popup.classList.add('popup__opened');
  }

  showProfileForm();

  function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent =  profileFormName.value;
    profileAbout.textContent =  profileFormAbout.value;
    popup.querySelector('.popup__container').remove();
    closeForm();
  }

  profileForm.addEventListener('submit', submitProfileForm);
}

// Редактирование Карточек
function addCardForm() {

  const cardPopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
  const cardName = cardPopup.querySelector('.popup__input_type_name');
  const cardLink = cardPopup.querySelector('.popup__input_type_about');
  popup.append(cardPopup);
  const cardForm = popup.querySelector('.popup__form');

  function showCardForm() {
    cardPopup.querySelector('.popup__title').textContent = 'Новое место';
    cardPopup.querySelector('.popup__btn-submit').textContent = 'Создать';
    cardName.placeholder = 'Название';
    cardLink.placeholder = 'Ссылка на картинку';
    popup.classList.add('popup__opened');
  }

  showCardForm();

  function submitCardForm(evt) {
    evt.preventDefault();
    popup.querySelector('.popup__container').remove();
    closeForm();
  }

  cardForm.addEventListener('submit', submitCardForm);
}

btnEdit.addEventListener('click', editProfileForm);
btnAdd.addEventListener('click', addCardForm);
page.addEventListener('click', (evt) => {
 if (evt.target.classList.contains('popup__btn-close'))
 closeForm();
});














