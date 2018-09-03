export const scrollIt = (scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') => {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()
  let scrollY = window.scrollY || document.documentElement.scrollTop
  let currentTime = 0

  // min time .1, max time .8 seconds
  let time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8))

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  let easingEquations = {
    easeOutSine: function(pos) {
      return Math.sin(pos * (Math.PI / 2))
    },
    easeInOutSine: function(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1)
    },
    easeInOutQuint: function(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5)
      }
      return 0.5 * (Math.pow(pos - 2, 5) + 2)
    },
    easeInOutQuad: function(pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2)
      return -0.5 * ((pos -= 2) * pos - 2)
    },
  }

  // add animation loop
  function tick() {
    currentTime += 1 / 60

    var p = currentTime / time
    var t = easingEquations[easing](p)

    if (p < 1) {
      window.requestAnimFrame(tick)

      window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t)
    } else {
      window.scrollTo(0, scrollTargetY)
    }
  }

  // call it once to get started
  tick()
}

export const indexInParent = node => {
  var children = node.parentNode.childNodes
  var num = 0
  for (var i = 0; i < children.length; i++) {
    if (children[i] === node) return num
    if (children[i].nodeType === 1) num++
  }
  return -1
}

export const debounce = (func, wait, immediate) => {
  var timeout
  return function() {
    var context = this
    var args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
