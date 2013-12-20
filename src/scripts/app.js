$(document).foundation();

$(function() {

  $("select").each(function() {
    var sb = new SelectBox({
      selectbox: $(this),
      height: 245,
      width: 100
    });
  });

  $('.js-scrollbar').jScrollPane();

});