// ==UserScript==
// @name         Yelp SignUp
// @namespace    http://tampermonkey.net/
// @version      2026-05-11
// @description  try to take over the world!
// @author       Kanhaiya Singh
// @match        https://www.yelp.com/signup*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yelp.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ZIPCODE_LENGTH = 5; // Example zip code length
  const PREFERED_ZIPCODE = "20005";
  // Set to 'yes' to use a random name from the NAMES array instead of a fixed name.
  const USE_RANDOM_NAME = "no"; // yes or no
  // PREFERED_NAME can be changed to any name you want to use for the first and last name fields.
  // You can also add more names to the NAMES array
  // and set USE_RANDOM_NAME to true to randomly select a name for each signup.
  const PREFERED_NAME = "Donald Trump";
  const NAMES = [];

  const BOT_KEYWORDS = ["human", "bot", "challenge"];

  function getName() {
    // This function returns a name based on the USE_RANDOM_NAME flag.
    // If USE_RANDOM_NAME is true and there are names in the NAMES array,
    if (USE_RANDOM_NAME.toLowerCase() === "yes" && NAMES.length > 0) {
      const randomIndex = Math.floor(Math.random() * NAMES.length);
      return NAMES[randomIndex];
    }
    return PREFERED_NAME;
  }

  function getRandomZipCode(length = 6) {
    // This function generates a random zip code of the specified length.
    // The first digit is between 1 and 9 (to avoid leading zeros),
    // and the remaining digits are between 0 and 9.
    if (length <= 0) return "";

    // First digit: 1–9
    let zip = (Math.floor(Math.random() * 9) + 1).toString();

    // Remaining digits: 0–9
    for (let i = 1; i < length; i++) {
      zip += Math.floor(Math.random() * 10).toString();
    }

    return zip;
  }

  function generatePassword(length = 12) {
    // This function generates a random password of the specified length using a combination of
    // uppercase letters, lowercase letters, numbers, and special characters.
    const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+`;
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    return Array.from(array, (x) => chars[x % chars.length]).join("");
  }

  document.getElementById("email").addEventListener("paste", function (e) {
    console.debug("Email pasted");
    // This event listener is triggered when the user pastes an email into the email input field.
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

  document.getElementById("email").addEventListener("paste", function (e) {
    let zipCodeInput = document.getElementById("zip");
    if (zipCodeInput.value === "") {
      console.debug("Zip Code is field has no value");
      // This event listener is triggered when the user clicks the submit button.
      // It checks if the zip code input field is empty and if so,
      // it calls the fillZipCode function to fill it with the specified ZIPCODEVALUE.
      // The fillZipCode function also checks for the presence of a captcha element and
      // retries filling the zip code every 5 seconds until the captcha is present.
      document
        .getElementById("signup-button")
        .addEventListener("click", function (e) {
          console.debug("SignUp Button clicked");
          fillZipCode(zipCodeInput);
        });
    }
  });

  function fillZipCode(zipInput, retryCount = 10) {
    // This function attempts to fill the zip code input field with a random zip code.

    // checking Captcha can be improved in this function by looking for specific elements or classes that indicate the presence of a captcha, rather than relying solely on the presence of certain keywords in alert messages. This would make the function more robust and less likely to miss captcha detection.
    console.debug("Attempting to fill zip code. Retries left:", retryCount);
    let has_alter = document.getElementById("alert-container");
    if (has_alter) {
      let messages = has_alter.getElementsByTagName("li");
      for (let msg of messages) {
        let text = msg.innerText.toLowerCase();
        if (BOT_KEYWORDS.some((keyword) => text.includes(keyword))) {
          // If captcha is present, we can fill the zip code
          console.debug("Captcha detected. Filling zip code.");
          if (!zipInput.value){
            zipInput.value = PREFERED_ZIPCODE || getRandomZipCode(ZIPCODE_LENGTH);
          }
          return true;
        }
      }
    }
    if (retryCount > 0) {
      setTimeout(() => fillZipCode(zipInput, retryCount - 1), 10 * 1000); // Retry after 10 seconds
    } else {
      console.warn("Failed to fill zip code after multiple attempts.");
    }
  }
})();
