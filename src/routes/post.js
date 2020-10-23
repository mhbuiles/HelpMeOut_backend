const router = require( 'express' ).Router();
const postController = require( '../controllers/post.controller' );
const { formData } = require('../utils/middlewares');
const { auth } = require('../utils/middlewares');

router.route( '/' ).get( postController.list );
router.route( '/myposts' ).get( auth , postController.list2 );
router.route( '/' ).post( auth , formData , postController.create );
router.route( '/:id' ).get( auth , postController.show );
router.route( '/:id' ).put( postController.update );
router.route( '/:id' ).delete( postController.delete );

module.exports = router;
