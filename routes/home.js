/**
 * Created by Administrator on 2015/9/19.
 */
var express = require('express');
var router = express.Router();
var userDAO = require('../DAO/userDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
    if( req.cookies["userID"] && req.session.user ){
        res.render('stu/home', {title: 'Express',userID: req.cookies["userID"]});
    }else{
        res.redirect('login');
    }
});

module.exports = router;
