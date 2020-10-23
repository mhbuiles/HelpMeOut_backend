'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( 'likes' , {
      id : {
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.DataTypes.BIGINT,
      },
      createdAt : Sequelize.DataTypes.DATE,
      updatedAt : Sequelize.DataTypes.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( 'likes' )
  }
};
