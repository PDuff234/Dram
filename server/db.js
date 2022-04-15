const Pool = require('pg').Pool; 

const pool = new Pool({
    user: "postgres", 
    password: "postgres", 
    host: "54.173.239.146", 
    port: "5432", 
    database: "postgres"
}); 

module.exports = pool; 