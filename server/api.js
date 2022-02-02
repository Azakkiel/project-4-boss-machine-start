const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const getAllFromDatabase = 
//minions routes
apiRouter
.route('/minions')
.get((req,res) => {
    res.send(db.getAllFromDatabase('minions'));
})
.post((req,res) =>{});

apiRouter
.route('/minions/:minionId')
.get((req,res) => {})
.put((req,res) => {})
.delete((req,res) => {});

//ideas routes
apiRouter
.route('/ideas')
.get((req,res) => {
    res.send(db.getAllFromDatabase('ideas'));
})
.post((req,res) =>{});

apiRouter
.route('/ideas/:ideaId')
.get((req,res) => {})
.put((req,res) => {})
.delete((req,res) => {});

//meetings routes
apiRouter
.route('/meetings')
.get((req,res) => {
    res.send(db.getAllFromDatabase('meetings'));
})
.post((req,res) => {})
.delete((req,res) => {});

module.exports = apiRouter;
