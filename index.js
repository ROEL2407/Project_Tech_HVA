const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render('home', {})
});

app.get('/about', (req, res) => {
  res.send('Hello about!')
});

app.get('/login', (req, res) => {
  res.send('Hello login!')
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry this page doesn't excist, try another one")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.engine('handlebars', exphbs());
app.set("view engine", 'handlebars');