'use strict';

var mysql = require('../common/mysql');

var sysEnum = function(){

};

Object.defineProperty(sysEnum.prototype, 'tableName',{
	get: function(){
		return 'sys_enum';
	}
});
Object.defineProperty(sysEnum.prototype, 'comment', {
	get: function(){
		return '枚举表';
	}
});
Object.defineProperty(sysEnum.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});
Object.defineProperty(sysEnum.prototype, 'columns', {
	get: function(){
		return [
			{
				cFieldName: 'cEnumType',
				cFieldDesc: '枚举类型',
				cDataType: 'varchar',
				iDataLength: 50,
				bIsPrimaryKey: true
			},
			{
				cFieldName: 'cEnumCode',
				cFieldDesc: '枚举编码',
				cDataType: 'varchar',
				iDataLength: 12,
				bIsPrimaryKey: true
			},
			{
				cFieldName: 'cEnumName',
				cFieldDesc: '枚举名称',
				cDataType: 'varchar',
				iDataLength: '60',
				cDefaultValue: ''
			},
			{
				cFieldName: 'iEnumIndex',
				cFieldDesc: '索引',
				cDataType: 'int',
				cDefaultValue: '0'
			}
		];
	}
});

/*创建表*/

sysEnum.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};

module.exports = sysEnum;