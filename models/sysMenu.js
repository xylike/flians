'use strict';
var _ = require('lodash');
var mysql = require('../common/mysql');

var sysMenu = function(){
	this.options = {
		name: 'ok'
	}; 
};

Object.defineProperty(sysMenu.prototype, 'tableName', {
	get: function(){
		return 'sys_menu';
	}
});
Object.defineProperty(sysMenu.prototype, 'comment', {
	get: function(){
		return '系统菜单表';
	}
});
Object.defineProperty(sysMenu.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});

/*Model*/
Object.defineProperty(sysMenu.prototype, 'columns', {
	get: function(){
		return [
			{
				cFieldName: 'autoId',
				cDataType: 'int',
				bIsPrimaryKey: true,
				bIsAutoIncrement: true,
				cFieldDesc: '主键，自动编号'
			},
			{
				cFieldName: 'cMenuCode',
				cDataType: 'varchar',
				iDataLength: 12,
				cFieldDesc: '菜单编码',
				bIsNull: false,
				bIsUnique: true
			},
			{
				cFieldName: 'cMenuName',
				cDataType: 'varchar',
				iDataLength: 60,
				cFieldDesc: '菜单名称',
				bIsNull: false
			},
			{
				cFieldName: 'cParentMenuCode',
				cDataType: 'varchar',
				iDataLength: 12,
				cFieldDesc: '上级菜单编码',
				bIsNull: false
			},
			{
				cFieldName: 'cTplType',
				bIsEnum: true,
				cEnumString: "'gv','vch','tcf','tnf','tef','def'",
				cFieldDesc: '模板类型',
				bIsNull: false,
				cDefaultValue: 'def'
			},
			{
				cFieldName: 'cUrl',
				cDataType: 'varchar',
				iDataLength: 255,
				cFieldDesc: '页面地址',
				cDefaultValue: ''
			},
			{
				cFieldName: 'cParams',
				cDataType: 'varchar',
				iDataLength: 600,
				cDefaultValue: '',
				cFieldDesc: '参数'
			},
			{
				cFieldName: 'cIconCls',
				cDataType: 'varchar',
				iDataLength: 100,
				cDefaultValue: '',
				cFieldDesc: '图标'
			},
			{
				cFieldName: 'iMenuIndex',
				cDataType: 'int',
				cDefaultValue: '0',
				cFieldDesc: '索引'
			}
		];
	}
});


/*创建表*/
sysMenu.prototype.createTable = function(){
   	return mysql.createTable(this.tableName, this.columns, {
   		engine: this.engine,
   		comment: this.comment
   	});
};




module.exports = sysMenu;