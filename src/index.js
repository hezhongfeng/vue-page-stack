"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.useAction = exports.useStack = exports.VuePageStack = void 0;
__exportStar(require("./type/interface"), exports);
var core_1 = require("./core");
__createBinding(exports, core_1, "default", "VuePageStack");
var stack_1 = require("./core/stack");
__createBinding(exports, stack_1, "useStack");
var action_1 = require("./core/action");
__createBinding(exports, action_1, "useAction");
