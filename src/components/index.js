

import '../index.css';
import {newCard} from './cards.js'
import { openModal, handlerClickClose} from './modal.js'

newCard();



 // Попап редактирования профиля

const popupEdit = document.querySelector('.popup_type_edit');
const btnEditProfile = document.querySelector('.profile__edit-button');

btnEditProfile.addEventListener('click', () => {
  openModal(popupEdit)
})

popupEdit.addEventListener('click', handlerClickClose )



// Попап добавления новой карточки
const newCardPopupAdd = document.querySelector('.popup_type_new-card');  //попап новой карточки
const profileAddButton = document.querySelector('.profile__add-button'); //кнопка добавления нов.кар.

profileAddButton.addEventListener('click', () => {
  openModal(newCardPopupAdd)
})
newCardPopupAdd.addEventListener('click', handlerClickClose )





