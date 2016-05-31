'use strict';

var mysql = require('../common/mysql');


var sysMenuTable = function(){

};

Object.defineProperty(sysMenuTable.prototype, 'tableName', {
	get: function(){
		return 'sys_menutable';
	}
});
Object.defineProperty(sysMenuTable.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});
Object.defineProperty(sysMenuTable.prototype, 'comment', {
	get: function(){
		return '菜单对应的Table表';
	}
});
Object.defineProperty(sysMenuTable.prototype, 'columns', {
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
				cFieldName: 'cTableName',
				cFieldDesc: '表名称',
				cDataType: 'varchar',
				iDataLength: 60,
				bIsNull: false,
				bIsUnique: true
			},
			{
				cFieldName: 'bIsMainTable',
				cFieldDesc: '是否为主表',
				bIsEnum: true,
				cEnumString: "'1', '0'",
				bIsNull: false,
				cDefaultValue: '0'
			},
			{
				cFieldName: 'cTableDesc',
				cFieldDesc: '表描述或Tab标签名称',
				cDataType: 'varchar',
				iDataLength: 20,
				cDefaultValue: ''
			},
			{

				cFieldName: 'iTableIndex',
				cFieldDesc: '表索引',
				cDataType: 'int',
				cDefaultValue: '0'
			},
			{

				cFieldName: 'cEngine',
				cFieldDesc: '表存储引擎',
				cDataType: 'varchar',
				iDataLength: 30,
				cDefaultValue: 'InnoDB'
			}
		];
	}
});

/*创建表*/
sysMenuTable.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};


module.exports = sysMenuTable;