/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Target = (function ($, Event, pageSelector, headlineAnimated) {
    var instance = {}
        , animation = {}


    instance.load = function (selector, option) {
        Event.registerFunction(instance.init, [selector, option]);
        Event.registerFunction(eventHandler);

        Event.invokeFunction();
    };

    instance.init = function (selector, option) {
        animation = new headlineAnimated(selector, option);
        if ($(pageSelector.transformContainer).children().length > 0) {
            if (option && option.type) {
                $('#' + option.type).prop('checked', true)
            }
            $(pageSelector.selectedStyle).trigger('change');
        }
    };

    function eventHandler() {//this is for the demo only
        $(pageSelector.styleRadio).on('change', function (event) {
            var $selected = $(event.target)
                , selected = $selected.attr('id');
            animation.initHeadline(selected);

        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation.Target, App.Modules.HLAnimate);

