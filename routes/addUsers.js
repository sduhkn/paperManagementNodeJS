/**
 * Created by Administrator on 2015/9/15.
 */
var express = require('express');
var router = express.Router();
var conn = require('../DAO/userDAO');
/* . */

router.get('/',function(req, res, next){
    res.render('addUsers', {title: 'Express'});
});

router.post('/', function(req, res, next) {
    var message = '';
    var sql = "insert into user values(?,?) ";
    conn.add(sql,req,res,function(err, result){
        if(result) {
            message = "data has inserted";
            console.log("data has inserted");
        }else{
            message = "error";
        }
        res.render('result_user', {title: 'Express', message: message});
    });
});
module.exports = router;
