const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const config = require("./config")

const sequelize = new Sequelize(config.cockroach.database, config.cockroach.user, config.cockroach.password, {

  host: config.cockroach.host,
  port: config.cockroach.port,
  dialect: config.cockroach.dialect,
  dialectOptions: {
    ssl: config.cockroach.ssl
  }
});

const umzug = new Umzug({
  migrations: { glob: 'migrations/migration-usertable.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
});

(async () => {
  await umzug.up();
})();

