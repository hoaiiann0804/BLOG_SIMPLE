const { error } = require("console");
const express = require("express");
const { json } = require("sequelize");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.status(400).json({ error: "Path does not found, try again" });
});
module.exports = app;
