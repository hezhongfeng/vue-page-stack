import config from './config/config';

interface History {
  action: string;
}

const histoty: History = {
  action: config.pushName,
};

export default histoty;
