/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Target = (function ($, Event, pageSelector, headlineAnimated) {
    var instance = {}
        , animation = {}
        , TEMPLATE_URL = 'contents.html';


    instance.load = function (selector, option) {
        Event.registerFunction(init, [selector, option]);
        Event.registerFunction(eventHandler);

        Event.invokeFunction();
    };

    function init(selector, option) {
        animation = new headlineAnimated(selector, option);
        animation.initHeadline();

    }

    function eventHandler() {//this is for the demo only
        var templateWrapper = $(pageSelector.effectTemplate);
        $(pageSelector.displayWords).on('change', function () {

        })

        $(pageSelector.selectStyles).on('change', function (event) {
            var $selected = $(event.target)
                , selected = $selected.attr('id')
                , $wordsList = $(pageSelector.displayWords)
                , wordList = $wordsList.val();

            if (typeof wordList !== 'string' || wordList.length === 0) {
                return false;
            }

            wordList = JSON.parse(wordList);

            switch ('.' + selected) {
                case pageSelector.styles.rotate01:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        console.log(wordList);
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.type:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.rotate02:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.loadingBar:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.slide:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.clip:
                    templateWrapper.load(TEMPLATE_URL + ' .' + selected, function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.zoom:
                    templateWrapper.load('formats.html .zoom', function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.rotate03:
                    templateWrapper.load('formats.html .rotate-3', function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.scale:
                    templateWrapper.load('formats.html .scale', function () {
                        animation.initHeadline();
                    });
                    break;
                case pageSelector.styles.push:
                    templateWrapper.load('formats.html .push', function () {
                        animation.initHeadline();
                    });
                    break;
            }
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation.Target, App.Modules.HLAnimate);

