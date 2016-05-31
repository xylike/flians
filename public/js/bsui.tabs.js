;(function($){ 
    var _tabPrefix = 'bsui_tab_', _tabPanelPrefix = 'bsui_tabpanel_';
    var _stepWidth = 150; 
    var methods = {
        addTab: function(obj, options){
            if(!(options instanceof Object) || (options instanceof Array)) return;
            options = $.extend({
                id: new Date().getTime().toString(),
                title: '新建Tab',
                allowClose: true,
                content: '',
                iframe: true,
                url: ''
            }, options || {}); 
            obj.find('.active').removeClass('active');
            var tabId = _tabPrefix + options.id,
                tabPanelId = _tabPanelPrefix + options.id;
            var jqTab = $('#' + tabId),
                jqTabPanel = $('#' + tabPanelId);
            if(!jqTab[0]){
            	 /*创建新TAB*/
                jqTab = $('<li>', {
                    'id': tabId
                });

                var jqA =  $('<a>', {
                    'href': '#' + tabPanelId, 
                    'aria-controls': tabId,
                    'role': 'tab',
                    'data-toggle': 'tab'
                }).html(options.title);

                jqTab.append(jqA);
                /*是否允许关闭*/
                if (options.allowClose) {
                    jqA.addClass('enable-close');
                    jqTab.append(
                        $('<span>',{
                            'class':'btn-close',
                            'aria-controls': tabId
                        })
                        .append($('<i>',{
                            'class': 'glyphicon glyphicon-remove'
                        }))
                    );
                }
               

                /*创建新TAB的内容*/
                jqTabPanel = $('<div>', {
                    'class': 'tab-pane',
                    'id': tabPanelId,
                    'role': 'tabpanel'
                });

                /*是否指定TAB内容*/
                if (options.iframe) {
                    if(options.url){ 
                        var _paramStartIndex = options.url.indexOf('?');
                        if(_paramStartIndex === -1){
                            options.url = options.url + '?iframe=' + tabId;
                        }
                        else{
                            var _uri = options.url.substring(0, _paramStartIndex);
                            var _params = options.url.substring(_paramStartIndex + 1);
                            options.url = _uri + '?iframe=' + tabId + '&' + _params;
                        }
                    } 
                    jqTabPanel.append($('<iframe>',{
                        'name': tabId,
                        'src': options.url
                    }));
                } 
                else {
                    jqTabPanel.append(options.content);
                } 
                /*加入TABS*/   
                var jqNavTabs = obj.find('.nav-tabs');
                jqNavTabs.append(jqTab);
                obj.find(".tab-content").append(jqTabPanel); 

                /*处理超出可视区域部分*/
                var diff = jqTab.offset().left + jqTab.width() - (obj.width() + obj.offset().left); 
                var navTabsCurrentLeft = jqNavTabs.offset().left;   
                if(diff > 0){
                    jqNavTabs.offset({left: (navTabsCurrentLeft-diff)});  
                    var jqNavTabLeftBtn = obj.find('.bsui-btn-left');
                    if(jqNavTabLeftBtn.hasClass('hide')){
                        jqNavTabLeftBtn.removeClass('hide');
                    } 
                }
            }
            else{
            	/*处于不可见区域时要移动到可见区域*/ 
            	var jqNavTabs = obj.find('.nav-tabs');
            	var tabLeft = jqTab.offset().left;
            	var tabRight = tabLeft + jqTab.width();
            	var jqBtnLeft = obj.find('.bsui-btn-left'),
            		jqBtnRigth = obj.find('.bsui-btn-right');
            	var startLeft = obj.offset().left;
            	var documentWidth = obj.width() + startLeft;
        		if(tabLeft < (startLeft-16)){ 
        			var diff = startLeft + jqNavTabs.offset().left + Math.abs(tabLeft) + jqTab.width(); 
        			if(diff >= startLeft){
        				jqNavTabs.offset({left: startLeft});
        				if(!jqBtnLeft.hasClass('hide')){
            				jqBtnLeft.addClass('hide');
            			}
        			}
        			else{
        				jqNavTabs.offset({left: diff});
        			}
        			/*向右移动后，右边超出可视区域部分,如果没有显示右边按钮，则显示。*/  
        			var jqLastLi = obj.find('li:last');
        			var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
        			if(lastLiRight > (documentWidth - 16)){
        				if(jqBtnRigth.hasClass('hide')){
        					jqBtnRigth.removeClass('hide');
        				}
        			}
            	} 
            	else if(tabRight > (documentWidth-16)){
            		var diff = jqNavTabs.offset().left - (tabRight - (documentWidth-16));  
            		jqNavTabs.offset({left: diff});

            		var jqLastLi = obj.find('li:last');
        			var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
        			if(lastLiRight <= documentWidth){
        				if(!jqBtnRigth.hasClass('hide')){
        					jqBtnRigth.addClass('hide');
        				}
        			}
        			var navTabsLeft = jqNavTabs.offset().left;
        			if(navTabsLeft < startLeft){
        				if(jqBtnLeft.hasClass('hide')){
        					jqBtnLeft.removeClass('hide');
        				}
        			}
            	} 
            }
            jqTab.addClass('active');
            jqTabPanel.addClass('active');
        }, 
        closeTab: function(obj, tabId){
            var tabPanelId = _tabPanelPrefix + tabId.substring(_tabPrefix.length); 
            var jqCurrentTab = $('#' + tabId),
                jqCurrentTabPanel = $('#' + tabPanelId);
            if (obj.find("li.active").attr('id') === tabId) { 
                var jqNextTab = jqCurrentTab.next(); 
                if(jqNextTab[0]){
                    jqNextTab.addClass('active');
                    jqCurrentTabPanel.next().addClass('active');
                }
                else{
                    jqCurrentTab.prev().addClass('active');
                    jqCurrentTabPanel.prev().addClass('active');
                }
            }
            /*关闭TAB*/
            jqCurrentTab.remove();
            jqCurrentTabPanel.remove();
            /*更新tab位置*/
            var jqNavTabs = obj.find('.nav-tabs');
            var jqLastLi = obj.find('li:last');
            var documentWidth = obj.width() + obj.offset().left;
            var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
            var diff = lastLiRight - documentWidth;
            if(diff <= obj.offset().left){
                var btnRight = obj.find('.bsui-btn-right');
                if(!btnRight.hasClass('hide')){
                    btnRight.addClass('hide');
                }

                var navTabsLeft = jqNavTabs.offset().left; 
                if(navTabsLeft > obj.offset().left) return;
                diff = navTabsLeft + Math.abs(diff);
                if(diff < obj.offset().left){
                    jqNavTabs.offset({left: diff});
                }
                else{
                    jqNavTabs.offset({left: obj.offset().left});
                    var btnLeft = obj.find('.bsui-btn-left');
                    if(!btnLeft.hasClass('hide')){
                        btnLeft.addClass('hide');
                    }
                }
            }
        }
    };
   

    var _moveRight = function(obj, moveWidth){
		var jqNavTabs = obj.find('.nav-tabs');
    	var navTabsLeft = jqNavTabs.offset().left;
    	var diff = navTabsLeft + moveWidth;
    	if(diff < obj.offset().left){
    		jqNavTabs.offset({left: diff});
    	}
    	else{
    		jqNavTabs.offset({left: obj.offset().left});
    		obj.find('.bsui-btn-left').addClass('hide');
    	}
    	/*判断右边是否超出可视区域*/
    	var jqLastLi = jqNavTabs.find('li:last'); 
    	var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
    	var documentWidth = obj.width() + obj.offset().left;
    	var diff = lastLiRight - documentWidth; 
    	if(diff > 0){
    		var btnRight = obj.find('.bsui-btn-right'); 
    		if(btnRight.hasClass('hide')){
    			btnRight.removeClass('hide');
    		}
    	}
    };
    var _moveLeft = function(obj, moveWidth){
    	var jqNavTabs = obj.find('.nav-tabs');
    	var jqLastLi = jqNavTabs.find('li:last'); 
    	var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
    	var documentWidth = obj.width() + obj.offset().left;
    	var diff = lastLiRight - documentWidth;
    	if(diff > 0){
    		if(diff <= moveWidth){
    			jqNavTabs.offset({left: (jqNavTabs.offset().left - diff)});
    			obj.find('.bsui-btn-right').addClass('hide');
    		}
    		else{
    			jqNavTabs.offset({left: (jqNavTabs.offset().left - moveWidth)});
    		}
    	}
    	if(jqNavTabs.offset().left < obj.offset().left){
    		var btnLeft = obj.find('.bsui-btn-left'); 
    		if(btnLeft.hasClass('hide')){
    			btnLeft.removeClass('hide');
    		}
    	}
    };

    $.fn.navTabs = function(key, options){
        var me = $(this);  
        if(typeof key === 'string'){
            methods[key].call(this, me, options);
            return;
        }
        me.options = $.extend({
            beforeCloseTab: function(){
                return true;
            }
        }, options || {});

        if(!me.hasClass('bsui-tabs'))
            me.addClass('bsui-tabs');

        var jqBsuiNav = me.find('.bsui-nav');
        if(!jqBsuiNav[0]){
            jqBsuiNav = $('<div>', {
                'class': 'bsui-nav'
            }).appendTo(me);
            /*增加左方向按钮*/
            $('<a>', {
                'class': 'bsui-tab-btn bsui-btn-left hide'
            }).append(
                $('<i>',{
                    'class': 'glyphicon glyphicon-menu-left'
                })
            ).appendTo(jqBsuiNav);
            /*nav-tabs*/
            $('<ul>', {
                'class': 'nav nav-tabs',
                'role': 'tablist'
            }).appendTo(jqBsuiNav);
            /*增加右方向按钮*/
            $('<a>', {
                'class': 'bsui-tab-btn bsui-btn-right hide'
            }).append(
                $('<i>',{
                    'class': 'glyphicon glyphicon-menu-right'
                })
            ).appendTo(jqBsuiNav);
        }

        var jqTabContent = me.find('.tab-content');
        if(!jqTabContent[0]){
            jqTabContent = $('<div>', {
                class: 'tab-content'
            }).appendTo(me);
        }



        me.on('click', '.btn-close', function (e) {   
        	e.stopPropagation(); 
            var id = $(this).attr("aria-controls");
            var beforeCloseTab = me.options.beforeCloseTab;
            if(beforeCloseTab instanceof Function){
                if(beforeCloseTab.call(this)){
                    methods['closeTab'].call(this, me, id);
                }
            } 
            else{ 
                methods['closeTab'].call(this, me, id);
            } 
        });

        me.on('click', 'a[aria-controls]', function(e){   
        	var documentWidth = me.width() + me.offset().left;
        	var jqCurrentLi = $(this).parent();
        	var currentLiLeft = jqCurrentLi.offset().left,
        		currentLiRight = jqCurrentLi.offset().left + jqCurrentLi.width();
            
        	if(currentLiLeft < (16 + me.offset().left)){
        		_moveRight(me, 220);
        		return;
        	} 
        	if(currentLiRight > documentWidth - 16){ 
        		_moveLeft(me, 220);
        	}
        });
        /*向右移动*/
        me.on('click', '.bsui-btn-left', function(e){
        	e.stopPropagation();
        	_moveRight(me, _stepWidth); 
        });
        /*向左移动*/
        me.on('click', '.bsui-btn-right', function(e){
        	e.stopPropagation(); 
        	_moveLeft(me,  _stepWidth); 
        });

        $(document).on('click', '[data-tabid]', function (e) { 
            var that = $(this);
            methods['addTab'].call(this, me, {
                id: that.data('tabid'),
                title: that.data('title') ? that.data('title') : that.html(),
                allowClose: true,
                iframe: true,
                url: that.data('url')
            });
        });
    
        $(window).resize(function (e) {    
            var jqNavTabs = me.find('.nav-tabs');
            var navTabsLeft = jqNavTabs.offset().left;
            var jqLastLi = me.find('li:last');
            if(jqLastLi[0]){
                var lastLiRight = jqLastLi.offset().left + jqLastLi.width();
                var meLeft = me.offset().left;
                var documentWidth = me.width() + meLeft;
                var diff = lastLiRight - documentWidth;
                var btnRight = me.find('.bsui-btn-right');
                if(diff <= 0){ 
                    if(!btnRight.hasClass('hide')){
                        btnRight.addClass('hide');
                    }
                    if(navTabsLeft < meLeft){
                        diff = jqNavTabs.offset().left + Math.abs(diff);
                        if(diff >= meLeft){
                            diff = meLeft;
                            me.find('.bsui-btn-left').addClass('hide');
                        } 
                        jqNavTabs.offset({left: diff}); 
                    }
                    else{
                        me.find('.bsui-btn-left').addClass('hide');
                    }
                }
                else{
                    if(btnRight.hasClass('hide')){
                        btnRight.removeClass('hide');
                    }
                } 
            }
        }); 
    };
})(jQuery);