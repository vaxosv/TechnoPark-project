const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const posts = require("../model/postebi");

router.get("/", (req, res)=>{
    res.render('admin');
})
router.get("/add", (req, res) => {
    let post1 = new posts();
    post1.name = "js";

    post1.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('admin');
        }
    })

})

router.get("/remove/:id", (req, res) => {})
router.get("/update/:id", (req, res) => {});

module.exports = router;
