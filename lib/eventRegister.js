import config from './config/config';

const eventRegister = (router, navigationState) => {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = to => {
    navigationState.action = config.pushName;
    return routerPush(to);
  };

  router.go = n => {
    if (n > 0) {
      navigationState.action = config.forwardName;
    }
    if (n < 0) {
      navigationState.action = config.backName;
    }
    navigationState.n = n;
    return routerGo(n);
  };

  router.replace = to => {
    navigationState.action = config.replaceName;
    return routerReplace(to);
  };

  router.back = () => {
    navigationState.action = config.backName;
    navigationState.n = -1;
    return routerBack();
  };

  router.forward = () => {
    navigationState.action = config.forwardName;
    return routerForward();
  };
};

export default eventRegister;
