/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Animation = (function ($, Event, pageSelector) {
    var instance = {};
    var $cache = {};
    var MAX_ITEM = 10;
    var trigger = 'data-animationtag';

    instance.load = function () {
        Event.registerFunction(init);
        Event.registerFunction(eventHandler);

        Event.invokeFunction();
    };

    function init() {
        var liClass = {
            wrapper: pageSelector.wordWrapper.substr(1),
            textAdded: pageSelector.textAdded.substr(1),
            removeBtn: pageSelector.removeBtn.substr(1),
            removeSymbol: pageSelector.removeSymbol.substr(1)

        };

        $cache.ulLists = $(pageSelector.wordsLists);
        $cache.liTemplate =
            $('<li/>', {class: liClass.wrapper})
                .append($('<span/>', {class: liClass.textAdded}))
                .append($('<span/>', {class: liClass.removeBtn})
                    .append($('<i/>', {class: liClass.removeSymbol, text: 'X'})));

    }

    function eventHandler() {
        $(pageSelector.inputForm).on('submit', function (e) {
            e.preventDefault();

            var $input = $(pageSelector.textInput, this)
                , inputHTML = $cache.liTemplate.clone()
                , $iframe = $(pageSelector.iframeWrapper).contents()
                , id = Date.now();

            if ($input.val().length === 0) {
                return false;
            }

            if ($cache.ulLists.find(pageSelector.wordWrapper).length >= MAX_ITEM) {
                alert('holy sheet');
                return false;
            }

            // Add to list words
            inputHTML
                .attr('id', id)
                .find(pageSelector.textAdded).text($input.val());
            $cache.ulLists.append(inputHTML);

            //Add to iframe
            var section = $('<section/>', {
                class: pageSelector.Target.intro.substr(1),
                text: $input.val(),
                id: id

            });
            section.attr(trigger, $input.val());
            $(pageSelector.Target.transformContainer, $iframe).append(section);

            // Clear input
            $input.val('');
            console.log('added');
        });


        $(pageSelector.wordsLists).on('click', pageSelector.removeBtn, function () {
            var $iframe = $(pageSelector.iframeWrapper).contents()
                , $item = $(this).closest(pageSelector.wordWrapper)
                , idSelector = '#' + $item.attr('id')
                , $iframeItem = $(pageSelector.Target.transformContainer + ' ' + idSelector, $iframe);

            $item.remove();
            $iframeItem.remove();
            console.log('removed');
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation);

