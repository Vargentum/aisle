'use strict'

$ ->
  $('.edit-profile-view select, .search-results select').each ->
    sb = new SelectBox
      selectbox: $(this)
      height: 245,
      width: 235

$ ->
  $('.search-settings select').each ->
    sb = new SelectBox
      selectbox: $(this)
      height: 245,
      width: 100



$ ->
  $('.js-scrollbar').jScrollPane()

$ ->
  $(":range").rangeinput(
    progress: true,
    css:
      input: 'input-range',
      slider: 'input-range-slider',
      progress: 'input-range-progress',
      handle: 'input-range-handle',
  )

$ ->
  $main = $('.main-page-view').find('.this__main')
  $main.onepage_scroll(
    sectionContainer: ".this__main__section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    loop: false,
    keyboard: true,
#  height value
    responsiveFallback: 730
  #  beforeMove: ->(index),
  #  aftermove: ->(index)
  )

  console.log($(window).height())

  #  fix navigation positioning
  $('.onepage-pagination').appendTo('.this__column--rt')