'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( 'chats' , {
      id : {
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.DataTypes.BIGINT,
      },
      isConnected : Sequelize.DataTypes.BOOLEAN,
      createdAt : Sequelize.DataTypes.DATE,
      updatedAt : Sequelize.DataTypes.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( 'chats' )
  }
};
