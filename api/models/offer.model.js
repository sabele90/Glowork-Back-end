const { DataTypes } = require ('sequelize')
const { sequelize } = require('../../db_conection/index')

const Offer = sequelize.define(
    'offer', {
          title:{
            type: DataTypes.STRING,
            allowNull:false
          },
          description:{
            type: DataTypes.TEXT,
            allowNull:false
          },
          location:{
            type: DataTypes.GEOMETRY,
            allowNull:false
          },
          start_date:{
            type: DataTypes.DATE,
            allowNull:false
          },
          end_date:{
            type: DataTypes.DATE,
            allowNull:false
          },
          requirements:{
            type: DataTypes.TEXT,
            allowNull:false
          },
          benefits:{
            type: DataTypes.TEXT,
            allowNull:false
          },
          max_volunteers:{
            type: DataTypes.INTEGER,
            allowNull:false
          },
          photo_1: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          photo_2: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          photo_3: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          photo_4: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          photo_5: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          
          company_id:{
            type: DataTypes.INTEGER,
          },
          createdAt: {
            field: 'created_at', // Cambia el nombre de la columna createdAt
            type: DataTypes.DATE,
            defaultValue: function() {
              return new Date();
            },
          },
          updatedAt: {
            field: 'updated_at', // Cambia el nombre de la columna updatedAt
            type: DataTypes.DATE,
            defaultValue: function() {
              return new Date();
            },
          },
          
      
})

module.exports = Offer