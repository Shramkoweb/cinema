export default class MoviesController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;
    this._board = new Board();
    this._taskList = new TaskList();
  }
}
