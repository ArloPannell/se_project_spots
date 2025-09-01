import { apiRoutes } from "./apiEndpoints.js";

export default class Api {
  constructor(apiData) {
    this._baseUrl = apiData.baseUrl;
    this._headers = apiData.headers;
    this._apiRoutes = apiRoutes;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(URL, options) {
    return fetch(URL, options).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserProfle()]);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}${this._apiRoutes.displayCards}`, {
      headers: this._headers,
    });
  }

  getUserProfle() {
    return this._request(`${this._baseUrl}${this._apiRoutes.userProfile}`, {
      headers: this._headers,
    });
  }

  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}${this._apiRoutes.userProfile}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}${this._apiRoutes.displayCards}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(id) {
    return this._request(
      `${this._baseUrl}${this._apiRoutes.deleteCards}${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    );
  }

  toggleLike(like, id) {
    return like
      ? this._request(
          `${this._baseUrl}${this._apiRoutes.deleteCards}${id}${apiRoutes.cardLikes}`,
          {
            method: "PUT",
            headers: this._headers,
          }
        )
      : this._request(
          `${this._baseUrl}${this._apiRoutes.deleteCards}${id}${apiRoutes.cardLikes}`,
          {
            method: "DELETE",
            headers: this._headers,
          }
        );
  }

  addProfileAvatar(avatar) {
    return this._request(`${this._baseUrl}${this._apiRoutes.userAvatar}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
} // end class
