import history from './history';
import config from './config/config';

const eventRegister = router => {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = to => {
    console.log('push');
    history.action = config.pushName;
    return routerPush(to);
  };

  router.go = n => {
    history.action = config.goName;
    if (n < 0) {
      history.action = config.backName;
      history.n = n;
    }
    routerGo(n);
  };

  router.replace = to => {
    history.action = config.replaceName;
    return routerReplace(to);
  };

  router.back = () => {
    console.log('back');
    history.action = config.backName;
    history.n = -1;
    routerBack();
  };

  router.forward = () => {
    console.log('forward');
    history.action = config.forwardName;
    routerForward();
  };
};

export default eventRegister;
