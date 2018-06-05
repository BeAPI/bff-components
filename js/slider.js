import '../polyfill/forEach'
import $ from 'jquery'
import 'slick-carousel'

class Slider {
  /**
   *
   * @param {Object} element
   * @param {Object} options
   */
  constructor(element, options = false) {
    this.element = element
    this.slickOpts = options ? options : { arrows: true, slidesToShow: 1 }
    $(element).slick(this.slickOpts)
  }
}

const prevArrow = '<button type="button" role="navigation" class="slick-arrow-prev"></button>'
const nextArrow = '<button type="button" role="navigation" class="slick-arrow-next"></button>'
const options = {
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

new Slider('.slider', options)