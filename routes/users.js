var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');

const bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}),
        req.body.password, (err, user) => {
            if(err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            }
        });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

module.exports = router;
