/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Animation = (function ($, Event, pageSelector, headlineAnimated) {
    var instance = {};
    var $cache = {};
    var MAX_ITEM = 10;
    var trigger = {
        selector: pageSelector.trigger,
        name: pageSelector.trigger.replace(/[\.#\[\]]/g, ''), // remove .# [ ]
        type: 'a' //a = attribute, c = class , i = id
    };

    instance.load = function (selector, option) {
        Event.registerFunction(init, [selector, option]);
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
        $cache.iframe = $(pageSelector.iframeWrapper);
        //$cache.iframe.contentWindow
        $cache.liTemplate =
            $('<li/>', {class: liClass.wrapper})
                .append($('<span/>', {class: liClass.textAdded}))
                .append($('<span/>', {class: liClass.removeBtn})
                    .append($('<i/>', {class: liClass.removeSymbol, text: 'X'})));

    }

    function addWords() {
        var $input = $(pageSelector.textInput, this)
            , inputHTML = $cache.liTemplate.clone()
            , $iframe = $cache.iframe.contents()
            , iframeWindow = $(pageSelector.iframeWrapper)[0].contentWindow
            , $transformContainer = $(pageSelector.Target.transformContainer, $iframe)
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
            'data-words': $input.val(),
            id: id

        });
        switch (trigger.type) {
            case 'a':
                section.attr(trigger.name, '');
                break;
            case 'c':
                section.addClass(trigger.name);
                break;
            case 'i':
                section.attr('id', trigger.name);
                break;
            default :
                break;
        }

        $transformContainer.append(section);

        //trigger effect
        iframeWindow.App.Pages.Target.init(trigger.selector, {});


        // Clear input
        $input.val('');
    }

    function eventHandler() {
        $(pageSelector.inputForm).on('submit', function (e) {
            e.preventDefault();
            addWords.apply(this);
        });


        $(pageSelector.wordsLists).on('click', pageSelector.removeBtn, function () {
            var $iframe = $cache.iframe.contents()
                , $item = $(this).closest(pageSelector.wordWrapper)
                , idSelector = '#' + $item.attr('id')
                , $iframeItem = $(pageSelector.Target.transformContainer + ' ' + idSelector, $iframe);

            $item.remove();
            $iframeItem.remove();
            console.log('removed');
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation, App.Modules.HLAnimate);

