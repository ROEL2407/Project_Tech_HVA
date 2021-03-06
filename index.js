const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const slug = require('slug');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set("view engine", 'handlebars');


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


app.get('/', async (req, res) => {
  var vragen = [];
  vragen = await db.collection('questions').find({}).toArray();
  //picks 5 random questions from the database and displays it on the view
  const randVraag = [];
  var vraagHolder = "";
  while (randVraag.length < 5) {
    vraagHolder = (vragen[Math.floor(Math.random() * vragen.length)]); 
    if(!randVraag.includes(vraagHolder)){
      randVraag.push(vraagHolder);
    }
  }

  //pushes chosen question and answers sto the database
  const questAndAnswer = {"id": "id", "person1": person[0].id, "ansPerson1": req.body.answer, "person2": person[1].id};
  console.log(req.body);
  await db.collection('matches').insertOne(questAndAnswer);


  res.render('chat', {randVraag, questAndAnswer});
});

app.use(function (req, res) {
  res.status(404).send("Sorry this page doesn't exist, try another one");
});

app.listen(port, () => {
  console.log(`localhost app listening on port ${port}!`);
});