/**
 * Created by Administrator on 2015/9/21.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    req.session.user = null;
    res.cookie('userID',null);
    res.redirect('login');
});
module.exports = router;