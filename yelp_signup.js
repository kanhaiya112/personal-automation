// ==UserScript==
// @name         Yelp SignUp
// @namespace    http://tampermonkey.net/
// @version      2026-05-02
// @description  try to take over the world!
// @author       Kanhaiya Singh
// @match        https://www.yelp.com/signup*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yelp.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Set to 'true' to use a random name from the NAMES array instead of a fixed name.
  const USE_RANDOM_NAME = false;
  // PREFERED_NAME can be changed to any name you want to use for the first and last name fields.
  // You can also add more names to the NAMES array
  // and set USE_RANDOM_NAME to true to randomly select a name for each signup.
  const PREFERED_NAME = "Donald Trump";
  const NAMES = [];

  function getName() {
    if (USE_RANDOM_NAME && NAMES.length > 0) {
      const randomIndex = Math.floor(Math.random() * NAMES.length);
      return NAMES[randomIndex];
    }
    return PREFERED_NAME;
  }

  function generatePassword(length = 12) {
    // This function generates a random password of the specified length using a combination of
    // uppercase letters, lowercase letters, numbers, and special characters.
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    return Array.from(array, (x) => chars[x % chars.length]).join("");
  }

  document.getElementById("email").addEventListener("paste", function (e) {
    setTimeout(() => {
      const email = e.target.value;
      const password = generatePassword(15);

      let name = getName();
      // Fill fields
      document.getElementById("first_name").value = name;
      document.getElementById("last_name").value = name;
      document.getElementById("password").value = password;
    }, 0);
  });
})();
