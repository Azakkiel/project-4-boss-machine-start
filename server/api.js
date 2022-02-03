const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');
//minions routes
apiRouter
.route('/minions')
.get((req,res) => {res.send(db.getAllFromDatabase('minions'));})//get all minions
.post((req,res) =>{});

apiRouter
.route('/minions/:minionId')
.get((req,res) => {res.send(db.getFromDatabaseById('minions',req.params.minionId));})
.put((req,res) => {})
.delete((req,res) => {
    db.deleteFromDatabasebyId('minions', req.params.minionId);
    res.sendStatus(200);
});

//ideas routes
apiRouter
.route('/ideas')
.get((req,res) => {res.send(db.getAllFromDatabase('ideas'));})//get all ideas
.post((req,res) =>{});

apiRouter
.route('/ideas/:ideaId')
.get((req,res) => {res.send(db.getFromDatabaseById('ideas',req.params.ideaId));})
.put((req,res) => {})
.delete((req,res) => {
    db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.sendStatus(200);
});

//meetings routes
apiRouter
.route('/meetings')
.get((req,res) => {res.send(db.getAllFromDatabase('meetings'));})//get all meetings
.post((req,res) => {})
.delete((req,res) => {
    db.deleteAllFromDatabase('meetings');
    res.sendStatus(200);
});

module.exports = apiRouter;


/*
/api/minions

GET /api/minions to get an array of all minions. D 
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id. D
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id. D

/api/ideas

GET /api/ideas to get an array of all ideas. D
POST /api/ideas to create a new idea and save it to the database.
GET /api/ideas/:ideaId to get a single idea by id. D
PUT /api/ideas/:ideaId to update a single idea by id.
DELETE /api/ideas/:ideaId to delete a single idea by id. D

/api/meetings

GET /api/meetings to get an array of all meetings. D
POST /api/meetings to create a new meeting and save it to the database.
DELETE /api/meetings to delete all meetings from the database. D
*/