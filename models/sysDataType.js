'use strict';

var mysql = require('../common/mysql');

var sysDataType = function(){

};

Object.defineProperty(sysDataType.prototype, 'tableName', {
	get: function(){
		return 'sys_datatype';
	}
});
Object.defineProperty(sysDataType.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});
Object.defineProperty(sysDataType.prototype, 'comment', {
	get: function(){
		return '字段类型预设表';
	}
});
Object.defineProperty(sysDataType.prototype, 'columns', {
	get: function(){
		return [
			{
				cFieldName: 'autoId', 
				cFieldDesc: '编号',
				cDataType: 'int',
				bIsPrimaryKey: true,
				bIsAutoIncrement: true
			},
			{
				cFieldName: 'cDataTypeName',
				cFieldDesc: '数据类型',
				cDataType: 'varchar',
				iDataLength: 30,
				bIsNull: false,

				cCtrlType: 'selectbox',
				cCtrlData: '[{"id": "varchar", "text": "文本"},{"id": "int", "text": "整型"}]'
			},
			{
				cFieldName: 'cDataTypeDesc',
				cFieldDesc: '类型描述',
				cDataType: 'varchar',
				iDataLength: 12,
				bIsNull: false,

				cCtrlType: 'text'
			},
			{
				cFieldName: 'iDataLength',
				cFieldDesc: '类型长度',
				cDataType: 'int',
				cDefaultValue: '50',

				cCtrlType: 'number'
			},
			{
				cFieldName: 'iDecimalDigits',
				cFieldDesc: '小数位数',
				cDataType: 'int',
				cDefaultValue: '0',

				cCtrlType: 'number'
			},
			{
				cFieldName: 'bIsPrimarykKey',
				cFieldDesc: '是否为主键',
				bIsEnum: true,
				cEnumString: "'1', '0'",
				bIsNull: false,
				cDefaultValue: '0',

				cCtrlType: 'radio',
				cCtrlData: '[{"name": "是", "value": "1"},{"name": "否", "value": "0", "checked": true}]'
			},
			{
				cFieldName: 'bIsNull',
				cFieldDesc: '是否允许为空',
				bIsEnum: true,
				cEnumString: "'1', '0'",
				bIsNull: false,
				cDefaultValue: '1',

				cCtrlType: 'radio',
				cCtrlData: '[{"name": "是", "value": "1", "checked": true},{"name": "否", "value": "0"}]'
			},
			{
				cFieldName: 'bIsUnique',
				cFieldDesc: '是否唯一',
				bIsEnum: true,
				cEnumString: "'1', '0'",
				bIsNull: false,
				cDefaultValue: '0',

				cCtrlType: 'radio',
				cCtrlData: '[{"name": "是", "value": "1"},{"name": "否", "value": "0", "checked": true}]'
			},
			{
				cFieldName: 'bIsIndex',
				cFieldDesc: '是否为索引',
				bIsEnum: true,
				cEnumString: "'1', '0'",
				bIsNull: false,
				cDefaultValue: '0',

				cCtrlType: 'radio',
				cCtrlData: '[{"name": "是", "value": "1"},{"name": "否", "value": "0", "checked": true}]'
			},
			{
				cFieldName: 'cDefaultValue',
				cFieldDesc: '默认值',
				cDataType: 'varchar',
				iDataLength: 255,
				cDefaultValue: '',
				cCtrlType: 'text'
			}
		];
	}
});

/*创建表*/
sysDataType.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};

/*保存*/
sysDataType.prototype.add = function(values){  
	return mysql.add(this.tableName, values);
};

module.exports = sysDataType;