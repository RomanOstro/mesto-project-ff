import "../index.css";
import {initialCards} from "./cards.js";
import { openModal, handlerClickClose, closeModal } from "./modal.js";
import {createCard, deleteCard, likeToggle} from "./card.js"


  // Объявление переменных
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

// Добавление 6 карточек на страницу при загрузке сайта
initialCards.forEach((element) =>
  cardsSection.append(
    createCard(element, deleteCard, likeToggle, handlerPopupImage)
  )
);

// Обработчик открытия "редактирования профиля"
const popupEditOpenHandler = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEdit);
};

// Обработчик сохранения изменения информации профиля
const popupEditSubmitHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
};

//Функция создания новой карточки(через попап)
const generateCard = () => {
  const cardObj = {};
  cardObj.name = cardNameInput.value;
  cardObj.alt = cardObj.name;
  cardObj.link = cardUrlInput.value;
  const newCard = createCard(
    cardObj,
    deleteCard,
    likeToggle,
    handlerPopupImage
  );
  cardsSection.prepend(newCard);
};

// Обработчик добавления новой карточки
const addNewCard = (e) => {
  e.preventDefault();
  generateCard();
  closeModal(newCardPopupAdd);
  formNewPlace.reset();
};


  //Добавление обработчиков
// Слушатель открытия попапа редактирования  профиля
btnEditProfile.addEventListener("click", popupEditOpenHandler);

// Слушатель открытия попапа добавления карточки
newCardAddButton.addEventListener("click", () => {
  openModal(newCardPopupAdd);
});


//Слушатель закрытия попапов
allPopups.forEach((popup) =>
popup.addEventListener("click", handlerClickClose));

// Закрытие и отправка формы редактирования профиля
formElementEdit.addEventListener("submit", popupEditSubmitHandler);

//Закрытие и отправка формы создания новой карточки
formNewPlace.addEventListener("submit", addNewCard);