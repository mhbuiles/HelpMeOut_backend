'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'comments',
          'text',
          {
            type : Sequelize.DataTypes.STRING(400),
            notEmpty : true,
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
          'comments',
          'text',
          { transaction : t }
        )
      ])
    })
  }
};
