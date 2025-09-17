const express = require('express');
const app = express();
const port = 3000;
const User = require('./user');

app.set("view engine", "ejs");

app.get('/login111', (req, res) => {
  res.render('login.ejs',{"key":"Tarun","key2":"Kumar"});
});
app.get('/tarun', (req, res) => {
  res.send('Tarun Page');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

