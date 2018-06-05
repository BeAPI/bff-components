import '../polyfill/forEach'
import $ from 'jquery'
import 'slick-carousel'

class Slider {
  /**
   * @param {Object} element
   * @param {Object} opts
   */
  constructor(element, opts) {
    this.element = element
    this.opts = opts

    this.handleMatchMedia = this.handleMatchMedia.bind(this)

    this.printMediaQuery = window.matchMedia('print')
    this.printMediaQuery.addListener(this.handleMatchMedia)
    this.handleMatchMedia()
  }

  init() {
    $(this.element).slick(this.opts)
  }
  destroy() {
    if (!$(this.element).hasClass('slick-initialized')) {
      return false
    } else {
      $(this.element).slick('unslick')
    }
  }
  handleMatchMedia() {
    if (!this.printMediaQuery.matches) {
      this.init()
    } else {
      this.destroy()
    }
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