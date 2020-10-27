const { Post } = require( '../models' );
const { User } = require( '../models' );
const { Like } = require( '../models' );
const { Comment } = require( '../models' );
const { Chat } = require( '../models' );
const { Message } = require( '../models' );
const { Op } = require("sequelize");

module.exports = {
  async list( req , res ) {
    try{

      const chats = await Chat.findAll( { where : { [Op.or] : [ { senderId : req.user } , { receiverId : req.user } ] } } );

      res.status( 200 ).json( chats );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
 },
  async create( req , res ) {
    try {

      const { id } = req.params;
      const user = await User.findByPk( req.user );
      const post = await Post.findByPk( id );

      const comment = await Comment.create( req.body );
      await comment.setUser( user.id );
      await comment.setPost( post.id );

      await comment.save( { validateBeforeSave : false } );

      res.status( 200 ).json( comment );
    } catch(err) {
      console.log(err);
      res.status( 400 ).json( err )
    }
  },
  async show( req , res ) {
    try{
      const { id } = req.params;

      const like = await Like.findByPk( id );

      res.status( 200 ).json( like );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
}
