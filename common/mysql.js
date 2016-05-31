'use strict';
/*创建视图、修改视图、删除视图，创建存储过程、修改存储过程、删除存储过程等,待完善*/
var mysql = require('mysql');
var _ = require('lodash');
var config = require('../config');

var mysqlHelper = module.exports = function(options){
	this.options = options || {}; 
};

var _pool = mysqlHelper.pool = mysql.createPool({
	connectionLimit: config.connectionLimit,
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	multipleStatements: config.multipleStatements
});



var _createColumn = function(col){
	var strCol = [];
	strCol.push(mysql.escapeId(col.cFieldName));
	if(col.cDataType){
		strCol.push(col.cDataType);
		if(col.iDataLength){
			strCol.push('(' + col.iDataLength + ')');
		} 
	} 
	if(col.bIsAutoIncrement === true){
		strCol.push(' AUTO_INCREMENT');
	}

	if(col.bIsEnum === true){
		strCol.push(' ENUM(' + col.cEnumString + ')')
	}
	if(col.bIsUnique === true){
		strCol.push(' UNIQUE');
	}

	if(col.bIsNull === false){
		strCol.push(' NOT NULL');
	}
	if(col.cDefaultValue){
		strCol.push(' DEFAULT \'' + col.cDefaultValue + '\'');
	}
	if(col.cFieldDesc){
		strCol.push(' COMMENT \'' + col.cFieldDesc + '\'');
	}
	return strCol.join('');
};



var _query = mysqlHelper.query = function(sql, values){ 
	return new Promise(function(resolve, reject){
		_pool.getConnection(function(err, connection){
			if(err) return reject(err);
			connection.query(sql, values, function(err, rows){
				if(err){
					reject(err);
				}
				else{
					resolve(rows);
				}
				connection.release();
			});
		});
	});
}

mysqlHelper.escapeId = function(identifier){  
	return mysql.escapeId(identifier);
};

mysqlHelper.escape = function(value){
	return mysql.escape(value);
};

mysqlHelper.format = function(sql, inserts){
	return mysql.format(sql, inserts);
};
/*判断数据库是否存在，存在则返回true,否则返回false*/
mysqlHelper.IsExistDatabase = function(dbname){
	var sql = mysql.format('SELECT count(1) as dbCount FROM information_schema.SCHEMATA where SCHEMA_NAME=?;', [dbname]);
	var connection = mysql.createConnection({
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.password,
		database: 'mysql'
	});
	return new Promise(function(resolve, reject){
		connection.query(sql, function(err, rows){
			if(err) {
				reject(err);
			}
			else
			{
				if(rows.length > 0){
					if(rows[0].dbCount === 1) 
						resolve(true);
					else
					  	resolve(false);
				}
				else{
					resolve(false);
				}
			} 
		});
	});
};
/*创建一个数据库*/
mysqlHelper.createDatabase = function(dbname){ 
	return new Promise(function(resolve, reject){ 
		var connection = mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: 'mysql'
		});
		var strSql = 'CREATE DATABASE ' + mysql.escapeId(dbname) + ' DEFAULT CHARSET ' + (config.charset||'UTF8') + ';';
		if(config.currentEnv===(config.devEnv||'development') 
			|| config.currentEnv===(config.initEnv||'init')){
			console.log('#mysql.createDatabase() : ' + strSql);
		}
		connection.query(strSql, function(err, rows){
			if(err) return reject(err);
			return resolve(true);
		});
	}); 
};
/*删除一个数据库*/
mysqlHelper.deleteDatabase = function(dbname){ 
	return new Promise(function(resolve, reject){
		var connection = mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: 'mysql'
		});
		var strSql = 'DROP DATABASE IF EXISTS ' + mysql.escapeId(dbname) + ';';
		if(config.currentEnv===(config.devEnv||'development') 
			|| config.currentEnv===(config.initEnv||'init')){
			console.log('#mysql.deleteDatabase() : ' + strSql);
		}
		connection.query(strSql, function(err, rows){
			if(err) return reject(err);
			return resolve(true);
		});
	});
};

/*判断表时是否存在，存在返回true,否则返回false*/
mysqlHelper.tableIsExists = function(tableName){ 
	return new Promise(function(resolve, reject){
		_pool.getConnection(function(err, connection){
			var sql = mysql.format('select count(1) as tableCount from information_schema.TABLES where table_schema=? and table_name=?',[config.database, tableName]);
			connection.query(sql, function(err, rows){
				if(err){
					reject(err);
				}
				else{ 
					if(rows.length > 0){
						if(rows[0].tableCount === 1) 
							resolve(true);
						else
						  	resolve(false);
					}
					else{
						resolve(false);
					} 
				}
				connection.release();
			});
		});
	});
};

