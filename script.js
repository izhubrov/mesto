let page = document.querySelector('.page');

//выше переменные для страницы

let btnEdit = page.querySelector('.button_type_edit');
let btnClose = page.querySelector('.button_type_close');
let btnSubmit = page.querySelector('.button_type_submit');
//выше переменные для кнопок

let profile = page.querySelector('.profile');

//---Форма редактирования профиля---//
let popup = page.querySelector('.popup');
let editForm = page.querySelector('.popup__container');
let input = editForm.querySelector('.input');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');


//выше переменные для Формы редактирования Profile

function showEditForm(evt) {
  evt.preventDefault();
  let editFormName = input.querySelector('.input__text_type_name');
  let editFormAbout = input.querySelector('.input__text_type_about');
  editFormName.value = profileName.textContent;
  editFormAbout.value= profileAbout.textContent;
  popup.classList.add('popup_opened');
}
btnEdit.addEventListener('click', showEditForm);
//Открыть Форму редактирования Profile

function SubmitEditForm(evt) {
  evt.preventDefault();
  let editFormName = input.querySelector('.input__text_type_name');
  let editFormAbout = input.querySelector('.input__text_type_about');
  profileName.textContent =  `${editFormName.value}`;
  profileAbout.textContent =  `${editFormAbout.value}`;
  closeEditForm(evt);
}

editForm.addEventListener('submit',SubmitEditForm);
//Сохранить данные в Форме редактирования Profile

function closeEditForm(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}
btnClose.addEventListener('click', closeEditForm);
//Закрыть Форму редактирования Profile*/




