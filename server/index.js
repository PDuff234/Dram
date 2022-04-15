const express = require('express'); 
const app = express(); 
const cors = require("cors"); 
const pool = require("./db"); 

//Middleware
app.use(cors()); 
app.use(express.json()); 

//ROUTES

//Creating 

app.post("/todos", async (req,res) => {
    try {
        const {description} = req.body; 
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1)", 
            [description]
        ); 

        res.json(newTodo); 
    } catch (err) {
        console.error(err.message); 
    }
}); 





app.listen(3001, () => {
    console.log("Server has started on port 3001");
}); 