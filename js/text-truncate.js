// import { debounce } from './utils'

class TextTruncate {
  /**
   * Class constructor
   * @param {String} target
   * @param {Object} opts
   * @param {String} opts.character
   * @param {String} opts.classname
   * @param {Boolean} opts.spaces
   */
  constructor(target, opts) {
    this.target = target
    this.character = opts.character || '…'
    this.classname = opts.classname || 'js-tt'
    this.spaces = typeof opts.spaces === 'boolean' ? opts.spaces : true
    this.charHtml = `<span class="js-tt-char">${this.character}</span>`

    // If you want to debounce the event listener, uncomment this line and import a debounce function
    // this.init = debounce(this.init, 300)
    window.addEventListener('resize', this.init.bind(this))
  }

  /**
   * Init Class
   */
  init() {
    const els = document.querySelectorAll(this.target)
    if (!els.length) return false

    for (let i = 0; i < els.length; i += 1) {
      const el = els[i]
      this.styles = el.style
      this.textProp = el.textContent === undefined ? 'innerText' : 'textContent'

      this.clean(el)

      const words = this.spaces ? el[this.textProp].split(' ') : el[this.textProp]
      if (words.length < 2) continue

      this.removeElHeightAttr(el)

      if (el.offsetHeight <= this.maxHeight) {
        this.styles.height = this.heightStyle
        this.styles.maxHeight = this.maxHeightStyle
        continue
      }

      this.loopOverWords(words, el)
    }
  }
  /**
   * If already truncated, recapture orginal text
   * @param {HTMLElement} el
   */
  clean(el) {
    const span = el.querySelector(`.${this.classname}`)
    if (span) {
      el.removeChild(el.querySelector('.js-tt-char'))
      el[this.textProp] = el[this.textProp]
    }
  }

  /**
   * Remove CSS height attributes to compare height and maxHeight
   * @param {HTMLElement} el
   */
  removeElHeightAttr(el) {
    this.maxHeight = el.clientHeight
    this.heightStyle = this.styles.height
    this.styles.height = 'auto'
    this.maxHeightStyle = this.styles.maxHeight
    this.styles.maxHeight = 'none'
  }

  /**
   * Add words until reach the original height of the element
   * @param {Array} words
   * @param {HTMLElement} el
   */
  loopOverWords(words, el) {
    let max = words.length - 1
    let min = 0
    let pivot
    while (min < max) {
      pivot = (min + max + 1) >> 1 // eslint-disable-line no-bitwise
      el[this.textProp] = this.spaces ? words.slice(0, pivot).join(' ') : words.slice(0, pivot)
      el.insertAdjacentHTML('beforeend', this.charHtml)
      if (el.offsetHeight > this.maxHeight) max = this.spaces ? pivot - 1 : pivot - 2
      else min = pivot
    }

    el[this.textProp] = this.spaces ? words.slice(0, max).join(' ') : words.slice(0, max)
    el.insertAdjacentHTML('beforeend', this.charHtml)
    const diff = this.spaces ? ` ${words.slice(max).join(' ')}` : words.slice(max)

    el.insertAdjacentHTML('beforeend', `<span class="${this.classname}" style="display:none;">${diff}</span>`)

    this.styles.height = this.heightStyle
    this.styles.maxHeight = this.maxHeightStyle
  }
}

export default TextTruncate

const trunc = new TextTruncate('.tt p', '...')
trunc.init()
