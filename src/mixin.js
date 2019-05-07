import history from './history';

let eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onComplete, onAbort) => {
    history.action = 'push';
    routerPush(location, onComplete, onAbort);
  };

  router.go = n => {
    history.action = 'go';
    routerGo(n);
  };

  router.replace = (location, onComplete, onAbort) => {
    history.action = 'replace';
    routerReplace(location, onComplete, onAbort);
  };

  router.back = () => {
    history.action = 'back';
    routerBack();
  };

  router.forward = () => {
    history.action = 'forward';
    routerForward();
  };
};

export default eventRegister;
