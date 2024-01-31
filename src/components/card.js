export{createCard, deleteCard, likeToggle}


  // Создание карточек из объекта initialCards
  function createCard(element, deleteCard, handlerLike, handlerPopupImage) {

    const template = document.querySelector('#card-template').content // Доступ к фрагменту шаблона(обертка элементов шаблона)
    .querySelector('.places__item') // доступ к элементу карточки
    const cardElement = template.cloneNode(true);

    // передаем данные из массива объектов в элементы DOM
   const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = element.name; // заголовок карточки
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = element.link; //ссылка на img
    cardImage.alt = element.name;

    // Слушатель Img - открытие попапа картинки
    cardImage.addEventListener('click', () => handlerPopupImage(element));

    // Слушатель лайка
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", handlerLike);

    // Удаление карточки
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);

    return cardElement;
  }
  
 // Обработчик лайка
 const likeToggle = (e) => {
  if (e.target.classList.contains("card__like-button")) {
    e.target.classList.toggle("card__like-button_is-active");
  }
};

// Обработчик удаления карточки
  const deleteCard = (evt) => evt.target.closest(".card").remove();
  
  
  
 