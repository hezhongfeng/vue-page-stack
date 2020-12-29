"use strict";
exports.__esModule = true;
exports.useAction = exports.setAction = void 0;
var enum_1 = require("src/config/enum");
var action = { value: enum_1.Action.PUSH };
var setAction = function (value) {
    action.value = value;
};
exports.setAction = setAction;
var useAction = function () {
    return action;
};
exports.useAction = useAction;
