export { renderLoading };

// Функция лоадера "Сохранить..."
const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = `Сохранение...`;
  } else {
    button.textContent = `Сохранить`;
  }
};
