const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

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
        const inventory = await pool.query("SELECT Type, Name, Quantity FROM Inventory ORDER BY Type");

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
            "SELECT * FROM Orders"
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

//Register user
app.post("/register", async(req, res) => {
    try {

        console.log("Yeet");
        console.log(res);  
        //res.json(supplies.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Test function to see if we can GET from database 
app.get("/test", async (req, res) => {
    try {
        const allTest = await pool.query("SELECT * FROM test"); 
        res.json(allTest.rows); 
    } catch (err) {
        console.error(err.message); 
    }
}); 


app.listen(5000, () => {
    console.log("server has started on port 5000");
});