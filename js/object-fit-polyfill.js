/**
 * This polyfill adds compatibility to all Browsers
 * You must add in your css :
 * .compat-object-fit {
 * background-size: cover;
 * background-position: center center;
 * background-repeat: no-repeat;
 *  img {
 *      opacity: 0;
 *   }
 * }
 * and Modernizr for objectfit
 */

const $ = require('jquery')
const Modernizr = require('../vendor/modernizr.objectfit')

let objectFitSupport = () => {
  // Object fit fallback for IE9+
  $('.object-fit').each(() => {
    let container = $(this)
    let imgUrl = container.find('img').attr('data-srcset')
    if (imgUrl) {
      imgUrl = imgUrl.trim().split(',')[0]
      container
        .css('background-image', `url("${imgUrl}")`)
        .addClass('compat-object-fit')
    }
  })
}

// Fix object Fit on IE
if (!Modernizr.objectfit) {
  objectFitSupport()
}