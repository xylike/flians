var express = require('express');
var router = express.Router();

var config = require('../config');
var mysql = require('../common/mysql'); 
var models = require('../models');



router.get('/', function(req, res, next){
	mysql.IsExistDatabase(config.database).then(function(result){ 
		if(result){
			return mysql.deleteDatabase(config.database);
		}
	})
	.then(function(result){ 
		console.log('开始创建数据库[' + config.database + ']...');
		return mysql.createDatabase(config.database); 
	})
	.then(function(result){
		console.log('数据库[' + config.database + ']创建成功!');
		console.log('开始创建枚举表[' + models.sysEnum.tableName + ']...'); 
		return models.sysEnum.createTable();
	})
	.then(function(result){
		if(result === true){
			console.log('枚举表[' + models.sysEnum.tableName + ']创建成功!')
			console.log('开始创建字段类型预设表[' + models.sysDataType.tableName + ']...');
			return models.sysDataType.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('字段类型预设表[' + models.sysDataType.tableName + ']创建成功!')
			console.log('开始创建菜单表[' + models.sysMenu.tableName + ']...');
			return models.sysMenu.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('菜单表表[' + models.sysMenu.tableName + ']创建成功!')
			console.log('开始创建菜单Table表[' + models.sysMenuTable.tableName + ']...');
			return models.sysMenuTable.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('菜单Table表[' + models.sysMenuTable.tableName + ']创建成功!')
			console.log('开始创建菜单Table表的字段表[' + models.sysMenuTableField.tableName + ']...');
			return models.sysMenuTableField.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('菜单Table表的字段表[' + models.sysMenuTableField.tableName + ']创建成功!')
			console.log('开始创建菜单功能表[' + models.sysMenuFunc.tableName + ']...');
			return models.sysMenuFunc.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('菜单功能表[' + models.sysMenuFunc.tableName + ']创建成功!')
			console.log('开始创建菜单查询条件表[' + models.sysMenuQueryCondition.tableName + ']...');
			return models.sysMenuQueryCondition.createTable();
		}
	})
	.then(function(result){
		if(result === true){
			console.log('菜单查询条件表[' + models.sysMenuQueryCondition.tableName + ']创建成功!')
		}
	})
	.catch(function(error){
		if(error.code === 'ER_DB_CREATE_EXISTS'){
			console.log('数据库已经存！');
		}
		else{
			console.log(error);
		}
	});
	res.render('init/index', {title: '系统初始化', layout:null});
});

module.exports = router;