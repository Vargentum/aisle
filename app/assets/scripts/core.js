(function() {
  'use strict';
  $(function() {
    return $('.edit-profile-view select, .search-results select').each(function() {
      var sb;
      return sb = new SelectBox({
        selectbox: $(this),
        height: 245,
        width: 235
      });
    });
  });

  $(function() {
    return $('.search-settings select').each(function() {
      var sb;
      return sb = new SelectBox({
        selectbox: $(this),
        height: 245,
        width: 100
      });
    });
  });

  $(function() {
    return $('.js-scrollbar').jScrollPane();
  });

  $(function() {
    return $(":range").rangeinput({
      progress: true,
      css: {
        input: 'input-range',
        slider: 'input-range-slider',
        progress: 'input-range-progress',
        handle: 'input-range-handle'
      }
    });
  });

  $(function() {
    var $main, moveSlider;
    $main = $('.main-page-view').find('.this__main');
    $main.onepage_scroll({
      sectionContainer: ".this__main__section",
      easing: "ease",
      animationTime: 1000,
      pagination: true,
      updateURL: false,
      loop: true,
      keyboard: true,
      responsiveFallback: false
    });
    moveSlider = function() {
      return $main.moveDown();
    };
    setInterval(moveSlider, 1113000);
    return $('.onepage-pagination').appendTo('.this__column--rt');
  });

}).call(this);
