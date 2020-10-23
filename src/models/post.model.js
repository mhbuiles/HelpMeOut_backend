module.exports = ( sequelize , DataTypes ) => {
  const postSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE,
    caption : {
         type : DataTypes.STRING(800),
         validate : {
           notEmpty : true,
         },
       },
       image : {
         type : DataTypes.STRING(800),
         validate : {
           notEmpty : true,
         },
       },
  }

  const postOps = {
    timestamps : true,
    tableName : 'posts',
  }

  const Post = sequelize.define( 'Post' , postSchema , postOps );

  Post.associate = ( db ) => {
    db.Post.belongsTo( db.User );
    db.Post.hasMany( db.Comment );
    db.Post.hasMany( db.Like );
  }

  return Post;
}
