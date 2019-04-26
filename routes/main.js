const express = require('express');
const router = express.Router();
const Settings = require('../model/settings');




router.get("/", (req, res)=>{
// const settings = new Settings({
//     title: true
// })
// .save()                 
// .catch(err => console.log(err));
Settings.findById("5cc2d6d59d9d85cffdfb5333",(err,r)=>{
    res.render('main',{
        title: 'Homepage', 
        name: r.title 
    });
})


   
})


module.exports = router;

