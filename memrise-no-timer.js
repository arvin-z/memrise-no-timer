// ==UserScript==
// @name           memrise-no-timer
// @description    Removes the timer from Memrise Garden.
// @match          http://*.memrise.com/*
// @match          https://*.memrise.com/*
// @version        0.1
// @grant          none
// @updateURL      https://github.com/arvvn/memrise-no-timer/raw/master/memrise-no-timer.user.js
// ==/UserScript==

var cachedEvent;

function NoTimer() {
    MEMRISE.garden.session.make_box = (function () {
        var cached_function = MEMRISE.garden.session.make_box;
        return function() {
            var result = cached_function.apply(this, arguments);
            result.getTimerLength = () => 0;
            return result;
        };
    }());
}

MEMRISE.garden.session_start = (function() {
    var cached_function = MEMRISE.garden.session_start;
    return function() {
        NoTimer();
        return cached_function.apply(this, arguments);
    };
}());
