/**
 * Created by Administrator on 2015/10/11.
 */
var express = require('express');
var router = express.Router();
var userDAO = require('../../DAO/userDAO');
var crypto = require('crypto');
// get the own paperInfo
router.get('/myPaperInfo', function (req, res) {
    var sql = "select * from paper_info where fauthor = " + req.cookies["userID"];
    userDAO.showPaperInfoQueryByID(sql, function (err, result) {
        res.send({paperInfo: result});
    });
});
router.get('/stuOwnInfo', function (req, res) {
    userDAO.showStuOwnInfoQueryByID(res,req, function (err, result,result1) {
        res.send({stu: result[0],stype:result1});
    });
});
router.post('/changePassword', function (req, res) {
    //console.log(req.body.oldPwd);
    userDAO.comparePassword(req, res, function (err, result) {
        if (result[0].password != crypto.createHash('sha1').update(req.body.pwd.old).digest("base64")) {
            res.send({msg: "原密码不正确"});
        }
        else {
            userDAO.changePassword(req, res, function (err) {
                if (err) {
                    res.send({msg: "未知错误"});
                }
                else
                    res.send({msg: "修改成功"});
            })
        }
    })

});
router.post('/updatePaperInfo', function (req, res) {
    //console.log(req.body.oldPwd);
    userDAO.updatePaperInfo(req, res, function (err) {
        if (err) {
            res.send({msg: "未知错误"});
        }
        else
            res.send({msg: "修改成功"});
    })
});
router.post('/newPaperInfo', function (req, res) {
    //console.log(req.body.oldPwd);
    userDAO.newPaperInfo(req, res, function (err) {
        if (err) {
            res.send({msg: "未知错误"});
        }
        else
            res.send({msg: "新建论文成功"});
    })
});
router.post('/updateStuInfo', function (req, res) {
    userDAO.updateStuInfo(req, res, function (err) {
        if (err) {
            res.send({msg: "未知错误"});
        }
        else
            res.send({msg: "修改成功"});
    })
});
router.post('/deletePaper', function (req, res) {
    userDAO.deletePaper(req, res, function (err) {
        if (err) {
            res.send({msg: "未知错误"});
        }
        else
            res.send({msg: "修改成功"});
    })
});
module.exports = router;