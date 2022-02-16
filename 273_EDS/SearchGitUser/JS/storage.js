"use strict";
export class LocalStorageClass {
  static storeInLocalStorage(...input) {
    localStorage.setItem(input[0], input[1]);
  }

  static getSessionStorage(size = 0) {
    //default parameter
    size = localStorage.length;
    document.getElementById(
      "users_count"
    ).innerHTML = `Searched ${size} users in this session`;
  }
}
