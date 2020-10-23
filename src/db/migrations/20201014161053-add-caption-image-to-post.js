'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'posts',
          'caption',
          {
            type : Sequelize.DataTypes.STRING(800),
            notEmpty : true,
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'posts',
          'image',
          {
            type : Sequelize.DataTypes.STRING(800),
            notEmpty : false,
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
          'posts',
          'caption',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'posts',
          'image',
          { transaction : t }
        )
      ])
    })
  }
};
