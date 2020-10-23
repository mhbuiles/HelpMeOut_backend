'use strict';

module.exports = {
  up: async ( queryInterface , Sequelize ) => {
    await queryInterface.createTable( 'users' , {
      id : {
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.DataTypes.BIGINT,
      },
      name : {
        type : Sequelize.DataTypes.STRING,
        noEmpty : true,
      },
      email : {
        type : Sequelize.DataTypes.STRING,
        noEmpty : true,
      },
      createdAt : Sequelize.DataTypes.DATE,
      updatedAt : Sequelize.DataTypes.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( 'users' )
  }
};
