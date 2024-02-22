export { buildCard, removeCard, likeToggle, isLiked };
import { deleteCard, addLike, removeLike } from "./api";

// Создание карточек из объекта initialCards
function buildCard(
  element,
  removeCard,
  likeToggle,
  handlerPopupImage,
  isLiked,
  userId
) {
  const template = document.querySelector("#card-template").content; // Доступ к фрагменту шаблона(обертка элементов шаблона)
  const card = template.querySelector(".places__item"); // доступ к элементу карточки
  const cardElement = card.cloneNode(true);

  // передаем данные из массива объектов в элементы DOM
  cardElement.id = element._id;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = element.name; // заголовок карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = element.link; //ссылка на img
  cardImage.alt = element.name;
  const cardLikeCounter = cardElement.querySelector(".like_counter");
  cardLikeCounter.textContent = element.likes.length; //кол-во лайков

  // Слушатель Img - открытие попапа картинки
  cardImage.addEventListener("click", () => handlerPopupImage(element));

  // Слушатель лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    likeToggle(likeButton, element, cardLikeCounter)
  );

  // Удаление карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    removeCard(cardElement, cardElement.id, element, userId)
  );

  // Отображение кнопки удаления только на моих карточках
  if (element.owner._id !== userId) {
    deleteButton.classList.add("popup_is-animated");
  }

  // Проверка статуса лайка при загрузке страницы
  if (isLiked(element, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  return cardElement;
}

// Обработчик лайка
const likeToggle = (likeButton, element, likeCounter) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    addLike(element._id)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    removeLike(element._id)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
};

// Проверка статуса лайка
const isLiked = (element, userId) => {
  return element.likes.some((like) => like._id === userId);
};

//  Обработчик удаления карточки
const removeCard = (card, idCard, cardData, userId) => {
  if (cardData.owner._id === userId) {
    deleteCard(idCard);
    card.remove();
  }
};
