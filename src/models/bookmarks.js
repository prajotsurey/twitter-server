'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsToMany(models.user, {through: models.bookmarks, foreignKey: 'postId',as:'bookmarkingUsers'});
      models.user.belongsToMany(models.post, {through: models.bookmarks, foreignKey:'userId',as:'bookmarkedPosts'});
    }
  };
  bookmarks.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'bookmarks',
  });
  return bookmarks;
};