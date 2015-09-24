/**
 * Created by Administrator on 2015/9/19.
 */
var express = require('express');
var router = express.Router();
var userDAO = require('../bin/connect');

/* GET home page. */
router.get('/', function(req, res, next) {
    if( req.cookies["userID"] && req.session.user ){
        res.render('home', {title: 'Express',userID: req.cookies["userID"]});
    }else{
        res.redirect('login');
    }
});

module.exports = router;
