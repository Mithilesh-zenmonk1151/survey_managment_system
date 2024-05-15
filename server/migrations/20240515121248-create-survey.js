'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surveys', {
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
      survey_type_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      name: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      abbr: {
        type: Sequelize.STRING,
        allowNull:false
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      options: {
        type: Sequelize.JSON,
        allowNull:false
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