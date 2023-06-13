const express = require("express");
const config = require("./config.js");
const app = express();
const hostname = "127.0.0.1";
const port = 3001;
const cors = require("cors");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

connection.connect();
connection.query(
  "SELECT name_kor, l_price, image  FROM pizza_shop.pizza",
  function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    // console.log("result " + results[0].id);
    // console.log("result " + results[0].l_price);
    // console.log("result " + results[0].name_kor);
    // results.forEach((element) => {
    //   console.log(1, element.id);
    // });
  }
);

app.use(express.json());
app.use(cors());

app.post("/practice", function (req, res) {
  connection.query(
    "SELECT * FROM pizza_shop.pizza",
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(results);
      }
    }
  );
  return;
});

app.post("/searchPizza", function (req, res) {
  const pizzaId = req.body.pizzaId;
  console.log("awufhskgjfnkzsejnb", pizzaId);
  const queryString = searchPizza(pizzaId);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    console.log("awufhskgjfnkzsejnb", results);
    res.send(results);
  });
  return;
});

app.post("/searchPizzas", function (req, res) {
  const orderId = req.body.orderId;
  let queryString = getSearchPizzas();
  // console.log(1, queryString);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    // console.log(results);
    res.send(results);
  });
  return;
});

app.post("/searchOrderHistory", function (req, res) {
  const orderId = req.body.orderId;
  const userId = req.body.userId;
  let queryString = getSearchOrderHistoryQuery(orderId, userId);
  console.log(1, queryString);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    console.log("-+- _=_ -+- -_- +_+ +_=" + results);
    res.send(results);
  });
  return;
});

app.post("/orderPizza", function (req, res) {
  const pizzaId = req.body.pizzaId;
  const count = req.body.count;
  const date = req.body.date;
  let queryString = "insert";
  // console.log(1, queryString);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.send(results);
  });
  return;
});

app.post("/enrollReview", function (req, res) {
  const review = req.body;
  const queryString = `INSERT INTO review(user_id, pizza_id, rating, description) VALUES (?, ?, ?, ?)`;
  const { userId, pizzaId, rating, contents } = review;
  // console.log(userId, pizzaId, rating, contents);
  connection.query(
    queryString,
    [userId, pizzaId, rating, contents],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to insert review" });
      } else {
        // console.log(results);
        res.json(results);
      }
    }
  );
});

app.post("/insertPizzaOrder", function (req, res) {
  const pizzaOrder = req.body;
  const queryString = `INSERT INTO pizza_order(user_id, total_price, order_date) VALUES (?, ?, NOW())`;
  const { userId, pizzas } = pizzaOrder;
  console.log(pizzas);
  let sum = 0;
  for (let i = 0; i < pizzas.length; i++) {
    sum += pizzas[i].l_price;
  }
  // console.log(userId, pizzaId, rating, contents);/
  connection.query(queryString, [userId, sum], function (error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to insert review" });
    } else {
      // console.log(results);
      res.json(results.insertId);
      console.log("results sleep?????????????????", results);
      console.log("results sleep!!!!!!!!!!!!!!!!!", results.insertId);
    }
  });
});

app.post("/insertOrder", function (req, res) {
  const order = req.body;
  let queryString = `INSERT INTO orders(pizza_order_id, pizza_id, count) VALUES (?, ?, ?)`;
  const { pizzaOrderId, pizzaIds } = order;
  let values = "";
  for (let i = 0; i < pizzaIds.length; i++) {
    if (i > 0) values += " , ";
    values +=
      " ( " +
      pizzaOrderId +
      " , " +
      pizzaIds[i].id +
      " , " +
      pizzaIds[i].count +
      " ) ";
  }

  queryString = `INSERT INTO orders(pizza_order_id, pizza_id, count) VALUES ${values}`;
  // console.log(userId, pizzaId, rating, contents);/
  console.log(queryString);
  connection.query(
    queryString,
    // [pizzaOrderId, pizzaId, count],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to insert review" });
      } else {
        // console.log(results);
        res.json(results);
      }
    }
  );
});

app.post("/searchReview", function (req, res) {
  const pizzaId = req.body.pizzaId;
  console.log("=====+++++", req.body);
  const queryString = searchReview(pizzaId);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log("searchReview err: " + error);
    }
    console.log(results);
    res.send(results);
  });
  return;
});

app.post("/searchUserInfo", function (req, res) {
  const userId = req.body.userId;
  const queryString = searchUserInfo(userId);
  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    // console.log(results);
    res.send(results);
  });
  return;
});

app.post("/updateUserInfo", function (req, res) {
  const userId = req.body.userId;
  const address = req.body.address;
  // console.log("+---------------------+", address);
  connection.query(
    `UPDATE user SET address="${address}" WHERE id = ? `,
    [userId],
    function (error, results) {
      // console.log(userId, address);
      if (error) {
        console.log(error);
      }
      // console.log(results);
      res.send(results);
    }
  );
  return;
});

app.post("/login", function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;
  console.log("=====================", id, pw);
  const queryString =
    " select id from user where uid = '" + id + "' and pw = '" + pw + "'";

  connection.query(queryString, function (error, results) {
    if (error) {
      console.log(error);
    }
    // console.log(results);
    res.send(results);
  });
  return;
});

app.post("/updateUserInfo", function (req, res) {
  const userId = req.body.userId;
  const address = req.body.address;
  // console.log("+---------------------+", address);
  connection.query(
    `UPDATE user SET address="${address}" WHERE id = ? `,
    [userId],
    function (error, results) {
      // console.log(userId, address);
      if (error) {
        console.log(error);
      }
      // console.log(results);
      res.send(results);
    }
  );
  return;
});

function searchPizza(pizzaId) {
  console.log("end" + pizzaId);
  return (
    " select id, name_eng, name_kor, l_price, r_price, image" +
    " from pizza" +
    " where id = " +
    pizzaId
  );
}

// app.get("/", function (req, res) {
//   return res.send("hello worlds");
// });

function getSearchOrderHistoryQuery(orderId, userId) {
  console.log(99999999999999999999999, orderId);
  return (
    "select total_price, order_date, name_kor, total_price, address, orders.pizza_id  from user, pizza_order, orders, pizza  where  pizza_order.id = " +
    orderId +
    " and orders.pizza_order_id = pizza_order.id and pizza.id = orders.pizza_id and " +
    userId +
    " = user.id"
  );
}

function getSearchPizzas() {
  return (
    " select id, name_eng, name_kor, l_price, r_price, register_date, image " +
    " from pizza "
  );
}

function searchUserInfo(userId) {
  return (
    " select uid, name, email, phone_num, address, birthday, gender " +
    " from user " +
    " where id = " +
    userId
  );
}

function searchReview(pizzaId) {
  console.log(pizzaId);
  return (
    " select user_id, description, rating" +
    " from review" +
    " where pizza_id=" +
    pizzaId
  );
}

app.listen(port, hostname, function () {
  // console.log(`Server running at http://${hostname}:${port}/`);
});
