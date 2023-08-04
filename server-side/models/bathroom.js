'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bathroom extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Review);
      this.belongsTo(models.User);
    }
  }
  Bathroom.init({
    sourceid: { 
      type: DataTypes.STRING,
      allowNull:false
    },
    address: { 
      type: DataTypes.STRING,
      allowNull:true
    },
    lat: { 
      type: DataTypes.STRING,
      allowNull:true
    },
    lng: { 
      type: DataTypes.STRING,
      allowNull:true
    },
    name: { 
      type: DataTypes.STRING,
      allowNull:true
    },
    rating: DataTypes.INTEGER,
    content: DataTypes.STRING,
    photo:{ 
      type: DataTypes.STRING,
      allowNull:true
    },
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