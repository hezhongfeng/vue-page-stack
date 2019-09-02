(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VuePageStack"] = factory();
	else
		root["VuePageStack"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/config/config.js
/* harmony default export */ var config = ({
  componentName: 'VuePageStack',
  keyName: 'stack-key',
  pushName: 'push',
  goName: 'go',
  replaceName: 'replace',
  backName: 'back',
  forwardName: 'forward'
});
// CONCATENATED MODULE: ./src/history.js

const histoty = {
  action: config.pushName
};
/* harmony default export */ var src_history = (histoty);
// CONCATENATED MODULE: ./src/components/VuePageStack.js



function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

const stack = [];

function getIndexByKey(key) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }

  return -1;
}

let VuePageStack = keyName => {
  return {
    name: config.componentName,
    abstract: true,

    data() {
      return {};
    },

    props: {
      max: {
        type: [String, Number],

        default() {
          return '';
        }

      }
    },

    render() {
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);

      if (!vnode) {
        return vnode;
      }

      let index = getIndexByKey(key);

      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance; // destroy the instances that will be spliced

        for (let i = index + 1; i < stack.length; i++) {
          stack[i].vnode.componentInstance.$destroy();
          stack[i] = null;
        }

        stack.splice(index + 1);
      } else {
        if (src_history.action === config.replaceName) {
          // destroy the instance
          stack[stack.length - 1].vnode.componentInstance.$destroy();
          stack[stack.length - 1] = null;
          stack.splice(stack.length - 1);
        }

        stack.push({
          key,
          vnode
        });
      }

      vnode.data.keepAlive = true;
      return vnode;
    }

  };
};

function getStack() {
  return stack;
}


// CONCATENATED MODULE: ./src/mixin.js



let eventRegister = function (router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onResolve, onReject) => {
    src_history.action = config.pushName;

    if (onResolve || onReject) {
      return routerPush(location, onResolve, onReject);
    }

    return routerPush(location).catch(error => {
      if (error !== undefined) {
        console.log(error);
      }
    });
  };

  router.go = n => {
    src_history.action = config.goName;
    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    src_history.action = config.replaceName;

    if (onResolve || onReject) {
      return routerReplace(location, onResolve, onReject);
    }

    return routerReplace(location).catch(error => {
      if (error !== undefined) {
        console.log(error);
      }
    });
  };

  router.back = () => {
    src_history.action = config.backName;
    routerBack();
  };

  router.forward = () => {
    src_history.action = config.forwardName;
    routerForward();
  };
};

/* harmony default export */ var mixin = (eventRegister);
// CONCATENATED MODULE: ./src/index.js





function hasKey(query, keyName) {
  return !!query[keyName];
}

function getKey(src) {
  return src.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function hasSameMatched(to, from) {
  if (to.matched.length === 0) {
    throw Error('\n this path ' + to.path + ' has no matched. \n\n');
  }

  if (from.matched[0] && from.matched[0].path === to.matched[0].path) {
    return true;
  }

  return false;
}

const VuePageStackPlugin = {};

VuePageStackPlugin.install = function (Vue, {
  router,
  name = config.componentName,
  keyName = config.keyName
}) {
  if (!router) {
    throw Error('\n vue-router is necessary. \n\n');
  }

  Vue.component(name, VuePageStack(keyName));
  Vue.prototype.$pageStack = {
    getStack: getStack
  };
  mixin(router);
  router.beforeEach((to, from, next) => {
    if (!hasKey(to.query, keyName)) {
      if (hasSameMatched(to, from)) {
        to.query[keyName] = from.query[keyName];
      } else {
        to.query[keyName] = getKey('xxxxxxxx');
      }

      let replace = src_history.action === config.replaceName || !hasKey(from.query, keyName);
      next({
        hash: to.hash,
        path: to.path,
        name: to.name,
        params: to.params,
        query: to.query,
        meta: to.meta,
        replace: replace
      });
    } else {
      let index = getIndexByKey(to.query[keyName]);

      if (index === -1) {
        to.params[keyName + '-dir'] = config.forwardName;
      } else {
        to.params[keyName + '-dir'] = config.backName;
      }

      next({
        params: to.params
      });
    }
  });
};

/* harmony default export */ var src = (VuePageStackPlugin);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-page-stack.umd.js.map