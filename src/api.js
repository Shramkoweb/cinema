import {checkResponseStatus, toJSON} from "./utils";
import MovieAdapter from "./adapters/movie-adapter";
import {Method} from "./constants";
import CommentAdapter from "./adapters/comment-adapater";

class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`}).then(toJSON).then(MovieAdapter.parseMovies);
  }

  updateFilm({id, film}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(toJSON)
      .then(MovieAdapter.parseMovie);
  }


  deleteComment({commentId}) {
    return this._load({url: `comments/${commentId}`, method: Method.DELETE});
  }


  createComment({id, comment}) {
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(toJSON)
      .then(CommentAdapter.parseComment);
  }

  getMovieComments({movieId}) {
    return this._load({url: `comments/${movieId}`}).then(toJSON).then(CommentAdapter.parseComments);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkResponseStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export default API;
