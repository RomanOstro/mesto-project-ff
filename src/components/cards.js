export{newCard}
import {closeModal} from './modal'

const initialCards = [
    {
      name: "Сибирь",
      link: "https://images.unsplash.com/photo-1621079125910-08e2593fbe3d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "машина на фоне заснеженного города",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "не замерзшее озеро на фоне зимнего леса"
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt:  "вид домов сверху",
    },
    {
      name: "Эсто-Садок",
      link: "https://images.unsplash.com/photo-1693513337142-e8611736e517?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt:  "город в горах, идущий в далеке человек",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt:  "вид сверху: железная дорога ведущая через лес",
    },
    {
      name: "Карелия",
      link: "https://images.unsplash.com/photo-1652009232683-82a94b9c34ec?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt:  "мотоцикл стоит на грунтовой дороге на фоне леса"
    }
];
// Генерация карточки

const cardsSection = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;


const newCard = () => {

  // Обработчик лайка
  const likeToggle = (e) => {
    if(e.target.classList.contains('card__like-button')) {
      e.target.classList.toggle('card__like-button_is-active');
    }
  }

  // Создание карточек из объекта initialCards
  function createCard(element) {
    const cardElement = template.cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = element.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.alt;
    
    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeToggle)

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
  
    return cardElement;
  }
  
  const deleteCard = (evt) => evt.target.closest('.card').remove();
  
  initialCards.forEach(element => cardsSection.append(createCard(element)));

  

  //Создание новой карточки(через попап)
const newCardPopupAdd = document.querySelector('.popup_type_new-card');
const formNewPlace = newCardPopupAdd.querySelector('.popup__form');
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name'); 
const cardUrlInput = formNewPlace.querySelector('.popup__input_type_url');

// функция создания
const createNewCard = (cardName, cardUrl, deleteCard, likeToggle) => {
const template = document.querySelector('#card-template').content
const newCard = template.cloneNode(true);
newCard.querySelector('.card__title').textContent = cardName.value;
newCard.querySelector('.card__image').src = cardUrl.value 

const likeButton = newCard.querySelector('.card__like-button')
likeButton.addEventListener('click', likeToggle );

const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
return newCard;

}

// Обработчик добавления новой карточки
const addNewCard = (e) => {
  e.preventDefault();
const newCard = createNewCard(cardNameInput, cardUrlInput, deleteCard, likeToggle)
cardsSection.prepend(newCard);
closeModal(newCardPopupAdd)
formNewPlace.reset();

}

//Сабмит добавления карточки
formNewPlace.addEventListener('submit', addNewCard )



}


