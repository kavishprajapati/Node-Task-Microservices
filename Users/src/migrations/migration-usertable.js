const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
    userid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    useremail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('user_table');
}

module.exports = { up, down };