/*创建表*/
mysqlHelper.createTable = function(tableName, columns, options){
	options = _.assign({
		force: false,
		engine: config.engine || 'InnoDB',
		charset: config.charset || 'utf-8',
		comment: options.comment || ''
	}, options || {});
	var sql = [];
	if(options.force){
		sql.push('DROP TABLE IF EXISTS ');
		sql.push(mysql.escapeId(tableName));
		sql.push(';');
	}
	sql.push('CREATE TABLE ');
	sql.push(mysql.escapeId(tableName));
	sql.push(' (');
	
	var primaryKeyCols = [], indexCols = [];
	columns.forEach(function(col, i){
		sql.push(_createColumn(col));
		if(col.bIsPrimaryKey === true){
			primaryKeyCols.push(col);
		}
		if(col.bIsIndex === true){
			indexCols.push(col);
		}
		if(i < columns.length-1){
			sql.push(',');
		}
	});
	var strPrimaryKeys = '';
	primaryKeyCols.forEach(function(col, i){
		strPrimaryKeys += mysql.escapeId(col.cFieldName);
		if(i < primaryKeyCols.length - 1){
			strPrimaryKeys += ',';
		}
	});
	if(strPrimaryKeys !== ''){
		sql.push(', PRIMARY KEY(');
		sql.push(strPrimaryKeys);
		sql.push(')');
	}
	indexCols.forEach(function(col, i){
		sql.push(', KEY(');
		sql.push(mysql.escapeId(strIndex));
		sql.push(')');
	}); 
	sql.push(') ENGINE=');
	sql.push(options.engine);
	sql.push(' DEFAULT CHARSET=');
	sql.push(options.charset);
	sql.push(' COMMENT=');
	sql.push(mysql.escape(options.comment));
	sql.push(';')
	var strSql = sql.join('');
	if(config.currentEnv===(config.devEnv||'development') 
		|| config.currentEnv===(config.initEnv||'init')){
		console.log('#mysql.createTable() : ' + strSql);
	}
	return _query(strSql).then(function(){
		return true;
	});
};
/*删除表*/
mysqlHelper.deleteTable = function(tableName){
	var sql = [];
	sql.push('DROP TABLE IF EXISTS ');
	sql.push(mysql.escapeId(tableName));
	sql.push(';');
	var strSql = sql.join('');
	if(config.currentEnv===(config.devEnv||'development') 
		|| config.currentEnv===(config.initEnv||'init')){
		console.log('#mysql.deleteTable() : ' + strSql);
	}
	return _query(strSql).then(function(){
		return true;
	});
};


/*增加列*/
mysqlHelper.addColumns = function(tableName, columns){ 
	var me = this;
	var sql = [];
	columns.forEach(function(column){
		sql.push('ALTER TABLE ');
		sql.push(mysql.escapeId(tableName));
		sql.push(' ADD ');
		sql.push(_createColumn(column));
		sql.push(';');
	}); 
	var strSql = sql.join('');
	if(config.currentEnv===(config.devEnv||'development') 
		|| config.currentEnv===(config.initEnv||'init')){
		console.log('#mysql.addColumns() : ' + strSql);
	}
	return _query(strSql).then(function(){
		return true;
	});
};

/*修改列*/
mysqlHelper.modifyColumns = function(tableName, columns){ 
	var me = this;
	var sql = [];
	columns.forEach(function(column){
		sql.push('ALTER TABLE ');
		sql.push(mysql.escapeId(tableName));
		sql.push(' MODIFY ');
		sql.push(_createColumn(column));
		sql.push(';');
	});
	var strSql = sql.join('');
	if(config.currentEnv===(config.devEnv||'development') 
		|| config.currentEnv===(config.initEnv||'init')){
		console.log('#mysql.modifyColumns() : ' + strSql);
	}
	return _query(strSql).then(function(){
		return true;
	});
};
/*删除列*/
mysqlHelper.deleteColumns = function(tableName, columnNames){ 
	var me = this;
	var sql = [];
	columnNames.forEach(function(columnName){
		sql.push('ALTER TABLE ');
		sql.push(mysql.escapeId(tableName));
		sql.push(' DROP COLUMN ');
		sql.push(mysql.escapeId(columnName));
		sql.push(';');
	});  
	var strSql = sql.join('');
	if(config.currentEnv===(config.devEnv||'development') 
		|| config.currentEnv===(config.initEnv||'init')){
		console.log('#mysql.deleteColumns() : ' + strSql);
	}
	return _query(strSql).then(function(){
		return true;
	}); 
};

