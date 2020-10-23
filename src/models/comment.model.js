module.exports = ( sequelize , DataTypes ) => {
  const commentSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    text : {
      type : DataTypes.STRING(400),
      validate : {
        notEmpty : true,
      },
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
  }

  const commentOps = {
    timestamps : true,
    tableName : 'comments',
  }

  const Comment = sequelize.define( 'Comment' , commentSchema , commentOps );

  Comment.associate = ( db ) => {
    db.Comment.belongsTo( db.Post );
    db.Comment.belongsTo( db.User );
  }

  return Comment;
}
