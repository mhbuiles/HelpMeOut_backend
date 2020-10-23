module.exports = ( sequelize , DataTypes ) => {
  const likeSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
  }

  const likeOps = {
    timestamps : true,
    tableName : 'likes',
  }

  const Like = sequelize.define( 'Like' , likeSchema , likeOps );

  Like.associate = ( db ) => {
    db.Like.belongsTo( db.User );
    db.Like.belongsTo( db.Post );
  }

  return Like;
}
