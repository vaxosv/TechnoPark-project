const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");

router.get("/", (req, res)=>{
    res.render('admin');   
})

let post1 = new posts();

router.get("/add", (req, res) => {
    res.render('add_post', {
        title: 'Add Post'
    });
   
    post1.title = 'gio';

    post1.save((err)=>{
        if(err) throw err;

    })
})

router.get('/update/:id', (req,res)=>{
    posts.findById( req.params.id, (err, data) => {
    
    })
})





module.exports = router;
