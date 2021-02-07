// Переменные элементов страницы
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const profile = page.querySelector('.profile');
const btnAdd = profile.querySelector('.profile__btn-add');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//Форма Профиля
const profileInfo = page.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
const btnEdit = profileInfo.querySelector('.profile__btn-edit');

// Закрытие формы
function closeForm(evt) {
  popup.classList.remove('popup__opened');

  //Очистили формы
  if (evt.target.parentElement.classList.contains('popup__container_form'))
  evt.target.parentElement.classList.remove('popup__container_form');

  if (evt.target.parentElement.classList.contains('popup__container_img'))
  evt.target.parentElement.classList.remove('popup__container_img');
}

// Форма редактирования профиля пользователя
function editProfileForm() {

  const profilePopup = popup.querySelector('.popup__container_profile');
  const profileFormName = profilePopup.querySelector('.popup__input_type_name');
  const profileFormAbout = profilePopup.querySelector('.popup__input_type_about');
  const profileForm = profilePopup.querySelector('.popup__form');

  function showProfileForm() {
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
    popup.classList.add('popup__opened');
    profilePopup.classList.add('popup__container_form');
  }

  showProfileForm();

  function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent =  profileFormName.value;
    profileAbout.textContent =  profileFormAbout.value;
    closeForm(evt);
  }

  profileForm.addEventListener('submit', submitProfileForm);
}


// Шаблон карточки
const cardTemplate = page.querySelector('.card-template').content;

// Отображаем карточки
function setCards(card) {
  
  //Отображаем начальный массив карточек
  if(!card) {
    initialCards.forEach(function (item) {
      const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
      cardElement.querySelector('.cards__image').src = `${item.link}`;
      cardElement.querySelector('.cards__image').alt = `Изображение: ${item.name}`;
      cardElement.querySelector('.cards__title').textContent = `${item.name}`;
      page.querySelector('.cards').append(cardElement);
    });
  }
  
  //Отображаем вновь добавленную карточку
  else {
    let newCardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    newCardElement.querySelector('.cards__image').src = `${card.link}`;
    newCardElement.querySelector('.cards__image').alt = `Изображение: ${card.name}`;
    newCardElement.querySelector('.cards__title').textContent = `${card.name}`;
    page.querySelector('.cards').prepend(newCardElement);
  }

}
setCards();


// Форма добавления карточки
const cardPopup = popup.querySelector('.popup__container_card');
const cardName = cardPopup.querySelector('.popup__input_type_name');
const cardLink = cardPopup.querySelector('.popup__input_type_about');
const cardForm = cardPopup.querySelector('.popup__form');

function showCardForm() {
  popup.classList.add('popup__opened');
  cardPopup.classList.add('popup__container_form');
}

function submitCardForm(evt) {
  evt.preventDefault();
  initialCards.splice(0,0,{name:'',link:''});
  initialCards[0].name=cardName.value;
  initialCards[0].link=cardLink.value;
  setCards(initialCards[0]);
  closeForm(evt);
  cardName.value='';
  cardLink.value='';
}

cardForm.addEventListener('submit', submitCardForm);


//Popup изображения
function fullSizeCard(evt) {
  const imgItem = popup.querySelector('.popup__container_imgcard');
  imgItem.querySelector('.popup__image').src = evt.target.src;
  imgItem.querySelector('.popup__image').alt = evt.target.alt;
  const cardName = evt.target.parentElement.querySelector('.cards__title').textContent;
  imgItem.querySelector('.popup__caption').textContent = cardName;
  popup.classList.add('popup__opened');
  imgItem.classList.add('popup__container_img');
}


//Обработчики событий
btnEdit.addEventListener('click', editProfileForm);
btnAdd.addEventListener('click', showCardForm);
page.addEventListener('click', (evt) => {
  //Если нажали на кнопку закрытия формы
  if (evt.target.classList.contains('popup__btn-close'))
    closeForm(evt);

  //Если нажали на кнопку удалить карточку
  if (evt.target.classList.contains('cards__btn-remove'))
    evt.target.parentElement.remove();

  //Если нажали на кнопку лайк
  if (evt.target.classList.contains('cards__btn-like'))
    evt.target.classList.toggle('cards__btn-like_active');

  //Если нажали на карточку для просмотра картинки
  if (evt.target.classList.contains('cards__image'))
    {
      fullSizeCard(evt);
    }
});










