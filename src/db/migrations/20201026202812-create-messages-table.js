'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( 'messages' , {
      id : {
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.DataTypes.BIGINT,
      },
      text : {
        type : Sequelize.DataTypes.STRING(400),
        validate : {
          notEmpty : true,
        }
      },
      origin : Sequelize.DataTypes.STRING,
      createdAt : Sequelize.DataTypes.DATE,
      updatedAt : Sequelize.DataTypes.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( 'messages' )
  }
};
