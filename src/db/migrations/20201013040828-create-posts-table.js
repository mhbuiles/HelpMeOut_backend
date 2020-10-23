'use strict';

module.exports = {
  up: async ( queryInterface , Sequelize ) => {
    await queryInterface.createTable( 'posts' , {
      id : {
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.DataTypes.BIGINT,
      },
      caption : {
        type : Sequelize.DataTypes.STRING(800),
        noEmpty : true,
      },
      image : {
        type : Sequelize.DataTypes.STRING(800),
        noEmpty : false,
      },
      userId : Sequelize.DataTypes.BIGINT,
      createdAt : Sequelize.DataTypes.DATE,
      updatedAt : Sequelize.DataTypes.DATE,
    })
  },

  down: async ( queryInterface , Sequelize ) => {
    await queryInterface.dropTable( 'posts' )
  }
};
