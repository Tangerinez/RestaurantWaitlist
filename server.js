// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var customers = [];
var waitlist = [];

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/index.html"));
});

app.get("/viewTables", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/viewTables.html"));
});

app.get("/makeReservation", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/makeReservation.html"));
});

app.get("/api/viewTables", function(req, res) {
  return res.json(customers);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/clear", function(req, res) {
  customers = [];
  waitlist = [];
});

app.post("/api/new", function(req, res) {
  var newCustomer = req.body;
  if (customers.length >= 5) {
    waitlist.push(newCustomer);
  } else {
    customers.push(newCustomer);
  }
  res.json(newCustomer);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
