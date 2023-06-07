const express = require("express");
const config = require("./config.js");
const app = express();
const hostname = "127.0.0.1";
const port = 3001;
const cors = require('cors')
const mysql = require('mysql');

var connection = mysql.createConnection({
    host : config.HOST,
    user : config.USER,
    password : config.PASSWORD,
    database : config.DATABASE
})

connection.connect();
app.use(express.json())
app.use(cors());
app.post("/searchOrderHistory", function (req, res) {
    const orderId = req.body.orderId;
    const queryString = getSearchOrderHistoryQuery(orderId);
    connection.query( queryString, function(error, results){
        if (error) {
            console.log(error);
        }
        console.log(results)
        res.send(results);
       })
       return;
});

app.post("/enrollReview", function (req, res) {
    const review = req.body;
    const queryString = `INSERT INTO review(user_id, pizza_id, rating, description) VALUES (?, ?, ?, ?)`;
    const {userId, pizzaId, rating, contents} = review;
    console.log(userId, pizzaId, rating, contents);
    connection.query( queryString, [userId, pizzaId, rating, contents], function(error, results){
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to insert review" });
        } else {
            console.log(results);
            res.json(results);
        }
       })
});

app.post("/searchUserInfo", function (req, res) {
    const userId = req.body.userId;
    const queryString = searchUserInfo(userId);
    connection.query( queryString, function(error, results){
        if (error) {
            console.log(error);
        }
        console.log(results)
        res.send(results);
       })
       return;
});
app.post("/updateUserInfo", function (req, res) {
    const userId = req.body.userId;
    const address = req.body.address;
    console.log("+---------------------+",address);
    connection.query(`UPDATE user SET address="${address}" WHERE id = ? `, [userId], function(error, results){
        console.log(userId, address);
        if (error) {
            console.log(error);
        }
        console.log(results)
        res.send(results);
       })
       return;
});

app.get("/", function (req, res) {
    return res.send("hello worlds");
});

function getSearchOrderHistoryQuery(orderId){
    return ' select total_price, order_date, name_kor, total_price, address, orders.pizza_id '  
    + ' from user, pizza_order, orders, pizza ' 
    + ' where pizza_order.id = '  + orderId
    + ' and user.id = pizza_order.id ' 
    + ' and pizza_order.id = orders.pizza_order_id ' 
    + ' and orders.pizza_id = pizza.id ' ;
}


function searchUserInfo(userId){
    return ' select uid, name, email, phone_num, address, birthday, gender '  
    + ' from user ' 
    + ' where id = '  + userId;
}

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
