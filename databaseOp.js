// const fs = require('fs')
import fs from 'fs/promises';

async function readFromDatabase(){
    const data = await fs.readFile('database.json', 'utf-8')

    return JSON.parse(data);
}

async function writeToDatabase(databaseObj){
    await fs.writeFile('database.json', JSON.stringify(databaseObj, null, 4))
}

async function addToDatabase(newToDo){
    let databaseObj = await readFromDatabase();

    databaseObj.list.push(newToDo)
    databaseObj.curId++;
    await writeToDatabase(databaseObj);
}

async function getToDoList(){
    const databaseObj = await readFromDatabase();
    console.log(databaseObj);
    return databaseObj.list;
}

async function getNewId(){
    const databaseObj = await readFromDatabase();
    return databaseObj.curId;
}

async function updateDatabase(updatedEntry) {
    let databaseObj = await readFromDatabase();

    databaseObj.list.forEach(task => {
        if(task.id === parseInt(updatedEntry.id)){
            task.toDo = updatedEntry.newToDo;
        }
    })

    await writeToDatabase(databaseObj);
}

async function deleteFromDatabase(deleteThis){
    let databaseObj = await readFromDatabase();

    databaseObj.list = databaseObj.list.filter(task => parseInt(deleteThis.id) !== task.id);

    await writeToDatabase(databaseObj);
}

export {addToDatabase, getToDoList, getNewId, updateDatabase, deleteFromDatabase};