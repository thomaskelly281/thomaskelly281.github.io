$(function(){  // $(document).ready shorthand
    $('.header').fadeIn('slow');
  });
  
//   $(document).ready(function() {
      
//       /* Every time the window is scrolled ... */
//       $(window).scroll( function(){
      
//           /* Check the location of each desired element */
//           $('.hideme').each( function(i){
              
//               var bottom_of_object = $(this).position().top + $(this).outerHeight();
//               var bottom_of_window = $(window).scrollTop() + $(window).height();
              
//               /* If the object is completely visible in the window, fade it it */
//               if( bottom_of_window > bottom_of_object ){
                  
//                   $(this).animate({'opacity':'1'},500);
                      
//               }
              
//           }); 
      
//       });
      
//   });

$(document).ready(function() {
    function checkVisibility() {
        $('.hideme').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            // Check if any part of the element is in the viewport
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }

    // Check visibility on scroll
    $(window).scroll(function() {
        requestAnimationFrame(checkVisibility);
    });

    // Check visibility on initial load
    checkVisibility();
});
