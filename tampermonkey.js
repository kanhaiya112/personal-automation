// ==UserScript==
// @name         KeepAlive Auto Click (CAF)
// @namespace    https://your-namespace.example
// @version      1.0.0
// @description  Auto-clicks Get Data button every 5–7 minutes with manual-click reset
// @match        https://example.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ===== PERSISTENT STATE (PAGE-SAFE) =====
    window.__keepAliveState__ = window.__keepAliveState__ || {
        running: false,
        timer: null,
        clickHookAdded: false
    };

    const state = window.__keepAliveState__;

    // ===== CONFIG =====
    const MIN_DELAY = 5 * 60 * 1000; // 5 minutes
    const MAX_DELAY = 7 * 60 * 1000; // 7 minutes

    // ===== SELECTORS =====
    const INPUT_SELECTOR = 'input[aria-label="Search CAF"]';
    const BUTTON_SELECTOR = 'button[data-display="Get Data"]';

    // ===== SCHEDULER =====
    function scheduleNext() {
        if (!state.running) return;

        clearTimeout(state.timer);

        const delay =
            Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) +
            MIN_DELAY;

        console.log(
            "[KeepAlive] Next run in",
            Math.round(delay / 60000),
            "minutes"
        );

        state.timer = setTimeout(runTask, delay);
    }

    // ===== MAIN TASK =====
    function runTask() {
        if (!state.running) return;

        const input = document.querySelector(INPUT_SELECTOR);
        const button = document.querySelector(BUTTON_SELECTOR);

        if (input && input.value.trim() !== "") {
            if (button) {
                button.click();
                console.log(
                    "[KeepAlive] Auto click executed at",
                    new Date().toLocaleTimeString()
                );
            } else {
                console.warn("[KeepAlive] Submit button not found");
            }
        } else {
            console.warn("[KeepAlive] Enter a valid Phone number");
        }

        scheduleNext();
    }

    // ===== MANUAL CLICK DETECTION (USER ONLY) =====
    if (!state.clickHookAdded) {
        document.addEventListener(
            "click",
            (e) => {
                if (!e.isTrusted) return; // ignore script clicks

                if (e.target.closest(BUTTON_SELECTOR)) {
                    console.log("[KeepAlive] Manual click detected — timer reset");
                    if (state.running) scheduleNext();
                }
            },
            true
        );

        state.clickHookAdded = true;
    }

    // ===== AUTO START =====
    if (!state.running) {
        state.running = true;
        console.log("[KeepAlive] Started");
        scheduleNext();
    }

})();

