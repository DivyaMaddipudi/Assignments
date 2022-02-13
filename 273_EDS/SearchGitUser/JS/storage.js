"use strict";
export class LocalStorageClass {
  static storeInLocalStorage(userName, id) {
    localStorage.setItem(id, userName);
  }

  static getSessionStorage(size = 0) {
    //default parameter
    size = localStorage.length;
    document.getElementById(
      "footer"
    ).innerHTML = `Searched ${size} users in this session`;
  }
}
