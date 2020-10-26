require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const { sequelize } = require( './src/models' );
const userRouter = require( './src/routes/user' );
const postRouter = require( './src/routes/post' );
const likeRouter = require( './src/routes/like' );
const commentRouter = require( './src/routes/comment' );
const socketIO = require('socket.io');
const http = require('http');

const { addUser , removeUser , getUser , getUsersInRoom } = require('./users.js');

const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer( app );
const io = socketIO( server );
sequelize.sync(  );

io.on( 'connection' , ( socket ) => {
  console.log( 'We have a new connection!!' );

  socket.on( 'join' , ( { name , room } , callback ) => {
    const { error , user } = addUser( { id : socket.id , name , room} );

    if( error ) return callback( error );

    socket.join( user.room );
    callback();
  });

  // socket.on( 'sendMessage' , ( message , callback ) => {
  //   const user = getUser( socket.id );
  //
  //   io.to( user.room ).emit( 'message' , { text : message });
  //   callback();
  //
  // });

  socket.on( 'disconnect' , () => {
    console.log( 'User has left!!' );
  });
});

app.use( cors() );
app.use( express.json() );
app.use( morgan('dev') );

app.use( '/users' , userRouter );
app.use( '/posts' , postRouter );
app.use( '/likes' , likeRouter );
app.use( '/comments' , commentRouter );

server.listen( port , () => {
  console.log( `Server listening on http://localhost:${port}` )
});
