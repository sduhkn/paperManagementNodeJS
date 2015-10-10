/**
 * Created by Administrator on 2015/9/10.
 */
var mysql = require("mysql");
var conf = require('../conf/db');
var pool = mysql.createPool(conf.mysql);

console.log("DB connect successful");

module.exports = {
    queryAll: function(sql,callback){
        pool.getConnection(function(err, conn){
            if(err) return callback(err,null);
            conn.query(sql,function(qerr, result){
                callback(qerr, result);
                conn.release();
            });
        });
    },
    add: function(sql,req,res,callback){
        pool.getConnection(function(err, conn){
            var param = req.body || req.query;
            conn.query(sql,[param.username,param.pwd],function(err,result){
                callback(err,result);
                conn.release();
            });
        });
    },
    checkLogin: function(req, res, callback){
        pool.getConnection(function(err,conn){
            var params = req.body;
            var sql = 'select sid,password from student_info where sid = ?';
            conn.query(sql,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });

        });
    },
    // show user herself paper info
    showPaperInfoQueryByID: function(sql, callback){
        pool.getConnection(function(err,conn){
            conn.query(sql, function(err, result) {
                if(result)
                    callback(err, result);
            });
        });
    },
    comparePassword: function(req, res, callback){
        pool.getConnection(function(err,conn){
            var params = req.body;
            var sql = 'select password from student_info where sid = ?';
            conn.query(sql,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });

        });
    },
    changePassword: function(req, res, callback){
        pool.getConnection(function(err,conn){
            var params = req.body;
            var sql = 'update password =? from student_info where sid = ?';
            conn.query(sql,params.password,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });

        });
    },
    showPaperIndex: function(req, res, callback){
        pool.getConnection(function(err,conn){
            var params = req.body;
            var sql = 'select password from student_info where sid = ?';
            conn.query(sql,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });

        });
    },
    queryOwnPaper: function(req, res, callback){
        pool.getConnection(function(err,conn){
            var params = req.body;
            var sql = 'select password from student_info where sid = ?';
            conn.query(sql,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });
        });
    },
};
