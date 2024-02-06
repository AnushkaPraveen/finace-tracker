const express = require("express");
const router = express.Router();
const db = require("./index");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM transaction";
  req.db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  const query = "INSERT INTO transaction(`description`,`amount`,`type`) VALUES (?)";
  const values = [req.body.description, req.body.amount,req.body.type];

  req.db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Transaction has been created successfully!");
  });
});

router.delete("/:id", (req, res) => {
  const transactionId = req.params.id;
  const query = "DELETE FROM transaction WHERE id=?";

  req.db.query(query, [transactionId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Transaction has been deleted successfully!");
  });
});

router.put("/:id", (req, res) => {
  const transactionId = req.params.id;
  const query = "UPDATE transaction SET `description`=?,`amount`=? ,`type`=? WHERE id=?";
  const values = [req.body.description, req.body.amount,req.body.type];

  req.db.query(query, [...values, transactionId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Transaction has been updated successfully!");
  });
});

module.exports = router;
