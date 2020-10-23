module.exports = ( sequelize , DataTypes ) => {
  const userSchema = {
    id : {
      autoIncrement : true,
      primaryKey : true,
      type : DataTypes.BIGINT,
    },
    name : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    lastName : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    username : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    email : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
        isEmail : true,
      },
    },
    password : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      },
    },
    profilepic : {
      type : DataTypes.STRING(800),
      validate : {
        notEmpty : false,
      },
    },
  };

  const userOps = {
    timestamps : true,
    tableName : 'users',
  };

  const User = sequelize.define( 'User' , userSchema , userOps );

  User.associate = ( db ) => {
    db.User.hasMany( db.Post );
    db.User.hasMany( db.Like );
  }

  return User;
}
