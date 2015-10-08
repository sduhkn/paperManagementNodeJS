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
            var sql = 'select username,password from user where username = ?';
            conn.query(sql,params.username,function(err, result) {
                if(result)
                    callback(err, result);
            });

        });
    }
};
