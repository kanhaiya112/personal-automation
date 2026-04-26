// ==UserScript==
// @name         Reload on Visible
// @namespace    http://tampermonkey.net/
// @version      26/04/2026
// @description  Reload page when tab becomes visible
// @author       You
// @match        https://generator.email/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=generator.email
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let intervalId = null;
    const INTERVAL = 15 * 1000;

    function startReloading() {
        if (intervalId) return; // prevent duplicate intervals

        console.log('Start interval reload');
        intervalId = setInterval(() => {
            location.reload();
        }, INTERVAL);
    }

    function stopReloading() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Stopped reloading');
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopReloading();
        } else {
            // reload ONCE when coming back
            location.reload();
            startReloading();
        }
    });

    // Start interval only (NO immediate reload here)
    if (!document.hidden) {
        startReloading();
    }
})();