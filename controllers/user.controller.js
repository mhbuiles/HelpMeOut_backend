const { User } = require( './models' );

module.exports = {
  async list( req , res ) {
    const users = await User.findAll();
    res.status( 200 ).json( users );
  }
}
