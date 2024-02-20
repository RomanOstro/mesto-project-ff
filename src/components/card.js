export{createCard, deleteCard, likeToggle, isLiked,updateCardLikes}
import {userId} from './index'
import{
  cardDelitionRequest,
  makeLikeRequest,
  deleteLikeRequest} from './api'

  // Создание карточек из объекта initialCards
  function createCard(element, deleteCard, likeToggle, handlerPopupImage, isLiked, updateCardLikes) {

    const template = document.querySelector('#card-template').content // Доступ к фрагменту шаблона(обертка элементов шаблона)
    const card = template.querySelector('.places__item') // доступ к элементу карточки
    const cardElement = card.cloneNode(true);

    // передаем данные из массива объектов в элементы DOM
    cardElement.id = element._id;
    const cardTitle = cardElement.querySelector(".card__title");
      cardTitle.textContent = element.name; // заголовок карточки
    const cardImage = cardElement.querySelector(".card__image");
      cardImage.src = element.link; //ссылка на img
      cardImage.alt = element.name;
    const cardLikeCounter = cardElement.querySelector('.like_counter');
      cardLikeCounter.textContent = element.likes.length; //кол-во лайков

    // Слушатель Img - открытие попапа картинки
    cardImage.addEventListener('click', () => handlerPopupImage(element));

    // Слушатель лайка
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", ()=> likeToggle(likeButton, element, cardLikeCounter, updateCardLikes));

    // Удаление карточки
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click",()=> deleteCard(cardElement, cardElement.id, element));

    if(element.owner._id !== userId) {
      deleteButton.classList.add('popup_is-animated')
    } 

    if(isLiked(element)) {
      likeButton.classList.add("card__like-button_is-active")
    } else {
      likeButton.classList.remove("card__like-button_is-active")
    }

    return cardElement;
  }
  
 // Обработчик лайка
 const likeToggle = (likeButton, element, likeCounter, updateCardLikes) => {
  
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.add("card__like-button_is-active")
    makeLikeRequest(element._id)
    .then(card => {
      likeCounter.textContent = card.likes.length
    })
  } else {
    likeButton.classList.remove("card__like-button_is-active")
    deleteLikeRequest(element._id)
    .then(card => {
      likeCounter.textContent = card.likes.length
    })
  }
  updateCardLikes(likeCounter, element);
};

// Проверка статуса лайка
const isLiked = (element) => {
  return element.likes.some(like => like._id === userId)
 }

// Обновление кол-ва лайков через Get при генерации карточки
const updateCardLikes = (likeCounter, element) => {
  likeCounter.textContent = element.likes.length;
}

//  Обработчик удаления карточки
const deleteCard = (card, idCard, cardData) => {
  if(cardData.owner._id === userId){
    cardDelitionRequest(idCard);
    console.log(cardDelitionRequest(idCard));
  }
  card.remove();
}

