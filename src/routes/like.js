const router = require( 'express' ).Router();
const likeController = require( '../controllers/like.controller' );
const { auth } = require('../utils/middlewares');

router.route( '/' ).get( auth , likeController.list );
router.route( '/' ).post( auth , likeController.create );
router.route( '/:id' ).get( auth , likeController.show );
// router.route( '/:id' ).put( likeController.update );
// router.route( '/:id' ).delete( likeController.delete );

module.exports = router;
