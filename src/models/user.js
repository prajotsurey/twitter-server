'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.post, {foreignKey: 'userId', as:'created_posts'});
      user.belongsToMany(models.post, {through: models.likes, foreignKey:'userId',as:'liked_posts'});
      user.belongsToMany(models.post, {through: models.bookmarks, foreignKey:'userId',as:'bookmarked_posts'});
    }
  }
  user.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING
  },{
    defaultScope:{
      attributes: { 
        exclude: ['password_hash']
      }
    },
    sequelize,
    modelName: 'user',
  },  
  );
  return user;
};