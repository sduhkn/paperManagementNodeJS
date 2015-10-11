/**
 * Created by Administrator on 2015/10/11.
 */
var express = require('express');
var router = express.Router();
var userDAO = require('../../DAO/userDAO');
// get the own paperInfo
router.get('/myPaperInfo',function(req, res){
    var sql = "select * from paper_info where fauthor = " + req.cookies["userID"];
    userDAO.showPaperInfoQueryByID(sql,function(err, result){
        res.send({paperInfo: result });
    });
});

module.exports = router;