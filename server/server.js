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
}); // end pool

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
      console.log('error getting tasks', error);
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
      console.log('error adding new task', error);
      res.sendStatus(500);
    });
  });

app.put('/task/:id', (req, res) => {
    // let task = req.body;
    let id = [req.params.id];
    // let completed = task.completed
    let sqlText = `UPDATE "todo" SET completed = 'true' WHERE id = $1;`;
    console.log('task to complete:', id);
    //     if (completed === 'false'){
    //         sqlText = `UPDATE "todo" SET completed = 'true' WHERE id = $1`;
    //     } else if (completed === 'true'){
    //         sqlText = `UPDATE "todo" SET completed = 'false' WHERE id = $1`;
    // }
    pool.query(sqlText, id).then(response =>{
    res.sendStatus(200);
    }).catch(error => {
    console.log('ERROR WITH TASK COMPLETION', error);
    res.sendStatus(400);
    });
});