const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const connection = require("../config");

router.post("/get", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT password FROM user WHERE email = '${email}'; `,
    (err, rows) => {
      if (err) throw err;

      bcrypt.compare(password, rows[0].password, function (err, result) {
        result ? res.send("Login successful") : res.send("Login failed");
      });
    }
  );
});

router.post("/insert", (req, res) => {
  const { fname, lname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.send("Password doesn't match");
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      const hashedPsw = hash;

      connection.query(
        `INSERT INTO user(fname, lname, email, password) VALUES('${fname}', '${lname}', '${email}', '${hashedPsw}');`,
        (err) => {
          if (err) throw err;
          res.send("Data inserted successfully");
        }
      );
    });
  }
});

router.put("/update", (req, res) => {
  const { email, newPassword } = req.body;

  connection.query(
    `UPDATE user SET password = '${newPassword}' WHERE email = '${email}';`,
    (err) => {
      if (err) throw err;
      res.send("Data updated successfully");
    }
  );
});

router.delete("/delete", (req, res) => {
  const { email } = req.body;

  connection.query(`DELETE FROM user WHERE email = '${email}';`, (err) => {
    if (err) throw err;
    res.send("Data deleted successfully");
  });
});

module.exports = router;
