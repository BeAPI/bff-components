/**
 * @param {object} el (The sticky element)
 * @param {object} elContainer (The sicky element container (sidebar ?))
 * @param {object} elBreakpoint (The element whose defines the stop breakpoint)
 * @param {int} offsetTop (offset between sticky element and window.scrollTop())
 */
let stickElement = (el, elContainer, elBreakpoint, offsetTop) => {
  $('<div class="js-start-point"></div>').insertBefore(el)

  $(window).on('scroll', function () {
    let params = {
      offsetTop,
      containerOffsetTop: elContainer.offset().top,
      startBreakpoint: $('.js-start-point').offset().top,
      breakpointTop: el.offset().top,
      breakpointBottom: elBreakpoint.offset().top,
      elHeight: el.height()
    }

    if ($(window).scrollTop() + params.elHeight + params.offsetTop > params.breakpointBottom) {
      // console.log('absolute')
      el.css({
        position: 'absolute',
        top: params.breakpointBottom - params.containerOffsetTop - params.elHeight
      })
    } else if ($(window).scrollTop() >= (params.startBreakpoint - params.offsetTop)) {
      // console.log('fixed')
      el.css({
        position: 'fixed',
        top: params.offsetTop,
        zIndex: 1
      })
    } else if ($(window).scrollTop() < params.startBreakpoint) {
      // console.log('static')
      el.css({
        position: 'static'
      })
    }
  })
}

module.exports = stickElement