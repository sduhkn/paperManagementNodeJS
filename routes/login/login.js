var express = require('express');
var router = express.Router();
var userDAO = require('../../DAO/userDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login/login', {title: 'Express'});
});

router.post('/',function(req, res ,next){
    var message;
    userDAO.checkLogin(req,res,function(err, result){
        if(result.length != 0) {
            if (result[0].password == req.body.password) {
                res.cookie('userID',result[0].username,{ maxAge: 10*60*1000 });
                req.session.user = result;
                res.redirect('home');
            } else {
                message = '用户名密码错误';
                res.render('login/login',{message: message,title: 'Express'});
            }
        }else{
            message = '用户名密码错误';
            res.render('login/login',{message: message,title: 'Express'});
        }
    });
});

module.exports = router;
