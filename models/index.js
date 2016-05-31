'use strict';

var mysql = require('../common/mysql');

var models = function (){};

var sysEnum = require('./sysEnum'), 
	sysDataType = require('./sysDataType'), 
	sysMenu = require('./sysMenu'),
	sysMenuTable = require('./sysMenuTable'),
	sysMenuTableField = require('./sysMenuTableField'),
	sysMenuFunc = require('./sysMenuFunc'),
	sysMenuQueryCondition = require('./sysMenuQueryCondition');

models.sysEnum = new sysEnum();
models.sysDataType = new sysDataType();
models.sysMenu = new sysMenu();
var menuTable = models.sysMenuTable = new sysMenuTable();
var menuTableField = models.sysMenuTableField = new sysMenuTableField();
var sysMenuFunc = models.sysMenuFunc = new sysMenuFunc();
models.sysMenuQueryCondition = new sysMenuQueryCondition();


module.exports = models;
