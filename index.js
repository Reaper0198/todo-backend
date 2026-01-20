const fs = require('fs')
const database = require('./database.json');
const express = require('express')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let toDoList, newId;
fs.readFile('database.json', 'utf-8', (err, data) =>{
    if(err){
        console.log(err);
    } 
    
    toDoList = JSON.parse(data);
    newId = parseInt(toDoList.curId);
    
})


app.get('/todo', (req, res) =>{
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

    fs.writeFile('database.json', JSON.stringify(toDoList), (err) =>{
        if(err){
            console.log("Error Occured!")
        }else{
            res.send(newToDo);
        }
    })
})

app.listen(3000, (err) =>{
    if(err) console.log(err)
        console.log("server running on port 3000...");
})

