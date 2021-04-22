import history from './history';
import config from './config/config';

function removeKey(location) {
  if (!location) {
    return location;
  }
  if (typeof location === 'string') {
    return location;
  } 
  if (typeof location === 'object') {
    const query = location.query;
    if (query && query[config.keyName]) {
      delete query[config.keyName];
    }
  }
}

const eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onResolve, onReject) => {
    history.action = config.pushName;
    removeKey(location);
    if (onResolve || onReject) {
      return routerPush(location, onResolve, onReject);
    }
    return routerPush(location).catch(error => error);
  };

  router.go = n => {
    history.action = config.goName;
    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    removeKey(location);
    if (onResolve || onReject) {
      return routerReplace(location, onResolve, onReject);
    }
    return routerReplace(location).catch(error => error);
  };

  router.back = () => {
    history.action = config.backName;
    routerBack();
  };

  router.forward = () => {
    history.action = config.forwardName;
    routerForward();
  };
};

export default eventRegister;
