# SQL To-Do List

## Description
Duration: 2 days

This is Courtney Olesee's full stack To Do List App for Weekend Challenge #3 of Tier 2 in Prime's Trifid Cohort. To use, follow the install instructions below, then input a task name, the description of the task, if it's completed (true or false), and push the add task button. Once the task is completed, push the completed button and the task will change colors, fading to the background and highlighting any incompleted tasks remaining. To get any task (completed or not) completely off the list, push the delete button. All entered tasks are stored in the weekend-to-do-app database. Once the completed button has been pressed, it turns to true in the database. All deleted tasks are deleted from the database permanently. 

## Install

To install this app, go to the to_do.sql file. Create a database on localhost called weekend-to-do-app. Copy and paste the CREATE TABLE (lines 1-6), and execute the query in Postico. Copy, paste, and execute the INSERT INTO lines to get a table and database started. Open up the server.js file, and follow the prompts (lines 1-4) to init and install express and pg. Make sure the package.json has "start": "node server/server.js" under scripts. To spin up the server, type npm start in terminal. Go to localhost:5001/ in a browser to begin use of the To Do List. 

## Built With

The full stack! Javascript, jQuery, HTML, CSS, AJAX, Node, Express, Postgres.
