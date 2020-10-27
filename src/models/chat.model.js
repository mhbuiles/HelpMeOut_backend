module.exports = ( sequelize , DataTypes ) => {
  const chatSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    senderId : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    receiverId : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    isConnected : DataTypes.BOOLEAN,
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
    roomName : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
  }

  const chatOps = {
    timestamps : true,
    tableName : 'chats',
  }

  const Chat = sequelize.define( 'Chat' , chatSchema , chatOps );

  Chat.associate = ( db ) => {
    db.Chat.hasMany( db.Message );
  }

  return Chat;
}
