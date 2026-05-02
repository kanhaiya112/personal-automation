// ==UserScript==
// @name         Yelp SignUp
// @namespace    http://tampermonkey.net/
// @version      2026-05-02
// @description  try to take over the world!
// @author       You
// @match        https://www.yelp.com/signup
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yelp.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const PREFERED_NAME = "Donald Trump";

function generatePassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (x) => chars[x % chars.length]).join("");
}

document.getElementById("email").addEventListener("paste", function (e) {
  setTimeout(() => {
    const email = e.target.value;
    const password = generatePassword();

    // Fill fields
    document.getElementById("first_name").value = PREFERED_NAME;
    document.getElementById("last_name").value = PREFERED_NAME;
    document.getElementById("password").value = password;
  }, 0);
});

})();