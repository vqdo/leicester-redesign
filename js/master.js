var cogs = (function() {
    var self = {};
    
    
    self.init = function() {
        console.log("Document ready.");
        self.attachNavHandlers();
        //self.doSlideshow();
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
    
    /* broken */
    self.doSlideshow = function() {
        console.log("Doing slideshow");
        var parseSlideName = function(el) {
            var classes = $(el).attr('class').split(/\s+/);
            return classes[1]; // :(        
        }
        
        // hardcode the slides in for now
        var slides = ['study-with-us', 'research-with-us', 'business-and-enterprise', 'alumni'];
        var bg = $('.slideshow-bg');
        var panels = $('.slideshow-panel');
        var leftButton = $('.slideshow-nav .left');
        var rightButton = $('.slideshow-nav .right');
        
        var slidePos = 0;
        var numSlides = slides.length;
        
        leftButton.click(function() {
          var prev = slides[slidePos];
          slidePos = (slidePos + numSlides - 1) % numSlides; 
          var next = slides[slidePos];
          var panel = $('.slideshow-panel.' + next);
          
          panels.hide();
          panel.fadeIn();   
 
          bg.switchClass(prev, next, 400);   
        });
        rightButton.click(function() {
          var prev = slides[slidePos];
          slidePos = (slidePos + 1) % numSlides; 
          var next = slides[slidePos];
          //var name = parseSlideName(next);
          var panel = $('.slideshow-panel.' + next);
          
          bg.switchClass(prev, next);
          
          panels.hide();
          panel.fadeIn();
          
        });
        
    }
    
    return self;
})()


$(document).ready(function() {
   cogs.init(); 
});