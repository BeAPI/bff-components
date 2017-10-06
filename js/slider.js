const $ = require('jquery')
const slick = require('../vendor/slick')

const prevArrow = '<button type="button" role="navigation" class="slick-arrow-prev"></button>'
const nextArrow = '<button type="button" role="navigation" class="slick-arrow-next"></button>'
const slickOpts = {
  accessibility: true,
  arrows: true,
  prevArrow: prevArrow,
  nextArrow: nextArrow,
  slidesToShow: 1,
  variableWidth: true,
  touchThreshold: 10,
  speed: 80,
  responsive: [{
    breakpoint: 768,
    settings: {
      arrows: false,
      slidesToShow: 2
    }
  }]
}
const $slider = $('.slider')

$(document).ready(() => {
  $slider.slick(slickOpts)
})