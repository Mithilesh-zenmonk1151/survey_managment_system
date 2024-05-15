'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_questions', {
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
      survey_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      question_description: {
        type: Sequelize.TEXT,

      },
      deleted_at: {
        type: Sequelize.TIME
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
    await queryInterface.dropTable('survey_questions');
  }
};