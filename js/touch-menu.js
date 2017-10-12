/*
* Snippet to enable touch events on menu
* This snippet is not working on iOS due to the device default gesture purpose that fires a history back
* @author Romain Lefort
*/

const $ = require('jquery')

if ($('html').hasClass('touchevents')) {
  let startx = 0
  let w = window.innerWidth
  let min = w * 0.5
  let max = w * 0.8
  let flag = false
  let $menu = $('.menu__mobile')
  let menuw = $menu.width()
  let isOpen = false

  if ($('body').hasClass('menu-mobile--active')) {
    isOpen = true
  }

  document.addEventListener('touchstart', function (e) {
    let touchobj = e.changedTouches[0]
    startx = parseInt(touchobj.clientX)
    $menu.addClass('notransition')
    if (e.target.localName === 'button') {
      return false
    }
    if (!isOpen) {
      if (startx >= 0 && startx <= 10) {
        flag = true
      }
    } else {
      if (startx >= (max - 30) && startx <= (max + 30)) {
        flag = true
      }
    }
  }, false)

  document.addEventListener('touchmove', function (e) {
    let touchobj = e.changedTouches[0]
    let dist = parseInt(touchobj.clientX) - startx
    if (!isOpen) {
      if (flag && dist < max) {
        let left = -menuw + dist
        $menu.css('left', left)
      }
    } else {
      if (flag && dist < 0) {
        $menu.css('left', dist)
      }
    }
  }, false)

  document.addEventListener('touchend', function (e) {
    let touchobj = e.changedTouches[0]
    let endx = touchobj.clientX
    $menu.removeClass('notransition')
    if (e.target.localName === 'button') {
      return false
    }
    if (flag) {
      if (endx > min) {
        $('body').addClass('menu-mobile--active')
        $menu.css('left', 0)
        isOpen = true
      } else {
        $menu.removeAttr('style')
        $('body').removeClass('menu-mobile--active')
        isOpen = false
      }
    }
    flag = false
  }, false)
}