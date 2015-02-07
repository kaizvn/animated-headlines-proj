/**
 * Created by kaizzige on 1/23/15.
 */

var App = (function () {
    var Event = (function () {
        var funcList = {};

        function registerFunction(components, func, params) {
            if (typeof func !== 'function') {
                return;
            }
            if (params && params.length === 'undefined') {
                params = [];
            }
            if (!funcList[components]) {
                funcList[components] = [];
            }
            funcList[components].push({
                func: func,
                params: params
            })
        }

        function invokeFunction(components) {
            if (!funcList[components]) {
                return;
            }

            while (funcList[components].length) {
                var funcObj = funcList[components].shift()
                    , func = funcObj.func
                    , params = funcObj.params;
                func.apply(this, params);
            }
        }

        return {
            registerFunction: registerFunction,
            invokeFunction: invokeFunction
        }
    })();


    return {
        Modules: {},
        Pages: {},
        Selectors: {},
        Event: Event
    }
})()
