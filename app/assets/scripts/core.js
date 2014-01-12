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

}).call(this);
