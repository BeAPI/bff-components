class Relocate {
  /**
   *
   * @param {number} breakpoint
   */
  constructor(breakpoint = 1024) {
    this.breakpoint = breakpoint
    this.mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`)
    this.initRelocate = this.initRelocate.bind(this)

    // Add a listen event
    this.mediaQuery.addListener(this.initRelocate)
    this.initRelocate()
  }

  /**
   * Function to do something with the media query
   */
  initRelocate() {
    if (this.mediaQuery.matches) {
      this.reloacteFoo('desktop')
    } else {
      this.reloacteFoo('mobile')
    }
  }

  reloacteFoo(match) {
    if (match === 'desktop') {
      // Do something for desktop breakpoint
    } else if (match === 'mobile') {
      // Do something for mobile breakpoint
    }
  }
}
new Relocate(1024)