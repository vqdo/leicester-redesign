var cogs = (function() {
    var self = {};
    
    
    self.init = function() {
        console.log("Document ready.");
        self.attachNavHandlers();
    }
    
    self.attachNavHandlers = function() {
        // User must hover for at least this long before an event is triggered
        var evt_trigger_time = 500;  
        var showTimer;        
        
        var $mainNav = $('.main-nav');
        var $mainLinks = $('.main-nav-titles li');
        var $dropdown = $('.main-nav-dropdown');
        
        var checkHover = function(target) {
            if($(target).is(':hover') && $dropdown.is(':hidden')) {
                $dropdown.slideToggle(200);
                $mainNav.addClass('expanded');
            }
        }
        
        $mainLinks.mouseenter(function(evt) {
             if($dropdown.is(':hidden')) {
                var target = $(evt.target);
                
                clearTimeout(showTimer);
                showTimer = setTimeout(function() {
                    checkHover(target);
                }, evt_trigger_time);
            }            
        });
        
        $mainNav.mouseleave(function(evt) {
            //if($dropdown.is(':hover')) return;
            clearTimeout(showTimer);
            
            if(!$dropdown.is(':hidden')) {
                $dropdown.slideToggle(100);
                $mainNav.removeClass("expanded");
            }
            
        });
    } 
    
    return self;
})()


$(document).ready(function() {
   cogs.init(); 
});