const { toDoList, newId, readFromDatabase, writeToDatabase } = require('./databaseOp.js');
const express = require('express')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/todo', (req, res) =>{
    readFromDatabase();
    console.log(toDoList);
    res.send(toDoList);
})

app.post('/todo/add', (req, res) =>{
    const newEntry = req.body;

    const newToDo = {
        id : newId,
        toDo : newEntry.todo
    }
    newId++;
    toDoList.curId = newId;
    toDoList.List.push(newToDo);

    writeToDatabase();

})

app.listen(3000, (err) =>{
    if(err) console.log(err)
        console.log("server running on port 3000...");
})

