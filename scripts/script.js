// Переменные элементов страницы
let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let popup = page.querySelector('.popup');
let editForm = page.querySelector('.popup__form');
let input = editForm.querySelectorAll('.popup__input');

// Переменные кнопок
let btnEdit = page.querySelector('.profile__btn-edit');
let btnClose = page.querySelector('.popup__btn-close');
let btnSubmit = page.querySelector('.popup__btn-submit');

//Переменные раздела Профиль//
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

//Переменные для input формы Popup//
let editFormName;
let editFormAbout;

function selectInput() {
  for (let i=0; i<input.length;i++) {
    if (input[i].name === 'name') {
      editFormName = input[i];
    } else {
      editFormAbout = input[i];
    }
  }
}

selectInput();

function showEditForm() {
  editFormName.value = profileName.textContent;
  editFormAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function closeEditForm() {
  popup.classList.remove('popup_opened');
}

function SubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent =  editFormName.value;
  profileAbout.textContent =  editFormAbout.value;
  closeEditForm(evt);
}

btnEdit.addEventListener('click', showEditForm);
btnClose.addEventListener('click', closeEditForm);
editForm.addEventListener('submit', SubmitEditForm);
