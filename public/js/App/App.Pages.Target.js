/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Target = (function ($, Event, pageSelector, headlineAnimated) {
    var instance = {}
        , animation = {}
        , defaultType = 'rotate-1'
        , COMPONENTS = 'TARGET_PAGE';


    instance.load = function (selector, option) {
        this.registerFunction(instance.init, [selector, option]);
        this.registerFunction(eventHandler);
        this.registerFunction(triggerDefault, [option]);

        Event.invokeFunction(COMPONENTS);
    };

    instance.registerFunction = function (func, params) {
        Event.registerFunction(COMPONENTS, func, params);
    };

    instance.init = function (selector, option) {
        animation = new headlineAnimated(selector, option);

        // If has custom type, active custom type
        if (option && option.type) {
            $('#' + option.type)
                .attr('checked', 'checked')
                .prop('checked', true);
        }
        console.log('init');

        $(pageSelector.selectedStyle).trigger('change');
    };

    function eventHandler() {
        // Select effect type event
        $(pageSelector.styleRadio).on('change', function (event) {
            var $selected = $(event.target)
                , selectedID = $selected.attr('id');
            animation.initHeadline(selectedID);
        });
    }

    function triggerDefault(option) {
        // clear option for apply current effect
        if (option.type) {
            $(pageSelector.styleRadio + '[id="' + option.type + '"]').removeAttr('checked');
            console.log($(pageSelector.styleRadio + '[id="' + option.type + '"]'));
        }
        var $selected = $(pageSelector.styleRadio + '[checked]');

        // if there are no available checked item, set default
        if ($selected.length === 0) {
            $(pageSelector.styleRadio + '[id="' + defaultType + '"]')
                .attr('checked', 'checked');
        }

        $selected.prop('checked', true).trigger('change');
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation.Target, App.Modules.HLAnimate);

