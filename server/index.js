const express = require('express'); 
const app = express(); 
const cors = require("cors"); 
const pool = require("./db"); 

//Middleware
app.use(cors()); 
app.use(express.json()); 

//ROUTES

//Creating 

app.post("/test", async (req,res) => {
    try {
        const {description} = req.body; 
        const newTest = await pool.query(
            "INSERT INTO test (test) VALUES($1)", 
            [description]

        ); 
        res.json(newTest); 
    } catch (err) {
        console.error(err.message); 
    }
}); 

app.listen(5000, () => {
    console.log("Server has started on port 5000");
}); 