"use strict";
exports.__esModule = true;
exports.useContext = exports.setContext = void 0;
var context;
var setContext = function (ctx) {
    context = ctx;
};
exports.setContext = setContext;
var useContext = function () {
    return context;
};
exports.useContext = useContext;
