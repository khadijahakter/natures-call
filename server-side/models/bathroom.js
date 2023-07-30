'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bathroom extends Model {
    static associate(models) {
      this.hasMany(models.Review);
    }
  }
  Bathroom.init({
    location: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    bathroomId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    photo: DataTypes.STRING,
    wheelchair:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    unisex:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    emergencyCord:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    emergencyButton:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    petFriendly:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    requiresKey: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    handDryer: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    feminineProducts: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    toiletCovers:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    bidet: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    singleStall: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    multipleStall: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    changingTable: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    trashCan: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    goodFlooring: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    airFreshener: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    automatic: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    coatHook: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    brailleSign:{ 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    hotWater: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    firstAid: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
    sharpsDisposal: { 
      type: DataTypes.INTEGER,
      allowNull:true
    },
  }, {
    sequelize,
    modelName: 'Bathroom',
    tableName: 'bathrooms',
  });
  return Bathroom;
};