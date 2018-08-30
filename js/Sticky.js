class Sticky {
  constructor(selector = '.js-sticky', offset = 20) {
    this.header = document.getElementById('header')
    this.headerHeight =
      this.header && window.getComputedStyle(this.header).position === 'fixed' ? this.header.offsetHeight : 0
    this.element = document.querySelectorAll(selector)
    this.scrollHeight = 0
    this.offset = offset
  }
  /**
   * Initialize the class
   */
  init() {
    ;[].forEach.call(this.element, element => {
      element.style.position = 'relative'

      if (element.getAttribute('data-height')) {
        element.style.height = `${element.getAttribute('data-height')}px`
      } else {
        element.style.height = `${element.parentNode.offsetTop + element.parentNode.offsetHeight - element.offsetTop}px`

        // Redefine the height every time an image has been lazyloaded
        document.addEventListener('lazybeforeunveil', e => {
          element.style.height = `${element.parentNode.offsetTop +
            element.parentNode.offsetHeight -
            element.offsetTop}px`
        })
      }

      this.defineState(element)
      window.addEventListener('scroll', () => this.defineState(element))
    })
  }

  /**
   * Define the position of the sticky child element
   * @param {HTMLElement} element
   */
  defineState(element) {
    const offsetTop = element.offsetTop - this.headerHeight - this.offset
    const child = element.children[0]

    if (window.scrollY < offsetTop) {
      // Position Relative
      child.style.position = 'relative'
      child.style.top = 'auto'
      child.style.bottom = 'auto'
    } else if (window.scrollY >= offsetTop && window.scrollY < offsetTop + element.offsetHeight - child.offsetHeight) {
      // Position Fixed
      child.style.position = 'fixed'
      child.style.top = this.headerHeight + this.offset + 'px'
      child.style.bottom = 'auto'
    } else if (window.scrollY >= offsetTop + element.offsetHeight - child.offsetHeight) {
      // Position Absolute
      child.style.position = 'absolute'
      child.style.top = 'auto'
      child.style.bottom = 0
    }
  }
}

export default Sticky

const sticky = new Sticky()
sticky.init()
