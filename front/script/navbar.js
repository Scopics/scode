$('header a').click(function(e) {
  e.preventDefault();
  const sectionName = $(this).attr('href');
  $('.pop-up').css('transform', 'translateX(110%)');
  $(`section${sectionName}.pop-up`).css('transform', 'translateX(0)');
})

$('body').on('click', ':not(header, header *, .pop-up, .pop-up *)', function(e) {
  $('.pop-up').css('transform', 'translateX(110%)');
})