/**
* 执行多条SQL，实现事务
*/
mysqlHelper.queryTrans = function(array){ 
	return new Promise(function(resolve, reject){
		_pool.getConnection(function(err, connection){
			if(err) reject(err);
			connection.beginTransaction(function(err){
				if(err){
					connection.release();
					reject(err);
				}
				else{
					connection.query(array.join(''), function(err, results){
						if(err) {
							connection.rollback(function(){ 
								connection.release();
								resolve({status: false, error: err});
							});
						}
						else{
							connection.commit(function(err){
								if(err){
									connection.rollback(function(){ 
									 	connection.release();
									 	resolve({status: false, error: err});
									});
								}
								else{
									var affectedRows = 0;
									results.forEach(function(result){
										affectedRows += result.affectedRows; 
									});
									connection.release();
									resolve({status: true, affectedRows: affectedRows});
								}
							});
						}	
					}); 
				}
			}); 
		});
	}); 
}; 

/*清空一个表*/
mysqlHelper.truncate = function(tableName){
	var sql = 'TRUNCATE TABLE ' + mysql.escapeId(tableName) + ';';
	return _query(sql).then(function(result){
		return true;
	});
};

 
var _strField = function(tableName, field){
	var str = [];
	if(tableName){
		str.push(mysql.escapeId(tableName));
		str.push('.');
	}
	if(field === '*'){
		str.push('*');
	}
	else{
		str.push(mysql.escapeId(field)); 
		if(tableName){ 
			str.push(' AS `' + tableName + '.' + field + '`');
		}
	}	

	return str.join('');
}
var _selectFields = function(options, isComplexSql){
	options = _.assign({
		tableName: '',
		alias: '',
		fields: [],
		include:[]
	}, options || {}); 
	isComplexSql = isComplexSql || false;
	var tableName = options.alias ? options.alias : options.tableName;  
	var str = [];
	var length = options.fields.length;
	if(length > 0){
		if(options.fields instanceof Array){
			var lastIndex = length - 1;
			options.fields.forEach(function(field, i){
				if(isComplexSql || options.alias){ 
					str.push(_strField(tableName, field));
				} 
				else{
					str.push(_strField('', field));
				} 
				if(i < lastIndex){
					str.push(',');
				}
			});
		}
		else{
			if(isComplexSql || options.alias){ 
				str.push(_strField(tableName, '*'));
			} 
			else{
				str.push(_strField('', '*'));
			} 
		}
	}
	else{
		if(isComplexSql  || options.alias){ 
			str.push(_strField(tableName, '*'));
		} 
		else{
			str.push(_strField('', '*'));
		} 
	}

	if(options.include instanceof Array){	
		options.include.forEach(function(item){
			str.push(',');
			str.push(_selectFields(item, isComplexSql));
		});
	}
	return str.join('');
};
var _strTable = function(tableName, alias){
	var str = [];
	str.push(mysql.escapeId(tableName)); 
	if(alias){ 
		str.push(' AS ');
		str.push(mysql.escapeId(alias));
	} 
	return str.join('');
};
var _strJoin = function(include){ 
	var str = []; 
	if(include instanceof Array){	
		include.forEach(function(item){
			if(item.join){
				str.push(' ');
				var joinString = item.join.toUpperCase();
			 	var joinValidString = 'LEFT,JOIN,INNER';
			 	if(joinValidString.indexOf(joinString)===-1){
			 		joinString = 'LEFT';
			 	}

				str.push(joinString);
				str.push(' JOIN ');
			}
			else{
				str.push(' LEFT JOIN ');
			}  
			str.push(_strTable(item.tableName, item.alias, true));  
			if(!item.relations) throw new Error('缺少连接条件');
			str.push(' ON ');
			var strOnWhere = []; 
			item.relations.forEach(function(relation, i){
				if(relation.length < 2) return;
				if(strOnWhere.length > 0){
					strOnWhere.push((' AND '));
				}
				strOnWhere.push(mysql.escapeId(relation[0]));
				strOnWhere.push(' = ');
				strOnWhere.push(mysql.escapeId(relation[1]));
			});
			str.push(strOnWhere.join(''));

			str.push(_strJoin(item.include));
		});
	}
		
	return str.join('');
};
var _op = function(opk, opv){
	var str = '';
	switch (opk) {
	    case '$eq':
	    	str = (' = ' + mysql.escape(opv)) || 'IS NULL';
	    	break;
	    case '$ne':
	     	str = (' != ' +  mysql.escape(opv)) || 'IS NOT NULL';
	     	break;
	    case '$gt':
	    	str = ' > ' +  mysql.escape(opv);
	    	break;
	    case '$lt':
	    	str = ' < ' +  mysql.escape(opv);
	    	break;
	    case '$gte':
	    	str = ' >= ' +  mysql.escape(opv);
	    	break;
	    case '$lte':
	    	str = ' <= ' +  mysql.escape(opv);
	    	break;
	    case '$between':
	    	str = ' BETWEEN ' +  mysql.escape(opv[0]) + ' AND ' +  mysql.escape(opv[1]);
	    	break;
	    case '$notBetween':
	    	str = ' NOT BETWEEN ' +  mysql.escape(opv[0]) + ' AND ' +  mysql.escape(opv[1]);
	    	break;
	    case '$in':
	    	str = ' IN (' + mysql.escape(opv) + ')';
	    	break;
	    case '$notIn':
	    	str = ' NOT IN (' +  mysql.escape(opv) + ')';
	    	break;
	    case '$like':
	    	str = ' LIKE ' +  mysql.escape(opv);
	    	break;
	    case '$notLike':
	    	str = ' NOT LIKE ' +  mysql.escape(opv);
	    	break;
	}
	return str; 
};
var _translate = function(where){
	if(!(where instanceof Object) && (where instanceof Array)) return '1 = 0 AND ';
	var str = []; 
	for(var k in where){
		var v = where[k];
		if(k.charAt(0) !== '$'){
			/*表字段*/  
			if(typeof v === 'boolean'){
				v = v ? '1' : '0';
			} 
			if(typeof v === 'string' || typeof v === 'number'){
				v = {'$eq': v};
			}
			else if(v instanceof Array){
				v = {'$in': v};
			}
			for(var opk in v){
				var opv = v[opk];
				str.push(mysql.escapeId(k));
				str.push(_op(opk, opv));
				str.push(' AND ');
			}
		}
		else if(k === '$and'){
			/*逻辑操作符处理*/
			for(var item in v){
				str.push(_translate(item));
				str.push(' AND ');
			}
		}
		else if(k === '$or'){ 
			for(var item in v){
				str.push(_translate(item));
				str.push(' OR ');
			} 
		}
		else if(k === '$not'){
			str.push(' NOT ');
			for(var item in v){
				str.push(_translate(item));
				str.push(' AND ');
			}
		}
	} 
	return str.join('');
};
var _strWhere = function(options){
	options = _.assign({
		include:[],
		where:{}
	}, options || {});
	var str = [];
	str.push(_translate(options.where));
	options.include.forEach(function(item){
		str.push(_strWhere(item));
	});
	return str.join('');
};
var _selectSql = function(options){ 
	options = _.assign({
		tableName: '',
	 	alias: '',
		fields: [],
		include:[],
		where: {},
		order:[]
	}, options || {});  
	var sql = [];
	sql.push('SELECT '); 
	var isComplexSql = options.include.length > 0 ? true : false;
	sql.push(_selectFields(options, isComplexSql));
	sql.push(' FROM ');
	sql.push(_strTable(options.tableName, options.alias)); 
	sql.push(_strJoin(options.include));

	sql.push(' WHERE ');  
	sql.push(_strWhere(options));
	sql.push(' 1 = 1');

	if(options.order instanceof Array){ 
		var strOrder = [];
		var lastIndex = options.order.length - 1;
		options.order.forEach(function(item, i){
			if(item.length === 0) return;
			strOrder.push(mysql.escapeId(item[0]));
			if(item[1]){
				strOrder.push(' ');
				strOrder.push(item[1].toUpperCase());
			}
			if(i < lastIndex){
				strOrder.push(', ');
			}
		}); 
		if(strOrder.length > 0){
			sql.push(' ORDER BY ');
			sql.push(strOrder.join(''));
		}
		
	}

	return sql.join('');
};
var _pageSelectSql = function(options){
	var sql = [];
	sql.push(_selectSql(options));

	var pageSize = options.pageSize || config.pageSize;
	var pageIndex = options.pageIndex || 0;
	sql.push(' LIMIT ');
	sql.push(pageIndex * pageSize);
	sql.push(',');
	sql.push(pageSize);
	return sql.join('');
};

