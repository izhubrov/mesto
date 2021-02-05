// Переменные элементов страницы
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const editForm = page.querySelector('.popup__form');

// Переменные кнопок
const btnClose = page.querySelector('.popup__btn-close');

// Заполнили шаблон и добавили на страницу профиль
const profileTemplate = page.querySelector('.profile-template').content;
const profileAvatar = profileTemplate.querySelector('.profile__avatar').cloneNode(true);
const profileInfo = profileTemplate.querySelector('.profile__info').cloneNode(true);
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
page.querySelector('.profile').prepend(profileAvatar,profileInfo);
//

function profileOnLoad() {
  profileAvatar.src = './images/Avatar.png';
  profileAvatar.alt = 'Аватар пользователя';
  profileName.textContent = 'Жак-Ив Кусто';
  profileAbout.textContent = 'Исследователь океана';
}

profileOnLoad();

function setProfile() {
  const editFormName = popup.querySelector('.popup__input_type_name');
  const editFormAbout = popup.querySelector('.popup__input_type_about');
  const btnEdit = profileInfo.querySelector('.profile__btn-edit');

  function showEditForm() {
    editFormName.value = profileName.textContent;
    editFormAbout.value = profileAbout.textContent;
    popup.classList.add('popup__opened');
  }

  function submitEditForm(evt) {
    evt.preventDefault();
    profileName.textContent =  editFormName.value;
    profileAbout.textContent =  editFormAbout.value;
    closeForm();
  }

  btnEdit.addEventListener('click', showEditForm);
  editForm.addEventListener('submit', submitEditForm);
}

setProfile();

function closeForm() {
  popup.classList.remove('popup__opened');
}

btnClose.addEventListener('click', closeForm);







