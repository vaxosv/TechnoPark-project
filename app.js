const express = require("express");
const path = require("path");
const app = express();
const port = 8081;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));


app.get("/", (req, res)=>{
    res.render("main");
})

app.get("/admin", (req, res) => {
    res.render("admin");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
