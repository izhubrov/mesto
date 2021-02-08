// Переменные элементов страницы
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const profile = page.querySelector('.profile');
const btnAdd = profile.querySelector('.profile__btn-add');
const btnEdit = profile.querySelector('.profile__btn-edit');
const cardsList = page.querySelector('.cards');

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

// Закрытие Popup
function closePopup(evt) {
  popup.classList.remove('popup__opened');

  //Удалили созданную Popup форму
  if (evt.target.parentElement.classList.contains('popup__container_form'))
  evt.target.parentElement.classList.remove('popup__container_form');

  //Удалили созданное Popup изображение
  if (evt.target.parentElement.classList.contains('popup__container_img'))
  evt.target.parentElement.classList.remove('popup__container_img');
}

// Popup Форма редактирования профиля пользователя
function editProfileForm() {

  const profileInfo = page.querySelector('.profile__info');
  const profileName = profileInfo.querySelector('.profile__name');
  const profileAbout = profileInfo.querySelector('.profile__about');
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
    closePopup(evt);
  }

  profileForm.addEventListener('submit', submitProfileForm);
}


// Отображаем изначальные карточки
function cardsRender() {
  const cardsArr = initialCards.map(getItem);
  page.querySelector('.cards').append(...cardsArr);
}

// Добавление карточки из шаблона в NodeList
function getItem(item) {
  const cardTemplate = page.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  cardImg.src = `${item.link}`;
  cardImg.alt = `Изображение: ${item.name}`;

  //Проверка на ошибку загрузку изображения
  cardImg.onerror = () => {
    cardsList.firstElementChild.remove();
    alert('Изображение не найдено');
  };

  cardTitle.textContent = `${item.name}`;
  const btnLike = cardElement.querySelector('.cards__btn-like');
  btnLike.addEventListener('click', handleLike);

  const btnRemove = cardElement.querySelector('.cards__btn-remove');
  btnRemove.addEventListener('click',handleRemove);

  cardImg.addEventListener('click', fullSizeCard);

  return cardElement;
}

function handleLike(evt) {
  evt.target.classList.toggle('cards__btn-like_active');
}

function handleRemove(evt) {
  evt.target.parentElement.remove();
}

//Popup увеличения изображения
function fullSizeCard(evt) {
  const imgPopup = popup.querySelector('.popup__container_imgcard');
  const imgItem = imgPopup.querySelector('.popup__image');
  const imgPopupCaption = imgPopup.querySelector('.popup__caption');
  const cardTitle = evt.target.parentElement.querySelector('.cards__title');
  imgItem.src = evt.target.src;
  imgItem.alt = evt.target.alt;
  imgPopupCaption.textContent = cardTitle.textContent;
  popup.classList.add('popup__opened');
  imgPopup.classList.add('popup__container_img');
}

cardsRender();

// Popup Форма добавления карточки
const cardPopup = popup.querySelector('.popup__container_card');
const cardForm = cardPopup.querySelector('.popup__form');

function showCardForm() {
  popup.classList.add('popup__opened');
  cardPopup.classList.add('popup__container_form');
}

function addCard(evt) {
  evt.preventDefault();
  const cardName = cardPopup.querySelector('.popup__input_type_name');
  const cardLink = cardPopup.querySelector('.popup__input_type_about');
  const newCard = getItem({name:cardName.value, link:cardLink.value});
  cardsList.prepend(newCard);
  closePopup(evt);
  cardName.value='';
  cardLink.value='';
}

cardForm.addEventListener('submit', addCard);


//Обработчики событий
btnEdit.addEventListener('click', editProfileForm);
btnAdd.addEventListener('click', showCardForm);
popup.addEventListener('click', (evt) => {
  //Если нажали на кнопку закрытия Popup
  if (evt.target.classList.contains('popup__btn-close'))
    closePopup(evt);
});










