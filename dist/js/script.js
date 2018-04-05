new WOW().init();
$(document).ready(function(){
  $('.parallax').parallax();
  $('.modal').modal();
  $('.pushpin').pushpin();
  $('.scrollspy').scrollSpy();
  $('.table-of-contents').pushpin({ top: $('.table-of-contents').offset().top });
});
