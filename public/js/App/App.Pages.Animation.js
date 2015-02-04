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
        $cache.textInput = $(pageSelector.textInput);
        //$cache.iframe.contentWindow
        $cache.liTemplate =
            $('<li/>', {class: liClass.wrapper})
                .append($('<span/>', {class: liClass.textAdded}))
                .append($('<span/>', {class: liClass.removeBtn})
                    .append($('<i/>', {class: liClass.removeSymbol, text: 'X'})));

    }

    function addTextToList(input) {
        /*
         * 3 Case :
         *  + input is Array : OK
         *  + input is string : add to array [input]
         *  + input is null/undefined : get from input form
         *  */

        var texts = (input) ? input : $cache.textInput.val()
            , textsContainer = $('<div/>');
        texts = (typeof texts === 'string') ? [texts] : texts;

        if (texts.length === 'undefined') return;


        texts.forEach(function (text) {
            var inputHTML = $cache.liTemplate.clone()
                , id = Date.now();

            if (text.length === 0) {
                return;
            }

            if ($cache.ulLists.find(pageSelector.wordWrapper).length >= MAX_ITEM) {
                alert('holy sheet');
                return;
            }

            inputHTML
                .attr('id', id)
                .find(pageSelector.textAdded).text(text);
            textsContainer.prepend(inputHTML);
        });

        // Add to list words
        $cache.ulLists.prepend(textsContainer.html());
    }


    function addWordsToIFrame() {
        var $wordItem = $(pageSelector.wordsLists).find(pageSelector.wordWrapper)
            , $iframe = $cache.iframe.contents()
            , iframeWindow = $(pageSelector.iframeWrapper)[0].contentWindow
            , $transformContainer = $(pageSelector.Target.transformContainer, $iframe)
            , wordListContainer = $('<div/>');


        $.each($wordItem, function () {
            var $this = $(this);

            //Add to iframe
            var section = $('<section/>', {
                    class: pageSelector.Target.intro.substr(1),
                    'cd-words': $this.find(pageSelector.textAdded).text(),
                    id: $(this).attr('id')
                }
            );

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
            wordListContainer.append(section);
        });

        $transformContainer.html(wordListContainer.html());
        //$iframe.find(pageSelector.Target.intro.substr(1)).remove();
        //trigger effect
        iframeWindow.App.Pages.Target.init(trigger.selector, {});


    }

    function saveContents() {
        var wordLists = [];

        if (localStorage) {
            $.each($(pageSelector.textAdded, pageSelector.wordsLists), function () {
                var text = $(this).text();
                wordLists.push(text);
            });

            var stringify = JSON.stringify(wordLists);
            localStorage.setItem('texts', stringify);

        } else {
            alert('Give up on your old browser, please!')
        }

    }

    function loadContents(name) {
        var data = localStorage.getItem(name);
        return JSON.parse(data);
    }

    function getCurrentEffect(name) {
        return loadContents(name);
    }

    function saveCurrentEffect() {
        var $iframe = $cache.iframe.contents()
            , type = $iframe.find(pageSelector.Target.selectedStyle).attr('id');

        var stringify = JSON.stringify({type: type});
        localStorage.setItem('activeType', stringify);


    }

    function eventHandler() {
        $(pageSelector.inputForm).on('submit', function (e) {
            e.preventDefault();

            // Add words list
            addTextToList.apply(this);

            // Update iframe list
            addWordsToIFrame.apply(this);

            // Clear input
            $cache.textInput.val('');
        });


        $(pageSelector.wordsLists).on('click', pageSelector.removeBtn, function () {
            // Remove item on lists
            var $item = $(this).closest(pageSelector.wordWrapper);
            $item.remove();

            // Update iframe's list
            addWordsToIFrame.apply(this);

        });

        $(pageSelector.saveBtn).on('click', function () {
            saveContents();
            saveCurrentEffect();

        });

        $(pageSelector.viewBtn).on('click', function () {

        });


    }

    return instance;

})
(jQuery, App.Event, App.Selectors.Animation, App.Modules.HLAnimate);

