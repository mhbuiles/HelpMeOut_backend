'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn(
          'users',
          'name',
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
          'email',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'users',
          'password',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'users',
          'profilepic',
          { transaction : t }
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'name',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'lastName',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'username',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'email',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
            isEmail : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'password',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'users',
          'profilepic',
          {
            type : Sequelize.DataTypes.STRING,
            notEmpty : true,
          },
          { transaction : t }
        )
      ])
    })
  }
};
