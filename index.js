const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
app.use(express.static('static'));

const movies = [
  {title: "The Hulk", genre: "Action", jaartal: 1980},
  {title: "film3", genre: "comedie", jaartal: 1990},
  {title: "film4", genre: "banaan", jaartal: 2020},
]

const vraagjes = [
  {"id": "1", "vraag": "waarom zijn bananen krom", "ant1": "abc", "ant2": "def"},
  {"id": "2", "vraag": "waarom zijn bananen kromehhh", "ant1": "abc", "ant2": "def"},
  {"id": "3", "vraag": " krom", "ant1": "abc", "ant2": "def"},
  {"id": "4", "vraag": "waarom zijn bananen ", "ant1": "abc", "ant2": "def"}
]

app.get('/', (req, res) => {
  res.render('home', {vraagjes, vraag})
});

app.get('/about', (req, res) => {
  res.send('Hello about!')
});

app.get('/login', (req, res) => {
  res.send('Hello login!')
});

//voorbeeld dynamic code v
app.get('/movies', (req, res) => {
  res.render('ListOfMovies', {title: "List of movies", movies})
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry this page doesn't excist, try another one")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.engine('handlebars', exphbs());
app.set("view engine", 'handlebars');