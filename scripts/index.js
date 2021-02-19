// Переменные элементов page
const page = document.querySelector('.page');
const cardsList = page.querySelector('.cards');
const cardTemplate = page.querySelector('.card-template').content;
const cardItem = cardTemplate.querySelector('.cards__item')
const profile = page.querySelector('.profile');

// Переменные кнопок
const btnAdd = profile.querySelector('.profile__btn-add');
const btnEdit = profile.querySelector('.profile__btn-edit');

// Переменные Popup
const popupProfile = page.querySelector('.popup_type_profile');
const popupCard = page.querySelector('.popup_type_card');
const popupImg = page.querySelector('.popup_type_img');
const imgItem = popupImg.querySelector('.popup__image');
const imgPopupCaption = popupImg.querySelector('.popup__caption');

// Переменные полей Profile
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

// Переменные формы Popup редактирования профиля пользователя
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfile.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_type_about');

// Переменные формы Popup добавления карточки
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardName = popupCard.querySelector('.popup__input_type_name');
const popupCardAbout = popupCard.querySelector('.popup__input_type_about');



function setCloseHandler(evt) {
  console.log(evt);
    //Если нажали на клавишу Esc
    if ((evt.key === 'Escape') && (evt.target.classList.contains('popup__input'))) {
      closePopup(evt.target.closest('.popup'))
      clearErrorList(evt.target.closest('.popup'))
    } //Если нажали на кнопку закрытия Popup или темный фон Overlay
    else if (evt.target.classList.contains('popup__btn-close') ||
             evt.target.classList.contains('popup')) {
        const popupItem = evt.target.closest('.popup');
        closePopup(popupItem)
        clearErrorList(popupItem)
    }
  }

function openPopup(modalWindowForm) {
  modalWindowForm.classList.add('popup__opened');
  modalWindowForm.addEventListener('keyup', setCloseHandler);
  modalWindowForm.addEventListener('click', setCloseHandler);//close button и overlay
}

function closePopup(modalWindowForm) {
  modalWindowForm.classList.remove('popup__opened');

  const inputList = Array.from(modalWindowForm.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.removeEventListener('keyup', setCloseHandler);
  })

  modalWindowForm.removeEventListener('click', setCloseHandler);//close button и overlay
}

function clearErrorList(modalWindowForm) {
  const errorList = Array.from(modalWindowForm.querySelectorAll('.popup__input-error_active'));
  const inputErrorList = Array.from(modalWindowForm.querySelectorAll('.popup__input_type_error'));

  if (errorList !== []) {
    errorList.forEach((errorElement) => {
    errorElement.textContent='';
    })
  }

  if(inputErrorList !== []) {
    inputErrorList.forEach((inputErrorElement) => {
      inputErrorElement.classList.remove('popup__input_type_error');
    })
  }
 }

// Работа с формой Popup редактирования профиля пользователя

function setPopupfields() {
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
}

setPopupfields()

function handleEditProfile() {
  setPopupfields()
  openPopup(popupProfile);
}

function submitPopupProfile(evt) {
  evt.preventDefault();
  if (popupProfileName.value.trim()) {
    profileName.textContent =  popupProfileName.value;
    profileAbout.textContent =  popupProfileAbout.value;
    closePopup(popupProfile);
  }
  else {
    closePopup(popupProfile);
  }
}


// Работа с отображением карточек

//Отображаем изначальные карточки
function renderCards() {
  const cardsArr = initialCards.map(getItem);
  cardsList.append(...cardsArr);
}

// Добавление карточки из шаблона в NodeList
function getItem(item,index) {
  const cardElement = cardItem.cloneNode(true);
  const cardImg = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const btnLike = cardElement.querySelector('.cards__btn-like');
  const btnRemove = cardElement.querySelector('.cards__btn-remove');
  const delay = (1)/(index+4);

  cardElement.style.animationDelay = `${delay}s`;
  cardImg.src = `${item.link}`;
  cardImg.alt = `Изображение: ${item.name}`;
  cardTitle.textContent = `${item.name}`;

  btnLike.addEventListener('click', handleLike);
  btnRemove.addEventListener('click', handleRemove);
  cardImg.addEventListener('click', () => handlePreviewCard(item));
  cardImg.addEventListener('error', handleRemove);

  return cardElement;
}

function handleLike(evt) {
  evt.target.classList.toggle('cards__btn-like_active');
}

function handleRemove(evt) {
  evt.target.closest('.cards__item').remove();
}

//Popup увеличения изображения
function handlePreviewCard(item) {
  imgItem.src = item.link;
  imgItem.alt = `Изображение: ${item.name}`;
  imgPopupCaption.textContent = item.name;
  openPopup(popupImg);
}

renderCards();


// Работа с формой Popup добавления карточки
function handleAddCard() {
  openPopup(popupCard);
  popupCardForm.reset();
}

function submitPopupCard(evt) {
  evt.preventDefault();
  if (popupCardName.value.trim()) {
    const newCard = getItem({name:popupCardName.value, link:popupCardAbout.value});
    cardsList.prepend(newCard);
    closePopup(popupCard);
    popupCardForm.reset();
  }
  else {
    closePopup(popupCard);
    popupCardForm.reset();
  }
}


//Обработчики событий
btnEdit.addEventListener('click', handleEditProfile);
btnAdd.addEventListener('click', handleAddCard);
popupProfileForm.addEventListener('submit', submitPopupProfile);
popupCardForm.addEventListener('submit', submitPopupCard);
