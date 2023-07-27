'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Bathroom);
      this.belongsTo(models.User);
    
    }
  }
  Review.init({
    profileId: DataTypes.INTEGER,
    bathroomId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    photo: DataTypes.STRING,
    wheelchair: DataTypes.INTEGER,
    unisex: DataTypes.INTEGER,
    emergencyCord: DataTypes.INTEGER,
    emergencyButton: DataTypes.INTEGER,
    petFriendly: DataTypes.INTEGER,
    requiresKey: DataTypes.INTEGER,
    handDryer: DataTypes.INTEGER,
    feminineProducts: DataTypes.INTEGER,
    toiletCovers: DataTypes.INTEGER,
    bidet: DataTypes.INTEGER,
    singleStall: DataTypes.INTEGER,
    multipleStall: DataTypes.INTEGER,
    changingTable: DataTypes.INTEGER,
    trashCan: DataTypes.INTEGER,
    goodFlooring: DataTypes.INTEGER,
    airFreshener: DataTypes.INTEGER,
    automatic: DataTypes.INTEGER,
    coatHook: DataTypes.INTEGER,
    brailleSign: DataTypes.INTEGER,
    hotWater: DataTypes.INTEGER,
    firstAid: DataTypes.INTEGER,
    sharpsDisposal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};