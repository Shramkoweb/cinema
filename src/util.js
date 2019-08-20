/* Получаем случайный елемент массива */
const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/* Получаем время в нужном формате */
const getFilmDuration = (duration) => {
  const UNITS = {
    MINUTES_IN_HOUR: 60,
  };
  const hours = duration / UNITS.MINUTES_IN_HOUR;
  const roundedHours = Math.floor(hours);
  const roundedMinutes = Math.round((hours - roundedHours) * UNITS.MINUTES_IN_HOUR);

  return `${roundedHours}h ${roundedMinutes}m`;
};

/* Получаем случайное булевое значение */
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

/* Ф-я рендера компонента */
const renderComponent = (container, component) => {
  return container.insertAdjacentHTML(`beforeend`, component);
};

/* Получаем случайное число из диапазона */
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

/* Перемешивание массива */
const shuffleArray = (array) => {
  for (let i = array.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
};

export {getRandomBoolean, getRandomItemFrom, renderComponent, getRandomNumberInRange, shuffleArray, getFilmDuration};
