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

export {addToDatabase, getToDoList, getNewId};