"use strict";
import {
  saveQuoteToLocalStorage,
  countQuotesInLocalStorage,
} from "./localstorage.js";

import { sessionStorageLength, storeToSession } from "./sessionStorage.js";

const generateQuoteButton = document.querySelector("#generate_quote");
const apiEndPoint = "http://quotes.stormconsultancy.co.uk/random.json";

generateQuoteButton.addEventListener("click", getRandomQuote);

async function getRandomQuote() {
  try {
    const response = await fetch(apiEndPoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const jsonData = await response.json();
    // console.log(jsonData.quote);
    displayQuoteOnPage(jsonData.quote);
    saveQuoteToLocalStorage(jsonData);
    storeToSession(jsonData);
    displayLocalQuoteCount();
    displaySessionQuoteCount();
    // displayLatestQuote(jsonData);
    console.log(jsonData.id);
    // setTweetButton(jsonData.quote);
  } catch (err) {
    console.log(err);
    alert("Failed to fetch quote from the endpoint");
  }
}

const displayQuoteOnPage = (quote) => {
  const quoteText = document.querySelector(".quote_text");
  quoteText.textContent = quote;
};

const displayLocalQuoteCount = () => {
  const numberOfQuotes = document.querySelector(".quotes_count");
  numberOfQuotes.textContent = countQuotesInLocalStorage();
};

const displaySessionQuoteCount = () => {
  let numOfSessionQuotes = document.querySelector(".quotes_count_session");
  numOfSessionQuotes.textContent = sessionStorageLength();
};

// const displayLatestQuote = (quote) => {
//   let fetchedLatestQuote = document.querySelector(".get_latest_quote");
//   fetchedLatestQuote.textContent = getLatestQuote(quote);
// };
