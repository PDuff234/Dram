const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//const { pipeline } = require("stream");


//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//get all drinks
app.get("/menu", async(req, res) => {
    try {
        const allDrinks = await pool.query("SELECT Name, Description, Price FROM Cocktails");
        res.json(allDrinks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get specific drink
app.get("/menu/:name", async(req, res) => {
    try {
         const { name } = req.params;
         const drink = await pool.query(
             "SELECT Name, Description, Price FROM Cocktails WHERE Name = $1",
             [name]
        );
        
        res.json(drink.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all inventory
app.get("/inventory", async(req, res) => {
    try {
        const inventory = await pool.query("SELECT Name, Quantity, Type FROM Inventory ORDER BY Type");

        res.json(inventory.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all customers
app.get("/customers", async(req, res) => {
    try {
        const customers = await pool.query("SELECT * FROM Customers");

        res.json(customers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all employees
app.get("/employees", async(req, res) => {
    try {
        const employees = await pool.query("SELECT EmployeeID, Title, Fname, Lname, Password FROM Employees");

        res.json(employees.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all orders
app.get("/orders", async(req, res) => {
    try {
        const orders = await pool.query(
            "SELECT TransactionID, Customer, Cocktail, Instructions FROM (SELECT * FROM Orders) AS o INNER JOIN Cocktails AS c ON o.cocktail = c.name"
        );

        res.json(orders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unserved orders
app.get("/orders/open", async(req, res) => {
    try {
        const orders = await pool.query(
            "SELECT TransactionID, Customer, Cocktail, Instructions FROM (SELECT * FROM Orders WHERE HasBeenServed = 'N') AS o INNER JOIN Cocktails AS c ON o.cocktail = c.name"
        );

        res.json(orders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get supplies
app.get("/supplies", async(req, res) => {
    try {
        const supplies = await pool.query("SELECT * FROM Supplies Order By SupplierName, Price");

        res.json(supplies.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get supplies orders
app.get("/supplies/orders", async(req, res) => {
    try {
        const suppliesorders = await pool.query("SELECT TransactionID, ItemOrdered, OrderedBy, SupplierName, Quantity, Total, DateOrdered FROM SuppliesOrders Order By DateOrdered");

        res.json(suppliesorders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//register user
app.post("/register", async(req, res) => {
    try {
        const { fname, lname, username, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO Customers (Fname, Lname, Username, Password) VALUES ($1, $2, $3, $4)",
            [fname, lname, username, password]
        );
        
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
    }
});

//create an order
app.post("/makeOrder", async(req, res) => {
    try {
        const { customer, cocktail, total } = req.body;
        const order = [customer, cocktail, total];
        const newOrder = await pool.query(
            "INSERT INTO Orders (Customer, Cocktail, Total) VALUES($1, $2, $3)",
            order
        );

        res.json(newOrder);
    } catch (err) {
        console.error(err.message);
    }
});

/*
//update order when served
app.put("/order/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { servedBy } = req.body;
        const updateOrder = await pool.query(
            "UPDATE Orders SET hasbeenserved = $1, ServedBy = $2 WHERE TransactionID = $3",
            ["Y", servedBy, id]
        );

        res.json(updateOrder);
    } catch (err) {
        console.error(err.message);
    }
});
*/

//update order when served
app.put("/order/id", async(req, res) => {
    try {
        const { transactionID, servedBy } = req.body;
        const userInput = [transactionID, servedBy]
        console.log(JSON.stringify(userInput)); 
        const updateOrder = await pool.query(
            "UPDATE Orders SET hasbeenserved = 'Y', servedBy = $1 WHERE TransactionID = $2",
            userInput
        );

        res.json(updateOrder);
    } catch (err) {
        console.error(err.message);
    }
});

//customer login verification
app.post("/login/customer", async(req, res) => {
    try {
        const { username, password } = req.body;
        const userInput = [username, password];
        const verifyLogin = await pool.query(
            "SELECT Count(*) FROM customers WHERE username = $1 and password = $2;",
            userInput
        );
        if(verifyLogin.rows[0].count == 1){
            res.status(200).send("OK");
        } 
        else{
            res.status(400).send("Not valid credentials");
        }
    } catch (err) {
        console.error(err.message);
    }
});


//employee login verification
app.post("/login/manager", async(req, res) => {
    try {
        const { id, password} = req.body;
        const userInput = [id, password];
        const verifyLogin = await pool.query(
            "SELECT title FROM employees WHERE employeeid = $1 and password = $2;",
            userInput
        );
        console.log(verifyLogin.rows[0].title);
        let result = (verifyLogin.rows[0].title).toLowerCase();
        if(result == 'm'){
            console.log("Manager logged in");
            res.status(200).send("OK");
        } 
        else{
            console.log("Manager didn't log in");
            res.status(400).send("Not valid credentials");
        }
    } catch (err) {
        console.error(err.message);
    }
});

//employee login verification
app.post("/login/bartender", async(req, res) => {
    try {
        const { id, password} = req.body;
        const userInput = [id, password];
        const verifyLogin = await pool.query(
            "SELECT Count(*) FROM employees WHERE employeeid = $1 and password = $2;",
            userInput
        );
        console.log(verifyLogin.rows[0].count);
        if(verifyLogin.rows[0].count == 1){
            console.log("Employee logged in");
            res.status(200).send("OK");
        } 
        else{
            console.log("Employee didn't log in");
            res.status(400).send("Not valid credentials");
        }
    } catch (err) {
        console.error(err.message);
    }
});



//add items to inventory
app.post("/inventory/add", async(req, res) => {
    try {
        const { name, amount } = req.body;
        const addInv = await pool.query(
            "SELECT addInv($1, $2)",
            [name, amount]
        );

        res.status(200).send("OK");
    } catch (err) {
        console.error(err.message);
    }
});

//subtract items from inventory
app.post("/inventory/sub", async(req, res) => {
    try {
        const { name, amount } = req.body;
        const subInv = await pool.query(
            "SELECT subInv($1, $2)",
            [name, amount]
        );

        res.status(200).send("OK");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});