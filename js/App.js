/**
 * Created by kaizzige on 1/23/15.
 */

var App = (function () {

    var Event = (function () {
        var funcList = []

        function registerFunction(func, params) {
            if (typeof func !== 'function') {
                return;
            }
            if (params && params.length === 'undefined') {
                params = [];
            }
            funcList.push({
                func: func,
                params: params
            })
        }

        function invokeFunction() {
            while (funcList.length) {
                var funcObj = funcList.pop()
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
