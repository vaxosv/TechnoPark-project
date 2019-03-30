const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');

let User = require('../model/user');


router.get('/register', (req, res)=>{
    res.render('register')
})

    

router.post('/register', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('username').not().isEmpty(),
    check('password').isLength({ min: 5 }),
    // check('password2').equals()
],
(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    User.create({
        name: name,
        email: email,
        username: username,
        password: password
    }).then(user => res.json(user));
});
    



module.exports = router;
