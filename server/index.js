const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!, Welcome to the CRUD REST API application");
});

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
