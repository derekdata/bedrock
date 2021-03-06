/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($, Mozilla) {
    'use strict';

    var animationsRun = false;

    var onTourCloseCompact = function() {
        if (!animationsRun) {
            // enable video
            Mozilla.FirefoxAnniversaryVideo.enableEmbed();

            // small timeout here seems to help performance quite a bit
            setTimeout(function() {
                Mozilla.PrivacyTour.animateHeadline();

                // lots of animating going on here, so delay ripples
                // slightly for better performance
                setTimeout(function() {
                    Mozilla.PrivacyTour.animateRipples(0);
                }, 250);
            }, 150);

            animationsRun = true;
        }
    };

    //Only run the tour if user is on Firefox 33 for desktop.
    if (window.isFirefox() && !window.isFirefoxMobile() && window.getFirefoxMasterVersion() >= 33) {

        // Query if the UITour API is working before we start the tour
        Mozilla.UITour.getConfiguration('sync', function (config) {

            var tour = new Mozilla.BrowserTour({
                id: $('#fx10-splash').data('telemetry'),
                allowScroll: true,
                onCloseTour: onTourCloseCompact,
                onCompactTour: onTourCloseCompact
            });

            tour.init();

            Mozilla.PrivacyTour.modalEnabled = true;

            $('a.button-play').addClass('tour');
            $('.main-title').addClass('tour');
        });
    }

})(window.jQuery, window.Mozilla);
