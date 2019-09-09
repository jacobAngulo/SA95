require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/data/data.sqlite3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./src/data/migrations"
    },
    seeds: {
      directory: "./src/data/seeds/"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      database: "data",
      user: "jacob",
      password: "password"
    },
    migrations: {
      directory: "./src/data/migrations"
    },
    seeds: {
      directory: "./src/data/seeds/"
    }
  }
};
