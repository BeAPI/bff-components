/**
 * Turn any list of elements into a select on mobile viewport
 */
class SlctBlk {
  /**
   * Bind elements that need to be a select in mobile viewport
   * @param {string} selector
   */
  static bind(selector, breakpoint = 1024) {
    ;[].forEach.call(document.querySelectorAll(selector), element => new SlctBlk(element, breakpoint))
  }

  constructor(element, breakpoint) {
    this.element = element
    this.selectClass = this.element.dataset.slctBlk
    this.parent = element.parentNode
    this.clone = this.element.cloneNode(true)
    this.breakpoint = breakpoint
    this.mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`)
    this.handleListType = this.handleListType.bind(this)
    this.handleSelectAsLink = this.handleSelectAsLink.bind(this)

    // Add a listen event
    this.mediaQuery.addListener(this.handleListType)
    this.handleListType()
  }

  /**
   * Check mediaQuery in order to build the right component
   */
  handleListType() {
    if (this.mediaQuery.matches) {
      this.buildList()
    } else {
      this.buildSelect()
    }
  }

  /**
   * Build ul component on desktop
   */
  buildList() {
    this.parent.innerHTML = ''
    this.parent.appendChild(this.clone)
    if (this.select) {
      this.select.removeEventListener('change', this.handleSelectAsLink)
    }
  }

  /**
   * Build ul component on desktop
   */
  buildSelect() {
    // Build html select
    this.select = document.createElement('select')
    this.select.classList.add(this.selectClass)
    // Create all options from li
    const items = this.element.querySelectorAll('li')
    ;[].forEach.call(items, item => {
      const option = document.createElement('option')
      option.innerText = item.innerText
      option.value = item.querySelector('a').href
      if (item.classList.contains('active')) {
        option.selected = true
      }
      this.select.appendChild(option)
    })
    // Clean parent and append select
    this.parent.innerHTML = ''
    this.parent.appendChild(this.select)
    this.select.addEventListener('change', this.handleSelectAsLink)
  }

  handleSelectAsLink(e) {
    e.preventDefault()
    const href = e.target.value
    window.location.href = href
  }
}

SlctBlk.bind('[data-slct-blk]', 1024)
