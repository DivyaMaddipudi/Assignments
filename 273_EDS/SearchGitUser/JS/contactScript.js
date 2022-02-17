"use strict";
import { GetCityName } from "./cityName.js";

const submitForm = document.getElementById("btn");
submitForm.addEventListener("click", fetchFormData);

function fetchFormData(ev) {
  ev.preventDefault();
  const nameElement = document.getElementById("name").value;
  const emailElement = document.getElementById("email").value;
  const messageElement = document.getElementById("message").value;

  // let formData = new FormData(document.querySelector("form"));
  console.log(messageElement + "-" + nameElement + "-" + emailElement);
  // form object
  let formObject = {
    name: nameElement,
    email: emailElement,
    message: messageElement,
  };

  console.log(formObject + "object of the form");
  // Stringify - this is used to convert object into string to store in local/session storage
  console.log("------------------Stringify-------------------");
  const jsonFormData = JSON.stringify(formObject);
  console.log("------------------type of operator-------------------");
  console.log(typeof jsonFormData);
  // Storing data in session storage
  sessionStorage.setItem("formData", jsonFormData);

  console.log("------------------Parse-------------------");
  let sessionData = sessionStorage.getItem("formData");
  console.log(JSON.parse(sessionData));
  GetCityName.getCoordintes(); // get coordinates is a static function
}
