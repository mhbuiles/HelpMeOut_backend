const router = require( 'express' ).Router();
const chatController = require( '../controllers/chat.controller' );
const { auth } = require('../utils/middlewares');

router.route( '/' ).get( auth , chatController.list );

module.exports = router;
