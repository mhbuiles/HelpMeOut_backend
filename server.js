require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const { sequelize } = require( './models' );

const port = process.env.PORT || 8000;
const app = express();
sequelize.sync();

app.use( cors() );
app.use( express.json() );
app.use( morgan('dev') );

app.listen( port , () => {
  console.log( `Server listening on http://localhost:${port}` )
});
