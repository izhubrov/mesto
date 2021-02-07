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


// Шаблон карточки
const cardTemplate = page.querySelector('.card-template').content;

// Отрисовка карточек
function setCards(newCard) {
  
  if(!newCard) {
    initialCards.forEach(function (item) {
      const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
      cardElement.querySelector('.cards__image').src = `${item.link}`;
      cardElement.querySelector('.cards__image').alt = `Изображение: ${item.name}`;
      cardElement.querySelector('.cards__title').textContent = `${item.name}`;
      page.querySelector('.cards').append(cardElement);
    });
  }
  else {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = `${newCard.link}`;
    cardElement.querySelector('.cards__image').alt = `Изображение: ${newCard.name}`;
    cardElement.querySelector('.cards__title').textContent = `${newCard.name}`;
    page.querySelector('.cards').prepend(cardElement);
  }
}

setCards();


// Закрытие формы
function closeForm() {
  popup.classList.remove('popup__opened');
  
  //Если в Popup есть созданный контейнер (Форма)
  if (popup.querySelector('.popup__container'))
  popup.querySelector('.popup__container').remove();

  //Если в Popup есть созданный контейнер (Изображение)
  if (popup.querySelector('.popup__img-container'))
  popup.querySelector('.popup__img-container').remove();
}


// Шаблон формы
const popupTemplate = page.querySelector('.popup-template').content;

// Форма профиля пользователя
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


// Форма добавления карточки
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
    const newCard = {};
    newCard.name = cardName.value;
    newCard.link = cardLink.value;
    initialCards.unshift(newCard);
    setCards(newCard);
    popup.querySelector('.popup__container').remove();
    closeForm();
  }

  cardForm.addEventListener('submit', submitCardForm);
}


//Создание полноразмерной карточки через шаблон и ее открытие через Popup
function fullSizeCard(evt) {
  const imgTemplate = page.querySelector('.popup-img-template').content;
  const imgItem = imgTemplate.querySelector('.popup__img-container').cloneNode(true);
  imgItem.querySelector('.popup__image').src = evt.target.src;
  imgItem.querySelector('.popup__image').alt = evt.target.alt;
  const cardName = evt.target.parentElement.querySelector('.cards__title').textContent;
  imgItem.querySelector('.popup__caption').textContent = cardName;
  popup.append(imgItem);
  popup.classList.add('popup__opened');
}


//Обработчики событий
btnEdit.addEventListener('click', editProfileForm);
btnAdd.addEventListener('click', addCardForm);
page.addEventListener('click', (evt) => {
  //Если нажали на кнопку закрытия формы
  if (evt.target.classList.contains('popup__btn-close'))
    closeForm();

  //Если нажали на фон Popup
  if (evt.target.classList.contains('popup'))
    closeForm();

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










