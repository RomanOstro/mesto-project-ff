export {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  createCard,
  deleteCard,
  addLike,
  removeLike,
  updateAvatar,
};

const configApi = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "c377f8d1-a82e-4f48-addc-6c4fa6cfe2b4",
    "Content-Type": "application/json",
  },
};
//  Проверка статуса ответа с сервера
const checkResolve = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.status}`);
};

// Запрос карточек с сервера
const getInitialCards = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  }).then((res) => checkResolve(res));
};

//Запрос информации о пользователе c сервера
const getUserInfo = () => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  }).then((res) => checkResolve(res));
};

// Отправляем на сервер данные профиля(patch)
const updateUserInfo = (profileInputValue) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: profileInputValue.name,
      about: profileInputValue.about,
    }),
  }).then((res) => checkResolve(res));
};

// Добавление новой карточки на сервер
const createCard = (newCardInputData) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: newCardInputData.name,
      link: newCardInputData.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  });
};

// Запрос на удаление карточки
const deleteCard = (id) => {
  return fetch(`${configApi.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => checkResolve(res));
};

//  Запрос для добавление лайка
const addLike = (id) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: configApi.headers,
  }).then((res) => checkResolve(res));
};

//  Запрос удаления карточки
const removeLike = (id) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => checkResolve(res));
};

// Запрос обновления аватара
const updateAvatar = (profileInputValue) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: profileInputValue.avatar,
    }),
  }).then((res) => checkResolve(res));
};
