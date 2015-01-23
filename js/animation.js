/**
 * Created by kaizzige on 1/23/15.
 */

var stAnimate = (function ($, animate) {
    var instance = {};
    var defaultTagData = '';
    var option = {};

    instance.init = function () {
        this.registerTagToActive('data-animationtag');
    };

    instance.registerTagToActive = function(selector) {
        animate.registerCustomSelector(selector);
    }

    instance.applyAnimate = function (selector, style) {

    }


    return instance;

})(jQuery, hlAnimate);