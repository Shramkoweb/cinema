const getFilterTemplate = ({title, count}) => {
  return `
    <a href="#${title}" class="main-navigation__item">
      ${title} <span class="main-navigation__item-count">${count}</span>
    </a>
  `.trim();
};

export const getNavigationTemplate = (filters) => {
  return `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filters.map((filter) => getFilterTemplate(filter)).join(``)}
    </nav>
  `.trim();
};
