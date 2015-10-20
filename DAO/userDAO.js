/**
 * Created by Administrator on 2015/9/10.
 */
var mysql = require("mysql");
var conf = require('../conf/db');
var pool = mysql.createPool(conf.mysql);
var crypto = require('crypto');

console.log("DB connect successful");

module.exports = {
    checkLogin: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sql = 'select sid,password from student_info where sid = ?';
            conn.query(sql, params.username, function (err, result) {
                if (result)
                    callback(err, result);
            });
            conn.release();
        });
    },
    // show user herself paper info
    showPaperInfoQueryByID: function (sql, callback) {
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, result) {
                if (result)
                    callback(err, result);
            });
            conn.release();
        });
    },
    showStuOwnInfoQueryByID: function (sql, callback) {
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, result) {
                if (result) {
                    callback(err, result);
                }

            });
            conn.release();
        });
    },
    comparePassword: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var sql = 'select password from student_info where sid = ?';
            conn.query(sql, req.cookies["userID"], function (err, result) {
                if (result)
                    callback(err, result);
            });
            conn.release();
        });
    },
    changePassword: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sha1_pwd = crypto.createHash('sha1').update(params.pwd.new1).digest("base64");
            var sql = 'update student_info set password =? where sid = ?';
            conn.query(sql, [sha1_pwd, req.cookies["userID"]], function (err, result) {
                callback(err);
            });
            conn.release();
        });
    },
    updatePaperInfo: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sql = 'update paper_info set title =?,pubdate=?,spage=?,tpage=?,fauthor=? where paperid = ?';
            conn.query(sql, [params.paper.title,new Date(params.paper.pubdate),
               params.paper.spage,params.paper.tpage,params.paper.fauthor, params.paper.paperid], function (err, result) {
                callback(err);
            });
            conn.release();
        });
    },
    updateStuInfo: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sql = 'update student_info set sex=?,school=?,tid=?,gschool=? where sid = ?';
            conn.query(sql, [params.sex, params.school,
                params.tid, params.gschool, params.sid], function (err) {
                callback(err);
            });
            conn.release();
        });
    },
};