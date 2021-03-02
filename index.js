const express = require('express');
const exphbs = require('express-handlebars');
const {pick} = require('lodash');
const app = express();
const port = 3000;
app.use(express.static('static'));

const movies = [
  {title: "The Hulk", genre: "Action", jaartal: 1980},
  {title: "film3", genre: "comedie", jaartal: 1990},
  {title: "film4", genre: "banaan", jaartal: 2020},
]

const vragen = [
  {id: 1, vraag: "Welke game ontwikkelaar vindt je beter?", ant1: "Ubisoft", ant2: "Activision"},
  {id: 2, vraag: "In welke wereld zou je liever in willen leven?", ant1: "Pokemon", ant2: "Mario"},
  {id: 3, vraag: "Wat zou jij liever doen op een zondagmorgen?", ant1: "Een paar draken de pan in hakken", ant2: "Je kd hard gaan boosten"},
  {id: 4, vraag: "Welke soort game speel je liever?", ant1: "RPG's", ant2: "Shooters"},
  {id: 5, vraag: "Als je samen met je vrienden gaat gamen, wat gebruik je dan om te communiceren?", ant1: "Parties (voor consoles) of Discord (voor pc)", ant2: "Skype"},
  {id: 6, vraag: "Speel je liever singleplayer of multiplayer games?", ant1: "Singleplayer", ant2: "Multiplayer"},
  {id: 7, vraag: "Zou jij in de gamewereld willen leven van de game die je als laatste gespeeld hebt?", ant1: "Ja, lijkt mij tof!", ant2: "Zeker niet"},
  {id: 8, vraag: "Heb je wel eens gehuild om de storyline van een spel?", ant1: "Jazeker *sobbing*", ant2: "Nee *deal with it glasses*"},
  {id: 9, vraag: "Gebruik je glitches en exploits om beter te worden?", ant1: "Misschien, ja dus", ant2: "Nee zoiets zou ik niet doen"},
  {id: 10, vraag: "Zou jij 500.000,- euro aannemen als dat betekende dat je moest stoppen met gamen", ant1: "gimme gimme", ant2: "echt niet"}
]
const RandVraag = []
var i;
for (i = 0; i < 5; i++) {
RandVraag.push(vragen[Math.floor(Math.random() * vragen.length)]);
if(!vragen.includes(RandVraag)){
  vragen.push(RandVraag);
  }
} 

app.get('/', (req, res) => {
  res.render('home', {})
});

app.get('/chat', (req, res) => {
  res.render('chat', {title: "lijst van vragen", RandVraag})
  console.log(RandVraag)
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