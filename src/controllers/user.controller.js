const { User } = require( '../models' );
const { Post } = require( '../models' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const { Op } = require("sequelize");
const { transporter , welcome } = require('../utils/mailer');

module.exports = {
  async list( req , res ) {
    try {
      const users = await User.findAll();
      res.status( 200 ).json( users );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
  async create( req , res ) {
    try {

      const { file = {} , password , ...data } = req.body;
      const { name , email } = req.body;
      const encryptedPassword = await bcrypt.hash( password , 8 );
      const user = await User.create( { ...data , profilepic : file.secure_url , password : encryptedPassword } );

      const mail = {
        from : `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
        to : email,
        subject : 'Welcome to Help Me Out!',
        ...welcome(name)
      }

      await transporter.sendMail(mail);

      const token = jwt.sign(
        { id : user.id },
        process.env.SECRET,
        { expiresIn : 60 * 60 * 24 * 365 }
      );

      res.status( 200 ).json( { token , user } );
    } catch( err ) {
      console.log(err);
      res.status( 400 ).json( { message : err.message } );
    }
  },
  async show( req , res ) {
    try {
      const { username } = req.params;
      const user = await User.scope( { include : [ Post ] } ).findOne( { where : { [Op.or] : [ { username } , { name : username } ] } } );

      res.status( 200 ).json( user );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
  async update( req , res ) {
    try {
      const { id } = req.params;
      let user = await User.findByPk( id );
      user = await user.update( req.body );
      res.status( 200 ).json( user );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
  async delete( req , res ) {
    try {
      const user = await User.findByPk( req.user );
      await user.destroy();
      res.status( 200 ).json ( user );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
  async signin( req , res ) {
    try {
      const { email , password } = req.body;
      const user = await User.findOne( { where : { email } } );

      if( !user ) {
        throw Error( 'User does not exist' );
      }

      const isValid = await bcrypt.compare( password , user.password );

      if( !isValid ) {
        throw Error( 'Wrong username or password' );
      }

      const token = jwt.sign(
        { id : user.id },
        process.env.SECRET,
        { expiresIn : 60 * 60 * 24 * 365 }
      );

      res.status( 200 ).json( { token , user } );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  }
}
