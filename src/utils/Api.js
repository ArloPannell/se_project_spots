import { apiRoutes } from "./apiEndpoints.js";

export default class Api {
  constructor(apiData) {
    this._baseUrl = apiData.baseUrl;
    this._headers = apiData.headers;
    this._apiRoutes = apiRoutes;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserProfle()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${this._apiRoutes.displayCards}`, {
      headers: this._headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserProfle() {
    return fetch(`${this._baseUrl}${this._apiRoutes.userProfile}`, {
      headers: this._headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}${this._apiRoutes.userProfile}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}${this._apiRoutes.displayCards}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}${this._apiRoutes.deleteCards}${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  toggleLike(like, id) {
    return like
      ? fetch(
          `${this._baseUrl}${this._apiRoutes.deleteCards}${id}${apiRoutes.cardLikes}`,
          {
            method: "PUT",
            headers: this._headers,
          }
        ).then((res) => {
          return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
      : fetch(
          `${this._baseUrl}${this._apiRoutes.deleteCards}${id}${apiRoutes.cardLikes}`,
          {
            method: "DELETE",
            headers: this._headers,
          }
        ).then((res) => {
          return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
  }

  addProfileAvatar(avatar) {
    console.log(`${this._baseUrl}${this._apiRoutes.userAvatar}`);
    return fetch(`${this._baseUrl}${this._apiRoutes.userAvatar}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }
} // end class
