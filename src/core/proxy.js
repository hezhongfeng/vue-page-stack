"use strict";
exports.__esModule = true;
exports.initRouterProxy = void 0;
var enum_1 = require("src/config/enum");
var action_1 = require("./action");
var context_1 = require("./context");
/**
 * 包装一层 router api，用于跟踪执行的动作
 */
var initRouterProxy = function () {
    var _a = context_1.useContext(), app = _a.app, router = _a.router;
    var routerPush = router.push.bind(router);
    var routerGo = router.go.bind(router);
    var routerReplace = router.replace.bind(router);
    var routerBack = router.back.bind(router);
    var routerForward = router.forward.bind(router);
    // 还没安装 vue-router
    if (!app.config.globalProperties.$router) {
        app.use(router);
    }
    router.push = function (to) {
        action_1.setAction(enum_1.Action.PUSH);
        return routerPush(to);
    };
    router.go = function (n) {
        action_1.setAction(enum_1.Action.GO);
        routerGo(n);
    };
    router.replace = function (to) {
        action_1.setAction(enum_1.Action.REPLACE);
        return routerReplace(to);
    };
    router.back = function () {
        action_1.setAction(enum_1.Action.BACK);
        routerBack();
    };
    router.forward = function () {
        action_1.setAction(enum_1.Action.FORWARD);
        routerForward();
    };
};
exports.initRouterProxy = initRouterProxy;
