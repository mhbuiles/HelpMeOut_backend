'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'chats',
          'senderId',
          {
            type : Sequelize.DataTypes.STRING,
            validate : {
              notEmpty : true,
            },
          },
          { transaction : t }
        ),
        queryInterface.addColumn(
          'chats',
          'receiverId',
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
          'senderId',
          { transaction : t }
        ),
        queryInterface.removeColumn(
          'chats',
          'receiverId',
          { transaction : t }
        )
      ])
    })
  }
};
