import history from './history';
import config from './config/config';

const eventRegister = router => {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = to => {
    history.action = config.pushName;
    return routerPush(to);
  };

  router.go = n => {
    history.action = config.goName;
    routerGo(n);
  };

  router.replace = to => {
    history.action = config.replaceName;
    return routerReplace(to);
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
