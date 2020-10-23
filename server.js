require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const { sequelize } = require( './src/models' );
const userRouter = require( './src/routes/user' );
const postRouter = require( './src/routes/post' );
const likeRouter = require( './src/routes/like' );
const commentRouter = require( './src/routes/comment' );

const port = process.env.PORT || 8000;
const app = express();
sequelize.sync(  );

app.use( cors() );
app.use( express.json() );
app.use( morgan('dev') );

app.use( '/users' , userRouter );
app.use( '/posts' , postRouter );
app.use( '/likes' , likeRouter );
app.use( '/comments' , commentRouter );

app.listen( port , () => {
  console.log( `Server listening on http://localhost:${port}` )
});
