"use strict";
exports.__esModule = true;
exports.initGuard = void 0;
var config_1 = require("src/config");
var enum_1 = require("src/config/enum");
var action_1 = require("src/core/action");
var utils_1 = require("src/lib/utils");
var context_1 = require("./context");
var initGuard = function () {
    var keyName = config_1.useConfig().keyName;
    var router = context_1.useContext().router;
    var action = action_1.useAction();
    router.beforeEach(function (to, from) {
        if (utils_1.isEmpty(to.query[keyName])) {
            to.query[keyName] = utils_1.createKey();
            var replace = action.value === enum_1.Action.REPLACE || utils_1.isEmpty(from.query[keyName]);
            return {
                hash: to.hash,
                path: to.path,
                name: to.name,
                params: to.params,
                query: to.query,
                meta: to.meta,
                replace: replace
                // force: replace
            };
        }
        return true;
    });
};
exports.initGuard = initGuard;
