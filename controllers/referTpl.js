var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	var refType = req.query.type.toLowerCase();
	tplSelector[refType].call(this, res);
});

var tplSelector = {
	tv: function(res){
		res.render('referTpl/treeView', { title: '', layout: null });
	},
	gv: function(res){
		res.render('referTpl/gridView', { title: '', layout: null });
	},
	nt: function(res){
		res.render('referTpl/navTree', { title: '', layout: null });
	}
};

module.exports = router;