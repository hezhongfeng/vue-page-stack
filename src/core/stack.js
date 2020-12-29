"use strict";
exports.__esModule = true;
exports.useStack = exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack(props) {
        var _a;
        this.value = (_a = props === null || props === void 0 ? void 0 : props.value) !== null && _a !== void 0 ? _a : [];
    }
    Stack.prototype.push = function (item) {
        return this.value.push(item);
    };
    Stack.prototype.pop = function () {
        return this.value.pop();
    };
    Stack.prototype.removeAfter = function (key) {
        var index = this.value.findIndex(function (item) { return item.key === key; });
        if (index === -1) {
            return undefined;
        }
        var start = index + 1;
        if (start >= this.value.length) {
            return undefined;
        }
        return this.value.splice(start, this.value.length - index - 1);
    };
    Stack.prototype.clear = function () {
        var value = this.value;
        this.value = [];
        return value;
    };
    Stack.prototype.get = function (key) {
        var _a;
        return (_a = this.value.find(function (item) { return item.key === key; })) === null || _a === void 0 ? void 0 : _a.vnode;
    };
    return Stack;
}());
exports.Stack = Stack;
exports.useStack = (function () {
    var stack = new Stack();
    return function () { return stack; };
})();
