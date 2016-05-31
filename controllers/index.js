var express = require('express');
var router = express.Router();

require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '管理控制台', layout: null });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: '管理控制台', layout: null });
});

router.get('/homePage', function(req, res, next){
	res.render('homePage', { title: '首页', layout: null });
});

module.exports = router;
