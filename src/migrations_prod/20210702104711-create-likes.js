'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('likes', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete:'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete:'CASCADE',
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      value: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes');
  }
};