
$(document).ready(function(){
		$('.fa-bars').click(function(){
			$(this).hide() && $('.close_icon').show();
		});
		$('.close_icon').click(function(){
			$(this).hide() && $('.fa-bars').show();
		});
	});

$(window).on('scroll', function () {
		var menu_area = $('.navbar');
		if ($(window).scrollTop() > 70) {
			menu_area.addClass('sticky_navigation');
			// $('.mainlogo').css("width","auto");
		} else {
			menu_area.removeClass('sticky_navigation');
			// $('.mainlogo').css("width","auto");

		}
	});
//Get the button:
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide') && $('.fa-bars').show() && $('.close_icon').hide();
})







 $(document).ready(function(){
     $('.testi_slider').slick({
  dots:false,
  arrows:true,
   infinite: true,
  // centerPadding: '60px',
  slidesToShow:3,
  speed:1500,
  slidesToScroll: 1,
  draggable: true,
      autoplay: true, 
      autoplaySpeed: 2000,
  index: 1,
  responsive: [
  {
      breakpoint: 992,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {

      	centerMode: true,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1
      }
    }
  ]
});
    });

  function myFunction() {
  var x = document.getElementById("showpass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }