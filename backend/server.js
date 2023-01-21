const express = require("express");
// const mysql = require("mysql");
const authRoute = require("./routes/auth-pg");
const setDataRoute = require("./routes/set-data-pg");
// const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");
require("dotenv").config();

// const PORT = 3001;
const PORT = process.env.PORT || 3001;

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

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/set_data", setDataRoute);

app.listen(PORT, () => console.log("サーバーが起動しました", PORT));
