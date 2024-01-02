// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsSection = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;
const deleteButton = template.querySelector('.card__delete-button');



function createCard(element) {
  const cardElement = template.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = element.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.alt;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

const deleteCard = (evt) => evt.target.parentElement.remove();

initialCards.forEach(element => cardsSection.append(createCard(element)));





