const express = require("express");
const mysql = require("mysql");
const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:8080", //アクセス許可するオリジン
  })
);

app.listen(PORT, () => console.log("サーバーが起動しました"));
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "express_db",
});

//登録

app.use(express.json());
app.use("/api/auth", authRoute);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Max-Age", "86400");
//   next();
// });

// app.options("*", function (req, res) {
//   res.sendStatus(200);
// });
