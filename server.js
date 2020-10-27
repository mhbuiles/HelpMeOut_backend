require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const { sequelize } = require( './src/models' );
const userRouter = require( './src/routes/user' );
const postRouter = require( './src/routes/post' );
const likeRouter = require( './src/routes/like' );
const commentRouter = require( './src/routes/comment' );
const chatRouter = require( './src/routes/chat' );
const socketIO = require('socket.io');
const http = require('http');
const { Chat } = require( './src/models' );
const { Message } = require( './src/models' );

const { addUser , removeUser , getUser , getUsersInRoom } = require('./users.js');

const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer( app );
const io = socketIO( server );
sequelize.sync(  );

io.on( 'connection' , ( socket ) => {
  console.log( 'We have a new connection!!' );

  socket.on( 'join room' , async ( roomName ) => {
    const chat = await Chat.scope( { include : [ Message ] } ).findOne( { where : { roomName } } );
    socket.join( `${chat.roomName}` );
    socket.emit( 'chatDB' , chat );
  });

  socket.on( 'create room' , async ( participants ) => {
    const roomNameF = `chat-${participants.senderId}-${participants.receiverId}`;

    const { roomName , id } = await Chat.create( { isConnected : true , roomName : roomNameF , senderId : participants.senderId , receiverId : participants.receiverId } );
    socket.join( `${roomName}` );
    socket.emit( 'chatId' , { id , roomName } );
  });

  socket.on( 'sendMessage' , async ( data ) => {
    const message = {
      origin : data.origin,
      text : data.text,
    };
    const newMessage = await Message.create( message );
    await newMessage.setChat( data.chatId );
    await newMessage.save( { validateBeforeSave : false } );

    io.in( `${data.roomName}` ).emit( 'message' , newMessage );
  });

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
app.use( '/chats' , chatRouter );

server.listen( port , () => {
  console.log( `Server listening on http://localhost:${port}` )
});
