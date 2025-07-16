'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
   
    static associate(models) {
      
    }
  }
  Registration.init({
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};