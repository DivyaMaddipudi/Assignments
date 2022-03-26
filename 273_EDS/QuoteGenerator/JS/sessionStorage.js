"use strict";

const storeToSession = (quote) => {
  sessionStorage.setItem(quote.id, quote.quote);
};

let sessionStorageLength = () => {
  return `Total unique quotes stored in this session is ${
    sessionStorage.length - 1
  }`;
};

// let getLatestQuote = (quote) => {
//   let sessionKeys = Object.keys(sessionStorage);
//   let quoteId = quote.id;
//   if (sessionKeys.includes(quoteId)) {
//   }
//   console.log(Object.keys(sessionStorage));
//   return `Latest Unique quote is ${sessionStorage.getItem(quoteId)}`;
// };
export { sessionStorageLength, storeToSession };
