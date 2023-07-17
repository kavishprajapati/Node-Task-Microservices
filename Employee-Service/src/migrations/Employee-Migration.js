const { Sequelize, fn } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('EmployeeTable', {
    cmpId: {
      type: Sequelize.UUID,
      allowNull: false,
    },

    EmpId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: fn('gen_random_uuid')
    },

    empName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    contact: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('EmployeeTable');
}

module.exports = { up, down };

