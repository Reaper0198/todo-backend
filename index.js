// const { toDoList, newId, readFromDatabase, writeToDatabase } = require('./databaseOp.js');
// const express = require('express')

import {getNewId, getToDoList, addToDatabase} from './databaseOp.js';
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/todo', async (req, res) =>{
    // console.log(getToDoList());
    res.send( await getToDoList());
})

app.post('/todo/add', async (req, res) =>{
    const newEntry = req.body;

    const newToDo = {
        id : await getNewId(),
        toDo : newEntry.todo
    }
    await addToDatabase(newToDo);
    res.send(newToDo);


})

app.listen(3000, (err) =>{
    if(err) console.log(err)
        console.log("server running on port 3000...");
})

