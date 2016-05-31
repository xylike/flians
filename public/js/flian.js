/*
  依赖jquery、layer插件
*/

;(function(window, $, layer){
	'use strict';

	window.flian = function(){};

	var alertErrorMsg = function(msg){
		layer.msg(msg, {
			icon:2,
			time:2000
		});
	};

	flian.showAjaxErrorMsg = function(status, msg){
		if(status===404){
            alertErrorMsg('API接口' +(msg||' ') +'丢失!');
        }
        else if(status===500){
            alertErrorMsg('API接口' +(msg||' ') +'出现BUG!');
        }
        else{
            alertErrorMsg(status + (msg||''));
        }
	};

	flian.showErrorMsg = function(msg){
		alertErrorMsg(msg);
	};
	flian.showInfoMsg = function(msg){
		layer.msg(msg, {
			icon:1,
			time:2000
		});
	}; 
})(window, window.jQuery, window.layer);

