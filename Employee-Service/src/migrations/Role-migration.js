const { Sequelize, DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('roleTable', {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'), // Use UUID v4 default value
      primaryKey: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('roleTable');
}

module.exports = { up, down };
