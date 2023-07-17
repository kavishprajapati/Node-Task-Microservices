const { Sequelize, fn } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('companytable', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: fn('gen_random_uuid')
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contact: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('companytable');
}

module.exports = { up, down };