'use strict';

module.exports = {
  up: async ( queryInterface , Sequelize ) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'profilepic',
          {
            type : Sequelize.DataTypes.STRING(800),
          },
          { transaction : t }
        )
      ])
    })
  },

  down: async ( queryInterface , Sequelize ) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn(
          'users',
          'profilepic',
          { transaction : t }
        )
      ])
    })
  }
};
