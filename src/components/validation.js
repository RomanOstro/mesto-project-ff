export{enableValidation, clearValidation}

//Функция появления ошибки 
const showInputError = (formElement, inputElement, errorMassage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMassage;
  inputElement.classList.add(validationConfig.inputErrorClass);
  
}


//Функция убирающая ошибку 
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

// Функция проверки валидации 

const checkValidateInput = (formElement, inputElement, validationConfig) => {
  //кастомная валидация
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMassage);
  } else {
    inputElement.setCustomValidity('');
  }
  //валидация через validity
 if(!inputElement.validity.valid){
  showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
 } else {
  hideInputError(formElement, inputElement, validationConfig);
 }
}

// Навешиваем слушатели на все инпуты
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',() => checkValidateInput(formElement, inputElement, validationConfig));
  })
}

// Добавляем обработчики инпутов всем формам

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  })
};

// Функция проверки валидации всех инпутов формы
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid
  })
} 

//  Функция управляющая состоянием кнопки при валидации
const toogleButtonState = (inputList, buttonElement, validationConfig) => {

  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}


//  Функция очистки ошибок валидации
const clearValidation = (popupElement, validationConfig) => {

  const inputElements = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = popupElement.querySelector(validationConfig.submitButtonSelector);

  toogleButtonState(inputElements, submitButton, validationConfig);

  inputElements.forEach((inputElement) => {
    hideInputError(popupElement, inputElement, validationConfig);
    
    inputElement.addEventListener('input', () => {
      toogleButtonState(inputElements, submitButton, validationConfig);
    })
  })
}

