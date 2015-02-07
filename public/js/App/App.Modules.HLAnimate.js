/**
 * This is the core library
 */

App.Modules.HLAnimate = (function ($) {
    var options = {};
    //default selector
    var DEFAULT_SELECTOR = '.cd-headline'
        , DEFAULT_WRAPPER = '.cd-intro'
        , DEFAULT_TYPE = 'rotate-1'
        , TEMPLATE_URL = '/html/contents.html'
        , WORDS_WRAPPER = '.cd-words-wrapper'
        , TYPE_LIST = ['rotate-1', 'type', 'rotate-2', 'loading-bar', 'slide',
            'clip', 'zoom', 'rotate-3', 'scale', 'push'];

    // Default options
    //set animation timing
    options.animationDelay = 2500,
        //loading bar effect
        options.barAnimationDelay = 3800,
        options.barWaiting = options.barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        options.lettersDelay = 50,
        //type effect
        options.typeLettersDelay = 150,
        options.selectionDuration = 500,
        options.typeAnimationDelay = options.selectionDuration + 800,
        //clip effect
        options.revealDuration = 600,
        options.revealAnimationDelay = 1500,
        options.selector = DEFAULT_SELECTOR,
        options.effectWrapper = DEFAULT_WRAPPER;


    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = options.animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = options.barAnimationDelay;
                setTimeout(function () {
                    headline.find('.cd-words-wrapper').addClass('is-loading')
                }, options.barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            }

            //trigger animation
            setTimeout(function () {
                hideWord(headline.find('.is-visible').eq(0))
            }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, options.selectionDuration);
            setTimeout(function () {
                showWord(nextWord, options.typeLettersDelay)
            }, options.typeAnimationDelay);

        } else if ($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, options.lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, options.lettersDelay);

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({width: '2px'}, options.revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, options.barAnimationDelay);
            setTimeout(function () {
                $word.parents('.cd-words-wrapper').addClass('is-loading')
            }, options.barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, options.animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({'width': $word.width() + 10}, options.revealDuration, function () {
                setTimeout(function () {
                    hideWord($word)
                }, options.revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function () {
                hideWord(takeNext($word))
            }, options.animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents('.cd-headline').hasClass('type')) {
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('waiting');
                }, 200);
            }
            if (!$bool) {
                setTimeout(function () {
                    hideWord($word)
                }, options.animationDelay)
            }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    // Create Template
    function createTemplate($introSection) {
        var $this = $(this);
        $.each($introSection, function (key, section) {
            var $section = $(section)
                , words = $section.attr('cd-words');

            if (!words) {
                return;
            } else {

                words = words.trim().replace(/\s+/g, ' ').split(' ');
            }
            $section.html($this.html());
            var $cdWordWrapper = $section.find(WORDS_WRAPPER);
            words.forEach(function (word) {
                $cdWordWrapper.append('<b>' + word + '</b>');
            });
            $cdWordWrapper.find('b').first().addClass('is-visible');

        });
        $this.remove();
    }

    // use to clear all timeout of previous effect
    function clearExistTimeout() {
        var id = window.setTimeout(function () {
        }, 0);

        while (id--) {
            window.clearTimeout(id);
        }
    }

    // Register constructor
    var instance = function (sel, opt) {
        if (opt) {
            $.extend(options, opt)
        }
        //if($('.cd-filter'))
        options.selector = (sel) ? sel : options.selector;

    };

    // Register prototype
    instance.prototype.initHeadline = function (type) {
        type = (type || TYPE_LIST.indexOf(type) >= 0) ? type : DEFAULT_TYPE;
        clearExistTimeout();
        var $effectTemplate = $('<div/>')
            , $introSection = $(options.effectWrapper);

        // Clear exist timeout
        if ($introSection.length === 0) {
            return;
        }

        $effectTemplate.load(TEMPLATE_URL + ' .' + type, function () {
            createTemplate.call(this, $introSection);

            //insert <i> element for each letter of a changing word
            singleLetters($('.cd-headline.letters').find('b'));
            //initialise headline animation
            animateHeadline($(options.selector));
        });

    };

    return instance;
})(jQuery);
