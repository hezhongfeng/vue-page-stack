interface Config {
  componentName: string;
  keyName: string;
  pushName: string;
  goName: string;
  replaceName: string;
  backName: string;
  forwardName: string;
}

const config: Config = {
  componentName: 'VuePageStack',
  keyName: 'stack-key',
  pushName: 'push',
  goName: 'go',
  replaceName: 'replace',
  backName: 'back',
  forwardName: 'forward',
};

export default config;
