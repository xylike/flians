'use strict';

var mysql = require('../common/mysql');

var sysMenuQueryCondition = function(){};

Object.defineProperty(sysMenuQueryCondition.prototype, 'tableName', {
	get: function(){
		return 'sys_menuquerycondition';
	}
});

Object.defineProperty(sysMenuQueryCondition.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});

Object.defineProperty(sysMenuQueryCondition.prototype, 'comment', {
	get: function(){
		return '查询条件表';
	}
});


Object.defineProperty(sysMenuQueryCondition.prototype, 'columns', {
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
				cFieldName: 'cFieldName',
				cFieldDesc: '字段名称',
				cDataType: 'varchar',
				iDataLength: 60,
				bIsNull: false
			},
			{
				cFieldName: 'cFieldDesc',
				cFieldDesc: '字段描述',
				cDataType: 'varchar',
				iDataLength: 50,
				bIsNull: false
			},
			{
				cFieldName: 'cFieldType',
				cFieldDesc: '字段类型',
				cDataType: 'varchar',
				iDataLength: 30,
				bIsNull: false,
				cDefaultValue: 'varchar'
			},
			{
				cFieldName: 'bIsNeed',
				cFieldDesc: '是否必输',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsRange',
				cFieldDesc: '是否区间',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'cCompareOperator',
				cFieldDesc: '比较符',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'like'",
				cDefaultValue: 'eq'
			},
			{
				cFieldName: 'cDefaultValue',
				cFieldDesc: '缺省值',
				cDataType: 'varchar',
				iDataLength: 50,
				cDefaultValue: '0'
			}
		];
	}
});


sysMenuQueryCondition.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};

module.exports = sysMenuQueryCondition;