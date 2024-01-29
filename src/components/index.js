

import '../index.css';
import {newCard} from './cards.js'
import { openModal, handlerClickClose, closeModal} from './modal.js'



newCard();


 // Попап редактирования профиля

const popupEdit = document.querySelector('.popup_type_edit');
const btnEditProfile = document.querySelector('.profile__edit-button');
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput  = formElementEdit.querySelector('.popup__input_type_description');

// Обработчик открытия "редактирования профиля"

const handlerEditProfile = () => {
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popupEdit);
}

btnEditProfile.addEventListener('click', handlerEditProfile);

popupEdit.addEventListener('click', handlerClickClose );


// Обработчик сохранения изменения информации профиля

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit); 
}

formElementEdit.addEventListener('submit', handleFormSubmit);





// Попап добавления новой карточки
const newCardPopupAdd = document.querySelector('.popup_type_new-card');  //попап новой карточки
const profileAddButton = document.querySelector('.profile__add-button'); //кнопка добавления нов.кар.



profileAddButton.addEventListener('click', () => {
  openModal(newCardPopupAdd)
})
newCardPopupAdd.addEventListener('click', handlerClickClose )









