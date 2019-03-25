const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8081;
const aboutR = require('./routes/about');
const mainR = require('./routes/main');
const adminR = require("./routes/admin");
const uri = "mongodb+srv://Gikkk:giogio12345@techp-cb7ye.mongodb.net/test?retryWrites=true";



//first connection
mongoose.connect(uri);
let db = mongoose.connection;
db.once("open", (err) => { console.log("conected") });
db.on("error", (err)=> {console.log(err)});


//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));



// routebi
app.use('/', mainR);
app.use('/about', aboutR)
app.use('/admin', adminR)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
