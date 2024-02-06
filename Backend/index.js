const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const transactionRoutes = require("./transactionRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
  return res.json("from backend side");
});

app.listen(8081, () => {
  console.log("listening");
});

module.exports = { db };
