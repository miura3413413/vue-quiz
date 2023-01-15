const router = require("express").Router();
const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "express_db",
});

//登録

router.post("/register", async (req, res) => {
  const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
  const params = [req.body.name, req.body.email, req.body.password];
  try {
    con.query(sql, params, function (err, result, fields) {
      if (err) {
        return console.log(err);
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ログイン
//URLにユーザーの情報が載らないようにpostメソッド
router.post("/login", async (req, res) => {
  const sql = "SELECT password FROM users WHERE email = ?";
  const params = req.body.email;
  con.query(sql, params, function (err, result, fields) {
    try {
      const password = result[0].password;
      if (password == req.body.password) {
        return res.status(200).json(req.body);
      } else {
        return res.status(200).json("パスワードが違います");
      }
    } catch (err) {
      return res.status(500).json("メールアドレスが違います");
    }
  });
});
module.exports = router;
