const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');
const app = require('../server');
const { response } = require('../server');

//minions routes
apiRouter
.route('/minions')
.get((req,res) => {res.send(db.getAllFromDatabase('minions'));})//get all minions
.post(bodyParser.json(),(req,res) =>{
    db.addToDatabase('minions', req.body);
    res.sendStatus(201);
});

apiRouter
.route('/minions/:minionId')
.get((req,res) => {
    if (isNaN(req.params.minionId)){
        res.sendStatus(404);
    }else if(db.getFromDatabaseById('minions',req.params.minionId) == null){
        res.sendStatus(404);
    }else{
    res.send(db.getFromDatabaseById('minions',req.params.minionId));}
})
.put(bodyParser.json() ,(req,res) => {
    if (isNaN(req.params.minionId)){
        res.sendStatus(404);
    }else if(db.getFromDatabaseById('minions',req.params.minionId) == null){
        res.sendStatus(404);
    } else{
    db.updateInstanceInDatabase('minions', req.body);
    res.status(200).send(db.getFromDatabaseById('minions',req.params.minionId))};
})
.delete((req,res) => {
    if (isNaN(req.params.minionId)){
        res.sendStatus(404);
    }else if(db.getFromDatabaseById('minions',req.params.minionId) == null){
        res.sendStatus(404);
    } else{
    db.deleteFromDatabasebyId('minions', req.params.minionId);
    res.sendStatus(204);}
});

//ideas routes
apiRouter
.route('/ideas')
.get((req,res) => {res.send(db.getAllFromDatabase('ideas'));})//get all ideas
.post(bodyParser.json(),(req,res) =>{
    db.addToDatabase('ideas', req.body);
    res.sendStatus(201);
});

apiRouter
.route('/ideas/:ideaId')
.get((req,res) => {res.send(db.getFromDatabaseById('ideas',req.params.ideaId));})
.put(bodyParser.json() ,(req,res) => {
    db.updateInstanceInDatabase('ideas', req.body);
    res.sendStatus(200);
})
.delete((req,res) => {
    db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.sendStatus(200);
});

//meetings routes
apiRouter
.route('/meetings')
.get((req,res) => {res.send(db.getAllFromDatabase('meetings'));})//get all meetings
.post((req,res) => {
    db.addToDatabase('meetings',db.createMeeting());
    res.sendStatus(201);
})
.delete((req,res) => {
    db.deleteAllFromDatabase('meetings');
    res.sendStatus(200);
});

module.exports = apiRouter;


/*
/api/minions

GET /api/minions to get an array of all minions. D 
POST /api/minions to create a new minion and save it to the database. D
GET /api/minions/:minionId to get a single minion by id. D 
non numeric id check, invalid id check D
PUT /api/minions/:minionId to update a single minion by id. D
need to return updated minion, non numeric id, invalid id D
DELETE /api/minions/:minionId to delete a single minion by id. D
non numeric id, invalid id

/api/ideas

GET /api/ideas to get an array of all ideas. D
POST /api/ideas to create a new idea and save it to the database. D
GET /api/ideas/:ideaId to get a single idea by id. D
PUT /api/ideas/:ideaId to update a single idea by id. D
DELETE /api/ideas/:ideaId to delete a single idea by id. D

/api/meetings

GET /api/meetings to get an array of all meetings. D
POST /api/meetings to create a new meeting and save it to the database.D
DELETE /api/meetings to delete all meetings from the database. D
*/