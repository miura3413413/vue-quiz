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
//ログイン
//URLにユーザーの情報が載らないようにpostメソッド
router.post("/login", async (req, res) => {
  const sql = "SELECT id, password, name  FROM users WHERE email = ?";
  const params = req.body.email;
  con.query(sql, params, function (err, result, fields) {
    console.log(result);
    try {
      const password = result[0].password;
      if (password == req.body.password) {
        return res.status(200).json({ id: result[0].id, name: result[0].name });
      } else {
        return res.status(500).json("パスワードが違います");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json("メールアドレスが違います");
    }
  });
});
module.exports = router;
