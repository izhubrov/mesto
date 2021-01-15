let page = document.querySelector('.page');
let overlay = page.querySelector('.page__overlay');
//выше переменные для страницы

let btnEdit = page.querySelector('.button_type_edit');
let btnClose = page.querySelector('.button_type_close');
let btnSubmit = page.querySelector('.button_type_submit');
//выше переменные для кнопок

let profile = page.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
//выше переменные для секции Profile

//---Форма редактирования профиля---//
let editForm = page.querySelector('.form_type_edit');
let input = editForm.querySelector('.input');
let editFormName = input.querySelector('.input__text_type_name');
let editFormAbout = input.querySelector('.input__text_type_about');

//выше переменные для Формы редактирования Profile

function showEditForm() {
  editFormName.setAttribute('value', profileName.textContent);
  editFormAbout.setAttribute('value', profileAbout.textContent);
  overlay.setAttribute('style','display:block');
  editForm.setAttribute('style', 'display:block');
}
btnEdit.addEventListener('click', showEditForm);
//Открыть Форму редактирования Profile
/*
function SubmitEditForm() {
  profileName.textContent = `${editFormName.getAttribute('value')}`;
  console.log('123');
}
btnSubmit.addEventListener('click',SubmitEditForm);
//Сохранить данные в Форме редактирования Profile


function closeEditForm() {
  overlay.setAttribute('style','display:none');
  editForm.setAttribute('style', 'display:none');
}
btnClose.addEventListener('click', closeEditForm);
//Закрыть Форму редактирования Profile*/


