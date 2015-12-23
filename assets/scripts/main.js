(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {

        console.log('Beginning of script');

        var videoBackground = document.querySelector('#preview-background');
        var video = document.querySelector('#preview');
        var range = document.querySelector('#range');

        var videoHeight;
        var videoWidth;

        video.addEventListener('loadedmetadata', function(event) {
            videoWidth = video.videoWidth;
            videoHeight = video.videoHeight;
        });

        range.addEventListener('input', function() {
            videoBackground.setAttribute('height', videoHeight * range.value);
            video.setAttribute('height', videoHeight * range.value);
        });

        console.log('End of script');

    });
})();
