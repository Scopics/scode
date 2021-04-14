$('header a').click(function(e) {
  e.preventDefault();
  const sectionName = $(this).attr('href');
  $('.pop-up').css('transform', 'translateX(110%)');
  $(`section${sectionName}.pop-up`).css('transform', 'translateX(0)');
})