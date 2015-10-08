/**
 * Created by Administrator on 2015/9/30.
 */
var express = require('express');
var router = express.Router();
var userDAO = require('../../DAO/userDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
    var message;
    userDAO.queryAll("select * from user",function(err, result){
        message = result;
        console.log("result:"+result);
        console.log("message:"+message[0].username);
        res.render('result_user.ejs',{messages: message});
    });

});

module.exports = router;