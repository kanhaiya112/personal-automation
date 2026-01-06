javascript:(function () {

    // ===== PERSISTENT STATE =====
    window.__keepAliveState__ = window.__keepAliveState__ || {
        running: false,
        timer: null,
        clickHookAdded: false
    };

    const state = window.__keepAliveState__;

    // ===== TOGGLE START / STOP =====
    if (state.running) {
        clearTimeout(state.timer);
        state.running = false;
        alert("🛑 KeepAlive stopped");
        console.log("KeepAlive stopped");
        return;
    }

    state.running = true;
    alert("▶ KeepAlive started");
    console.log("KeepAlive started");

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
            "Next run in",
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
                    "Auto click executed at",
                    new Date().toLocaleTimeString()
                );
            } else {
                console.warn("Submit button not found");
            }
        } else {
            console.warn("Enter a valid Phone number in the Search Box.");
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
                    console.log("Manual Click Detected, Timer reset");
                    if (state.running) scheduleNext();
                }
            },
            true
        );

        state.clickHookAdded = true;
    }

    // ===== START LOOP =====
    scheduleNext();

})();

