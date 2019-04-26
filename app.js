const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const port = process.env.PORT || 8081;
const passport = require('passport');
const aboutR = require('./routes/about');
const mainR = require('./routes/main');
const adminR = require("./routes/admin");
const usersR = require('./routes/users')
const config = require('./config/database')

const session = require('express-session')

app.use(express.static('public'))




//first connection
mongoose.connect(config.datebase);
let db = mongoose.connection;
db.once("open", (err) => { console.log("connected") });
db.on("error", (err)=> {console.log(err)});

// body parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));

require('./config/passport')(passport);
app.use(session({secret: 'shaqro'}))
app.use(passport.initialize());
app.use(passport.session())


// routebi
app.use('/', mainR);
app.use('/about', aboutR)
app.use('/admin', adminR)
app.use('/users', usersR)

app.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
