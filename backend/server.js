const express = require("express");
const mysql = require("mysql");
const authRoute = require("./routes/auth");
const app = express();
const PORT = 3000;
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
