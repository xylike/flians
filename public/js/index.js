$(function(){ 
    $('#side-menu').slimScroll({height:'100%'});       
	$('#fixed-sidebar-control').on('click',function(){ 
		if($('body').hasClass('mini-sidebar')){
			$('body').removeClass('mini-sidebar');
			$('#fixed-sidebar-control>i').addClass('fa-rotate-90');
			$('#side-menu>li>a,#side-menu>li>ul>li>a').tooltip('destroy'); 
		}
		else{
			$('body').addClass('mini-sidebar');
			$('#fixed-sidebar-control>i').removeClass('fa-rotate-90');
			$('#side-menu>li>a,#side-menu>li>ul>li>a').tooltip({delay: { "show": 500, "hide": 20 }});
		}
	});
	//当初不为缩略图时，要去除title提示 
	$('#side-menu>li>a,#side-menu>li>ul>li>a').tooltip().tooltip('destroy');
	/*自定义快捷键入口*/
	$('#side-menu>li>a>span:last-child').tooltip({delay: { "show": 500, "hide": 20 }});  
 	/*初始时展开所有菜单*/
 	$('.collapse').collapse('show');   
});  