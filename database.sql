drop database IF EXISTS SweetsShop;
create database SweetsShop;
use SweetsShop;
show databases;

create table Customers (
phone varchar(10) primary key not null,
cName varchar(50),
email varchar(50)
);
SELECT * FROM SweetsShop.customers;

create table Sweets (
sName varchar(50) primary key not null,
sPrice integer,
cook_time varchar(50)
);
SELECT * FROM SweetsShop.sweets;

create table Orders (
oID integer primary key not null AUTO_INCREMENT,
price integer,
OrderDate date,
customers_phone varchar(10),
Sweet_name varchar(50),
foreign key (customers_phone) references customers(phone) 
ON DELETE CASCADE
ON UPDATE CASCADE 
);
SELECT * FROM SweetsShop.orders;

create table Ingredients(
iName varchar(50) primary key not null,
iPrice integer,
company varchar(50),
bring_time varchar(50)
);
SELECT * FROM SweetsShop.ingredients;

create table Ingredients_in_a_Sweet (
id integer primary key not null,
sName varchar(50),
iName varchar(50)
);
SELECT * FROM SweetsShop.ingredients_in_a_Sweet;

show tables;


INSERT INTO sweets (sName, sPrice, cook_time) VALUES('cheese cake', 120, '5h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('chocolate cake', 50, '1h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('cinnamon roles', 20, '3h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('chocolate donuts', 4, '15m');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('fruit pie', 30, '1h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('ginger cookies', 80, '3h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('terelecha', 50, '2h');
INSERT INTO sweets (sName, sPrice, cook_time) VALUES('vanilla donuts', 4, '15m');

INSERT INTO customers (phone, cName, email) VALUES('0566843274', 'saleem', 'mahmoudslim22@gmail.com');
INSERT INTO customers (phone, cName, email) VALUES('0568743654', 'abdallah', 'abdoabdo45@gmail.com');
INSERT INTO customers (phone, cName, email) VALUES('0569873462', 'laila', 'laila334@yahoo.com');
INSERT INTO customers (phone, cName, email) VALUES('0593457834', 'kifah', 'k.ahmad@woho.com');
INSERT INTO customers (phone, cName, email) VALUES('0597468324', 'salma', 'sal20@woho.com');
INSERT INTO customers (phone, cName, email) VALUES('0597835273', 'tasneem', 'tasneeeem66@gmail.com');

INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(50, '2022-12-28', '0569873462', 'chocolate cake');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(120, '2022-12-28', '0566843274', 'cheese cake');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(4, '2022-12-30', '0568743654', 'vanilla donuts');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(30, '2023-1-3', '0597468324', 'fruit pie');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(50, '2023-1-10', '0597835273', 'terelecha');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(4, '2023-2-1', '0568743654', 'vanilla donuts');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(120, '2023-2-1', '0593457834', 'cheese cake');
INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES(80, '2023-2-5', '0597835273', 'ginger cookies');

INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('baking bowder', 5, 'alzahra', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('blue berriess', 40, 'aldalo', '3days');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('blueberry jam', 15, 'dream', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('butter', 3, 'puke', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('butter biscuits', 5, 'digestive', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('caramel', 10, 'dream', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('chocolate chips', 10, 'dream', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('chocolate ganache', 10, 'dream', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('sprinkles', 5, 'alzahra', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('strawberries', 20, 'aldalo', '2day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('vanila', 5, 'dream', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('wipped cream', 10, 'alzahra', '1day');
INSERT INTO ingredients (iName, iPrice, company, bring_time) VALUES('yeast', 5, 'dream', '1day');
