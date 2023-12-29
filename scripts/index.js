// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsSection = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;



initialCards.forEach(function(element){
  
  const cardElement = template.cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;
  
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', function(){
    const card = deleteButton.closest('li');
    card.remove();
  });

  cardsSection.append(cardElement);
}); 









