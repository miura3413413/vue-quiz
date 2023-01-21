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

router.post("/solved", async (req, res) => {
  const date = new Date();
  const result =
    date.getFullYear().toString() +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getDate().toString();
  console.log(result);
  try {
    const query = {
      //プレースホルダを使用(SQLインジェクションの対策)
      text: "INSERT INTO solved_question(id,solved,time) VALUES($1, $2, $3)",
      values: [req.body.id, req.body.solved, result],
    };
    pool.connect(function (err, client, done) {
      if (err) {
        return console.error("connexion error", err);
      }
      client.query(query, function (err, result, fields) {
        done();
        if (err) {
          console.log(err);
          return res.status(500).json("何かのエラーがあります");
        } else {
          return res.status(200).json("成功");
        }
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
