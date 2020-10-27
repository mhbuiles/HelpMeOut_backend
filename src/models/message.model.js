module.exports = ( sequelize , DataTypes ) => {
  const messageSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    origin : DataTypes.STRING,
    text : {
      type : DataTypes.STRING(400),
      validate : {
        notEmpty : true,
      },
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
  }

  const messageOps = {
    timestamps : true,
    tableName : 'messages',
  }

  const Message = sequelize.define( 'Message' , messageSchema , messageOps );

  Message.associate = ( db ) => {
    db.Message.belongsTo( db.Chat );
  }

  return Message;
}
