"use strict";
exports.__esModule = true;
var StackRouterView_1 = require("src/components/StackRouterView");
var config_1 = require("src/config");
var context_1 = require("./context");
var guard_1 = require("./guard");
var proxy_1 = require("./proxy");
var VuePageStack = {
    install: function (app, options) {
        var router = options.router;
        if (!router) {
            throw Error('\n vue-router is necessary. \n\n');
        }
        config_1.setConfig(options);
        context_1.setContext({ app: app, router: router });
        proxy_1.initRouterProxy();
        StackRouterView_1.initComponent();
        guard_1.initGuard();
    }
};
exports["default"] = VuePageStack;
