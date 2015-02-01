/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Animation = (function ($, Event, pageSelector) {
    var instance = {};
    var $cache = {};
    var MAX_ITEM = 10;

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
        $cache.iframe = $(pageSelector.iframeWrapper).contents();
        $cache.liTemplate =
            $('<li/>', {class: liClass.wrapper})
                .append($('<span/>', {class: liClass.textAdded}))
                .append($('<span/>', {class: liClass.removeBtn})
                    .append($('<i/>', {class: liClass.removeSymbol, text: 'X'})));

    }

    function eventHandler() {
        $(pageSelector.inputForm).on('submit', function (e) {
            e.preventDefault();
            if ($cache.ulLists.find(pageSelector.wordWrapper).length >= MAX_ITEM) {
                alert('holysheet');
                return;
            }
            var input = $(pageSelector.textInput, this)
                , inputHTML = $cache.liTemplate.clone();

            inputHTML.find(pageSelector.textAdded).text(input.val());
            $cache.ulLists.append(inputHTML);
            input.val('');
            console.log('added');

        });

        $(pageSelector.wordsLists).on('click', pageSelector.removeBtn, function () {
            var $item = $(this).closest(pageSelector.wordWrapper);
            $item.remove();
            console.log('removed');
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation);

