'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'lastName',
          {
            type : Sequelize.DataTypes.STRING,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'username',
          {
            type : Sequelize.DataTypes.STRING,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'password',
          {
            type : Sequelize.DataTypes.STRING,
          },
          { transaction : t }
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn(
          'users',
          'profilepic',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'users',
          'lastName',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'users',
          'username',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'users',
          'password',
          { transaction : t }
        )
      ])
    })
  }
};
