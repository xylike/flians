var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
	res.render('filterTpl/index', { title: '', layout: null });
});

module.exports = router;