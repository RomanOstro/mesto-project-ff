
export {
     getInitialCards,
     profileDataRequest,
     profileEditSendingData,
     newCardSendingData,
     cardDelitionRequest
    }

const configApi = {
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-6',
  headers:{
    authorization: 'c377f8d1-a82e-4f48-addc-6c4fa6cfe2b4',
    'Content-Type': 'application/json'
  }
}

// Запрос карточек с сервера
const getInitialCards = () =>{
 return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers
  })
  .then(res => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`)
  })
}

//Запрос информации о пользователе c сервера
const profileDataRequest =() => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers
  })
  .then(res => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`)
  })
}

// Отправляем на сервер данные профиля(patch)
const profileEditSendingData = (profileInputValue) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: profileInputValue.name,
      about: profileInputValue.about,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  });
};

// Добавление новой карточки на сервер 
const newCardSendingData = (newCardInputData) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: 'POST',
    headers: configApi.headers,
      body: JSON.stringify({
        name: newCardInputData.name,
        link: newCardInputData.link
      })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  });

}

// Запрос на удаление карточки
const cardDelitionRequest = (id) => {
  return fetch(`${configApi.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: configApi.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  });
};

