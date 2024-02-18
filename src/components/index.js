import "../index.css";
import {initialCards} from "./cards.js";
import { openModal, handlerClickClose, closeModal } from "./modal.js";
import {createCard, deleteCard, likeToggle} from "./card.js";
import {enableValidation, clearValidation} from "./validation.js";
import {getInitialCards,
   profileDataRequest,
   profileEditSendingData,
   newCardSendingData} from './api.js';
export{userId}



  // Объявление переменных

// Элементы профиля
const avatar = document.querySelector('.profile__image');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
let userId;


// Секция с карточками
const cardsSection = document.querySelector(".places__list");

//Все попапы
const allPopups = document.querySelectorAll(".popup");

// Отображаемые на сайте данные профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Элементы попапа вызываемого кликом на картинку
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image"); // элемент img попапа
const imagePopupCaption = imagePopup.querySelector(".popup__caption"); // элемент подписи попапа

// Элементы попапа редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
const btnEditProfile = document.querySelector(".profile__edit-button");
const formElementEdit = popupEdit.querySelector(".popup__form");
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);

// Элементы попапа добавления новой карточки
const newCardPopupAdd = document.querySelector(".popup_type_new-card"); //попап новой карточки
const newCardAddButton = document.querySelector(".profile__add-button"); //кнопка добавления нов.кар.
const formNewPlace = newCardPopupAdd.querySelector(".popup__form"); //Форма с инпутами
const cardNameInput = formNewPlace.querySelector(".popup__input_type_card-name"); //Инпут title
const cardUrlInput = formNewPlace.querySelector(".popup__input_type_url"); //Инпут URL

  //Функции
// Обработчик открытия попапа нажатием на картинку
const handlerPopupImage = (element) => {
  imagePopupPicture.src = element.link; // передаем значение ключа link в ссылку картинки попапа
  imagePopupPicture.alt = element.name;
  imagePopupCaption.textContent = element.name; //передаем значение ключа name в caption картинки попапа

  openModal(imagePopup);
};



// Обработчик открытия "редактирования профиля"
const popupEditOpenHandler = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEdit);
};



// Обработчик сохранения изменения информации профиля
const popupEditSubmitHandler = (evt) => {
  evt.preventDefault();

  const profileEditValue = {
    name: nameInput.value,
    about: jobInput.value
  }
   profileEditSendingData(profileEditValue) // Получаем обновленные данные профиля
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
  })
    .catch(err => console.log(err))

  closeModal(popupEdit);
};


//Функция создания новой карточки(через попап)
const generateCard = () => {
  const newCardInputValue = {
  name: cardNameInput.value,
  link: cardUrlInput.value,
  _id: userId
};
    
newCardSendingData(newCardInputValue) // Добавление новой карточки на сервер
  .then(cardData =>{
    const newCard = createCard(
      cardData,
      deleteCard,
      likeToggle,
      handlerPopupImage
    );
    cardsSection.prepend(newCard);
  })
  .catch(err => console.log(err))
  
};

// Обработчик добавления новой карточки
const addNewCard = (e) => {
  e.preventDefault();
  generateCard();
  closeModal(newCardPopupAdd);
  formNewPlace.reset();
};

//  Конфигурация функции валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
//  Включение валидации форм
  enableValidation(validationConfig);



  //Добавление обработчиков
// Слушатель открытия попапа редактирования  профиля
btnEditProfile.addEventListener("click",()=> {
  popupEditOpenHandler();
  clearValidation(popupEdit, validationConfig)
});

// Слушатель открытия попапа добавления карточки
newCardAddButton.addEventListener("click", () => {
  openModal(newCardPopupAdd);
  clearValidation(newCardPopupAdd, validationConfig)
});


//Слушатель закрытия попапов
allPopups.forEach((popup) =>
popup.addEventListener("click", handlerClickClose));


// Закрытие и отправка формы редактирования профиля
formElementEdit.addEventListener("submit",popupEditSubmitHandler);

//Закрытие и отправка формы создания новой карточки
formNewPlace.addEventListener("submit", addNewCard);


//  Получаем данные профиля и выгружаем карточки на страницу
Promise.all([profileDataRequest(),getInitialCards()])
.then(([profile, cards]) => {
  avatar.style.backgroundImage = `url(${profile.avatar})`;
  userName.textContent = profile.name;
  userDescription.textContent = profile.about;
  userId = profile._id;
    
    cards.forEach((card) => {
      cardsSection.append(createCard(card, deleteCard, likeToggle, handlerPopupImage))
    }) 
})
.catch((rej)=> console.log(rej))









const cardDelitionRequest = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c377f8d1-a82e-4f48-addc-6c4fa6cfe2b4',
      'Content-Type': 'application/json'
      },
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(err))
}
