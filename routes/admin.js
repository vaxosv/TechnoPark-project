const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");

router.get("/", (req, res)=>{
    res.render('admin');   
})

router.get('/add',(req,res)=>{
    res.render('add_post', {
      title: "Add Post"
    })
})

router.post('/add', (req, res)=>{
    const title = req.body.title
    let newPost = new posts({
    title:title
    })

    newPost.save((err)=>{
      if(err){ 
          throw err;
      }else{  
       res.redirect('/admin/add')
      }
   });
})

router.get('/edit',(req,res)=>{
  res.render('edit', {
    title: "Edit"
  })
})

router.post('/edit', (req, res)=>{
  let name = req.body.name;
  let newdata = req.body.newName;
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


router.get('/remove',(req,res)=>{
  res.render('remove', {
    title: "remove"
  })
})

router.post('/remove', (req, res)=>{
    let delPost = req.body.title
    posts.deleteOne({ title: delPost }, function(err) { 
          if (err)  throw err;
          res.redirect('/admin/remove')
      });
});




module.exports = router;
