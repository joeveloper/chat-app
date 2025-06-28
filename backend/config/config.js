const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT,
    supportsSearchPath: true,
    logging: false,
    dialectOptions: {
      requestTimeout: 800000,
      prependSearchPath: true,
    },
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 200000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      requestTimeout: 800000,
      prependSearchPath: true,
    },
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    pool: {
      max: 800,
      min: 0,
      acquire: 200000,
      idle: 10000,
    },
  },
  qa: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      requestTimeout: 800000,
      prependSearchPath: true,
    },
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    pool: {
      max: 100,
      min: 0,
      acquire: 150000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    dialect: process.env.DB_TEST_DIALECT,
    port: process.env.DB_TEST_PORT,
    logging: false,
  },
};
