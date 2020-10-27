'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'chats',
          'roomName',
          {
            type : Sequelize.DataTypes.STRING,
            validate : {
              notEmpty : true,
            },
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
          'chats',
          'roomName',
          { transaction : t }
        )
      ])
    })
  }
};
