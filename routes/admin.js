const express = require('express');
const router = express.Router();


router.get("/adminka", (req, res)=>{
    res.render('admin');
})

module.exports = router;
