let page = document.querySelector('.page');
let places = document.querySelector('.places');

//выше переменные для страницы

let btnEdit = page.querySelector('.profile__btn-edit');
let btnClose = page.querySelector('.popup__btn-close');
let btnSubmit = page.querySelector('.popup__btn-submit');
let btnLike = page.querySelectorAll('.cards__btn-like');
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
let a;
function liked(a) {
  console.log(`${a}`);
}

function like() {
  for (let i=0; i<btnLike.length; i++) {
    btnLike[i].addEventListener('click', function() {
      if (btnLike[i].classList.contains('cards__btn-like_active') === true) {
        btnLike[i].classList.remove('cards__btn-like_active');
      }
      else {
        btnLike[i].classList.add('cards__btn-like_active');
      }
    });
  }
}

like();

