var mysql = require('../common/mysql');
var assert = require('chai').assert;
describe('mysql', function() {
  describe('#IsExistDatabase', function(){
    it('数据库是否存在，应该返回true', function(done){
      mysql.IsExistDatabase('my_testdb').then(function(result){
        assert.equal(true, result);
        done();
      })
      .catch(function(error){
        done(error);
      });
    });
  });

	describe('#deleteDatabase()', function(){
		it('删除一个数据库，不应该报错', function(done){
			mysql.deleteDatabase('my_testdb').then(function(result){
				done();
			})
			.catch(function(error){
				done(error);
			})
		});
	});
	describe('#createDatabase()', function(){
	  	it('创建一个数据库，不应该报错', function(done){
	  		mysql.createDatabase('my_testdb').then(function(result){
	  			done();
	  		})
	  		.catch(function(error){
	  			done(error);
	  		})
	  	});
  	});
  describe('#tableIsExists()', function () { 
    it('表存在,应该返回true', function(done){
      mysql.tableIsExists('sys_menu').then(function(result){
        assert.equal(true, result);
        done();
      })
      .catch(function(error){
        done(error);
      });
    });
  });
 
  describe('#createTable()', function(){
    it('创建表，应该返回true', function(done){
      var cols =  [
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
          bIsUnique: true,
          bIsPrimaryKey: true
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
          iDataLength: 60,
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

      mysql.createTable('tb_test', cols, { force:true })
      .then(function(result){ 
        assert.equal(true, result);
        done();
      })
      .catch(function(error){
        throw error;
        done(error);
      });
    });
  });

  describe('#addColumns()', function(){
    it('增加一个字段，应该返回true', function(done){ 
	      var columns = [{
	        cFieldName: 'birth',
	        cDataType: 'date',
	        cFieldDesc: '生日'
	      }];
	      mysql.addColumns('tb_test', columns).then(function(result){
          assert.equal(true, result);
	        done();
	      })
	      .catch(function(err){
	        console.log(err.toString()); 
          done(err)
	      });
    });
    it('增加多个字段，应该返回true', function(done){ 
	      var columns = [{
	        cFieldName: 'married',
	        bIsEnum: true,
	        cEnumString: '\'1\', \'0\'',
	        cFieldDesc: '是否已婚'
	      },{
	        cFieldName: 'address',
	        cDataType: 'varchar',
	        iDataLength: 255,
	        cFieldDesc: '地址'
	      },{
	        cFieldName: 'Email',
	        cDataType: 'varchar',
	        iDataLength: '100',
	        cFieldDesc: '邮箱'
	      }];
	      mysql.addColumns('tb_test', columns).then(function(result){
          assert.equal(true, result);
	        done();
	      })
	      .catch(function(err){
	          console.log(err.toString());
            done(err);
	      });
    });
  });

  describe('#deleteTable()', function(){
    it('删除一个表，应该返回true', function(done){
      mysql.deleteTable('a').then(function(result){ 
        assert.equal(true, result);
        done();
      })
      .catch(function(error){
        done(error);
      });
    });
  });

  describe('#deleteColumns()', function(){
    it('删除一列，应该返回true', function(done){ 
	      mysql.deleteColumns('tb_test', ['birth']).then(function(result){ 
          assert.equal(true, result);
	        done();
	      })
	      .catch(function(error){ 
	        done(error);
	      });
    });  
    it('删除多列，应该返回true', function(done){ 
	       mysql.deleteColumns('tb_test', ['Email', 'address'])
	       .then(function(result){
            assert.equal(true, result);
	          done();
	       })
	       .catch(function(error){
	          done(error);
	       }); 
    });
  });
  describe('#modifyColumns()', function(){ 
    it('修改列，应该返回true', function(done){ 
	      mysql.modifyColumns('tb_test', [
	        {
	          cFieldName: 'cUrl',
	          cDataType: 'varchar',
	          iDataLength: 50,
	          cFieldDesc: '页面地址xxxxx',
	          cDefaultValue: 'ffff'
	        },
	        {
	          cFieldName: 'cParams',
	          cDataType: 'varchar',
	          iDataLength: 90,
	          cDefaultValue: 'sdf',
	          cFieldDesc: 'xxcsdf'
	        }
	      ]).then(function(result){
          assert.equal(true, result);
	        done();
	      }).catch(function(error){
	        done(error);
	      })
    });
  });
  
  describe('#mysql.truncate()', function(){
    it('清空的所有数据, 应该返回true', function(done){
      mysql.truncate('tb_test').then(function(result){
        assert.equal(true, result);
        done();
      })
      .catch(function(error){
        console.error(error);
        done(error);
      })
    });
  })
   

  describe('#mysql.findAll()', function(){
    it('不提供参数时，应该返回false', function(done){
       mysql.findAll({tableName: 'sys_menu'}).then(function(rows){ 
          console.log(Object.getOwnPropertyNames(rows[0]));
          done();
       })
       .catch(function(error){  
          done(error);
       }); 
    });
  });

describe('#mysql.test2()', function(){
    it('不提供参数时，应该返回false', function(done){
       mysql.test2().then(function(rows){ 
          console.log(rows);
          done();
       })
       .catch(function(error){  
          console.log('哈哈哈');
          done(error);
       }); 
    });
  });
});