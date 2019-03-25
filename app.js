const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8081;
const aboutR = require('./routes/about');
const mainR = require('./routes/main')


// baza
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Gikkk:giogio12345@techp-cb7ye.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
  console.log('database connected');
  
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));



// routebi
app.use('/about', aboutR)
app.use('/', mainR);
app.use


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
