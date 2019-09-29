import AbstractComponent from "./absctract-component";
import {getUserRating} from "../utils";

class Profile extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
    this._userRating = getUserRating(this._movies);
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${this._userRating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `.trim();
  }
}

export default Profile;
