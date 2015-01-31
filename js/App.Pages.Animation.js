/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Animation = (function ($, Event, pageSelector, hlAminate) {
    var instance = {};

    instance.load = function (selector, option) {
        init(selector, option);
        Event.registerFunction(init, [selector, option]);
        Event.registerFunction(eventHandler);
        Event.registerFunction(instance);
        Event.registerFunction(init, instance);
        Event.invokeFunction();
    };

    function init(selector, option) {
        var animation = new hlAminate(selector, option);
        animation.initHeadline();

    }

    function eventHandler() {
        $(pageSelector.addBtn).on('click', function () {
            //TODO : add text button
            console.log('added')

        });

        $(pageSelector.wordsLists).on('click', pageSelector.removeBtn, function () {
            //TODO : remove text button
            console.log('removed')
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation, App.Modules.HLAnimate);

