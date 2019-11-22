// to start:
// npm init --yes
// git init
// npm install express pg

// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pg = require( 'pg' );

// uses
app.use( express.static( 'server/public' ) ) ;
app.use( bodyParser.urlencoded( { extended: true } ) );

// db stuff
const Pool = pg.Pool;
const pool = new Pool({
    database: '',
    host: '',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
}); // end pool

pool.on('connect', ()=>{
    console.log( 'connected to db' );
})

// globals
const port = 5001;

// server up
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) //end server up  

// routes