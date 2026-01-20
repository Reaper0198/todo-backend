const fs = require('fs')

let toDoList, newId;

function readFromDatabase(){
    fs.readFile('database.json', 'utf-8', (err, data) =>{
        if(err){
            console.log(err);
        } 
        
        toDoList = JSON.parse(data);
        console.log(toDoList);
        newId = parseInt(toDoList.curId);
        
    })
}

function writeToDatabase(){
        fs.writeFile('database.json', JSON.stringify(toDoList), (err) =>{
        if(err){
            console.log("Error Occured!")
        }else{
            res.send(newToDo);
        }
    })
}

function getToDoList(){
    return toDoList;
}

module.exports =  {newId, toDoList, writeToDatabase, readFromDatabase};