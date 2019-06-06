import history from './history';
import config from './config/config';

let eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onComplete, onAbort) => {
    history.action = config.pushName;
    routerPush(location, onComplete, onAbort);
  };

  router.go = n => {
    history.action = config.goName;
    routerGo(n);
  };

  router.replace = (location, onComplete, onAbort) => {
    history.action = config.replaceName;
    routerReplace(location, onComplete, onAbort);
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
