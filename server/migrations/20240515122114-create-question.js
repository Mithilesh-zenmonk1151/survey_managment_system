'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      question_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,

      },
      abbr: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true

      },
      deleted_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};