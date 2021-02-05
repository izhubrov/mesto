// Переменные элементов страницы
let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let popup = page.querySelector('.popup');
let editForm = page.querySelector('.popup__form');
let input = editForm.querySelectorAll('.popup__input');

// Переменные кнопок
let btnEdit = page.querySelector('.profile__btn-edit');
let btnClose = page.querySelector('.popup__btn-close');

//Переменные раздела Профиль//
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

//Переменные для input формы Popup//
let editFormName = popup.querySelector('.popup__input_type_name');
let editFormAbout = popup.querySelector('.popup__input_type_about');

function showEditForm() {
  editFormName.value = profileName.textContent;
  editFormAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function closeEditForm() {
  popup.classList.remove('popup_opened');
}

function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent =  editFormName.value;
  profileAbout.textContent =  editFormAbout.value;
  closeEditForm(evt);
}

btnEdit.addEventListener('click', showEditForm);
btnClose.addEventListener('click', closeEditForm);
editForm.addEventListener('submit', submitEditForm);