/**
 options结构:
{
	tableName: '表名',
	alias: '表别名',
	fields:[获取的字段名],
	include:[
		{
			tableName: '表名',
			alias: '别名',
			join: 'JOIN方式，默认为LEFT',
			relations:[
				['表名或表别名.字段', '表名或别名.字段']
			]
		}
	],
	//where条件参照sequelize
	where:{
		'表名或别名.字段': 数值
	}
}
*/

mysqlHelper.findAll = function(options){
	return new Promise(function(resolve, reject){
		var sql = '';
		try{
			sql = _selectSql(options);
		}
		catch(error){ 
			return reject(error);
		}  
		_query(sql).then(function(rows){
			resolve(rows);
		})
		.catch(function(error){
			reject(error);
		});
	}); 
};
mysqlHelper.findByPage = function(options){
	return new Promise(function(resolve, reject){
		var sql = '';
		try{
			sql = _pageSelectSql(options);
		}
		catch(error){
			return reject(error);
		}
		
		_query(sql).then(function(rows){
			resolve(rows);
		})
		.catch(function(error){
			reject(error);
		});
	}); 
};

/*增加一条记录*/
mysqlHelper.add = function(tableName, record){ 
	return _query('INSERT INTO ' + mysql.escapeId(tableName) + ' SET ?', record)
	.then(function(result){
		return result.insertId;
	});
};

