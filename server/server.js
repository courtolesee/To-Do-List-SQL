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
    database: 'weekend-to-do-app',
    host: 'localhost',
    PORT: 5432,
    max: 12,
    idleTimeoutMillis: 30000
}); 

pool.on('connect', ()=>{
    console.log( 'connected to db' );
})

// globals
const PORT = process.env.PORT || 5001;

// server up
app.listen( PORT, ()=>{
    console.log( 'server up on:', PORT );
}) //end server up  


// routes
app.get('/task', (req,res)=>{
    let queryText = 'SELECT * FROM "todo";';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('ERROR GETTING TASK------->', error);
      res.sendStatus(500);
    });
  });

app.post('/task', (req,res)=>{
    let newTask = req.body;
    console.log('adding task', newTask);
    let queryText = `INSERT INTO "todo"("task", "description", "completed") 
    VALUES( $1, $2, $3);`;
    pool.query(queryText, [newTask.task, newTask.description, newTask.completed])
    .then(result =>{
      res.sendStatus(201);
    }).catch(error => {
      console.log('ERROR ADDING NEW TASK------->', error);
      res.sendStatus(500);
    });
  });

app.put('/task/:id', (req, res) => {
    let id = [req.params.id];
    let sqlText = `UPDATE "todo" SET completed = 'true' WHERE id = $1;`;
    console.log('task to complete:', id);
    pool.query(sqlText, id).then(response =>{
    res.sendStatus(200);
    }).catch(error => {
    console.log('ERROR WITH TASK COMPLETION------->', error);
    res.sendStatus(400);
    });
});

app.delete( '/task/:id', (req, res)=>{
    console.log('DELETE hit id =', req.params.id);
    let queryString = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryString, [req.params.id]).then(result =>{
        res.sendStatus(200);
    }).catch(error=>{
        console.log('ERROR DELETING TASK------->', error);
        res.sendStatus(400);
    });
});