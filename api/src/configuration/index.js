const lodash = require('lodash');

const config = require('./config.json');
const defaultConfig = config.dev;
const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
const finalConfig = lodash.merge(defaultConfig, envConfig);

global.gConfig = finalConfig;