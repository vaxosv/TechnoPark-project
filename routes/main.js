const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    res.render('main',{
        title: 'Homepage'
    });
})

module.exports = router;

