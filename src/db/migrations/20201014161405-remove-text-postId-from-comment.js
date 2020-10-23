'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn(
          'comments',
          'text',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'comments',
          'postId',
          { transaction : t }
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
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
        ),
        queryInterface.addColumn(
          'comments',
          'postId',
          {
            type : Sequelize.DataTypes.BIGINT,
            notEmpty : false,
          },
          { transaction : t }
        )
      ])
    })
  }
};