/*增加多条记录,无事务*/
mysqlHelper.bulkAdd = function(tableName, records){  
	return new Promise(function(resolve, reject){
		if(!(records instanceof Array)) 
			return reject(new Error('方法参数要求为Json数组.'));
		var sql = [];
		records.forEach(function(record){
		 	sql.push(mysql.format('INSERT INTO ' + mysql.escapeId(tableName) + ' SET ?;', record));
		}); 
		_query(sql.join('')).then(function(results){
			var affectedRows = 0;
			results.forEach(function(result){
				affectedRows += result.affectedRows; 
			});
			resolve(affectedRows);
		})
		.catch(function(error){
			reject(error);
		});
	});
};
/*增加多条记录,实现事务*/
mysqlHelper.bulkAddTrans = function(tableName, records){  
	return new Promise(function(resolve, reject){
		if(!(records instanceof Array)) 
			return reject(new Error('方法参数要求为Json数组.'));
		var sql = [];
		records.forEach(function(record){
		 	sql.push(mysql.format('INSERT INTO ' + mysql.escapeId(tableName) + ' SET ?;', record));
		});  
		_pool.getConnection(function(err, connection){
			if(err) reject(err);
			connection.beginTransaction(function(err){
				if(err){
					connection.release();
					reject(err);
				}
				else{
					connection.query(sql.join(''), function(err, results){
						if(err) {
							connection.rollback(function(){ 
								connection.release();
								resolve({status: false, error: err});
							});
						}
						else{
							connection.commit(function(err){
								if(err){
									connection.rollback(function(){ 
									 	connection.release();
									 	resolve({status: false, error: err});
									});
								}
								else{
									var affectedRows = 0;
									results.forEach(function(result){
										affectedRows += result.affectedRows; 
									});
									connection.release();
									resolve({status: true, affectedRows: affectedRows});
								}
							});
						}	
					}); 
				}
			}); 
		});
	}); 
};


/**
* 增加多条记录，实现事务
* records格式如：[{tableName:'t1', rows:[...]}, {tableName:'t2', rows:[...]}]
*/
/*mysqlHelper.bulkAddTrans = function(records){
	return new Promise(function(resolve, reject){
		if(!(records instanceof Array)) 
			return reject(new Error('方法参数要求为Json数组.'));
		var sql = []; 
		records.forEach(function(record){
			record.rows.forEach(function(row){ 
				sql.push(mysql.format('INSERT INTO ' + mysql.escapeId(record.tableName) + ' SET ?;', row));
			});
		});
		_pool.getConnection(function(err, connection){
			if(err) reject(err);
			connection.beginTransaction(function(err){
				if(err){
					connection.release();
					reject(err);
				}
				else{
					connection.query(sql.join(''), function(err, results){
						if(err) {
							connection.rollback(function(){ 
								connection.release();
								resolve({status: false, error: err});
							});
						}
						else{
							connection.commit(function(err){
								if(err){
									connection.rollback(function(){ 
									 	connection.release();
									 	resolve({status: false, error: err});
									});
								}
								else{
									var affectedRows = 0;
									results.forEach(function(result){
										affectedRows += result.affectedRows; 
									});
									connection.release();
									resolve({status: true, affectedRows: affectedRows});
								}
							});
						}	
					}); 
				}
			}); 
		});
	}); 
};*/


mysqlHelper.remove = function(tableName, where){
	return new Promise(function(resolve, reject){
		var sql = [];
		try{
			sql.push( 'DELETE FROM ');
			sql.push(mysql.escapeId(tableName));
			sql.push(' WHERE ');
			sql.push(_translate(where));
			sql.push(' 1 = 1');
		}
		catch(error){
			return reject(error);
		}
		resolve(_query(sql.join('')));
	});
};

 