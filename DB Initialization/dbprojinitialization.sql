--First create the database where you wish for these tables to be and then run this file to generate tables and input.



--Create inventory table
CREATE TABLE Inventory(Name VARCHAR(20) PRIMARY KEY, Type CHAR NOT NULL, Quantity INTEGER NOT NULL, CHECK(quantity >= 0));

--Create customer table
CREATE TABLE Customers(MemberID SERIAL PRIMARY KEY, Fname VARCHAR(25) NOT NULL, Lname VARCHAR(25) NOT NULL, Username VARCHAR(25) NOT NULL, Password VARCHAR(25) NOT NULL);
ALTER TABLE Customers ADD CONSTRAINT unique_user UNIQUE (Username);

--Create employee table
CREATE TABLE Employees(EmployeeID SERIAL PRIMARY KEY, Title CHAR NOT NULL, Password VARCHAR(25) NOT NULL, Fname VARCHAR(25) NOT NULL, Lname VARCHAR(25) NOT NULL);

--Create cocktail table
CREATE TABLE Cocktails(Name VARCHAR(30) PRIMARY KEY, Price REAL NOT NULL, Description TEXT NOT NULL, Instructions TEXT NOT NULL, CHECK(Price >= 0));

--Create drinkcontains table
CREATE TABLE DrinkContains(Name VARCHAR(30) REFERENCES Cocktails, Ingredient VARCHAR(30) REFERENCES Inventory, Constraint pk_drinkcontains PRIMARY KEY(Name, Ingredient));

--Create orders table
CREATE TABLE Orders(TransactionID SERIAL PRIMARY KEY, Customer INTEGER REFERENCES Customers, DateOrdered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
Cocktail VARCHAR(30) REFERENCES Cocktails, HasBeenServed CHAR DEFAULT 'N' NOT NULL, ServedBy INTEGER, Total REAL NOT NULL, CHECK(Total >= 0));

--Create ratings table
CREATE TABLE Ratings(Title VARCHAR(150) NOT NULL, RatedBy INTEGER REFERENCES Customers, Cocktail VARCHAR(30) REFERENCES Cocktails,
Rating INTEGER NOT NULL CHECK(Rating BETWEEN 1 AND 5), Review TEXT NOT NULL, CONSTRAINT pk_ratings PRIMARY KEY(RatedBy, Cocktail));

--Create supplies table
CREATE TABLE Supplies(Name VARCHAR(50) REFERENCES Inventory, SupplierName VARCHAR(50), Price REAL NOT NULL CHECK(Price >= 0), CONSTRAINT pk_supplies PRIMARY KEY(Name, SupplierName));

--Create suppliesorders table
CREATE TABLE SuppliesOrders(TransactionID SERIAL PRIMARY KEY, OrderedBy INTEGER REFERENCES Employees, DateOrdered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
ItemOrdered VARCHAR(50), SupplierName VARCHAR(50), Quantity INTEGER NOT NULL, Total REAL NOT NULL CHECK(Total >= 0),
CONSTRAINT fk_supplier FOREIGN KEY(ItemOrdered, SupplierName) REFERENCES Supplies(Name, SupplierName));





--Data input into inventory table
\copy Inventory(Name, Type, Quantity) FROM inventory.csv WITH DELIMITER ',' CSV HEADER;

--Data input into customer table (NOT using a csv file... this is because the MemberID is serial and it is needs to increment with each entry)
INSERT INTO Customers(Fname, Lname, Username, Password) VALUES ('Mike', 'Bod', 'Mike3221', 'password1');
INSERT INTO Customers(Fname, Lname, Username, Password) VALUES ('Tiger', 'Woods', 'Tiger', 'password2');

--Data input into employee table (NOT using a csv file... this is because the EmployeeID is serial and it is needs to increment with each entry)
INSERT INTO Employees(Title, Password, Fname, Lname) VALUES ('B', 'pass1', 'John', 'Snow');
INSERT INTO Employees(Title, Password, Fname, Lname) VALUES ('M', 'pass2', 'Ramsay', 'Bolton');

--Data input into cocktail table
\copy Cocktails(Name, Price, Description, Instructions) FROM cocktails.csv WITH DELIMITER ',' CSV HEADER;

--Data input into drinkcontains table
\copy DrinkContains(Name, Ingredient) FROM drinkcontains.csv WITH DELIMITER ',' CSV HEADER;

--Data input into orders table (NOT using a csv file... this is because the TransactionID is serial and it is needs to increment with each entry)
INSERT INTO Orders(Customer, Cocktail, HasBeenServed, ServedBy, Total) VALUES (2, 'Long Island Iced Tea', 'Y', 1, 14);
INSERT INTO Orders(Customer, Cocktail, Total) VALUES (1, 'Aqua Velva', 14);


--Data input into ratings table
\copy ratings(Title, Ratedby, Cocktail, Rating, Review) FROM ratings.csv WITH DELIMITER ',' CSV HEADER;

--Data input into supplies table
\copy supplies(Name, SupplierName, Price) FROM supplies.csv WITH DELIMITER ',' CSV HEADER;

--Data input into suppliesorders table (NOT using a csv file... this is because the TransactionID is serial and it is needs to increment with each entry)
INSERT INTO SuppliesOrders(OrderedBy, ItemOrdered, SupplierName, Quantity, Total) VALUES (2, 'Vodka', 'Bobs Liquor', 3, 45);
INSERT INTO SuppliesOrders(OrderedBy, ItemOrdered, SupplierName, Quantity, Total) VALUES (2, 'Cola', 'Bobs Liquor', 2, 10);





--Functions to update amount of inventory
CREATE OR REPLACE FUNCTION subInv (itemname VARCHAR(50), amount INTEGER) RETURNS integer AS $$
    UPDATE inventory
        SET quantity = quantity - amount
        WHERE name = itemname;
    SELECT 1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION addInv (itemname VARCHAR(50), amount INTEGER) RETURNS integer AS $$
    UPDATE inventory
        SET quantity = quantity + amount
        WHERE name = itemname;
    SELECT 1;
$$ LANGUAGE SQL;

--Function that automatically updates inventory after a supply order
CREATE OR REPLACE FUNCTION add_new_inventory() RETURNS TRIGGER AS $$
DECLARE
	name VARCHAR(20);
	amount INT;
BEGIN
	SELECT ItemOrdered INTO name FROM SuppliesOrders ORDER BY DateOrdered DESC LIMIT 1;
	SELECT Quantity INTO amount FROM SuppliesOrders ORDER BY DateOrdered DESC LIMIT 1;
	PERFORM addInv(name, amount);
	RETURN NULL;
END;
$$ LANGUAGE 'plpgsql';





--Trigger declarations
CREATE TRIGGER new_inventory AFTER INSERT ON SuppliesOrders FOR EACH STATEMENT EXECUTE PROCEDURE add_new_inventory();