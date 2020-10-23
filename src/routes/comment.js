const router = require( 'express' ).Router();
const commentController = require( '../controllers/comment.controller' );
const { auth } = require('../utils/middlewares');

router.route( '/' ).get( auth , commentController.list );
router.route( '/:id' ).post( auth , commentController.create );
router.route( '/:id' ).get( auth , commentController.show );
// router.route( '/:id' ).put( likeController.update );
// router.route( '/:id' ).delete( likeController.delete );

module.exports = router;
