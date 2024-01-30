export{createCard, deleteCard, initialCards, likeToggle}


const initialCards = [
  {
    name: "Сибирь",
    link: "https://images.unsplash.com/photo-1621079125910-08e2593fbe3d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Эсто-Садок",
    link: "https://images.unsplash.com/photo-1693513337142-e8611736e517?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Карелия",
    link: "https://images.unsplash.com/photo-1652009232683-82a94b9c34ec?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

    
   


  // Обработчик лайка
  const likeToggle = (e) => {
    if (e.target.classList.contains("card__like-button")) {
      e.target.classList.toggle("card__like-button_is-active");
    }
  };
 
  // Создание карточек из объекта initialCards
  function createCard(element, deleteCard, handlerLike, handlerPopupImage) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);

    // передаем данные из массива объектов в элементы DOM
   const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = element.name; // заголовок карточки
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = element.link; //ссылка на img
    cardImage.alt = element.name;

    // Слушатель Img - открытие попапа картинки
    cardImage.addEventListener('click', handlerPopupImage)

    // Слушатель лайка
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", handlerLike);

    // Удаление карточки
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);

    return cardElement;
  }
    // Обработчик удаления карточки
  const deleteCard = (evt) => evt.target.closest(".card").remove();



   



