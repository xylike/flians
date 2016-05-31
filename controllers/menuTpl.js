'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){ 
	var menuId = req.query.mid,
		tplType = req.query.type.toLowerCase();
	tplSelector[tplType].call(this, menuId, res);
});


var tplSelector = {
	/*列表*/
	gv:function(menuId, res){
		res.render('menuTpl/gridView', { title: '', layout: null });
	},
	/*单表单 single form*/
	sf: function(menuId, res){
		
		res.render('menuTpl/singleForm', { title: '', layout: null });
	},
	/*单表单 single form*/
	sef: function(menuId, res){
		
		res.render('menuTpl/singleEditForm', { title: '', layout: null });
	},
	/*主从表单 master-slave form*/
	msf: function(menuId, res){
		res.render('menuTpl/masterSlaveForm', { title: '', layout: null });
	},
	/*树型编辑表单 tree edit form*/
	tef: function(menuId, res){
		res.render('menuTpl/treeEditForm', { title: '', layout: null });
	},
	/*树型导航表单 tree nav form*/
	tnf: function(menuId, res){
		res.render('menuTpl/treeNavForm', { title: '', layout: null });
	},
	/*树型分类表单*/
	tcf: function(menuId, res){
		res.render('menuTpl/treeClassForm', { title: '', layout: null });
	},
	/*单据 voucher*/
	vch: function(menuId, res){
		res.render('menuTpl/voucher', { title: '', layout: null });
	},
	/*报表*/
	rpt: function(menuId, res){
		res.render('menuTpl/report', { title: '', layout: null });
	}
};




module.exports = router;