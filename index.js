const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
const slug = require('slug');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
app.use(express.json());


let db = null;
//function connectDB
async function connectDB() {
  // Get URI from .env file
  const uri = process.env.DB_URI;
  // make connection to db
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri,options);
  await client.connect();
  db = await client.db(process.env.DB_NAME);
}
connectDB()
.then(() => {
  //if the connection was successfull, show this message
  console.log("we have landed");
})
.catch ( error => {
  //if the connection fails, send this message
  console.log(error);
});

const person = [
  {"id": 14256, "naam": "Bert"},
  {"id": 987643, "naam": "Maaike"}
];


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('static'));

app.engine('handlebars', exphbs());
app.set("view engine", 'handlebars');

app.get('/', async (req, res) => {
  var vragen = [];
  //takes all the questions from the database and places them into the array vragen
  vragen = await db.collection('questions').find({}).toArray();
  //picks 5 random questions from vragen
  const randVraag = [];
  // vraagHolder is a holder for a single question to test if they are already in the new array randVraag
  var vraagHolder = "";
  while (randVraag.length < 5) {
    vraagHolder = (vragen[Math.floor(Math.random() * vragen.length)]); 
    //if the question in vraagHolder isn't in the new array, push them to the array
    if(!randVraag.includes(vraagHolder)){
      randVraag.push(vraagHolder);
    }
  }


  res.render('home', {randVraag});
});

app.post('/', async (req,res) => {
  //pushes chosen answers to the database with the id's from the users
  const questAndAnswer = {"person1": person[0].id, "ansPerson1": req.body.answer, "person2": person[1].id, "ansPerson2": req.body.answer};
  console.log(req.body.answer);
  await db.collection('matches').insertOne(questAndAnswer)
  .then(function() { 
    res.redirect('/chat');
}).catch(function(error){
    res.send(error);
})


  res.render('home', {questAndAnswer});
});


app.get('/chat', async (req, res) => {
  var lastItem = await db.collection('matches').find().limit(1).sort({$natural:-1}).toArray();
res.render('chat', {lastItem});
});

  app.get('/vragen', (req, res) => {
  res.render('add', {layout: 'addlayout.handlebars'});
});

app.post('/vragen', async (req,res) => {
  const Addvragen = {"vraag": req.body.vraag, "ant1": req.body.answer1, "ant2": req.body.answer2};
  await db.collection('questions').insertOne(Addvragen);
  res.render('add', {Addvragen, layout: 'addlayout.handlebars', Succesmessage: "Je vraag is aangemaakt!"})
});

app.use(function (req, res) {
  res.status(404).send("Sorry this page doesn't exist, try another one");
});

app.listen(port, () => {
  console.log(`localhost app listening on port ${port}!`);
});