const express = require("express");
const mysql = require("mysql");
const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "express_db",
});

// const PORT = 3001;

app.use(
  cors({
    origin: process.env.FRONT_URL, //アクセス許可するオリジン
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//   })
// );
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.post("/api/auth/login", async (req, res) => {
  const sql = "SELECT id, password, name  FROM users WHERE email = ?";
  const params = req.body.email;
  con.query(sql, params, function (err, result, fields) {
    try {
      console.log(result);
      const password = result[0].password;
      if (password == req.body.password) {
        return res.status(200).json({ id: result[0].id, name: result[0].name });
      } else {
        return res.status(500).json("パスワードが違います");
      }
    } catch (err) {
      // return res.status(500).json("メールアドレスが違います");
      console.log(err);
      return res.status(500).json(err);
    }
  });
});

// app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log("サーバーが起動しました", PORT));
