import "../index.css";
import {
  createCard,
  deleteCard,
  initialCards,
  likeToggle,
} from "./cards.js";
import { openModal, handlerClickClose, closeModal } from "./modal.js";

const cardsSection = document.querySelector('.places__list');

// Попап Image
const imagePopup = document.querySelector(".popup_type_image");
const buttonClosePopupImg = imagePopup.querySelector(".popup__close");
// Обработчик открытия попапа
const handlerPopupImage = (e) => {
  const popupImage = imagePopup.querySelector(".popup__image"); // элемент img попапа
  const popupCaption = imagePopup.querySelector(".popup__caption"); // элемент подписи попапа
 
  popupImage.src = e.target.src;
  popupCaption.textContent = e.target.alt;

  openModal(imagePopup);

  buttonClosePopupImg.addEventListener("click", handlerClickClose);
};



// Добавление 6 карточек на страницу при загрузке сайта
initialCards.forEach((element) =>
  cardsSection.append(
    createCard(element, deleteCard, likeToggle, handlerPopupImage)
  )
);

// Попап редактирования профиля

const popupEdit = document.querySelector(".popup_type_edit");
const btnEditProfile = document.querySelector(".profile__edit-button");
const formElementEdit = popupEdit.querySelector(".popup__form");
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);

// Обработчик открытия "редактирования профиля"

const handlerEditProfile = () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  openModal(popupEdit);
};
// Открытие попапа профиля
btnEditProfile.addEventListener("click", handlerEditProfile);

// Закрытие попапа профиля
popupEdit.addEventListener("click", handlerClickClose);

// Обработчик сохранения изменения информации профиля

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
};

// Отправка формы
formElementEdit.addEventListener("submit", handleFormSubmit);

// Обработчики открытия и закрытия попапа newCard
const newCardPopupAdd = document.querySelector(".popup_type_new-card"); //попап новой карточки
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления нов.кар.

profileAddButton.addEventListener("click", () => {
  openModal(newCardPopupAdd);
});

newCardPopupAdd.addEventListener("click", handlerClickClose);

//Создание новой карточки(через попап)

const formNewPlace = newCardPopupAdd.querySelector(".popup__form");
const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
); //Инпут title
const cardUrlInput = formNewPlace.querySelector(".popup__input_type_url"); //Инпут URL

// Создание новой карточки
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

//Сабмит добавления карточки
formNewPlace.addEventListener("submit", addNewCard);
