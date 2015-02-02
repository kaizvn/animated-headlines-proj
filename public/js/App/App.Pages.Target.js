/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Target = (function ($, Event, pageSelector, headlineAnimated) {
    var instance = {}
        , animation = {}
        , TEMPLATE_URL = 'contents.html';


    instance.load = function (selector, option) {
        Event.registerFunction(instance.init, [selector, option]);
        Event.registerFunction(eventHandler);

        Event.invokeFunction();
    };

    instance.init = function (selector, option) {
        animation = new headlineAnimated(selector, option);
        if ($(pageSelector.transformContainer).children().length > 0) {
            $(pageSelector.selectedStyle).trigger('change');
        }
    };

    function eventHandler() {//this is for the demo only
        var $effectTemplate = $(pageSelector.effectTemplate);

        $(pageSelector.styleRadio).on('change', function (event) {
            var $selected = $(event.target)
                , selected = $selected.attr('id')
                , $introSection = $(pageSelector.intro);


            $effectTemplate.load(TEMPLATE_URL + ' .' + selected, function () {
                var $this = $(this);

                $.each($introSection, function (key, section) {
                    var $section = $(section)
                        , wordArray = $section.attr('data-words').split(' ');
                    $section.html($this.html());
                    var $cdWordWrapper = $section.find(pageSelector.cdWordWrappers);
                    wordArray.forEach(function (word) {
                        $cdWordWrapper.append('<b>' + word + '</b>');
                    });
                    $cdWordWrapper.find('b').first().addClass('is-visible');

                });

                $this.html('');
                animation.initHeadline();
            });
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation.Target, App.Modules.HLAnimate);

