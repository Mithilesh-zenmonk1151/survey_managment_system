'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      survey_type_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      abbr: {
        type: Sequelize.STRING
      },
      is_published: {
        type: Sequelize.BOOLEAN
      },
      options: {
        type: Sequelize.JSON
      },
      published_at: {
        type: Sequelize.DATE
      },
      publication_status_changed_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('surveys');
  }
};