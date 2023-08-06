
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      this.hasMany(models.Bathroom);
      this.hasMany(models.Review);
    }

  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: {
      type : DataTypes.STRING,
      allowNull: true,
    } 
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
  });
  return User;
};
