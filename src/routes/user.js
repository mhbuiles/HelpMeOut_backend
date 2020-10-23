const router = require( 'express' ).Router();
const userController = require( '../controllers/user.controller' );
const { formData } = require('../utils/middlewares');
const { auth } = require('../utils/middlewares');

router.route( '/' ).get( userController.list );
router.route( '/signup' ).post( formData , userController.create );
router.route( '/:username' ).get( auth , userController.show );
router.route( '/:id' ).put( userController.update );
router.route( '/:id' ).delete( userController.delete );
router.route( '/signin' ).post( userController.signin );

module.exports = router;
