'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookmarks', {
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
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookmarks');
  }
};