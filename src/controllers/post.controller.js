const { Post } = require( '../models' );
const { User } = require( '../models' );
const { Like } = require( '../models' );
const { Comment } = require( '../models' );

module.exports = {
   async list( req , res ) {
     try{
       const posts = await Post.scope( { include : [ Like , Comment , User ] } ).findAll(  );
       res.status( 200 ).json( posts );
     } catch( err ) {
       res.status( 400 ).json( { message : err.message } );
     }
  },
  async list2( req , res ) {
    try{
      const user = await User.findByPk( req.user );
      const posts = await Post.scope( { include : [ Comment , Like ] } ).findAll( { where : { UserId : user.id } } );

      res.status( 200 ).json(posts)
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
 },
  async create( req , res ) {
    try {
      const { file = {} , ...data } = req.body;
      const user = await User.findByPk( req.user );

      const post = await Post.create( { ...data , image : file.secure_url } );
      await post.setUser( user.id );

      await post.save( { validateBeforeSave : false } );

      res.status( 200 ).json( post )
    } catch(err) {
      res.status( 400 ).json( err )
    }
  },
  async show( req , res ) {
    try{
      const { id } = req.params;

      const post = await Post.scope( { include : [ Like , Comment , User ] } ).findByPk( id );

      res.status( 200 ).json( post );
    } catch( err ) {
      res.status( 400 ).json( { message : err.message } );
    }
  },
  update(req, res) {
    const { id } = req.params;
    const data = req.body;

    Post
      .findByIdAndUpdate(id, data, { new: true })
      .then(product => res.status(200).json(product))
      .catch(err => res.status(400).json(err));
  },
  delete(req, res) {
    const { id } = req.params;

    Post
      .findByIdAndDelete(id)
      .then(product => res.status(200).json(product))
      .catch(() => res.status(400).json({ message: `Could not find product with id ${id}` }));
  }
}
