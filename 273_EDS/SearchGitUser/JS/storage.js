"use strict";
export class LocalStorageClass {
  static storeInLocalStorage(userData, id = sessionStorage.length) {
    id = userData.id;
    localStorage.setItem(id, userData.login);
  }

  static getSessionStorage(size = 0) {
    //default parameter
    size = localStorage.length;
    document.getElementById(
      "footer"
    ).innerHTML = `Searched ${size} users in this session`;
  }
}
