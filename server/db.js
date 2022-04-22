const Pool = require('pg').Pool; 

const pool = new Pool({
    user: "postgres", 
    password: "postgres", 
    host: "bar-project.c7bm0qevzxgt.us-east-1.rds.amazonaws.com", 
    port: "5430", 
    database: "barProject"
}); 

module.exports = pool; 