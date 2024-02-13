export { openModal, handlerClickClose, closeModal };

// Обработчик закрытия попапа по кнопке Esc
const keyPressEsc = (e) => {
  if (e.key === "Escape") {
    const activPopup = document.querySelector(".popup_is-opened");
    closeModal(activPopup);
  }
};

// Функция открытия окна
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyPressEsc);
};

// Функция снятия класса попапа
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", keyPressEsc);
};

// Обработчик клика закрытия попапа по оверлею и крестику
const handlerClickClose = (e) => {
  if (
    e.target === e.currentTarget ||
    e.target.classList.contains("popup__close")
    ){
   
      closeModal(e.currentTarget);
  }
};

