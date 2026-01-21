import {getNewId, getToDoList, addToDatabase, updateDatabase, deleteFromDatabase} from './databaseOp.js';
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

app.put("/todo/update", async (req, res) =>{
    try{
        const updatedEntry = req.body;
    
        await updateDatabase(updatedEntry);

        res.status(200).send(updatedEntry)

    }catch(err){
        console.log(err);
    }
})

app.delete('/todo/delete', async (req, res) => {
    const deleteThis = req.body;

    try{
        await deleteFromDatabase(deleteThis);

        res.status(200).send({
            "Status" : "200",
            "message" : "Deleted ToDo"
        })
    }catch(err){
        console.log(err);
    }

})

app.listen(3000, (err) =>{
    if(err) console.log(err)
        console.log("server running on port 3000...");
})

