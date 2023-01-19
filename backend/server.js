const express = require("express");
const mysql = require("mysql");
const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");

const PORT = process.env.FRONT_URL || 3000;

app.use(
  cors({
    origin: process.env.FRONT_URL, //アクセス許可するオリジン
  })
);

app.post("/register", async (req, res) => {
  const regex =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/;
  try {
    if (!regex.test(req.body.email)) {
      return res.status(500).json("メールアドレスの形式が違います");
    } else if (req.body.password.length < 5) {
      return res.status(500).json("5文字以上のパスワードを入力してください");
    } else {
      const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
      const params = [req.body.name, req.body.email, req.body.password];
      con.query(sql, params, function (err, result, fields) {
        if (err) {
          if (err.code == "ER_DUP_ENTRY" || err.errno == 1062) {
            return res
              .status(500)
              .json("すでにそのメールアドレスで登録しています");
          } else if (err.code == "ER_BAD_NULL_ERROR") {
            return res.status(500).json(err.sqlMessage);
          } else {
            return res.status(500).json("何かのエラーがあります");
          }
        } else {
          return res.status(200).json("成功");
        }
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  const sql = "SELECT id, password, name  FROM users WHERE email = ?";
  const params = req.body.email;
  con.query(sql, params, function (err, result, fields) {
    try {
      const password = result[0].password;
      if (password == req.body.password) {
        return res.status(200).json({ id: result[0].id, name: result[0].name });
      } else {
        return res.status(500).json("パスワードが違います");
      }
    } catch (err) {
      // return res.status(500).json("メールアドレスが違います");
      return res.status(500).json(err);
    }
  });
});

app.listen(PORT, () => console.log("サーバーが起動しました"));
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "express_db",
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

//登録

app.use(express.json());
// app.use("/api/auth", authRoute);

module.exports = app;
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
