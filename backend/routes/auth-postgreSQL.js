const router = require("express").Router();
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  user: "vue_db_user",
  host: process.env.PG_HOST,
  database: "vue_db",
  password: process.env.PG_PASSWORD,
  port: 5432,
  ssl: true,
});

//登録
router.post("/register", async (req, res) => {
  const regex =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/;
  try {
    if (regex.test(req.body.email) == false) {
      return res.status(500).json("メールアドレスの形式が違います");
    } else if (req.body.password.length < 5) {
      return res.status(500).json("5文字以上のパスワードを入力してください");
    } else {
      const query = {
        text: "INSERT INTO users(name,email,password) VALUES($1, $2, $3)",
        values: [req.body.name, req.body.email, req.body.password],
      };

      client.connect(function (err) {
        if (err) throw err;
        console.log("Connected");
      });

      client.query(query, function (err, result, fields) {
        console.log("called");
        if (err) {
          if (err.code == "ER_DUP_ENTRY" || err.errno == 1062) {
            return res
              .status(500)
              .json("すでにそのメールアドレスで登録しています");
          } else if (err.code == "ER_BAD_NULL_ERROR") {
            return res.status(500).json(err.sqlMessage);
          } else {
            console.log(err);
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
  const query = {
    text: "SELECT id, password, name  FROM users WHERE email = $1",
    values: [req.body.email],
  };

  // const sql = "SELECT id, password, name  FROM users WHERE email = $1";
  // const params = req.body.email;
  // client.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected");
  // });
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connexion error", err);
    }
    client.query(query, function (err, result, fields) {
      done();
      try {
        if (result.rows[0] == null) {
          return res.status(500).json("メールアドレスが違います");
        } else if (result.rows[0].password == req.body.password) {
          return res
            .status(200)
            .json({ id: result.rows[0].id, name: result.rows[0].name });
        } else {
          return res.status(500).json("パスワードが違います");
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json("サーバーエラー");
      }
    });
  });
});
module.exports = router;
