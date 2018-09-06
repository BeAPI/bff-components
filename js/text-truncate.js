import { debounce } from './utils'

class TextTruncate {
  /**
   * Bind select that has to be wrapped
   * @param {string} selector
   */
  static bind(selector = '[data-text-truncate]', ellipsis) {
    ;[].forEach.call(document.querySelectorAll(selector), element => new TextTruncate(element, ellipsis))
  }
  constructor(element, ellipsis = '...') {
    this.element = element
    this.ellipsis = ellipsis
    this.initialSize = { width: element.clientWidth, height: element.clientHeight }
    this.textContent = typeof element.textContent === 'undefined' ? 'innerText' : 'textContent'
    this.originalText = element[this.textContent]
    this.init()
    this.compareSizes = debounce(this.compareSizes, 200)
  }
  /**
   * Init Class
   */
  init() {
    window.addEventListener('resize', this.compareSizes.bind(this))
    this.truncateByHeight(this.element)
  }
  /**
   * Compare sizes between resize if we can show more text
   */
  compareSizes() {
    if (this.initialSize.width !== this.element.clientWidth || this.initialSize.height !== this.element.clientHeight) {
      this.resetText(this.element)
      this.truncateByHeight(this.element)
    } else {
      return false
    }
  }
  /**
   * Display original text
   * @param {HTMLElement} element
   */
  resetText(element) {
    element.children[0][this.textContent] = this.originalText
  }
  /**
   * Truncates the text of an element depending its height.
   *
   * @param {HTMLElement} element
   */
  truncateByHeight(element) {
    const parts = element[this.textContent].split(' ')
    let height = this.getHeight(element)

    while (height > element.clientHeight) {
      if (element.children.length > 0) {
        const elements = element.children
          ;[].forEach.call(elements, el => (height = el.offsetHeight))
      } else {
        height = element.children[0].offsetHeight
      }
      parts.pop()
      element.children[0][this.textContent] = `${parts.join(' ')}${this.ellipsis}`
    }
    this.initialSize = { width: element.clientWidth, height: element.clientHeight }
  }

  /**
   * Get height of innerText
   * @param {HTMLElement} element
   */
  getHeight(element) {
    let height = 0
    if (element.children.length > 0) {
      const elements = element.children
        ;[].forEach.call(elements, el => (height = el.offsetHeight))
    } else {
      element.innerHTML = `<p>${element.innerText}</p>`
      height = element.children[0].offsetHeight
    }
    return height
  }
}

export default TextTruncate

TextTruncate.bind('[data-text-truncate]', '...')
