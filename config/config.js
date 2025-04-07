if (process.env.NODE_ENV !== "test") {
  require("dotenv").config();
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
  },

  test: {
    username: "root",
    password: "@Nxzero10anos",
    database: "vegconnect_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    connectTimeout: 60000,
  },
};
