const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const getAllFromDatabase = 
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
