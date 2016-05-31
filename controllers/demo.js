var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('demo/index', {title:'案例', layout:null});
});


module.exports = router;