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
    history.direction = config.forwardName;
    return routerPush(location, onResolve, onReject);
  };

  router.go = n => {
    history.action = config.goName;
    history.direction = n < 0 ? config.backName : config.forwardName;
    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    history.direction = location.back ? config.backName : config.forwardName;
    return routerReplace(location, onResolve, onReject);
  };

  router.back = () => {
    history.action = config.backName;
    history.direction = config.backName;
    routerBack();
  };

  router.forward = () => {
    history.action = config.forwardName;
    history.direction = config.forwardName;
    routerForward();
  };
};

export default eventRegister;
