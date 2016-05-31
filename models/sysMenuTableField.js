'use strict';

var mysql = require('../common/mysql');

var sysMenuTableField = function(){

};

Object.defineProperty(sysMenuTableField.prototype, 'tableName', {
	get: function(){
		return 'sys_menutablefield';
	}
});
Object.defineProperty(sysMenuTableField.prototype, 'engine', {
	get: function(){
		return 'MyISAM';
	}
});
Object.defineProperty(sysMenuTableField.prototype, 'comment', {
	get: function(){
		return '菜单Table表的字段表';
	}
});
Object.defineProperty(sysMenuTableField.prototype, 'columns', {
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
				cFieldName: 'cTableName',
				cFieldDesc: '所属表名称',
				cDataType: 'varchar',
				iDataLength: 60,
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
				bIsNull: null
			},
			{
				cFieldName: 'cDataType',
				cFieldDesc: '数据类型',
				cDataType: 'varchar',
				iDataLength: 30,
				bIsNull: false,
				defaultValue: 'varchar'
			},
			{
				cFieldName: 'iDataLength',
				cFieldDesc: '数据长度',
				cDataType: 'int',
				bIsNull: false,
				cDefaultValue: '50'
			},
			{
				cFieldName: 'iDecimalDigits',
				cFieldDesc: '小数位',
				cDataType: 'int',
				bIsNull: false,
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsPrimaryKey',
				cFieldDesc: '是否为主键',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsNull',
				cFieldDesc: '是否允许为空',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bIsUnique',
				cFieldDesc: '是否唯一',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsIndex',
				cFieldDesc: '是否设置为索引列',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsAutoIncrement',
				cFieldDesc: '是否为自增列',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'cDefaultValue',
				cFieldDesc: '默认值',
				cDataType: 'varchar',
				iDataLength: 255,
				cDefaultValue: ''
			},
			{
				cFieldName: 'iFieldIndex',
				cFieldDesc: '字段索引',
				cDataType: 'int',
				cDefaultValue: '0'
			},
			{
				cFieldName: 'iColumnWidth',
				cFieldDesc: '列宽',
				cDataType: 'int',
				cDefaultValue: '100'
			},
			{
				cFieldName: 'cTextAlign',
				cFieldDesc: '对齐方式',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'left', 'center', 'right'",
				cDefaultValue: 'left'
			},
			{
				cFieldName: 'cOrderType',
				cFieldDesc: '排序方式',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'ASC', 'DESC'",
				cDefaultValue: 'DESC'
			},
			{
				cFieldName: 'cReferType',
				cFieldDesc: '参照类型',
				cDataType: 'varchar',
				iDataLength: 50,
				cDefaultValue: ''
			},
			{
				cFieldName: 'bIsEditable',
				cFieldDesc: '是否可编辑',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bIsHidden',
				cFieldDesc: '是否隐藏',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'bIsListField',
				cFieldDesc: '是否为列表字段',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '1'
			},
			{
				cFieldName: 'bIsEnum',
				cFieldDesc: '是否为枚举',
				bIsNull: false,
				bIsEnum: true,
				cEnumString: "'1', '0'",
				cDefaultValue: '0'
			},
			{
				cFieldName: 'cEnumString',
				cFieldDesc: '枚举值',
				cDataType: 'varchar',
				iDataLength: 255,
				cDefaultValue: ''
			},
			{
				cFieldName: 'cEnumType',
				cFieldDesc: '枚举类型',
				cDataType: 'varchar',
				iDataLength: 50,
				cDefaultValue: ''
			},
			{
				cFieldName: 'cFormatText',
				cFieldDesc: '显示格式',
				cDataType: 'varchar',
				iDataLength: 30,
				cDefaultValue: ''
			},
			{
				cFieldName: 'cBelongToGroupName',
				cFieldDesc: '所属分组名称',
				cDataType: 'varchar',
				iDataLength: 30,
				cDefaultValue: ''
			},
			{
				cFieldName: 'cCtrlType',
				cFieldDesc: '控件类型',
				cDataType: 'varchar',
				iDataLength: 60,
				cDefaultValue: 'text'
			},
			{
				cFieldName: 'cCtrlData',
				cFieldDesc: '控件数据源',
				cDataType: 'varchar',
				iDataLength: 800,
				cDefaultValue: '[]'
			}
		];
	}
});

/*创建表*/
sysMenuTableField.prototype.createTable = function(){
	return mysql.createTable(this.tableName, this.columns, {
		engine: this.engine,
		comment: this.comment
	});
};

module.exports = sysMenuTableField;
