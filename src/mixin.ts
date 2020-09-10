import history from './history';
import config from './config/config';

const eventRegister = (router: {
  forward: () => void;
  push: (location: string, onResolve?: any, onReject?: any) => any;
  go: (n: number) => void;
  replace: (location: string, onResolve?: any, onReject?: any) => any;
  back: () => void;
}) => {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);
  router.push = (location, onResolve, onReject) => {
    history.action = config.pushName;
    if (onResolve || onReject) {
      return routerPush(location, onResolve, onReject);
    }
    return routerPush(location).catch((error: any) => error);
  };
  router.go = (n: number) => {
    history.action = config.goName;
    routerGo(n);
  };
  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    if (onResolve || onReject) {
      return routerReplace(location, onResolve, onReject);
    }
    return routerReplace(location).catch((error: any) => error);
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
