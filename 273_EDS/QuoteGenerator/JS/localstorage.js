"use strict";
let saveQuoteToLocalStorage = (quote) => {
  localStorage.setItem(quote.id, quote.quote);
};

let countQuotesInLocalStorage = () => {
  return `Total unique quotes stored in local storage is ${localStorage.length}`;
};

export { saveQuoteToLocalStorage, countQuotesInLocalStorage };
