/**
 * Created by kaizzige on 1/23/15.
 */


App.Pages.Animation = (function ($, Event, pageSelector) {
    // instance : constructor, $cache : cached selector
    var instance = {}
        , $cache = {};

    // Static value
    var MAX_ITEM = 10
        , IFRAME_LINK = '/target.html'
        , PAGE_NAME = "ANIMATION"
        , IFRAME_NAME = "IFRAME";

    // Selector info Object
    var trigger = {
        selector: pageSelector.trigger,
        name: pageSelector.trigger.replace(/[\.#\[\]]/g, ''), // remove .# [ ]
        type: 'a' //a = attribute, c = class , i = id
    };

    instance.load = function (selector, option) {
        instance.registerFunction(init, [selector, option]);
        instance.registerFunction(initIframe);
        instance.registerFunction(eventHandler);
        instance.registerFunction(loadSaveData);

        Event.invokeFunction(PAGE_NAME);
    };

    instance.registerFunction = function (func, params) {
        Event.registerFunction(PAGE_NAME, func, params);
    };

    instance.registerIframeFunction = function (func, params) {
        Event.registerFunction(IFRAME_NAME, func, params);
    };

    function init() {
        var liClass = {
            wrapper: pageSelector.wordWrapper.substr(1),
            textAdded: pageSelector.textAdded.substr(1),
            removeBtn: pageSelector.removeBtn.substr(1),
            removeSymbol: pageSelector.removeSymbol.substr(1)

        };

        $cache.liTemplate =
            $('<li/>', {class: liClass.wrapper})
                .append($('<span/>', {class: liClass.textAdded}))
                .append($('<span/>', {class: liClass.removeBtn})
                    .append($('<i/>', {class: liClass.removeSymbol, text: 'X'})));


        $cache.ulLists = $(pageSelector.wordsLists);
        $cache.viewBtn = $(pageSelector.viewBtn);
        $cache.saveBtn = $(pageSelector.saveBtn);
        $cache.textInput = $(pageSelector.textInput);
        $cache.inputForm = $(pageSelector.inputForm);
        $cache.iframeSelector = $(pageSelector.iframeWrapper);
    }

    function initIframe() {
        activeWhenIframeReady(function () {
            $cache.iframe = $cache.iframeSelector.contents();
            $cache.iframeWindow = $cache.iframeSelector[0].contentWindow;
        });

        $cache.iframeSelector.load(function () {
            Event.invokeFunction(IFRAME_NAME);
        });

        $cache.iframeSelector.attr('src', IFRAME_LINK);

    }

    // Those function will be called when iframe ready.
    function activeWhenIframeReady(func, params) {
        instance.registerIframeFunction(func, params || []);
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
                alert('The max items can be added is 10');
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


    function addWordsToIFrame(options) {
        var $wordItem = $cache.ulLists.find(pageSelector.wordWrapper)
            , $transformContainer = $(pageSelector.Target.transformContainer, $cache.iframe)
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
            // set attribute for select trigger
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

        //trigger effect
        $cache.iframeWindow.App.Pages.Target.init(trigger.selector, options);
    }

    // View Result function
    function viewResult() {
        var $content = $('html', this);
        var $selected = $content.find(pageSelector.Target.selectedStyle);
        $content.find(pageSelector.Target.styleRadio).removeAttr('checked');
        $selected.attr('checked', 'checked').prop('checked', true);

        var yourDOCTYPE = "<!DOCTYPE html>";
        var printPreview = window.open('about:blank', 'print_preview', "resizable=yes,scrollbars=yes,status=yes");
        var printDocument = printPreview.document;
        printDocument.open();
        printDocument.write(yourDOCTYPE + "<html>" + $content.html() + "</html>");
        printDocument.close();
    }

    function loadSaveData() {
        var textList = getSavedItems('texts')
            , effectType = getSavedItems('activeType');

        activeWhenIframeReady(function () {
            // Set text to list
            addTextToList(textList);
            addWordsToIFrame({type: effectType});
        });
    }

    function getSavedItems(name) {
        if (!localStorage) {
            return false;
        }

        var data = localStorage.getItem(name);
        data = (data !== 'undefined' && data !== 'null') ? JSON.parse(data) : '';
        return data;
    }

    function setSavedItems(name, data) {
        if (!localStorage) {
            alert('Opps, sorry... this function just support newer browser, please use another one');
            return false;
        }

        var stringify = JSON.stringify(data);
        localStorage.setItem(name, stringify);
        return true;
    }


    // Save function
    function saveCurrentTextList() {
        var wordLists = [];
        $.each($(pageSelector.textAdded, $cache.ulLists), function () {
            var text = $(this).text();
            wordLists.push(text);
        });
        return setSavedItems('texts', wordLists);

    }

    function saveCurrentEffectType() {
        var type = $cache.iframe.find(pageSelector.Target.selectedStyle).attr('id');
        return setSavedItems('activeType', type);
    }


    function eventHandler() {
        // Submit form handler
        $cache.inputForm.on('submit', function (e) {
            e.preventDefault();

            // Add words list
            addTextToList.apply(this);

            // Update iframe list
            addWordsToIFrame.apply(this);

            // Clear input
            $cache.textInput.val('');
        });

        // Remove button event handler
        $cache.ulLists.on('click', pageSelector.removeBtn, function () {
            // Remove item on lists
            var $item = $(this).closest(pageSelector.wordWrapper);
            $item.remove();

            // Update iframe's list
            addWordsToIFrame.apply(this);
        });

        // Save button event handler
        $cache.saveBtn.on('click', function () {
            var isSaveText = saveCurrentTextList()// Save text
                , isSaveEffectType = saveCurrentEffectType(); // Save effect type

            // Alert confirm action
            var message = (isSaveEffectType && isSaveText) ? 'Data saved!' : 'data save Failed'
            alert(message);
        });

        // View button event handler
        $cache.viewBtn.on('click', function () {
            var iframe = $cache.iframeSelector.contents();
            viewResult.apply(iframe);
        });
    }

    return instance;

})(jQuery, App.Event, App.Selectors.Animation);

