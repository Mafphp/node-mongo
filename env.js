const app = require('express')();
let env = app.get('env');
if (env === 'test') {
  env = 'development';
}

const isProd = env === 'production';
const isDev = env === 'development';


if (isDev) {
  require('dotenv').config();
}

function getEnvValue(procEnv) {
  if (procEnv && procEnv.startsWith('!!'))
    return process.env[procEnv.substring(2)]; // remove two first char (!!)
  else
    return procEnv;
}

// set enviroment of database
const database = getEnvValue(process.env.DATABASE);
const database_test = getEnvValue(process.env.DATABASE_TEST);
const db_uri = getEnvValue(process.env.DB_URI);
const db_uri_test = getEnvValue(process.env.DB_URI_TEST);

// set enviroment of app
const app_address = getEnvValue(process.env.APP_ADDRESS);
const app_port = getEnvValue(process.env.PORT);

module.exports = {
  database,
  database_test,
  db_uri,
  db_uri_test,
  app_address,
  app_port,
  isProd,
  isDev
}