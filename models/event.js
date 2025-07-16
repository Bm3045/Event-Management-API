'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
   
    static associate(models) {
      
    }
  }
  Event.init({
    title: DataTypes.STRING,
    dateTime: DataTypes.DATE,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};