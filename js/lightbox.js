// /**
//  * Import modaal.js with NPM and modaal.scss with composerjs
//  * http://www.humaan.com/modaal/
//  * https://github.com/humaan/Modaal
//  */

import $ from 'jquery'
import 'modaal/dist/js/modaal'
class Lightbox {
  /**
   *
   * @param {string} selector
   * @param {Object} options
   * @param {string} container
   */

  constructor(
    selector = "a[href$='.png'], a[href$='.jpg'], a[href$='.gif']",
    options = { type: 'image' },
    container = '.entry__content'
  ) {
    this.selector = selector
    this.options = options
    this.container = container
    const _this = this
    $(this.container).each(function () {
      let instance = 0
      const imagesInstances = $(this).find(_this.selector)
      imagesInstances.parent().each(function () {
        const galleryClass = `js-gallery_${instance}`
        $(this).addClass(galleryClass)
        $(this)
          .find(_this.selector)
          .attr('rel', galleryClass)
          .modaal(_this.options)
        instance++
      })
    })
  }
}
new Lightbox()
