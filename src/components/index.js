import "../index.css";
import { openModal, handlerClickClose, closeModal } from "./modal.js";
import { buildCard, removeCard, likeToggle, isLiked } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  createCard,
  updateAvatar,
} from "./api.js";
import { renderLoading } from "./utils.js";

// Объявление переменных

// Элементы профиля
const avatar = document.querySelector(".profile__image");
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
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
const popupEditSaveButton = popupEdit.querySelector(".popup__button");

//Элементы попапа редактирования аватарки
const popupAvatar = document.querySelector(".popup_type_edit_avatar");
const popupAvatarForm = popupAvatar.querySelector(".popup__form");
const popupAvatarInput = popupAvatarForm.querySelector(
  ".popup__input_type_url"
);
const popupAvatarSaveButton = popupAvatar.querySelector(".popup__button");

// Элементы попапа добавления новой карточки
const newCardPopupAdd = document.querySelector(".popup_type_new-card"); //попап новой карточки
const newCardAddButton = document.querySelector(".profile__add-button"); //кнопка добавления нов.кар.
const formNewPlace = newCardPopupAdd.querySelector(".popup__form"); //Форма с инпутами
const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
); //Инпут title
const cardUrlInput = formNewPlace.querySelector(".popup__input_type_url"); //Инпут URL
const newCardPopupSavaButton = newCardPopupAdd.querySelector(".popup__button");

//Функции

//  Получаем данные профиля и выгружаем карточки на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    avatar.style.backgroundImage = `url(${profile.avatar})`;
    userName.textContent = profile.name;
    userDescription.textContent = profile.about;
    userId = profile._id;

    cards.forEach((card) => {
      cardsSection.append(
        buildCard(
          card,
          removeCard,
          likeToggle,
          handlerPopupImage,
          isLiked,
          userId
        )
      );
    });
  })
  .catch((rej) => console.log(rej));

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
// Обработчик сохранения изменений и закрытия попапа аватара
const popupAvatarSubmitHandler = (evt) => {
  evt.preventDefault();

  const avatarInputValue = {
    avatar: popupAvatarInput.value,
  };
  // Передаем ссылку из запроса в элемент dom аватара
  renderLoading(true, popupAvatarSaveButton);
  updateAvatar(avatarInputValue)
    .then((profileData) => {
      avatar.style.backgroundImage = `url(${profileData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupAvatarSaveButton));
};

// Обработчик сохранения изменения информации профиля
const popupEditSubmitHandler = (evt) => {
  evt.preventDefault();

  const profileEditValue = {
    name: nameInput.value,
    about: jobInput.value,
  };
  renderLoading(true, popupEditSaveButton);
  updateUserInfo(profileEditValue) // Получаем обновленные данные профиля
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupEditSaveButton));
};

//Функция создания новой карточки(через попап)(c лоадером)
const generateCard = () => {
  const newCardInputValue = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    _id: userId,
  };
  renderLoading(true, newCardPopupSavaButton);
  createCard(newCardInputValue) // Добавление новой карточки на сервер
    .then((cardData) => {
      const newCard = buildCard(
        cardData,
        removeCard,
        likeToggle,
        handlerPopupImage,
        isLiked,
        userId
      );
      cardsSection.prepend(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, newCardPopupSavaButton));
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
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//  Включение валидации форм
enableValidation(validationConfig);

//Добавление обработчиков
// Слушатель открытия попапа редактирования  профиля
btnEditProfile.addEventListener("click", () => {
  popupEditOpenHandler();
  clearValidation(popupEdit, validationConfig);
});

// Слушатель открытия попапа добавления карточки
newCardAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  openModal(newCardPopupAdd);
  clearValidation(newCardPopupAdd, validationConfig);
});

// Открытие попапа редактирования аватара
avatar.addEventListener("click", () => {
  popupAvatarForm.reset();
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
});

//Слушатель закрытия попапов
allPopups.forEach((popup) =>
  popup.addEventListener("click", handlerClickClose)
);

// Закрытие и отправка формы редактирования профиля
formElementEdit.addEventListener("submit", popupEditSubmitHandler);

//Закрытие и отправка формы создания новой карточки
formNewPlace.addEventListener("submit", addNewCard);

// Закрытие и отправка формы попапа аватара
popupAvatarForm.addEventListener("submit", popupAvatarSubmitHandler);
