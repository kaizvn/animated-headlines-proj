/**
 * Created by kaizzige on 2/1/15.
 */


/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Target = (function ($, Event, pageSelector, hlAminate) {
    var instance = {};
    var animation = {};

    instance.load = function (selector, option) {
        Event.registerFunction(init, [selector, option]);
        Event.registerFunction(eventHandler);

        Event.invokeFunction();
    };

    function init(selector, option) {
        animation = new hlAminate(selector, option);
        animation.initHeadline();

    }

    function eventHandler() {//this is for the demo only
        var intro = $('.cd-intro');
        $('.cd-filter input').on('change', function (event) {
            var selected = $(event.target).attr('id')
            switch (selected) {
                case 'rotate-1':
                    intro.load('formats.html .rotate-1', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'type':
                    intro.load('formats.html .type', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'rotate-2':
                    intro.load('formats.html .rotate-2', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'loading-bar':
                    intro.load('formats.html .loading-bar', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'slide':
                    intro.load('formats.html .slide', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'clip':
                    intro.load('formats.html .clip', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'zoom':
                    intro.load('formats.html .zoom', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'rotate-3':
                    intro.load('formats.html .rotate-3', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'scale':
                    intro.load('formats.html .scale', function () {
                        animation.initHeadline();
                    });
                    break;
                case 'push':
                    intro.load('formats.html .push', function () {
                        animation.initHeadline();
                    });
                    break;
            }
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation, App.Modules.HLAnimate);

