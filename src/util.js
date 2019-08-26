/* Получаем случайный елемент массива */
const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/* Получаем время в нужном формате */
const getMovieDuration = (duration) => {
  const UNITS = {
    MINUTES_IN_HOUR: 60,
  };
  const hours = duration / UNITS.MINUTES_IN_HOUR;
  const roundedHours = Math.floor(hours);
  const roundedMinutes = Math.round((hours - roundedHours) * UNITS.MINUTES_IN_HOUR);

  return `${roundedHours}h ${roundedMinutes}m`;
};

/* Получаем дату в нужном формате */
const getMovieFullDate = (date) => {
  return new Date(date).toLocaleDateString(`en-GB`, {
    day: `2-digit`,
    month: `long`,
    year: `numeric`
  });
};

/* Получаем год из даты */
const getMovieYear = (date) => {
  return new Date(date).getFullYear();
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

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/* Создаем елемент из темплейта */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/* Ф-я рендера компонента */
const renderElement = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

/* Убираем елемент если он есть */
const unrenderElement = (element) => {
  if (element) {
    element.remove();
  }
};

/* обработка ивента Esc */
const isEscKeyDown = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

export {
  getRandomBoolean,
  getRandomItemFrom,
  getMovieYear,
  getMovieFullDate,
  renderComponent,
  getRandomNumberInRange,
  getMovieDuration,
  renderElement,
  createElement,
  isEscKeyDown,
  unrenderElement,
  Position,
};
