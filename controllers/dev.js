'use strict';
var express = require('express');
var config = require('../config');
var sysDataType = require('../models/sysDataType');
var router = express.Router();
var dataType = new sysDataType(); 

router.get('/', function(req, res, next){
	 res.render('dev/login', { title: '单据设计管理器', layout: null });
});
router.get('/index', function(req, res, next){
	res.render('dev/index', { title: config.designName, layout: null});
});
router.get('/dataTypeManager', function(req, res, next){ 
	res.render('dev/dataTypeManager', { title: '数据类型管理', viewData: { columns: JSON.stringify(dataType.columns) }, layout: null });
});
router.get('/dataTypeAdd', function(req, res, next){ 
	res.render('dev/dataTypeAdd', { title: '数据类型管理', viewData: { columns: JSON.stringify(dataType.columns) }, layout: null });
});
router.post('/dataTypeSave', function(req, res, next){
	var resultData = {};
	if(req.body.autoId){
		res.send(req.body);
	}
	else{ 
		dataType.add(req.body).then(function(newId){
			resultData.newId = newId; 
			res.send(resultData);
		}).catch(function(error){
			resultData.errormsg = error.message;
			res.send(resultData);
		});
	} 
});

router.get('/ajax', function(req, res, next){
	var data = [{
		id: '001',
		text: '广东省'
	},{
		id: '002',
		text: '湖南省'
	}];
	res.send(data);
});

module.exports = router;