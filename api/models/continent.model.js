const { DataTypes } = require ('sequelize')
const { sequelize } = require('../../db_conection/index')

const Continent = sequelize.define(
    'continent', {
        continent:{
            type: DataTypes.STRING,
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

module.exports = Continent