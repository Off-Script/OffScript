$(document).ready(function(){
  $('.parallax').parallax();
  $('.modal').modal();
  $('.pushpin').pushpin();
  $('.table-of-contents').pushpin({ top: $('.table-of-contents').offset().top });
});
