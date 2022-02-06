const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');
const app = require('../server');
const { response } = require('../server');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

function checkMinionId (req, res, next) {
    if (isNaN(req.params.minionId)){
        res.sendStatus(404);
    }else if(db.getFromDatabaseById('minions',req.params.minionId) == null){
        res.sendStatus(404);
    };
    next();
};
function checkIdeaId (req, res, next) {
    if (isNaN(req.params.ideaId)){
        res.sendStatus(404);
    }else if(db.getFromDatabaseById('ideas',req.params.ideaId) == null){
        res.sendStatus(404);
    };
    next();
};


//minions routes
apiRouter
.route('/minions')
.get((req,res) => {res.send(db.getAllFromDatabase('minions'));})//get all minions
.post(bodyParser.json(),(req,res) =>{
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

apiRouter
.route('/minions/:minionId')
.get(checkMinionId, (req,res) => {
    res.send(db.getFromDatabaseById('minions',req.params.minionId));
})
.put(bodyParser.json(), checkMinionId ,(req,res) => {
    let updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
})
.delete(checkMinionId, (req,res) => {
    db.deleteFromDatabasebyId('minions', req.params.minionId);
    res.sendStatus(204);
});

//ideas routes
apiRouter
.route('/ideas')
.get((req,res) => {res.send(db.getAllFromDatabase('ideas'));})//get all ideas
.post(bodyParser.json(),checkMillionDollarIdea,(req,res) =>{
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

apiRouter
.route('/ideas/:ideaId')
.get(checkIdeaId,(req,res) => {res.send(db.getFromDatabaseById('ideas',req.params.ideaId));})
.put(bodyParser.json(), checkIdeaId ,checkMillionDollarIdea,(req,res) => {
    let updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
})
.delete(checkIdeaId, (req,res) => {
    db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.sendStatus(204);
});

//meetings routes
apiRouter
.route('/meetings')
.get((req,res) => {res.send(db.getAllFromDatabase('meetings'));})//get all meetings
.post((req,res) => {
    res.status(201).send(db.addToDatabase('meetings',db.createMeeting()));
})
.delete((req,res) => {
    db.deleteAllFromDatabase('meetings');
    res.sendStatus(204);
});

module.exports = apiRouter;
