const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");

router.get("/", (req, res)=>{
    res.render('admin');   
})


router.get("/add/:name", (req, res) => {
    let post1 = new posts();
    res.render('add_post', {
        title: 'Add Post'
    });
   
    post1.title = req.params.name;

    post1.save((err)=>{
        if(err) throw err;

    })
})

router.get('/update/:name/:new', (req,res)=>{
    
    let name = req.params.name
    let newdata = req.params.new
    posts.findOneAndUpdate(
        { title: name },
        {title: newdata},
        { new: true },
        (err, task) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json(task);
        }
      );
})

router.get('/remove/:name', (req, res) =>{
    let name = req.params.name

    posts.deleteOne({ title: name }, function(err) { 
        if (err)  throw err;
  });
})





module.exports = router;
