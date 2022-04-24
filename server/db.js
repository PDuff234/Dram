const Pool = require('pg').Pool; 

const pool = new Pool({
    user: "postgres", 
    password: "postgres", 
    host: "bar-project.c7bm0qevzxgt.us-east-1.rds.amazonaws.com", 
    port: "5430", 
    database: "barProject"
}); 

//Testing code to see if we can get a response from server
//Syntax to run: node dj.js in server folder
pool.connect(); 

pool.query('Select * from Orders', (err, res) => {
    if (!err) {
        console.log(res.rows); 
    } else {
        console.log(err.message); 
    }
    pool.end; 
})

module.exports = pool; 