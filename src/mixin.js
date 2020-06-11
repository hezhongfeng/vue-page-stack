import history from './history';
import config from './config/config';

let eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onResolve, onReject) => {
    history.action = config.pushName;
    return routerPush(location, onResolve, onReject);
  };

  router.go = n => {
    history.action = config.goName;
    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    return routerReplace(location, onResolve, onReject);
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
