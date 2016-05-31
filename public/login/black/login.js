
jQuery(document).ready(function() {
	$('body').attr({
        oncontextmenu: 'return false',
        onselectstart: 'return false',
        ondropstart: 'return false',
        onbeforecopy: 'return false'
    });

    /*
        Fullscreen background
    */ 
    $.backstretch([
                "/login/black/img/2.jpg"
              , "/login/black/img/3.jpg"
              , "/login/black/img/1.jpg"
             ], {duration: 3000, fade: 750});
    
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});	
    });  
});
