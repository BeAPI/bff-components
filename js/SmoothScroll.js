class SmoothScroll {
  constructor(target, duration = 200, easing = 'linear', callback) {
    this.easings = {
      linear(t) {
        return t
      },
      easeInQuad(t) {
        return t * t
      },
      easeOutQuad(t) {
        return t * (2 - t)
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
      easeInCubic(t) {
        return t * t * t
      },
      easeOutCubic(t) {
        return --t * t * t + 1
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      easeInQuart(t) {
        return t * t * t * t
      },
      easeOutQuart(t) {
        return 1 - --t * t * t * t
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
      },
      easeInQuint(t) {
        return t * t * t * t * t
      },
      easeOutQuint(t) {
        return 1 + --t * t * t * t * t
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
      },
    }
    this.target = target
    this.duration = duration
    this.easing = easing
    this.callback = callback

    this.start = window.pageYOffset
    this.startTime = 'now' in window.performance ? window.performance.now() : new Date().getTime()
    this.documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
    this.windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight
    this.destinationOffset = typeof this.target === 'number' ? this.target : this.target.offsetTop
    this.destinationOffsetToScroll = Math.round(
      this.documentHeight - this.destinationOffset < this.windowHeight
        ? this.documentHeight - this.windowHeight
        : this.destinationOffset
    )
  }
  init() {
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, this.destinationOffsetToScroll)

      if (this.callback) {
        this.callback()
      }

      return
    }

    this.scroll()
  }
  scroll() {
    const now = 'now' in window.performance ? window.performance.now() : new Date().getTime()
    const time = Math.min(1, (now - this.startTime) / this.duration)
    const timeFunction = this.easings[this.easing](time)
    window.scroll(0, Math.ceil(timeFunction * (this.destinationOffsetToScroll - this.start) + this.start))

    if (window.pageYOffset === this.destinationOffsetToScroll) {
      if (this.callback) {
        this.callback()
      }

      return
    }

    window.requestAnimationFrame(this.scroll.bind(this))
  }
}

;[].forEach.call(document.querySelectorAll('[data-goto]'), trigger => {
  trigger.addEventListener('click', function() {
    const smoothScroll = new SmoothScroll(
      isNaN(trigger.dataset.goto) ? document.querySelector(trigger.dataset.goto)[0] : parseInt(trigger.dataset.goto)
    )
    smoothScroll.init()
  })
})

export default SmoothScroll
