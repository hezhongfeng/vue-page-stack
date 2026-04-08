import { createRouterNavigationStrategy } from './navigation';

const eventRegister = (router, navigationState) => {
  const strategy = createRouterNavigationStrategy(router, navigationState);

  router.push = strategy.push;
  router.replace = strategy.replace;
  router.go = strategy.go;
  router.back = strategy.back;
  router.forward = strategy.forward;
};

export default eventRegister;
