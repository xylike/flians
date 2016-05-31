'use strict';

var mysql = require('../common/mysql');

var sysMenuFunc = function(){

};

Object.defineProperty(sysMenuFunc.prototype, 'tableName', {
	get: function(){
		return 'sys_menufunc';
	}
});
Object.defineProperty(sysMenuFunc.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});
Object.defineProperty(sysMenuFunc.prototype, 'comment', {
	get: function(){
		return '功能表';
	}
});
Object.defineProperty(sysMenuFunc.prototype, 'columns', {
	get: function(){
		return [
			{
				cFieldName: 'autoId',
				cFieldDesc: '主键，自动编号',
				cDataType: 'int',
				bIsPrimaryKey: true,
				bIsAutoIncrement: true
			},
			{
				cFieldName: 'cMenuCode',
				cFieldDesc: '所属菜单编码',
				cDataType: 'varchar',
				iDataLength: 12,
				bIsNull: false
			},
			{
				cFieldName: 'cFuncName',
				cFieldDesc: '功能名称',
				cDataType: 'varchar',
				iDataLength: 100,
				bIsNull: false
			},
			{
				cFieldName: 'cFuncDesc',
				cFieldDesc: '功能描述',
				cDataType: 'varchar',
				iDataLength: 60,
				bIsNull: false
			},
			{
				cFieldName: 'cIconCls',
				cFieldDesc: '图标',
				cDataType: 'varchar',
				iDataLength: 100,
				cDefaultValue: ''
			},
			{
				cFieldName: 'bIsAccessControl',
				cFieldDesc: '是否权限控制',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'cAccessCode',
				cFieldDesc: '权限编码',
				cDataType: 'varchar',
				iDataLength: 50,
				cDefaultValue: ''
			},
			{
				cFieldName: 'iFuncIndex',
				cFieldDesc: '索引',
				cDataType: 'int',
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bAddStatus',
				cFieldDesc: '新增状态',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bEditStatus',
				cFieldDesc: '修改状态',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bAuditStatus',
				cFieldDesc: '审核状态',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bBrowseStatus',
				cFieldDesc: '浏览状态',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			}
		];
	}
});


sysMenuFunc.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};

module.exports = sysMenuFunc;