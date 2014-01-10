'use strict'

$ ->
  $('select').each ->
    sb = new SelectBox
      selectbox: $(this)
      height: 245,
      width: 100

$ ->
  $('.js-scrollbar').jScrollPane()

$ ->
  $(":range").rangeinput(
    progress: true
    css:
      input: 'input-range',
      slider: 'input-range-slider',
      progress: 'input-range-progress',
      handle: 'input-range-handle',
  )